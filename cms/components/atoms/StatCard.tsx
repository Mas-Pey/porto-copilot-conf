import type { ReactNode } from "react";

import type { TTone } from "@/interface/ui";
import { cn } from "@/utils/cn";

export interface IStatCardProps {
  readonly label: string;
  readonly value: number | string;
  readonly icon: ReactNode;
  readonly hint?: string;
  readonly tone?: TTone;
  readonly isLoading?: boolean;
}

const TONE_RING: Record<TTone, string> = {
  neutral: "text-ink-body",
  accent: "text-accent-violet",
  success: "text-success",
  danger: "text-danger",
};

/** Overview summary tile. Presentational only. */
export function StatCard({
  label,
  value,
  icon,
  hint,
  tone = "accent",
  isLoading = false,
}: IStatCardProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-ink-faint/25 bg-surface-raised p-5">
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-faint uppercase">
          {label}
        </p>
        {isLoading ? (
          <div className="mt-1 h-8 w-16 animate-pulse rounded-md bg-surface-inset/70" />
        ) : (
          <p className="font-sans text-3xl leading-none font-semibold text-ink-strong tabular-nums">
            {value}
          </p>
        )}
        {hint !== undefined ? (
          <p className="pt-1 text-xs text-ink-muted">{hint}</p>
        ) : null}
      </div>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl border border-ink-faint/30 bg-surface-inset/60",
          TONE_RING[tone],
        )}
      >
        {icon}
      </span>
    </div>
  );
}

export default StatCard;