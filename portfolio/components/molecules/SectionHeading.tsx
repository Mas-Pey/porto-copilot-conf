import type { ReactNode } from "react";
import type { TTone } from "@/interface/ui";
import { MonoLabel } from "@/components/atoms/MonoLabel";

/** Props for the section heading molecule. */
export interface ISectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: ReactNode;
  readonly eyebrowTone?: TTone;
  readonly className?: string;
}

/**
 * Eyebrow + H2 + supporting paragraph used at the top of every section.
 * Content arrives as props; only presentation lives here.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  eyebrowTone = "accent",
  className = "",
}: ISectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-[6px] pt-[6px] ${className}`}>
      <MonoLabel tone={eyebrowTone} className="text-[12px] tracking-[0.6px]">
        {eyebrow}
      </MonoLabel>
      <h2 className="font-sans text-[28px] leading-[36px] font-bold tracking-[-0.9px] text-[#dfe2f1] sm:text-[32px] sm:leading-[40px] lg:text-[36px] lg:leading-[44px]">
        {title}
      </h2>
      <div className="pt-[2px] font-sans text-[16px] leading-[26px] tracking-[-0.09px] text-[#c7c4d7] sm:text-[18px] sm:leading-[28px]">
        {description}
      </div>
    </div>
  );
}