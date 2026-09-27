import type { AppStorage, CheckIn, CheckInRepo, NewCheckIn } from "./types";

const PREFIX = "tanglaw:v1:";

/** Minimal key-value surface so tests (and private browsing) can swap it. */
export interface KeyValue {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key(index: number): string | null;
  readonly length: number;
}

export function memoryKeyValue(): KeyValue {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
    key: (i) => Array.from(map.keys())[i] ?? null,
    get length() {
      return map.size;
    },
  };
}

/** localStorage when it works; memory otherwise (private mode, blocked storage, SSR). */
export function browserKeyValue(): KeyValue {
  try {
    const ls = window.localStorage;
    const probe = PREFIX + "probe";
    ls.setItem(probe, "1");
    ls.removeItem(probe);
    return ls;
  } catch {
    return memoryKeyValue();
  }
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function readJson<T>(kv: KeyValue, key: string, fallback: T): T {
  try {
    const raw = kv.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(kv: KeyValue, key: string, value: unknown): void {
  try {
    kv.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or blocked storage: the app keeps working for this session.
  }
}

function localCheckIns(kv: KeyValue): CheckInRepo {
  const key = PREFIX + "checkins";
  const all = () => readJson<CheckIn[]>(kv, key, []);
  const save = (items: CheckIn[]) => writeJson(kv, key, items);

  return {
    async create(input: NewCheckIn) {
      const item: CheckIn = { ...input, id: newId(), createdAt: new Date().toISOString() };
      save([item, ...all()]);
      return item;
    },
    async get(id) {
      return all().find((c) => c.id === id) ?? null;
    },
    async update(id, patch) {
      let updated: CheckIn | null = null;
      save(
        all().map((c) => {
          if (c.id !== id) return c;
          updated = { ...c, ...patch };
          return updated;
        }),
      );
      return updated;
    },
    async list() {
      return all();
    },
    async remove(id) {
      save(all().filter((c) => c.id !== id));
    },
  };
}

export function createLocalStorage(kv: KeyValue): AppStorage {
  return {
    checkIns: localCheckIns(kv),
    async clearAll() {
      const keys: string[] = [];
      for (let i = 0; i < kv.length; i++) {
        const k = kv.key(i);
        if (k?.startsWith(PREFIX)) keys.push(k);
      }
      keys.forEach((k) => kv.removeItem(k));
    },
  };
}
