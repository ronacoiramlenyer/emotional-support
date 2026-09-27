import { needsSupport, phraseDetector } from "@/lib/safety/detector";

describe("phraseDetector", () => {
  it.each([
    "I want to die",
    "honestly i just wanna die",
    "I've been thinking about suicide",
    "I don't want to be alive anymore",
    "everyone would be better off without me",
    "I keep hurting myself",
    "gusto ko nang mamatay",
    "Ayoko nang mabuhay",
    "pagod na ako mabuhay",
    "sana mawala na lang ako",
    "wala nang saysay ang buhay ko",
    "sinasaktan niya ako",
    "Gusto ko nang MAMATAY",
  ])("flags %j", (text) => {
    expect(phraseDetector.assess(text).level).toBe("concern");
  });

  it.each([
    "",
    "I'm sad today",
    "work is killing me lol",
    "pagod na ako sa trabaho",
    "I miss my lola",
    "overwhelmed with deadlines",
  ])("does not flag %j", (text) => {
    expect(phraseDetector.assess(text).level).toBe("none");
  });

  it("needsSupport checks every text given", () => {
    expect(needsSupport(undefined, "okay lang")).toBe(false);
    expect(needsSupport("okay lang", "I want to end my life")).toBe(true);
  });
});
