import type { ITagChipProps, TTone } from "@/interface/ui";
import { StatusDot } from "@/components/atoms/StatusDot";

/**
 * Dotted technology chip used in the hero stack strip and the skill cards.
 * Purely presentational — label and tone arrive via props.
 */
export function TagChip({
  label,
  tone = "teal",
  emphasis = "soft",
  className = "",
}: ITagChipProps) {
  const surface =
    emphasis === "strong"
      ? "bg-[rgba(38,42,53,0.8)] border border-[rgba(70,69,84,0.3)] rounded-[6px] px-[13px] py-[7px]"
      : "bg-[rgba(38,42,53,0.6)] border border-[rgba(70,69,84,0.3)] rounded-[4px] px-[13px] py-[5px]";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-[6px] ${surface} ${className}`}
    >
      <StatusDot tone={tone} size="xs" />
      <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#dfe2f1]">
        {label}
      </span>
    </span>
  );
}

/** Mapping helper so consumers can pass the tone straight through. */
export type TTagChipTone = TTone;