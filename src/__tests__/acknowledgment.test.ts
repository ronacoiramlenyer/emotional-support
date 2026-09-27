import { acknowledge } from "@/lib/acknowledgment";
import { ALL_FEELINGS, OWN_WORDS_ID } from "@/lib/feelings";

const ADVICE = /\b(you should|try to|just|don't worry|cheer up|look on the bright side)\b/i;

describe("acknowledge", () => {
  it.each(ALL_FEELINGS.map((f) => f.id))("has non-advice copy for %s", (feelingId) => {
    const ack = acknowledge({ feelingId });
    expect(ack.title.length).toBeGreaterThan(0);
    expect(`${ack.title} ${ack.accent} ${ack.body}`).not.toMatch(ADVICE);
  });

  it("thanks the user when they wrote something", () => {
    expect(acknowledge({ feelingId: "sad", note: "miss ko na siya" }).body).toMatch(/putting it into words/);
    expect(acknowledge({ feelingId: "sad", note: "   " }).body).toMatch(/don't have to explain/);
  });

  it("reflects the user's own word", () => {
    const ack = acknowledge({ feelingId: OWN_WORDS_ID, customWord: "lutang" });
    expect(ack.body).toContain("“lutang”");
  });
});
