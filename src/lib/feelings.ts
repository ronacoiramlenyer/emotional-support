/**
 * The feeling vocabulary. Kept deliberately small: six up front, a handful
 * more behind "More feelings", and the user's own words for everything else.
 */

export type FeelingWeight = "light" | "heavy" | "neutral";

export interface Feeling {
  id: string;
  label: string;
  /** Used to choose tone (e.g. letters from better days) — never shown as a score. */
  weight: FeelingWeight;
  /** Journal/garden dot color. */
  color: string;
}

export const PRIMARY_FEELINGS: Feeling[] = [
  { id: "calm", label: "Calm", weight: "light", color: "#8FD3C7" },
  { id: "happy", label: "Happy", weight: "light", color: "#F2D58A" },
  { id: "curious", label: "Curious", weight: "neutral", color: "#C3B4F0" },
  { id: "anxious", label: "Anxious", weight: "heavy", color: "#F0B38A" },
  { id: "sad", label: "Sad", weight: "heavy", color: "#8FB0E8" },
  { id: "overwhelmed", label: "Overwhelmed", weight: "heavy", color: "#E89AAE" },
];

/** Six more, no further. More choices would make choosing harder, not easier. */
export const MORE_FEELINGS: Feeling[] = [
  { id: "lonely", label: "Lonely", weight: "heavy", color: "#A7A3E0" },
  { id: "tired", label: "Tired", weight: "heavy", color: "#A9B8C9" },
  { id: "numb", label: "Numb", weight: "heavy", color: "#B7B7C2" },
  { id: "angry", label: "Angry", weight: "heavy", color: "#E8907F" },
  { id: "hopeful", label: "Hopeful", weight: "light", color: "#B6E0A0" },
  { id: "grateful", label: "Grateful", weight: "light", color: "#F3C1D3" },
];

export const ALL_FEELINGS: Feeling[] = [...PRIMARY_FEELINGS, ...MORE_FEELINGS];

/** A feeling written in the user's own words. */
export const OWN_WORDS_ID = "own-words";
export const OWN_WORDS_COLOR = "#9DBDE6";

export function getFeeling(id: string | null | undefined): Feeling | undefined {
  return ALL_FEELINGS.find((f) => f.id === id);
}

export function isMoreFeeling(id: string | null | undefined): boolean {
  return MORE_FEELINGS.some((f) => f.id === id);
}
