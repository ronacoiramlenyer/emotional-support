import { getFeeling, OWN_WORDS_ID } from "./feelings";
import type { CheckIn } from "./storage/types";

/**
 * Acknowledgment copy: reflect, never advise. No "try to", no "you should",
 * no silver linings. Taglish, the way a kind friend would say it.
 */

export interface Acknowledgment {
  /** Short headline, e.g. "Ang bigat niyan." */
  title: string;
  /** Italic accent after the title. */
  accent: string;
  /** One or two plain sentences. */
  body: string;
}

const BY_FEELING: Record<string, { title: string; accent: string; line: string }> = {
  sad: {
    title: "That sounds",
    accent: "heavy.",
    line: "Sadness usually means something mattered to you. It makes sense na nandiyan siya.",
  },
  anxious: {
    title: "That's a lot",
    accent: "to carry.",
    line: "Anxiety can make everything feel urgent at once. Hindi ka OA — your mind is trying to protect you.",
  },
  overwhelmed: {
    title: "Ang dami",
    accent: "niyan.",
    line: "When everything piles up, even small things feel big. Of course you're tired.",
  },
  lonely: {
    title: "Mabigat 'yan,",
    accent: "loneliness.",
    line: "Feeling alone doesn't mean something is wrong with you. It means you need people, like everyone does.",
  },
  tired: {
    title: "You sound",
    accent: "pagod.",
    line: "Tired in the body, or tired in the heart — both are real, and both count.",
  },
  numb: {
    title: "Sometimes it's",
    accent: "quiet inside.",
    line: "Feeling numb is still a feeling. Minsan ganyan talaga pag masyado nang marami.",
  },
  angry: {
    title: "That anger",
    accent: "is valid.",
    line: "Anger often shows up when something felt unfair. You're allowed to feel it here.",
  },
  calm: {
    title: "A calm",
    accent: "moment.",
    line: "It's good that you noticed it. Hindi lahat ng araw ganito, so this one counts.",
  },
  happy: {
    title: "Ang gaan",
    accent: "niyan.",
    line: "Thank you for pausing to notice something good. It's worth noticing.",
  },
  hopeful: {
    title: "A little",
    accent: "light.",
    line: "Hope can be small and still be real. Nice that you caught it.",
  },
  grateful: {
    title: "Something",
    accent: "to hold onto.",
    line: "Gratitude is a quiet kind of strength. Salamat for sharing it.",
  },
  curious: {
    title: "Curious",
    accent: "is good.",
    line: "Wondering about things is a kind of openness. Let's see where it goes.",
  },
};

const WROTE_SOMETHING = "Salamat for putting it into words. Hindi madali 'yan.";
const WROTE_NOTHING = "You don't have to explain it. Naming it is already enough for now.";

export function acknowledge(checkIn: Pick<CheckIn, "feelingId" | "customWord" | "note">): Acknowledgment {
  const wrote = Boolean(checkIn.note?.trim());
  const closing = wrote ? WROTE_SOMETHING : WROTE_NOTHING;

  if (checkIn.feelingId === OWN_WORDS_ID) {
    const word = checkIn.customWord?.trim() || "that";
    return {
      title: "Thank you for",
      accent: "your own words.",
      body: `“${word}” — that's yours, and it's real. ${closing}`,
    };
  }

  const known = BY_FEELING[checkIn.feelingId];
  const label = getFeeling(checkIn.feelingId)?.label ?? "That";
  if (!known) {
    return { title: `${label}.`, accent: "Noted, gently.", body: closing };
  }
  return { title: known.title, accent: known.accent, body: `${known.line} ${closing}` };
}
