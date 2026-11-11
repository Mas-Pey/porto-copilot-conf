import type { IStatItem } from "@/interface/portfolio";
import { StatCard } from "@/components/molecules/StatCard";

/** Props for the KPI stats strip molecule. */
export interface IStatStripProps {
  readonly stats: readonly IStatItem[];
}

/** Three-up KPI strip rendered under the hero grid. */
export function StatStrip({ stats }: IStatStripProps) {
  return (
    <div className="flex w-full flex-col gap-[24px] border-t border-[rgba(70,69,84,0.3)] pt-[41px] lg:flex-row">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}