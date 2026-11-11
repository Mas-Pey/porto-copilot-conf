import type { ISkillsSection } from "@/interface/portfolio";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SkillCategoryCard } from "@/components/molecules/SkillCategoryCard";

/** Props for the skills section organism. */
export interface ISkillsSectionProps {
  readonly skills: ISkillsSection;
}

/**
 * Skills section: eyebrow + heading, then a 4-up grid of category cards.
 * Cards stretch to equal height so the footnote hairlines align.
 */
export function SkillsSection({ skills }: ISkillsSectionProps) {
  return (
    <section
      id="keahlian"
      className="flex w-full flex-col gap-[48px] border-t border-[rgba(70,69,84,0.2)] pt-[64px] pb-[96px] lg:pt-[97px]"
    >
      <SectionHeading
        eyebrow={skills.eyebrow}
        eyebrowTone={skills.eyebrowTone}
        title={skills.title}
        description={skills.subtitle}
        className="max-w-[768px]"
      />

      <div className="grid w-full grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
        {skills.categories.map((category) => (
          <SkillCategoryCard
            key={category.id}
            category={category}
            footnoteIconSrc={skills.footnoteIconSrc}
          />
        ))}
      </div>
    </section>
  );
}