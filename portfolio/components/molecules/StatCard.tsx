import type { IStatItem } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";

/** Props for the KPI stat card molecule. */
export interface IStatCardProps {
  readonly stat: IStatItem;
}

/** Single KPI tile used in the strip below the hero. */
export function StatCard({ stat }: IStatCardProps) {
  return (
    <Panel
      variant="inset"
      className="flex flex-1 items-center gap-[16px] rounded-[12px] p-[25px]"
    >
      <span className="flex size-[48px] shrink-0 items-center justify-center rounded-[8px] bg-[#1c1f2a]">
        <IconGlyph
          src={stat.iconSrc}
          alt=""
          width={stat.iconWidth}
          height={stat.iconHeight}
        />
      </span>
      <span className="flex min-w-0 flex-col items-start">
        <span className="font-sans text-[26px] leading-[34px] font-bold tracking-[-0.9px] whitespace-nowrap text-[#dfe2f1] sm:text-[32px] sm:leading-[40px] lg:text-[36px] lg:leading-[44px]">
          {stat.value}
        </span>
        <span className="font-sans text-[13px] leading-[20px] tracking-[0.065px] text-[#c7c4d7]">
          {stat.label}
        </span>
      </span>
    </Panel>
  );
}