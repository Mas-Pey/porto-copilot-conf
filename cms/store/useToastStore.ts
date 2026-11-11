"use client";

import { create } from "zustand";

import type { TTone } from "@/interface/ui";

/** A single transient notification. */
export interface IToast {
  readonly id: string;
  readonly message: string;
  readonly tone: Exclude<TTone, "neutral">;
}

interface IToastState {
  readonly toasts: readonly IToast[];
  readonly push: (message: string, tone: IToast["tone"]) => void;
  readonly dismiss: (id: string) => void;
}

/** How long a toast stays on screen. */
const TOAST_TTL_MS = 4000;

let toastSequence = 0;

/**
 * Toast store.
 *
 * Kept in Zustand rather than React Query so any layer — including mutation
 * callbacks that live outside a component — can raise feedback.
 */
export const useToastStore = create<IToastState>()((set, get) => ({
  toasts: [],
  push: (message, tone) => {
    toastSequence += 1;
    const id = `toast-${toastSequence}`;

    set((state) => ({
      toasts: [...state.toasts, { id, message, tone }],
    }));

    window.setTimeout(() => {
      get().dismiss(id);
    }, TOAST_TTL_MS);
  },
  dismiss: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

/** Convenience helpers so callers do not repeat the tone strings. */
export const toast = {
  success: (message: string): void => {
    useToastStore.getState().push(message, "success");
  },
  danger: (message: string): void => {
    useToastStore.getState().push(message, "danger");
  },
  accent: (message: string): void => {
    useToastStore.getState().push(message, "accent");
  },
};