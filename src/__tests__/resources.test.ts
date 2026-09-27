import { CRISIS_LINES, SAFETY_LINES } from "@/lib/safety/resources";

describe("crisis resources", () => {
  const all = [...CRISIS_LINES, ...SAFETY_LINES];

  it("includes both NGO and government 24/7 lines", () => {
    const allDay = CRISIS_LINES.filter((l) => l.hours === "24/7");
    expect(allDay.some((l) => l.operator === "ngo")).toBe(true);
    expect(allDay.some((l) => l.operator === "government")).toBe(true);
  });

  it("has dialable numbers and unique ids", () => {
    expect(new Set(all.map((l) => l.id)).size).toBe(all.length);
    for (const line of all) {
      expect(line.numbers.length).toBeGreaterThan(0);
      for (const n of line.numbers) expect(n.tel).toMatch(/^\+?\d{3,13}$/);
    }
  });
});
