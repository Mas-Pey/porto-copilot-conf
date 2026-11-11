import type { IMetaTagProps } from "@/interface/ui";

/**
 * Plain bordered tag used for a project's tech stack badges.
 * Unlike `TagChip` it has no status dot.
 */
export function MetaTag({ label, className = "" }: IMetaTagProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-[4px] border border-[rgba(70,69,84,0.3)] bg-[#1c1f2a] px-[11px] py-[5px] ${className}`}
    >
      <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#dfe2f1]">
        {label}
      </span>
    </span>
  );
}