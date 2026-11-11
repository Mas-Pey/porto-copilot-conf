import type { StateStorage } from "zustand/middleware";

/**
 * `localStorage` wrapper that never touches the global on the server.
 *
 * Zustand's `persist` reads storage while the client component is prerendered
 * on the server, where `localStorage` does not exist. The no-op fallback keeps
 * the module importable in that pass and hydration rehydrates from the real
 * storage in the browser.
 */
const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export function createSafeStorage(): StateStorage {
  if (typeof window === "undefined") {
    return noopStorage;
  }

  return window.localStorage;
}