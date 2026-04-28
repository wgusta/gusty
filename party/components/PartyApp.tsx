"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  PARTY_CONFIRMATION_LINES,
  PARTY_ERROR_MESSAGE,
  PARTY_FOOTER_LINE,
  PARTY_LOADING_COPY,
  PARTY_SIMILARITY_COPY,
} from "@/party/lib/copy";
import { PARTY_SEED_ITEMS } from "@/party/lib/seed";
import { getPartySupabaseBrowserClient } from "@/party/lib/supabase";
import {
  formatPartyDate,
  getEmptyCustomDraft,
  getPartyMetaLabel,
  getPartyModeBadge,
  getPartySettingsFallback,
  isSimilarPartyTitle,
  summarizePartyData,
  shouldShowPartySetupBanner,
} from "@/party/lib/utils";
import type {
  PartyCartItem,
  PartyCatalogItem,
  PartyCustomDraft,
  PartySnapshot,
} from "@/party/lib/types";

const PARTY_HEADLINE = "Schräge Hüete Party";
const PARTY_INTRO =
  "Hesch scho immer mal din Huet, wo du random kouft hesch, woue schamfrei alege? Denn isch das dini Glägeheit.";
const PARTY_INTRO_BULLETS = [
  "Uf däre Website tüemer regle, wär was mitbringt. Los, los, los!",
];
const PARTY_META = [
  "02.05.2026",
  "ab 20 Uhr",
  "Rathausgasse 20 im 2. Stock",
  "Igang isch hinger Unvermeidbar",
] as const;

type PartyAppProps = {
  adminMode?: boolean;
  adminSecret?: string;
};

type FormState = {
  displayName: string;
  note: string;
};

const PREVIEW_SNAPSHOT: PartySnapshot = {
  mode: "preview",
  items: PARTY_SEED_ITEMS,
  submissions: [],
  submissionItems: [],
  settings: { eventClosed: false },
  errorMessage:
    "Preview-Modus. Für Live-Daten bruchsch no `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` und ds SQL-Setup.",
};

function getRandomConfirmation() {
  return PARTY_CONFIRMATION_LINES[
    Math.floor(Math.random() * PARTY_CONFIRMATION_LINES.length)
  ];
}

function normalizeQuantity(value: number) {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
}

