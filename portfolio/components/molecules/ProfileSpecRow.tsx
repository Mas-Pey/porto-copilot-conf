import type { IProfileSpec } from "@/interface/portfolio";
import { StatusDot } from "@/components/atoms/StatusDot";

/** Props for the profile spec row molecule. */
export interface IProfileSpecRowProps {
  readonly spec: IProfileSpec;
}

/**
 * Label/value row inside the profile card's "quick snapshot" list.
 * `highlight` switches the value to teal with a leading dot; `divider` draws
 * the hairline beneath the row.
 */
export function ProfileSpecRow({ spec }: IProfileSpecRowProps) {
  const borderClass = spec.divider
    ? "border-b border-[rgba(70,69,84,0.2)] pb-[7px]"
    : "";

  return (
    <div
      className={`flex items-center justify-between gap-[12px] pt-[6px] ${borderClass}`}
    >
      <span className="font-sans text-[13px] leading-[20px] tracking-[0.065px] whitespace-nowrap text-[#908fa0]">
        {spec.label}
      </span>
      {spec.highlight ? (
        <span className="flex items-center gap-[6px]">
          <StatusDot tone="teal" size="xs" />
          <span className="font-sans text-[13px] leading-[20px] font-medium tracking-[0.065px] text-[#4fdbc8]">
            {spec.value}
          </span>
        </span>
      ) : (
        <span className="text-right font-sans text-[13px] leading-[20px] font-medium tracking-[0.065px] text-[#dfe2f1]">
          {spec.value}
        </span>
      )}
    </div>
  );
}