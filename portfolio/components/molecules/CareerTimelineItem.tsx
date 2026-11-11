import type { ICareerEntry } from "@/interface/portfolio";

/** Props for the career timeline item molecule. */
export interface ICareerTimelineItemProps {
  readonly entry: ICareerEntry;
  readonly isLast: boolean;
}

/**
 * One role in the career timeline. The dot colour and the hairline connector
 * are driven by `isCurrent` and `isLast`.
 */
export function CareerTimelineItem({
  entry,
  isLast,
}: ICareerTimelineItemProps) {
  return (
    <div
      className={`relative flex flex-col gap-[2px] pt-[7px] ${
        isLast ? "" : "pb-[16px]"
      }`}
    >
      <span
        aria-hidden
        className={`absolute top-[6px] left-[-21px] size-[10px] rounded-full ${
          entry.isCurrent ? "bg-[#4fdbc8]" : "bg-[#464554]"
        } shadow-[0_0_0_4px_#0f131d]`}
      />
      <span
        className={`font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap ${
          entry.isCurrent ? "text-[#4fdbc8]" : "text-[#908fa0]"
        }`}
      >
        {entry.period}
      </span>
      <h4 className="pt-px font-sans text-[14px] leading-[20px] font-medium tracking-[-0.14px] text-[#dfe2f1]">
        {entry.role}
      </h4>
      <p className="font-sans text-[13px] leading-[20px] tracking-[0.065px] text-[#908fa0]">
        {entry.description}
      </p>
    </div>
  );
}