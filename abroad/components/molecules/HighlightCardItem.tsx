import type { IHighlightCard } from "@/interface/abroad";
import { IconTile } from "@/components/atoms/IconTile";
import { MonoLabel } from "@/components/atoms/MonoLabel";

/** Props for the highlight card molecule. */
export interface IHighlightCardItemProps {
  readonly card: IHighlightCard;
}

/**
 * Bento card presenting one orientation highlight: icon, ordinal category
 * tag, title, and a few lines of supporting copy.
 *
 * `justify-between` pins the icon row to the top and the text block to the
 * bottom. Equal heights come from the parent row's `items-stretch` — do NOT
 * add `h-full` here: `height: 100%` against an auto-height flex container
 * resolves to `auto` and defeats the stretch.
 */
export function HighlightCardItem({ card }: IHighlightCardItemProps) {
  return (
    <article className="flex min-w-px flex-1 flex-col items-start justify-between gap-[21px] rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(23,27,38,0.7)] p-[25px] backdrop-blur-[12px]">
      <div className="flex w-full items-center justify-between pb-[16px]">
        <IconTile src={card.iconSrc} alt="" />
        <span className="inline-flex items-center rounded-[4px] border border-[rgba(255,255,255,0.05)] bg-[#1c1f2a] px-[9px] py-[3px]">
          <MonoLabel>
            {card.index} / {card.category}
          </MonoLabel>
        </span>
      </div>

      <div className="flex w-full flex-col gap-[7px]">
        <h3 className="font-sans text-[20px] leading-[28px] font-semibold tracking-[-0.2px] text-[#dfe2f1]">
          {card.title}
        </h3>
        <p className="font-sans text-[13px] leading-[21.13px] tracking-[0.065px] text-[#c7c4d7]">
          {card.descriptionLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}