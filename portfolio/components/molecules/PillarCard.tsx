import type { IPillar } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";

/** Props for the core pillar card molecule. */
export interface IPillarCardProps {
  readonly pillar: IPillar;
}

/** One "core pillar" card in the About section (Clean Code, User-Centric…). */
export function PillarCard({ pillar }: IPillarCardProps) {
  return (
    <Panel
      variant="inset"
      className="flex flex-1 basis-0 flex-col gap-[4px] rounded-[12px] border-[rgba(70,69,84,0.2)] px-[21px] pt-[21px] pb-[41px]"
    >
      <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#1c1f2a]">
        <IconGlyph
          src={pillar.iconSrc}
          alt=""
          width={pillar.iconWidth}
          height={pillar.iconHeight}
        />
      </span>
      <h3 className="pt-[8px] font-sans text-[18px] leading-[28px] font-semibold tracking-[-0.2px] text-[#dfe2f1]">
        {pillar.title}
      </h3>
      <p className="font-sans text-[13px] leading-[20px] tracking-[0.065px] text-[#908fa0]">
        {pillar.description}
      </p>
    </Panel>
  );
}