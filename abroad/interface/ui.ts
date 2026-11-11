import type { ReactNode } from "react";

/**
 * Shared UI contracts for Atomic Design primitives.
 *
 * Kept in the Data Layer (`interface/`) per project rules so atoms and
 * molecules never declare their own ad-hoc prop shapes.
 */

/** Common size scale used across primitives. */
export type TSize = "sm" | "md";

/** Visual tone for capsules, tiles, and status indicators. */
export type TTone = "neutral" | "accent" | "teal";

/** Props for the pulsing status dot atom. */
export interface IStatusDotProps {
  readonly tone?: TTone;
  readonly size?: TSize;
  readonly withGlow?: boolean;
}

/** Props for the rounded icon tile atom. */
export interface IIconTileProps {
  readonly src: string;
  readonly alt: string;
  readonly size?: TSize;
}

/** Props for the capsule/pill container atom. */
export interface IPillProps {
  readonly children: ReactNode;
  readonly tone?: TTone;
  readonly interactive?: boolean;
  readonly className?: string;
}

/** Props for the small uppercase mono label atom. */
export interface IMonoLabelProps {
  readonly children: ReactNode;
  readonly tone?: TTone;
  readonly className?: string;
}