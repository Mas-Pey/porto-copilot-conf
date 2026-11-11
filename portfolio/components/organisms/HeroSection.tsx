import type { IHeroSection } from "@/interface/portfolio";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { StatusDot } from "@/components/atoms/StatusDot";
import { TagChip } from "@/components/atoms/TagChip";
import { ActionLinkButton } from "@/components/molecules/ActionLinkButton";
import { HeroHeadline } from "@/components/molecules/HeroHeadline";
import { StatStrip } from "@/components/molecules/StatStrip";
import { TerminalPreviewCard } from "@/components/molecules/TerminalPreviewCard";

/** Props for the hero section organism. */
export interface IHeroSectionProps {
  readonly hero: IHeroSection;
}

/**
 * Hero section: availability badge, gradient headline, subtext, CTA pair, tech
 * stack strip, interactive terminal preview, and the KPI strip.
 */
export function HeroSection({ hero }: IHeroSectionProps) {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-heading"
      className="flex w-full flex-col gap-[64px] py-[56px] lg:py-[96px]"
    >
      <div className="grid w-full grid-cols-1 items-center gap-[48px] lg:grid-cols-12">
        {/* Copy & narrative */}
        <div className="flex flex-col items-start gap-[24px] lg:col-span-7">
          <span className="inline-flex items-center gap-[10px] rounded-full border border-[rgba(70,69,84,0.3)] bg-[#262a35] px-[13px] py-[7px]">
            <StatusDot tone="teal" size="sm" withGlow />
            <MonoLabel className="text-[11px] text-[#dfe2f1]">
              {hero.availabilityLabel}
            </MonoLabel>
          </span>

          <div id="hero-heading">
            <HeroHeadline lines={hero.headline} />
          </div>

          <p className="max-w-[672px] font-sans text-[16px] leading-[26px] tracking-[-0.09px] text-[#c7c4d7] sm:text-[18px] sm:leading-[29.25px]">
            {hero.descriptionLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <div className="flex w-full flex-wrap items-center gap-[16px] pt-[8px]">
            {hero.actions.map((action) => (
              <ActionLinkButton key={action.id} action={action} />
            ))}
          </div>

          <div className="flex w-full flex-wrap items-center gap-[10px] border-t border-[rgba(70,69,84,0.2)] pt-[25px]">
            <MonoLabel className="pr-[8px] text-[11px] text-[#908fa0]">
              {hero.techStackLabel}
            </MonoLabel>
            {hero.techStack.map((tech) => (
              <TagChip key={tech.id} label={tech.label} tone={tech.tone} />
            ))}
          </div>
        </div>

        {/* Terminal preview */}
        <div className="lg:col-span-5">
          <TerminalPreviewCard terminal={hero.terminal} />
        </div>
      </div>

      <StatStrip stats={hero.stats} />
    </section>
  );
}