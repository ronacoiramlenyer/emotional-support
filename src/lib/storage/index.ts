import { browserKeyValue, createLocalStorage } from "./local";
import type { AppStorage } from "./types";

export type * from "./types";

let instance: AppStorage | null = null;

/**
 * The single entry point for data access. Swap the implementation here
 * (e.g. an API-backed AppStorage) when a backend exists.
 */
export function getStorage(): AppStorage {
  if (!instance) instance = createLocalStorage(browserKeyValue());
  return instance;
}

/** Test hook. */
export function setStorage(storage: AppStorage | null): void {
  instance = storage;
}
