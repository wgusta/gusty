export const PARTY_CATEGORIES = [
  "Getränk",
  "Snack",
  "Grillgut",
  "Beilagen",
  "Dessert",
  "Stuff",
  "Süsch no öppis",
] as const;

export type PartyCategory = (typeof PARTY_CATEGORIES)[number];

export type PartyCatalogItem = {
  id: string;
  category: PartyCategory;
  title: string;
  note: string | null;
  unitLabel: string;
  targetQuantity: number;
  sortOrder: number;
  isCustom: boolean;
  createdAt?: string;
};

export type PartySubmission = {
  id: string;
  displayName: string;
  note: string | null;
  createdAt: string;
};

export type PartySubmissionItem = {
  id: string;
  submissionId: string;
  itemId: string;
  quantity: number;
};

export type PartySettings = {
  eventClosed: boolean;
};

export type PartyGuestEntry = {
  submissionId: string;
  displayName: string;
  note: string | null;
  createdAt: string;
  items: Array<{
    itemId: string;
    title: string;
    quantity: number;
    unitLabel: string;
    isCustom: boolean;
  }>;
};

export type PartyCatalogSummary = PartyCatalogItem & {
  takenQuantity: number;
  remainingQuantity: number;
  overbookedBy: number;
  claimedBy: Array<{
    submissionId: string;
    displayName: string;
    quantity: number;
  }>;
};

export type PartySnapshot = {
  mode: "live" | "preview";
  items: PartyCatalogItem[];
  submissions: PartySubmission[];
  submissionItems: PartySubmissionItem[];
  settings: PartySettings;
  errorMessage: string | null;
};

export type PartyCartItem = {
  itemId: string;
  quantity: number;
};

export type PartyCustomDraft = {
  clientId: string;
  title: string;
  unitLabel: string;
  quantity: number;
  note: string;
};
