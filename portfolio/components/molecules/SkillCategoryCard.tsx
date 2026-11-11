import type { ISkillCategory } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";
import { TagChip } from "@/components/atoms/TagChip";

/** Props for the skill category card molecule. */
export interface ISkillCategoryCardProps {
  readonly category: ISkillCategory;
  readonly footnoteIconSrc: string;
}

/**
 * One skill category card (Frontend, Backend & DB, UI/UX, Tools & DevOps).
 * The card stretches to the tallest sibling so the footnote rules line up.
 */
export function SkillCategoryCard({
  category,
  footnoteIconSrc,
}: ISkillCategoryCardProps) {
  return (
    <Panel
      variant="glass"
      className="flex flex-1 basis-0 flex-col justify-between gap-[36px] rounded-[16px] p-[25px]"
    >
      <div className="flex flex-col gap-[16px]">
        <span className="flex size-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#1c1f2a]">
          <IconGlyph
            src={category.iconSrc}
            alt=""
            width={category.iconWidth}
            height={category.iconHeight}
          />
        </span>

        <div className="flex flex-col gap-[4px]">
          <h3 className="font-sans text-[20px] leading-[28px] font-bold tracking-[-0.2px] text-[#dfe2f1]">
            {category.title}
          </h3>
          <p className="font-sans text-[13px] leading-[20px] tracking-[0.065px] text-[#908fa0]">
            {category.description}
          </p>
        </div>

        <div className="flex flex-wrap content-start gap-[6px] gap-y-[8px]">
          {category.skills.map((skill) => (
            <TagChip
              key={skill.id}
              label={skill.label}
              tone={skill.tone}
              emphasis="strong"
            />
          ))}
        </div>
      </div>

      <div className="border-t border-[rgba(70,69,84,0.2)] pt-[17px]">
        <span className="flex items-center gap-[4px]">
          <IconGlyph src={footnoteIconSrc} alt="" width={15} height={14} />
          <span className="font-mono text-[12px] leading-[16px] whitespace-nowrap text-[#908fa0]">
            {category.footnote}
          </span>
        </span>
      </div>
    </Panel>
  );
}