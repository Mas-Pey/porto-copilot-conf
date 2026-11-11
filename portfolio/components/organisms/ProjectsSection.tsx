import type { IProjectFilter, IProject } from "@/interface/portfolio";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ProjectFilterChip } from "@/components/molecules/ProjectFilterChip";

/** Props for the projects section organism. */
export interface IProjectsSectionProps {
  readonly eyebrow: string;
  readonly eyebrowTone: "neutral" | "accent" | "teal" | "sky";
  readonly title: string;
  readonly subtitle: string;
  readonly filters: readonly IProjectFilter[];
  readonly activeFilterId: string;
  readonly onSelectFilter: (filterId: string) => void;
  readonly projects: readonly IProject[];
}

/**
 * Featured projects section: heading + filter pills, then a two-column bento
 * grid of project cards. Filtering state is owned by the caller.
 */
export function ProjectsSection({
  eyebrow,
  eyebrowTone,
  title,
  subtitle,
  filters,
  activeFilterId,
  onSelectFilter,
  projects,
}: IProjectsSectionProps) {
  return (
    <section
      id="proyek"
      className="flex w-full flex-col gap-[48px] border-t border-[rgba(70,69,84,0.2)] pt-[64px] pb-[96px] lg:pt-[97px]"
    >
      <div className="flex flex-col items-start justify-between gap-[24px] lg:flex-row lg:items-end">
        <div className="flex max-w-[672px] flex-col gap-[6px] pt-[6px]">
          <MonoLabel tone={eyebrowTone} className="text-[12px] tracking-[0.6px]">
            {eyebrow}
          </MonoLabel>
          <h2 className="font-sans text-[28px] leading-[36px] font-bold tracking-[-0.9px] text-[#dfe2f1] sm:text-[32px] sm:leading-[40px] lg:text-[36px] lg:leading-[44px]">
            {title}
          </h2>
          <p className="pt-[2px] font-sans text-[16px] leading-[26px] tracking-[-0.09px] text-[#c7c4d7] sm:text-[18px] sm:leading-[28px]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[8px]">
          {filters.map((filter) => (
            <ProjectFilterChip
              key={filter.id}
              filter={filter}
              isActive={filter.id === activeFilterId}
              onSelect={onSelectFilter}
            />
          ))}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-[24px] lg:grid-cols-2 lg:gap-[32px]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}