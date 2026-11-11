import type { LucideIcon } from "lucide-react";

/** A single destination in the dashboard navigation. */
export interface INavItem {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
  /** Optional short description shown in the mobile drawer. */
  readonly description?: string;
}

/** Visual tone shared by buttons, pills, and toasts. */
export type TTone = "neutral" | "accent" | "success" | "danger";