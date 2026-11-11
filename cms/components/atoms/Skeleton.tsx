import { cn } from "@/utils/cn";

export interface ISkeletonBlockProps {
  readonly className?: string;
}

/** Shimmer-free placeholder block used while data is in flight. */
export function SkeletonBlock({ className }: ISkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-surface-inset/70", className)}
    />
  );
}

export interface ISkeletonListProps {
  readonly count?: number;
  readonly className?: string;
}

/** Column of stacked skeleton rows for list/table loading states. */
export function SkeletonList({ count = 3, className }: ISkeletonListProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`skeleton-row-${index}`}
          className="rounded-2xl border border-ink-faint/20 bg-surface-raised p-5"
        >
          <SkeletonBlock className="mb-3 h-4 w-1/3" />
          <SkeletonBlock className="mb-2 h-3 w-2/3" />
          <SkeletonBlock className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

/** Card-grid shaped skeleton for thumbnail grids. */
export function SkeletonGrid({ count = 4 }: { readonly count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`skeleton-card-${index}`}
          className="overflow-hidden rounded-2xl border border-ink-faint/20 bg-surface-raised"
        >
          <SkeletonBlock className="h-36 w-full rounded-none" />
          <div className="flex flex-col gap-3 p-4">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonBlock;