import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export interface IPageHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description: string;
  readonly actions?: ReactNode;
  readonly className?: string;
}

/** Consistent page title block with an optional action cluster. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: IPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        {eyebrow !== undefined ? (
          <p className="font-mono text-[11px] tracking-[0.18em] text-ink-faint uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-sans text-xl font-semibold text-ink-strong sm:text-2xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-ink-muted">{description}</p>
      </div>
      {actions !== undefined ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export default PageHeader;