/**
 * Storage contracts. Screens talk only to these interfaces, never to
 * localStorage directly, so a real backend can replace the local
 * implementation without touching UI code. Everything is async for that reason.
 */

export interface CheckIn {
  id: string;
  createdAt: string; // ISO timestamp
  /** A feeling id from lib/feelings, or OWN_WORDS_ID. */
  feelingId: string;
  /** Present when feelingId === OWN_WORDS_ID. */
  customWord?: string;
  note?: string;
  /** Set when the safety detector found signs of risk in the user's text. */
  needsSupport?: boolean;
  /** What the user said would help, once chosen. */
  need?: Need;
}

export type Need = "heard" | "body" | "close";

export type NewCheckIn = Omit<CheckIn, "id" | "createdAt">;

export interface CheckInRepo {
  create(input: NewCheckIn): Promise<CheckIn>;
  get(id: string): Promise<CheckIn | null>;
  update(id: string, patch: Partial<NewCheckIn>): Promise<CheckIn | null>;
  list(): Promise<CheckIn[]>;
  remove(id: string): Promise<void>;
}

export interface AppStorage {
  checkIns: CheckInRepo;
  /** Deletes everything this app has stored about the user. */
  clearAll(): Promise<void>;
}
