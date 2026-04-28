import { PARTY_CATEGORIES } from "@/party/lib/types";
import type {
  PartyCatalogItem,
  PartyCatalogSummary,
  PartyCategory,
  PartyCustomDraft,
  PartyGuestEntry,
  PartySettings,
  PartySubmission,
  PartySubmissionItem,
} from "@/party/lib/types";

export function normalizePartyText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function isSimilarPartyTitle(candidate: string, titles: string[]) {
  const normalizedCandidate = normalizePartyText(candidate);
  if (!normalizedCandidate) {
    return false;
  }

  return titles.some((title) => {
    const normalizedTitle = normalizePartyText(title);
    return (
      normalizedTitle === normalizedCandidate ||
      normalizedTitle.includes(normalizedCandidate) ||
      normalizedCandidate.includes(normalizedTitle)
    );
  });
}

export function summarizePartyData(
  items: PartyCatalogItem[],
  submissions: PartySubmission[],
  submissionItems: PartySubmissionItem[],
) {
  const submissionMap = new Map(submissions.map((entry) => [entry.id, entry]));
  const byItemId = new Map<string, PartySubmissionItem[]>();

  for (const claim of submissionItems) {
    const claims = byItemId.get(claim.itemId) ?? [];
    claims.push(claim);
    byItemId.set(claim.itemId, claims);
  }

  const itemSummaries: PartyCatalogSummary[] = items
    .map((item) => {
      const claims = byItemId.get(item.id) ?? [];
      const takenQuantity = claims.reduce((sum, claim) => sum + claim.quantity, 0);
      const remainingQuantity = Math.max(0, item.targetQuantity - takenQuantity);
      const overbookedBy = Math.max(0, takenQuantity - item.targetQuantity);

      return {
        ...item,
        takenQuantity,
        remainingQuantity,
        overbookedBy,
        claimedBy: claims
          .map((claim) => {
            const submission = submissionMap.get(claim.submissionId);
            if (!submission) {
              return null;
            }

            return {
              submissionId: claim.submissionId,
              displayName: submission.displayName,
              quantity: claim.quantity,
            };
          })
          .filter((value): value is NonNullable<typeof value> => Boolean(value)),
      };
    })
    .sort((left, right) => {
      const leftCategoryIndex = PARTY_CATEGORIES.indexOf(left.category);
      const rightCategoryIndex = PARTY_CATEGORIES.indexOf(right.category);
      if (leftCategoryIndex !== rightCategoryIndex) {
        return leftCategoryIndex - rightCategoryIndex;
      }

      const leftAvailable = left.remainingQuantity > 0 ? 0 : 1;
      const rightAvailable = right.remainingQuantity > 0 ? 0 : 1;
      if (leftAvailable !== rightAvailable) {
        return leftAvailable - rightAvailable;
      }

      if (left.sortOrder !== right.sortOrder) {
        return left.sortOrder - right.sortOrder;
      }

      return left.title.localeCompare(right.title, "de-CH");
    });

  const itemMap = new Map(items.map((item) => [item.id, item]));

  const guestEntries: PartyGuestEntry[] = submissions
    .map((submission) => ({
      submissionId: submission.id,
      displayName: submission.displayName,
      note: submission.note,
      createdAt: submission.createdAt,
      items: submissionItems
        .filter((entry) => entry.submissionId === submission.id)
        .map((entry) => {
          const item = itemMap.get(entry.itemId);
          if (!item) {
            return null;
          }

          return {
            itemId: item.id,
            title: item.title,
            quantity: entry.quantity,
            unitLabel: item.unitLabel,
            isCustom: item.isCustom,
          };
        })
        .filter((value): value is NonNullable<typeof value> => Boolean(value)),
    }))
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    );

  const groupedItems = PARTY_CATEGORIES.reduce<
    Record<PartyCategory, PartyCatalogSummary[]>
  >((accumulator, category) => {
    accumulator[category] = itemSummaries.filter((item) => item.category === category);
    return accumulator;
  }, {} as Record<PartyCategory, PartyCatalogSummary[]>);

  return {
    groupedItems,
    itemSummaries,
    guestEntries,
    flaggedItems: itemSummaries.filter((item) => item.overbookedBy > 0),
  };
}

export function getPartySettingsFallback(settings: PartySettings | null | undefined) {
  return {
    eventClosed: settings?.eventClosed ?? false,
  };
}

export function getEmptyCustomDraft(): PartyCustomDraft {
  return {
    clientId: crypto.randomUUID(),
    title: "",
    unitLabel: "Pack",
    quantity: 1,
    note: "",
  };
}

export function formatPartyDate(value: string) {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function getPartyMetaLabel(value: string) {
  if (value.includes("2026")) {
    return "Datum";
  }

  if (value.includes("20 Uhr")) {
    return "Zyt";
  }

  if (value.includes("Rathaus")) {
    return "Ort";
  }

  return "Hinwis";
}

export function getPartyModeBadge(mode: "live" | "preview", isBooting: boolean) {
  return isBooting ? "lädt" : mode;
}

export function shouldShowPartySetupBanner(
  mode: "live" | "preview",
  errorMessage: string | null,
  isBooting: boolean,
) {
  return !isBooting && mode === "preview" && Boolean(errorMessage);
}
