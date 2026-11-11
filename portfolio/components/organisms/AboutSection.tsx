import Image from "next/image";
import type { IAboutSection } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";
import { ActionLinkButton } from "@/components/molecules/ActionLinkButton";
import { CareerTimelineItem } from "@/components/molecules/CareerTimelineItem";
import { PillarCard } from "@/components/molecules/PillarCard";
import { ProfileSpecRow } from "@/components/molecules/ProfileSpecRow";
import { SectionHeading } from "@/components/molecules/SectionHeading";

/** Props for the about section organism. */
export interface IAboutSectionProps {
  readonly about: IAboutSection;
}

/**
 * About section: profile card (avatar, name, quick specs, CV link), bio prose,
 * three core pillars, and the career timeline snapshot.
 */
export function AboutSection({ about }: IAboutSectionProps) {
  const { profile, timeline } = about;

  return (
    <section
      id="tentang"
      className="flex w-full flex-col gap-[48px] border-t border-[rgba(70,69,84,0.2)] pt-[64px] pb-[96px] lg:pt-[97px]"
    >
      <SectionHeading
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.subtitle}
        className="max-w-[768px]"
      />

      <div className="grid w-full grid-cols-1 gap-[48px] lg:grid-cols-12">
        {/* Profile card */}
        <Panel
          variant="glass"
          className="flex flex-col gap-[24px] self-start overflow-hidden rounded-[16px] p-[24px] lg:col-span-5 lg:p-[33px]"
        >
          <div className="relative w-full overflow-hidden rounded-[12px] border border-[rgba(70,69,84,0.4)] bg-[#262a35]">
            <div className="relative aspect-square w-full">
              <Image
                src={profile.avatarSrc}
                alt={profile.avatarAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-[rgba(10,14,24,0)] to-[rgba(10,14,24,0)] opacity-80"
            />
            <div className="absolute right-[16px] bottom-[16px] left-[16px] flex flex-col items-start">
              <span className="font-sans text-[18px] leading-[26px] font-bold tracking-[-0.2px] text-[#dfe2f1] sm:text-[20px] sm:leading-[28px]">
                {profile.name}
              </span>
              <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] text-[#4fdbc8]">
                {profile.role}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[12px] pt-[8px]">
            {profile.specs.map((spec) => (
              <ProfileSpecRow key={spec.id} spec={spec} />
            ))}
          </div>

          <ActionLinkButton action={profile.cta} fullWidth />
        </Panel>

        {/* Bio prose + pillars + timeline */}
        <div className="flex flex-col gap-[32px] lg:col-span-7">
          <div className="flex flex-col gap-[16px]">
            {about.bio.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 32) + index}
                className="font-sans text-[15px] leading-[24.38px] text-[#c7c4d7]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-[16px] pt-[8px] sm:flex-row">
            {about.pillars.map((pillar) => (
              <PillarCard key={pillar.id} pillar={pillar} />
            ))}
          </div>

          <Panel
            variant="glass"
            className="flex w-full flex-col gap-[16px] rounded-[12px] p-[25px]"
          >
            <h3 className="flex items-center gap-[8px] font-sans text-[18px] leading-[28px] font-semibold tracking-[-0.2px] text-[#dfe2f1]">
              <IconGlyph src={timeline.iconSrc} alt="" width={16} height={13} />
              {timeline.title}
            </h3>
            <div className="border-l border-[rgba(70,69,84,0.3)] pl-[17px]">
              {timeline.items.map((entry, index) => (
                <CareerTimelineItem
                  key={entry.id}
                  entry={entry}
                  isLast={index === timeline.items.length - 1}
                />
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}