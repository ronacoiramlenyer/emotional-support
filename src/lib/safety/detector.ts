/**
 * First-pass safety detection for anything a user types.
 *
 * This is a conservative keyword/phrase matcher (English, Filipino, Taglish).
 * It errs toward showing support: a false positive costs a gentle message,
 * a false negative could cost much more. Milestone 5 hardens this and wires
 * it into every text input; the interface stays the same so a model-based
 * detector can replace it.
 */

export type SafetyLevel = "none" | "concern";

export interface SafetyAssessment {
  level: SafetyLevel;
}

export interface SafetyDetector {
  assess(text: string): SafetyAssessment;
}

const PATTERNS: RegExp[] = [
  // English — self-harm / suicide
  /\bsuicid(e|al)\b/,
  /\bkill(ing)? my ?self\b/,
  /\bend (it all|my life|everything)\b/,
  /\btake my (own )?life\b/,
  /\b(want|wanna|going) to die\b/,
  /\bwanna die\b/,
  /\bdon'?t want to (live|be alive|wake up)\b/,
  /\bno (reason|point) (to|in) (live|living)\b/,
  /\bbetter off (dead|without me)\b/,
  /\bself[- ]?harm\b/,
  /\b(hurt|cut|harm)(ing)? my ?self\b/,
  /\boverdose\b/,
  /\bdisappear forever\b/,
  // Filipino / Taglish — self-harm / suicide
  /\bmagpakamatay\b/,
  /\bpakamatay\b/,
  /\bmamatay na (lang )?(ako)?\b/,
  /\bgusto ko( na)?ng mamatay\b/,
  /\bayoko( na)?ng mabuhay\b/,
  /\bayoko na mabuhay\b/,
  /\bpagod na (ako )?(na )?mabuhay\b/,
  /\bsana (hindi|di) na (lang )?ako (nabuhay|ipinanganak|pinanganak)\b/,
  /\bsana mawala na (lang )?ako\b/,
  /\bwala( nang|ng) (saysay|silbi|kwenta) (ang )?buhay ko\b/,
  /\bsaktan (ang )?sarili( ko)?\b/,
  /\bsinasaktan ko (ang )?sarili( ko)?\b/,
  /\bpatayin (ang )?sarili( ko)?\b/,
  /\btapusin (ko )?na (lang )?(ang )?(lahat|buhay ko)\b/,
  // Danger from others
  /\b(someone|he|she|they) (is |are )?(hurting|hitting|beating) me\b/,
  /\bnot safe at home\b/,
  /\b(sinasaktan|binubugbog|sinasampal) (niya |nila )?ako\b/,
  /\bhindi ako ligtas\b/,
];

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export const phraseDetector: SafetyDetector = {
  assess(text) {
    const t = normalize(text);
    if (!t) return { level: "none" };
    return { level: PATTERNS.some((p) => p.test(t)) ? "concern" : "none" };
  },
};

export function needsSupport(...texts: (string | undefined)[]): boolean {
  return texts.some((t) => t && phraseDetector.assess(t).level === "concern");
}
