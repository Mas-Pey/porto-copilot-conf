"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IAuthUser } from "@/interface/auth";
import { createSafeStorage } from "@/utils/storage";

/** Shape of the persisted auth slice. */
export interface IAuthState {
  readonly token: string | null;
  readonly user: IAuthUser | null;
  /** Stores the bearer token, and optionally the principal, after login. */
  readonly setToken: (token: string | null, user?: IAuthUser | null) => void;
  /** Clears the session; safe to call from a 401 interceptor. */
  readonly logout: () => void;
}

/**
 * Global auth store.
 *
 * Persisted to `localStorage` so a hard refresh keeps the operator logged in.
 * Read it outside React with `useAuthStore.getState()` (the HTTP client does).
 */
export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token, user = null) => {
        set({ token, user });
      },
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "cms-auth",
      storage: createJSONStorage(createSafeStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);

export default useAuthStore;