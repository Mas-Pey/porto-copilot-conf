import type { ReactNode } from "react";

/**
 * Shared UI contracts for Atomic Design primitives.
 *
 * Kept in the Data Layer (`interface/`) so atoms and molecules never declare
 * their own ad-hoc prop shapes. Every value here is purely presentational —
 * no copy, no URLs, no business data.
 */

/** Visual tone shared by labels, dots, and chips. */
export type TTone = "neutral" | "accent" | "teal" | "sky";

/** Size scale used across primitives. */
export type TSize = "xs" | "sm" | "md";

/** Surface treatment for the panel atom. */
export type TPanelVariant = "glass" | "solid" | "inset" | "form";

/** Emphasis level for a tech/metadata chip. */
export type TChipEmphasis = "soft" | "strong";

/** Props for the small uppercase mono label atom (used for eyebrows). */
export interface IMonoLabelProps {
  readonly children: ReactNode;
  readonly tone?: TTone;
  readonly className?: string;
}

/** Props for the rounded status dot atom. */
export interface IStatusDotProps {
  readonly tone?: TTone;
  readonly size?: TSize;
  readonly withGlow?: boolean;
}

/** Props for the fixed-size SVG/icon atom. */
export interface IIconGlyphProps {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly className?: string;
}

/** Props for the dotted tech chip atom (hero strip + skill categories). */
export interface ITagChipProps {
  readonly label: string;
  readonly tone?: TTone;
  readonly emphasis?: TChipEmphasis;
  readonly className?: string;
}

/** Props for the plain bordered metadata tag atom (project tech badges). */
export interface IMetaTagProps {
  readonly label: string;
  readonly className?: string;
}

/** Props for the reusable surface panel atom. */
export interface IPanelProps {
  readonly children: ReactNode;
  readonly variant?: TPanelVariant;
  readonly className?: string;
}