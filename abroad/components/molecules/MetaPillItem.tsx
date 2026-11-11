import type { IMetaPill } from "@/interface/abroad";
import { IconTile } from "@/components/atoms/IconTile";
import { Pill } from "@/components/atoms/Pill";

/** Props for the meta pill molecule. */
export interface IMetaPillItemProps {
  readonly meta: IMetaPill;
}

/**
 * Small metadata capsule with an icon and uppercase mono label
 * (e.g. "Q2 COHORT"). Built from the `Pill` and `IconTile` atoms.
 */
export function MetaPillItem({ meta }: IMetaPillItemProps) {
  return (
    <Pill tone="neutral" className="shrink-0 gap-[6px]">
      <IconTile src={meta.iconSrc} alt="" size="sm" />
      <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#c7c4d7]">
        {meta.label}
      </span>
    </Pill>
  );
}