"use client";

import { create } from "zustand";

interface IUiShellState {
  /** Whether the mobile navigation drawer is open. */
  readonly isDrawerOpen: boolean;
  readonly openDrawer: () => void;
  readonly closeDrawer: () => void;
  readonly toggleDrawer: () => void;
}

/**
 * Shell UI state.
 *
 * The drawer lives in a store rather than page-local state because the
 * hamburger (header) and the drawer (portal) are siblings, and navigation must
 * be able to close it programmatically.
 */
export const useUiStore = create<IUiShellState>()((set) => ({
  isDrawerOpen: false,
  openDrawer: () => {
    set({ isDrawerOpen: true });
  },
  closeDrawer: () => {
    set({ isDrawerOpen: false });
  },
  toggleDrawer: () => {
    set((state) => ({ isDrawerOpen: !state.isDrawerOpen }));
  },
}));