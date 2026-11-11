import type { IFooterMeta } from "@/interface/abroad";
import Image from "next/image";

/** Props for the slide pagination molecule. */
export interface ISlidePaginationProps {
  readonly footer: IFooterMeta;
}

/**
 * Slide index capsule with previous/next controls.
 * Controls are inert placeholders in this static slice.
 */
export function SlidePagination({ footer }: ISlidePaginationProps) {
  return (
    <div className="flex shrink-0 items-center gap-[16px]">
      <span className="inline-flex shrink-0 items-center gap-[8px] rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[#171b26] px-[13px] py-[7px]">
        <span className="font-mono text-[12px] leading-[16px] font-semibold tracking-[0.72px] whitespace-nowrap text-[#c0c1ff]">
          {footer.slideLabel} {footer.slideIndex}
        </span>
        <span className="font-mono text-[12px] leading-[16px] font-medium tracking-[0.72px] text-[#908fa0]">
          /
        </span>
        <span className="font-mono text-[12px] leading-[16px] font-medium tracking-[0.72px] text-[#464554]">
          {footer.totalSlides}
        </span>
      </span>

      <div className="flex shrink-0 items-center gap-[4px]">
        <button
          type="button"
          aria-label="Previous slide"
          className="flex size-[32px] items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.05)] bg-[rgba(23,27,38,0.4)] transition-colors hover:bg-[rgba(40,44,56,0.6)]"
        >
          <span className="relative block h-[8px] w-[4.93px]">
            <Image
              src="/icons/chevron-left.svg"
              alt=""
              fill
              sizes="5px"
              unoptimized
              className="object-contain"
            />
          </span>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="flex size-[32px] items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.05)] bg-[rgba(23,27,38,0.4)] transition-colors hover:bg-[rgba(40,44,56,0.6)]"
        >
          <span className="relative block h-[8px] w-[4.93px]">
            <Image
              src="/icons/chevron-right.svg"
              alt=""
              fill
              sizes="5px"
              unoptimized
              className="object-contain"
            />
          </span>
        </button>
      </div>
    </div>
  );
}