export default function PartyApp({
  adminMode = false,
  adminSecret,
}: PartyAppProps) {
  const supabase = getPartySupabaseBrowserClient();
  const [snapshot, setSnapshot] = useState<PartySnapshot>(PREVIEW_SNAPSHOT);
  const [isBooting, setIsBooting] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({ displayName: "", note: "" });
  const [cart, setCart] = useState<Record<string, number>>({});
  const [customDrafts, setCustomDrafts] = useState<PartyCustomDraft[]>([]);
  const [showGuestAccordion, setShowGuestAccordion] = useState(adminMode);
  const [confirmationState, setConfirmationState] = useState<{
    line: string;
    items: string[];
  } | null>(null);
  const [adminItemDraft, setAdminItemDraft] = useState<PartyCatalogItem>({
    id: "",
    category: "Getränk",
    title: "",
    note: "",
    unitLabel: "Pack",
    targetQuantity: 1,
    sortOrder: 500,
    isCustom: false,
  });
  const [isAdminSaving, setIsAdminSaving] = useState(false);

  const loadSnapshot = useCallback(async () => {
    if (!supabase) {
      setSnapshot(PREVIEW_SNAPSHOT);
      setIsBooting(false);
      return;
    }

    const [itemsResult, submissionsResult, claimsResult, settingsResult] = await Promise.all([
      supabase
        .from("party_items")
        .select("id, category, title, note, unit_label, target_quantity, sort_order, is_custom, created_at")
        .order("sort_order", { ascending: true }),
      supabase
        .from("party_submissions")
        .select("id, display_name, note, created_at")
        .order("created_at", { ascending: false }),
      supabase.from("party_submission_items").select("id, submission_id, item_id, quantity"),
      supabase.from("party_settings").select("event_closed").eq("id", "main").maybeSingle(),
    ]);

    const firstError =
      itemsResult.error ||
      submissionsResult.error ||
      claimsResult.error ||
      settingsResult.error;

    if (firstError) {
      setSnapshot({
        ...PREVIEW_SNAPSHOT,
        errorMessage:
          "Live-Daten sind no nid parat. Führe zersch ds SQL-Setup uus und füeg di fehlende Env-Keys i.",
      });
      setIsBooting(false);
      return;
    }

    setSnapshot({
      mode: "live",
      items:
        itemsResult.data?.map((item) => ({
          id: item.id,
          category: item.category,
          title: item.title,
          note: item.note,
          unitLabel: item.unit_label,
          targetQuantity: item.target_quantity,
          sortOrder: item.sort_order,
          isCustom: item.is_custom,
          createdAt: item.created_at,
        })) ?? [],
      submissions:
        submissionsResult.data?.map((submission) => ({
          id: submission.id,
          displayName: submission.display_name,
          note: submission.note,
          createdAt: submission.created_at,
        })) ?? [],
      submissionItems:
        claimsResult.data?.map((claim) => ({
          id: claim.id,
          submissionId: claim.submission_id,
          itemId: claim.item_id,
          quantity: claim.quantity,
        })) ?? [],
      settings: getPartySettingsFallback(
        settingsResult.data
          ? {
              eventClosed: settingsResult.data.event_closed,
            }
          : null,
      ),
      errorMessage: null,
    });
    setIsBooting(false);
  }, [supabase]);

  useEffect(() => {
    void loadSnapshot();
  }, [loadSnapshot]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const channel = supabase
      .channel("party-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "party_items" },
        () => void loadSnapshot(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "party_submissions" },
        () => void loadSnapshot(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "party_submission_items" },
        () => void loadSnapshot(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "party_settings" },
        () => void loadSnapshot(),
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadSnapshot, supabase]);

  const { groupedItems, itemSummaries, guestEntries, flaggedItems } = useMemo(
    () =>
      summarizePartyData(snapshot.items, snapshot.submissions, snapshot.submissionItems),
    [snapshot],
  );

  const selectedCatalogItems = useMemo<PartyCartItem[]>(
    () =>
      Object.entries(cart)
        .filter(([, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => ({ itemId, quantity })),
    [cart],
  );

  const selectedSummaryLines = useMemo(() => {
    const selectedCatalogLines = selectedCatalogItems
      .map((entry) => {
        const item = itemSummaries.find((candidate) => candidate.id === entry.itemId);
        if (!item) {
          return null;
        }

        return `${entry.quantity} ${item.unitLabel} ${item.title}`;
      })
      .filter((value): value is string => Boolean(value));

    const selectedCustomLines = customDrafts.map(
      (entry) => `${entry.quantity} ${entry.unitLabel} ${entry.title}`,
    );

    return [...selectedCatalogLines, ...selectedCustomLines];
  }, [customDrafts, itemSummaries, selectedCatalogItems]);

  const similarityWarning = useMemo(() => {
    const titles = snapshot.items.map((item) => item.title);
    return customDrafts.some((draft) => isSimilarPartyTitle(draft.title, titles));
  }, [customDrafts, snapshot.items]);

  const hasInvalidCustomDraft = customDrafts.some(
    (draft) =>
      draft.title.trim().length < 2 || draft.unitLabel.trim().length < 2 || draft.quantity < 1,
  );

  const isEventClosed = snapshot.settings.eventClosed;
  const canSubmit =
    !isSubmitting &&
    !isEventClosed &&
    formState.displayName.trim().length >= 2 &&
    !hasInvalidCustomDraft &&
    selectedSummaryLines.length > 0 &&
    Boolean(supabase);

  function updateCart(itemId: string, nextQuantity: number) {
    setCart((current) => {
      const quantity = Math.max(0, nextQuantity);
      if (quantity === 0) {
        const next = { ...current };
        delete next[itemId];
        return next;
      }

      return {
        ...current,
        [itemId]: quantity,
      };
    });
  }

  function resetSubmissionState() {
    setCart({});
    setCustomDrafts([]);
    setFormState({ displayName: "", note: "" });
  }

  async function handleSubmit() {
    if (!supabase || !canSubmit) {
      return;
    }

    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const cleanName = formState.displayName.trim();
      const cleanNote = formState.note.trim();

      const submissionResult = await supabase
        .from("party_submissions")
        .insert({
          display_name: cleanName,
          note: cleanNote.length > 0 ? cleanNote : null,
        })
        .select("id")
        .single();

      if (submissionResult.error || !submissionResult.data) {
        throw new Error(submissionResult.error?.message ?? "submit failed");
      }

      const submissionId = submissionResult.data.id;
      const customInsertPayload = customDrafts.map((draft, index) => ({
        category: "Süsch no öppis",
        title: draft.title.trim(),
        note: draft.note.trim() || null,
        unit_label: draft.unitLabel.trim(),
        target_quantity: normalizeQuantity(draft.quantity),
        sort_order: 1000 + index,
        is_custom: true,
      }));

      const customItemIds: string[] = [];

      if (customInsertPayload.length > 0) {
        const customItemsResult = await supabase
          .from("party_items")
          .insert(customInsertPayload)
          .select("id");

        if (customItemsResult.error) {
          throw new Error(customItemsResult.error.message);
        }

        customItemIds.push(...(customItemsResult.data ?? []).map((item) => item.id));
      }

      const claimPayload = [
        ...selectedCatalogItems.map((entry) => ({
          submission_id: submissionId,
          item_id: entry.itemId,
          quantity: normalizeQuantity(entry.quantity),
        })),
        ...customDrafts.map((draft, index) => ({
          submission_id: submissionId,
          item_id: customItemIds[index],
          quantity: normalizeQuantity(draft.quantity),
        })),
      ];

      if (claimPayload.length > 0) {
        const claimsResult = await supabase
          .from("party_submission_items")
          .insert(claimPayload);

        if (claimsResult.error) {
          throw new Error(claimsResult.error.message);
        }
      }

      setConfirmationState({
        line: getRandomConfirmation(),
        items: selectedSummaryLines,
      });
      resetSubmissionState();
      await loadSnapshot();
    } catch {
      setSubmissionError(PARTY_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function callAdmin(
    path: string,
    options: {
      method?: "POST" | "PATCH" | "DELETE";
      body?: Record<string, unknown>;
    } = {},
  ) {
    if (!adminSecret) {
      setSubmissionError("Admin-Secret fehlt.");
      return;
    }

    setIsAdminSaving(true);

    try {
      const response = await fetch(path, {
        method: options.method ?? "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: adminSecret,
          ...options.body,
        }),
      });

      if (!response.ok) {
        throw new Error("admin failed");
      }

      await loadSnapshot();
    } catch {
      setSubmissionError(PARTY_ERROR_MESSAGE);
    } finally {
      setIsAdminSaving(false);
    }
  }

  async function handleAdminSaveItem() {
    await callAdmin("/api/party/admin/catalog", {
      body: {
        item: {
          ...adminItemDraft,
          title: adminItemDraft.title.trim(),
          note: adminItemDraft.note?.trim() || null,
        },
      },
    });

    setAdminItemDraft({
      id: "",
      category: "Getränk",
      title: "",
      note: "",
      unitLabel: "Pack",
      targetQuantity: 1,
      sortOrder: 500,
      isCustom: false,
    });
  }

  const headerBadge = getPartyModeBadge(snapshot.mode, isBooting);

  return (
    <main className="min-h-screen bg-off-white text-brand-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-deep-pink via-off-white to-teal/40 px-5 py-8 shadow-[0_24px_80px_rgba(26,26,26,0.12)] sm:px-8 sm:py-10">
          <div
            aria-hidden="true"
            className={`absolute right-6 top-2 hidden text-6xl sm:block ${isBooting ? "party-hat-fall" : "party-hat-idle"}`}
          >
            🎩
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand-black/10 bg-brand-white/80 px-3 py-1 font-terminal text-[11px] uppercase tracking-[0.2em]">
              {headerBadge}
            </span>
            <span className="rounded-full border border-brand-black/10 bg-brand-white/70 px-3 py-1 font-terminal text-[11px] uppercase tracking-[0.2em]">
              nur Mitbringsel
            </span>
            {adminMode ? (
              <span className="rounded-full border border-sun-red/20 bg-sun-red/10 px-3 py-1 font-terminal text-[11px] uppercase tracking-[0.2em] text-sun-red">
                hinterzimmer
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 max-w-3xl font-stylish text-4xl font-semibold leading-[0.92] text-sun-red sm:text-6xl">
            {PARTY_HEADLINE}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-brand-black/80 sm:text-lg">
            {PARTY_INTRO}
          </p>
          <ul className="mt-4 space-y-2">
            {PARTY_INTRO_BULLETS.map((entry) => (
              <li
                key={entry}
                className="flex items-start gap-3 text-sm leading-6 text-brand-black/70 sm:text-base"
              >
                <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-sun-red" />
                <span>{entry}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {PARTY_META.map((entry) => (
              <div
                key={entry}
                className="rounded-[1.75rem] bg-brand-white/85 px-5 py-4 shadow-[0_12px_32px_rgba(26,26,26,0.08)] backdrop-blur"
              >
                <p className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                  {getPartyMetaLabel(entry)}
                </p>
                <p className="mt-1 text-sm font-medium sm:text-base">{entry}</p>
              </div>
            ))}
          </div>
        </div>

        {shouldShowPartySetupBanner(snapshot.mode, snapshot.errorMessage, isBooting) ? (
          <div className="rounded-3xl border border-sun-red/20 bg-sun-red/10 px-4 py-4 text-sm leading-6 text-brand-black">
            <span className="font-terminal uppercase tracking-[0.16em] text-sun-red">
              Setup
            </span>
            <p className="mt-2">{snapshot.errorMessage}</p>
          </div>
        ) : null}

        {adminMode ? (
          <section className="rounded-[2rem] border border-brand-black/10 bg-brand-white/70 p-4 shadow-sm backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="font-terminal text-xs uppercase tracking-[0.18em] text-sun-red">
                  Admin
                </p>
                <h2 className="mt-2 font-stylish text-2xl text-brand-black">
                  Hinterzimmer
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-black/70">
                  Seed starte, Katalog nachschärfe, Reservierige putze, Event schliesse.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void callAdmin("/api/party/admin/seed")}
                  className="rounded-full bg-sun-red px-4 py-2 font-terminal text-sm text-brand-white transition hover:bg-sun-red/90"
                >
                  Seed iispile
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void callAdmin("/api/party/admin/settings", {
                      method: "PATCH",
                      body: {
                        eventClosed: !isEventClosed,
                      },
                    })
                  }
                  className="rounded-full border border-brand-black/10 bg-off-white px-4 py-2 font-terminal text-sm transition hover:bg-brand-black/5"
                >
                  {isEventClosed ? "Event öffne" : "Event schliesse"}
                </button>
              </div>
            </div>

            {flaggedItems.length > 0 ? (
              <div className="mt-5 rounded-3xl border border-sun-red/20 bg-sun-red/10 p-4">
                <p className="font-terminal text-xs uppercase tracking-[0.18em] text-sun-red">
                  Achtung
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {flaggedItems.map((item) => (
                    <span
                      key={item.id}
                      className="rounded-full bg-sun-red px-3 py-1 font-terminal text-xs text-brand-white"
                    >
                      {item.title} +{item.overbookedBy}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <input
                value={adminItemDraft.title}
                onChange={(event) =>
                  setAdminItemDraft((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Titel"
                className="rounded-2xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
              />
              <select
                value={adminItemDraft.category}
                onChange={(event) =>
                  setAdminItemDraft((current) => ({
                    ...current,
                    category: event.target.value as PartyCatalogItem["category"],
                  }))
                }
                className="rounded-2xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
              >
                {["Getränk", "Snack", "Grillgut", "Beilagen", "Dessert", "Stuff", "Süsch no öppis"].map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ),
                )}
              </select>
              <input
                value={adminItemDraft.unitLabel}
                onChange={(event) =>
                  setAdminItemDraft((current) => ({
                    ...current,
                    unitLabel: event.target.value,
                  }))
                }
                placeholder="Einheit"
                className="rounded-2xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
              />
              <input
                type="number"
                min={1}
                value={adminItemDraft.targetQuantity}
                onChange={(event) =>
                  setAdminItemDraft((current) => ({
                    ...current,
                    targetQuantity: Math.max(1, Number(event.target.value) || 1),
                  }))
                }
                placeholder="Ziel"
                className="rounded-2xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
              />
              <button
                type="button"
                disabled={isAdminSaving || adminItemDraft.title.trim().length < 2}
                onClick={() => void handleAdminSaveItem()}
                className="rounded-2xl bg-teal px-4 py-3 font-terminal text-sm text-brand-white transition hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Speichere
              </button>
            </div>
            <textarea
              value={adminItemDraft.note ?? ""}
              onChange={(event) =>
                setAdminItemDraft((current) => ({
                  ...current,
                  note: event.target.value,
                }))
              }
              placeholder="Host-Notiz"
              className="mt-3 min-h-[92px] w-full rounded-3xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
            />
          </section>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([category, items]) => (
              <section
                key={category}
                className="rounded-[2rem] border border-brand-black/10 bg-brand-white/70 p-4 shadow-sm backdrop-blur sm:p-6"
              >
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <h2 className="font-stylish text-2xl text-brand-black">
                      {category}
                    </h2>
                  </div>
                  <span className="rounded-full border border-brand-black/10 px-3 py-1 font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/50">
                    {items.length} item{items.length === 1 ? "" : "s"}
                  </span>
                </div>

                {items.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-brand-black/10 px-4 py-6 text-sm text-brand-black/55">
                    No leer. Wenn öpper öppis Speziells für die Kategori hed, cha me das unte selber iiträge.
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {items.map((item) => {
                      const quantityInCart = cart[item.id] ?? 0;

                      return (
                        <article
                          key={item.id}
                          className={`rounded-3xl border px-4 py-4 transition ${
                            item.remainingQuantity === 0
                              ? "border-brand-black/10 bg-brand-black/[0.03]"
                              : "border-brand-black/10 bg-off-white"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="text-lg font-semibold leading-6 text-brand-black">
                                {item.title}
                              </h3>
                              {item.note ? (
                                <p className="mt-1 text-sm leading-6 text-brand-black/65">
                                  {item.note}
                                </p>
                              ) : null}
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-2">
                              <span
                                className={`rounded-full px-3 py-1 font-terminal text-xs uppercase tracking-[0.16em] ${
                                  item.overbookedBy > 0
                                    ? "bg-sun-red text-brand-white"
                                    : item.remainingQuantity === 0
                                      ? "bg-brand-black text-brand-white"
                                      : "bg-teal text-brand-white"
                                }`}
                              >
                                {item.overbookedBy > 0
                                  ? `+${item.overbookedBy}`
                                  : `${item.takenQuantity}/${item.targetQuantity}`}
                              </span>
                              <span className="font-terminal text-[11px] uppercase tracking-[0.16em] text-brand-black/45">
                                {item.unitLabel}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-brand-white px-3 py-1 text-xs text-brand-black/65 shadow-sm">
                              no frei: {item.remainingQuantity}
                            </span>
                            {item.claimedBy.map((claim) => (
                              <span
                                key={`${item.id}-${claim.submissionId}`}
                                className="rounded-full bg-brand-white px-3 py-1 text-xs text-brand-black/65 shadow-sm"
                              >
                                {claim.displayName}: {claim.quantity}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            <div className="inline-flex items-center gap-3 rounded-full border border-brand-black/10 bg-brand-white px-2 py-2 shadow-sm">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCart(item.id, Math.max(0, quantityInCart - 1))
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-black text-lg text-brand-white transition hover:bg-sun-red"
                              >
                                −
                              </button>
                              <span className="min-w-[3rem] text-center font-terminal text-sm">
                                {quantityInCart}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCart(item.id, quantityInCart + 1)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-sun-red text-lg text-brand-white transition hover:bg-sun-red/90"
                              >
                                +
                              </button>
                            </div>

                            {adminMode ? (
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setAdminItemDraft(item)}
                                  className="rounded-full border border-brand-black/10 px-3 py-2 font-terminal text-xs uppercase tracking-[0.12em] text-brand-black/60 transition hover:bg-brand-black/5"
                                >
                                  bearbeite
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    void callAdmin(`/api/party/admin/catalog/${item.id}`, {
                                      method: "DELETE",
                                    })
                                  }
                                  className="rounded-full border border-sun-red/15 px-3 py-2 font-terminal text-xs uppercase tracking-[0.12em] text-sun-red transition hover:bg-sun-red/10"
                                >
                                  lösch
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}

            <section className="rounded-[2rem] border border-dashed border-brand-black/15 bg-brand-white/50 p-4 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                    Eigeti Idee
                  </p>
                  <h2 className="mt-1 font-stylish text-2xl text-brand-black">
                    Ich bringe süsch no öppis
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setCustomDrafts((current) => [...current, getEmptyCustomDraft()])
                  }
                  className="rounded-full bg-teal px-4 py-2 font-terminal text-sm text-brand-white transition hover:bg-teal/90"
                >
                  + eigets Item
                </button>
              </div>

              <div className="mt-4 grid gap-4">
                {customDrafts.length === 0 ? (
                  <p className="text-sm leading-6 text-brand-black/55">
                    No nüt Eigenes drin. Perfekt, wenn dis Genie nöd i Kategori passt.
                  </p>
                ) : null}

                {customDrafts.map((draft) => (
                  <div
                    key={draft.clientId}
                    className="grid gap-3 rounded-3xl border border-brand-black/10 bg-off-white p-4 md:grid-cols-[1.4fr_0.7fr_0.5fr_auto]"
                  >
                    <input
                      value={draft.title}
                      onChange={(event) =>
                        setCustomDrafts((current) =>
                          current.map((entry) =>
                            entry.clientId === draft.clientId
                              ? { ...entry, title: event.target.value }
                              : entry,
                          ),
                        )
                      }
                      placeholder="Was bringisch?"
                      className="rounded-2xl border border-brand-black/10 bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
                    />
                    <input
                      value={draft.unitLabel}
                      onChange={(event) =>
                        setCustomDrafts((current) =>
                          current.map((entry) =>
                            entry.clientId === draft.clientId
                              ? { ...entry, unitLabel: event.target.value }
                              : entry,
                          ),
                        )
                      }
                      placeholder="Einheit"
                      className="rounded-2xl border border-brand-black/10 bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
                    />
                    <input
                      type="number"
                      min={1}
                      value={draft.quantity}
                      onChange={(event) =>
                        setCustomDrafts((current) =>
                          current.map((entry) =>
                            entry.clientId === draft.clientId
                              ? {
                                  ...entry,
                                  quantity: Math.max(1, Number(event.target.value) || 1),
                                }
                              : entry,
                          ),
                        )
                      }
                      className="rounded-2xl border border-brand-black/10 bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setCustomDrafts((current) =>
                          current.filter((entry) => entry.clientId !== draft.clientId),
                        )
                      }
                      className="rounded-2xl border border-brand-black/10 px-4 py-3 font-terminal text-xs uppercase tracking-[0.16em] text-brand-black/65 transition hover:bg-brand-black/5"
                    >
                      use
                    </button>
                    <textarea
                      value={draft.note}
                      onChange={(event) =>
                        setCustomDrafts((current) =>
                          current.map((entry) =>
                            entry.clientId === draft.clientId
                              ? { ...entry, note: event.target.value.slice(0, 120) }
                              : entry,
                          ),
                        )
                      }
                      placeholder="Optionali Notiz"
                      className="md:col-span-4 min-h-[88px] rounded-3xl border border-brand-black/10 bg-brand-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
                    />
                  </div>
                ))}
              </div>

              {similarityWarning ? (
                <div className="mt-4 rounded-2xl border border-sun-red/15 bg-sun-red/10 px-4 py-3 text-sm text-brand-black">
                  {PARTY_SIMILARITY_COPY}
                </div>
              ) : null}
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-5 lg:self-start">
            <section className="overflow-hidden rounded-[2rem] border border-brand-black/10 bg-brand-white shadow-[0_20px_60px_rgba(26,26,26,0.08)]">
              <div className="bg-brand-black px-5 py-4 text-brand-white">
                <p className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-white/70">
                  Du bringisch
                </p>
                <h2 className="mt-1 font-stylish text-2xl">Zwüschestand</h2>
              </div>

              <div className="space-y-5 p-5">
                {selectedSummaryLines.length === 0 ? (
                  <p className="text-sm leading-6 text-brand-black/55">
                    No nüt im Chörbli. Stöber ume und schnapp dr öppis.
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm leading-6 text-brand-black/75">
                    {selectedSummaryLines.map((entry) => (
                      <li key={entry} className="rounded-2xl bg-off-white px-4 py-3">
                        {entry}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="space-y-3">
                  <label className="block">
                    <span className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                      Name/Streetname
                    </span>
                    <input
                      value={formState.displayName}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          displayName: event.target.value,
                        }))
                      }
                      placeholder="z. B. DJ Mürgu"
                      className="mt-2 w-full rounded-2xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
                    />
                  </label>
                  <label className="block">
                    <span className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                      Optionali Notiz
                    </span>
                    <textarea
                      value={formState.note}
                      onChange={(event) =>
                        setFormState((current) => ({
                          ...current,
                          note: event.target.value.slice(0, 120),
                        }))
                      }
                      placeholder="i brings chli später / vegan / wott eifach öppis sege"
                      className="mt-2 min-h-[120px] w-full rounded-3xl border border-brand-black/10 bg-off-white px-4 py-3 text-sm outline-none transition focus:border-sun-red"
                    />
                  </label>
                </div>

                {isEventClosed ? (
                  <div className="rounded-2xl border border-brand-black/10 bg-brand-black px-4 py-3 text-sm text-brand-white">
                    D Party nimmt grad kei nöie Mitbringsel meh a.
                  </div>
                ) : null}

                {submissionError ? (
                  <div className="rounded-2xl border border-sun-red/15 bg-sun-red/10 px-4 py-3 text-sm text-brand-black">
                    {submissionError}
                  </div>
                ) : null}

                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => void handleSubmit()}
                  className="w-full rounded-full bg-sun-red px-5 py-4 font-terminal text-sm uppercase tracking-[0.16em] text-brand-white transition hover:bg-sun-red/90 disabled:cursor-not-allowed disabled:bg-brand-black/15"
                >
                  {isSubmitting ? PARTY_LOADING_COPY : "Mitbringsel iihüete"}
                </button>
              </div>
            </section>

            <section className="rounded-[2rem] border border-brand-black/10 bg-brand-white/70 p-5 shadow-sm backdrop-blur">
              <button
                type="button"
                onClick={() => setShowGuestAccordion((current) => !current)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <div>
                  <p className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                    Übersicht
                  </p>
                  <h2 className="mt-1 font-stylish text-2xl text-brand-black">
                    Lueg, wär was bringt
                  </h2>
                </div>
                <span className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                  {showGuestAccordion ? "zue" : "uf"}
                </span>
              </button>

              {showGuestAccordion ? (
                <div className="mt-4 space-y-3">
                  {guestEntries.length === 0 ? (
                    <p className="text-sm leading-6 text-brand-black/55">
                      No isch nüt reserviert. Dä Huet warted.
                    </p>
                  ) : (
                    guestEntries.map((entry) => (
                      <div
                        key={entry.submissionId}
                        className="rounded-3xl border border-brand-black/10 bg-off-white p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-black">
                            {entry.displayName}
                          </h3>
                          <span className="font-terminal text-[11px] uppercase tracking-[0.16em] text-brand-black/45">
                            {formatPartyDate(entry.createdAt)}
                          </span>
                        </div>
                        <ul className="mt-3 space-y-1 text-sm leading-6 text-brand-black/70">
                          {entry.items.map((item) => (
                            <li key={`${entry.submissionId}-${item.itemId}`}>
                              {item.quantity} {item.unitLabel} {item.title}
                            </li>
                          ))}
                        </ul>
                        {entry.note ? (
                          <p className="mt-2 text-sm leading-6 text-brand-black/55">
                            {entry.note}
                          </p>
                        ) : null}
                        {adminMode ? (
                          <button
                            type="button"
                            onClick={() =>
                              void callAdmin(
                                `/api/party/admin/submissions/${entry.submissionId}`,
                                {
                                  method: "DELETE",
                                },
                              )
                            }
                            className="mt-3 rounded-full border border-sun-red/15 px-3 py-2 font-terminal text-xs uppercase tracking-[0.12em] text-sun-red transition hover:bg-sun-red/10"
                          >
                            Reservierig lösche
                          </button>
                        ) : null}
                      </div>
                    ))
                  )}
                </div>
              ) : null}
            </section>

            <p className="px-2 text-sm leading-6 text-brand-black/55">
              {PARTY_FOOTER_LINE}
            </p>
          </aside>
        </section>
      </div>

      {confirmationState ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/80 px-4 backdrop-blur-sm">
          <div className="party-confirmation-in relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-off-white px-6 py-8 shadow-[0_24px_100px_rgba(0,0,0,0.35)] sm:px-8 sm:py-10">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-deep-pink via-sun-red to-teal" />
            <div className="party-hat-pop text-center text-7xl">🎩</div>
            <p className="mt-4 text-center font-terminal text-xs uppercase tracking-[0.2em] text-brand-black/45">
              bestätigung
            </p>
            <h2 className="mt-2 text-center font-stylish text-4xl text-sun-red">
              {confirmationState.line}
            </h2>
            <div className="mt-6 rounded-[2rem] bg-brand-white p-4">
              <p className="font-terminal text-xs uppercase tracking-[0.18em] text-brand-black/45">
                Das isch grad iigangen
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-brand-black/75">
                {confirmationState.items.map((entry) => (
                  <li key={entry} className="rounded-2xl bg-off-white px-4 py-3">
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setConfirmationState(null)}
              className="mt-6 w-full rounded-full bg-brand-black px-5 py-4 font-terminal text-sm uppercase tracking-[0.16em] text-brand-white transition hover:bg-brand-black/90"
            >
              No öppis iiträge
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
