import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

/** Tone of a status label. */
export type TStatusTone = "neutral" | "success" | "danger" | "accent";

export interface IStatusPillProps {
  readonly children: ReactNode;
  readonly tone?: TStatusTone;
  readonly className?: string;
}

const TONE_CLASSES: Record<TStatusTone, string> = {
  neutral: "border-ink-faint/40 bg-surface-inset/60 text-ink-muted",
  success: "border-success/40 bg-success/10 text-success",
  danger: "border-danger/40 bg-danger/10 text-danger",
  accent: "border-accent-violet/40 bg-accent-violet/10 text-accent-violet",
};

/** Small, non-interactive status label. Purely presentational. */
export function StatusPill({
  children,
  tone = "neutral",
  className,
}: IStatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide uppercase",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default StatusPill;