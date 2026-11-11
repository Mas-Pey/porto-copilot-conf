import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export interface IEmptyStateProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly description: string;
  readonly action?: ReactNode;
  readonly className?: string;
}

/** Centered placeholder shown when a collection has no items. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: IEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink-faint/30 bg-surface-raised/50 px-6 py-14 text-center",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-full border border-ink-faint/30 bg-surface-inset/60 text-ink-muted"
      >
        {icon}
      </span>
      <h3 className="font-sans text-base font-semibold text-ink-strong">
        {title}
      </h3>
      <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
        {description}
      </p>
      {action !== undefined ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}

export default EmptyState;