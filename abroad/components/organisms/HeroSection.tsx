import type {
  IActionLink,
  IHeroContent,
  IHighlightCard,
} from "@/interface/abroad";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Pill } from "@/components/atoms/Pill";
import { StatusDot } from "@/components/atoms/StatusDot";
import { ActionButton } from "@/components/molecules/ActionButton";
import { HighlightCardItem } from "@/components/molecules/HighlightCardItem";

/** Props for the hero section organism. */
export interface IHeroSectionProps {
  readonly hero: IHeroContent;
  readonly highlights: readonly IHighlightCard[];
  readonly actions: readonly IActionLink[];
}

/**
 * Main slide canvas: batch badge, gradient headline, subheadline,
 * 3-up highlight cards, and the action cluster.
 */
export function HeroSection({ hero, highlights, actions }: IHeroSectionProps) {
  return (
    <section className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-[24px] py-[93.68px] sm:px-[48px] lg:px-[192px]">
      <div className="flex w-full max-w-[896px] flex-col items-center">
        {/* Batch badge */}
        <Pill
          tone="accent"
          className="shrink-0 gap-[10px] px-[17px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          <StatusDot tone="teal" size="sm" withGlow />
          <MonoLabel
            tone="teal"
            className="text-center tracking-[1.2px] uppercase"
          >
            <span className="text-[12px] leading-[16px]">{hero.badge}</span>
          </MonoLabel>
        </Pill>

        {/* Headline block — centered across the full column width */}
        <div className="flex w-full flex-col items-center pt-[32px]">
          <div className="flex w-full flex-col items-center gap-[12px]">
            <h1 className="w-full text-center font-sans text-[40px] leading-[52px] font-extrabold tracking-[-1.4px] text-[#dfe2f1] sm:text-[56px] sm:leading-[70px]">
              <span className="block">{hero.titlePrimary}</span>
              <span className="block bg-gradient-to-r from-[#c0c1ff] via-[#8083ff] to-[#4fdbc8] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>

            <p className="mx-auto w-full max-w-[672px] pt-[8px] text-center font-sans text-[16px] leading-[26px] tracking-[-0.09px] text-[#c7c4d7] sm:text-[18px] sm:leading-[29.25px]">
              {hero.descriptionLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Highlight cards — stretch mode gives all three equal height */}
        <div className="flex w-full flex-col items-stretch gap-[24px] pt-[56px] md:flex-row">
          {highlights.map((card) => (
            <HighlightCardItem key={card.id} card={card} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-stretch gap-[16px] pt-[48px] sm:flex-row sm:items-center">
          {actions.map((action) => (
            <ActionButton key={action.id} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
}