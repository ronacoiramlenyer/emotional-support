import { createLocalStorage, memoryKeyValue } from "@/lib/storage/local";

describe("local storage", () => {
  it("creates, reads, updates, lists and removes check-ins", async () => {
    const s = createLocalStorage(memoryKeyValue());
    const a = await s.checkIns.create({ feelingId: "sad", note: "hi" });
    const b = await s.checkIns.create({ feelingId: "calm" });
    expect(await s.checkIns.get(a.id)).toMatchObject({ feelingId: "sad", note: "hi" });
    expect((await s.checkIns.list()).map((c) => c.id)).toEqual([b.id, a.id]);

    await s.checkIns.update(a.id, { need: "heard" });
    expect((await s.checkIns.get(a.id))?.need).toBe("heard");

    await s.checkIns.remove(b.id);
    expect(await s.checkIns.list()).toHaveLength(1);
  });

  it("clearAll removes only Tanglaw keys", async () => {
    const kv = memoryKeyValue();
    kv.setItem("other-app", "keep");
    const s = createLocalStorage(kv);
    await s.checkIns.create({ feelingId: "sad" });
    await s.clearAll();
    expect(await s.checkIns.list()).toEqual([]);
    expect(kv.getItem("other-app")).toBe("keep");
  });

  it("survives corrupted data", async () => {
    const kv = memoryKeyValue();
    kv.setItem("tanglaw:v1:checkins", "{not json");
    expect(await createLocalStorage(kv).checkIns.list()).toEqual([]);
  });
});
