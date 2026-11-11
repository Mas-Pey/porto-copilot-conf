import { cn } from "@/utils/cn";

export interface ITagChipProps {
  readonly label: string;
  readonly className?: string;
}

/** Compact technology badge. */
export function TagChip({ label, className }: ITagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-ink-faint/40 bg-surface-inset/70 px-2 py-0.5 font-mono text-[11px] text-ink-body",
        className,
      )}
    >
      {label}
    </span>
  );
}

export default TagChip;