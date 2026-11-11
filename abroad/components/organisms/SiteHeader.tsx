import type { IBrand, IMetaPill, IStatusIndicator } from "@/interface/abroad";
import { BrandLockup } from "@/components/molecules/BrandLockup";
import { MetaPillItem } from "@/components/molecules/MetaPillItem";
import { StatusPill } from "@/components/molecules/StatusPill";

/** Props for the site header organism. */
export interface ISiteHeaderProps {
  readonly brand: IBrand;
  readonly status: IStatusIndicator;
  readonly metaPills: readonly IMetaPill[];
}

/**
 * Top bar: brand lockup on the left, live status + metadata capsules on the right.
 */
export function SiteHeader({ brand, status, metaPills }: ISiteHeaderProps) {
  return (
    <header className="relative mx-auto flex h-[80px] w-full max-w-[1280px] shrink-0 items-center justify-between px-[24px]">
      <BrandLockup brand={brand} />

      <div className="flex shrink-0 items-center gap-[12px]">
        <StatusPill status={status} />
        {metaPills.map((meta) => (
          <MetaPillItem key={meta.id} meta={meta} />
        ))}
      </div>
    </header>
  );
}