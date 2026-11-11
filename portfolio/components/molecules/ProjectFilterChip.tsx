import type { IProjectFilter } from "@/interface/portfolio";

/** Props for the project filter chip molecule. */
export interface IProjectFilterChipProps {
  readonly filter: IProjectFilter;
  readonly isActive: boolean;
  readonly onSelect: (filterId: string) => void;
}

/**
 * One filter pill above the project grid. Selection state is controlled by the
 * consumer so filtering can later move to the server without touching the UI.
 */
export function ProjectFilterChip({
  filter,
  isActive,
  onSelect,
}: IProjectFilterChipProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(filter.id)}
      aria-pressed={isActive}
      className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full px-[16px] py-[8px] transition-colors focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none ${
        isActive
          ? "bg-[#c0c1ff]"
          : "bg-[#262a35] hover:bg-[rgba(56,60,72,0.9)]"
      }`}
    >
      <span
        className={`font-mono text-[11px] leading-[14px] tracking-[0.88px] text-center uppercase whitespace-nowrap ${
          isActive ? "font-semibold text-[#1000a9]" : "font-medium text-[#c7c4d7]"
        }`}
      >
        {filter.label}
        {filter.count !== undefined ? ` (${filter.count})` : ""}
      </span>
    </button>
  );
}