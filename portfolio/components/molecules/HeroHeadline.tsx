import type { IHeadlineLine } from "@/interface/portfolio";

/** Props for the hero headline molecule. */
export interface IHeroHeadlineProps {
  readonly lines: readonly IHeadlineLine[];
}

/**
 * Segmented hero headline. Segments flagged `gradient` render with the
 * violet→teal gradient clip used by the design.
 */
export function HeroHeadline({ lines }: IHeroHeadlineProps) {
  return (
    <h1 className="w-full font-sans text-[36px] leading-[44px] font-extrabold tracking-[-1.4px] text-[#dfe2f1] sm:text-[44px] sm:leading-[52px] lg:text-[56px] lg:leading-[64px] lg:tracking-[-1.68px]">
      {lines.map((line) => (
        <span key={line.id} className="block">
          {line.segments.map((segment) =>
            segment.gradient ? (
              <span
                key={segment.id}
                className="bg-gradient-to-r from-[#c0c1ff] via-[#e1e0ff] to-[#4fdbc8] bg-clip-text text-transparent"
              >
                {segment.text}
              </span>
            ) : (
              <span key={segment.id}>{segment.text}</span>
            ),
          )}
        </span>
      ))}
    </h1>
  );
}