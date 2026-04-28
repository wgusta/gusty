import { describe, expect, it } from "vitest";
import {
  getPartyMetaLabel,
  getPartyModeBadge,
  isSimilarPartyTitle,
  shouldShowPartySetupBanner,
  summarizePartyData,
} from "@/party/lib/utils";
import type {
  PartyCatalogItem,
  PartySubmission,
  PartySubmissionItem,
} from "@/party/lib/types";

describe("party utils", () => {
  it("hides preview chrome while booting", () => {
    expect(getPartyModeBadge("preview", true)).toBe("lädt");
    expect(shouldShowPartySetupBanner("preview", "missing env", true)).toBe(false);
  });

  it("maps meta labels", () => {
    expect(getPartyMetaLabel("02.05.2026")).toBe("Datum");
    expect(getPartyMetaLabel("ab 20 Uhr")).toBe("Zyt");
    expect(getPartyMetaLabel("Rathausgasse 20 im 2. Stock")).toBe("Ort");
    expect(getPartyMetaLabel("Igang isch hinger Unvermeidbar")).toBe("Hinwis");
  });

  it("finds simple duplicate custom titles", () => {
    expect(isSimilarPartyTitle("bier", ["Bier", "Chips Paprika"])).toBe(true);
    expect(isSimilarPartyTitle("Guaca", ["Guacamole", "Hummus"])).toBe(true);
    expect(isSimilarPartyTitle("Cola", ["Bier", "Hummus"])).toBe(false);
  });

  it("summarizes quantities and flags overbooking", () => {
    const items: PartyCatalogItem[] = [
      {
        id: "item-1",
        category: "Getränk",
        title: "Bier",
        note: null,
        unitLabel: "Pack",
        targetQuantity: 2,
        sortOrder: 10,
        isCustom: false,
      },
      {
        id: "item-2",
        category: "Snack",
        title: "Chips",
        note: null,
        unitLabel: "Pack",
        targetQuantity: 1,
        sortOrder: 20,
        isCustom: false,
      },
    ];

    const submissions: PartySubmission[] = [
      {
        id: "sub-1",
        displayName: "DJ Mürgu",
        note: null,
        createdAt: "2026-05-01T10:00:00.000Z",
      },
      {
        id: "sub-2",
        displayName: "Huetus Maximus",
        note: null,
        createdAt: "2026-05-01T11:00:00.000Z",
      },
    ];

    const submissionItems: PartySubmissionItem[] = [
      { id: "claim-1", submissionId: "sub-1", itemId: "item-1", quantity: 2 },
      { id: "claim-2", submissionId: "sub-2", itemId: "item-1", quantity: 1 },
      { id: "claim-3", submissionId: "sub-2", itemId: "item-2", quantity: 1 },
    ];

    const summary = summarizePartyData(items, submissions, submissionItems);
    const bier = summary.itemSummaries.find((item) => item.id === "item-1");

    expect(bier?.takenQuantity).toBe(3);
    expect(bier?.remainingQuantity).toBe(0);
    expect(bier?.overbookedBy).toBe(1);
    expect(summary.flaggedItems).toHaveLength(1);
    expect(summary.guestEntries[0]?.displayName).toBe("Huetus Maximus");
  });
});
