import type { IFooterMeta } from "@/interface/abroad";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { StatusDot } from "@/components/atoms/StatusDot";
import { SlidePagination } from "@/components/molecules/SlidePagination";

/** Props for the slide footer organism. */
export interface ISlideFooterProps {
  readonly footer: IFooterMeta;
}

/**
 * Slide deck footer: active stage label on the left, pagination on the right.
 */
export function SlideFooter({ footer }: ISlideFooterProps) {
  return (
    <footer className="relative mx-auto flex w-full max-w-[1280px] shrink-0 flex-col items-start justify-between gap-[16px] border-t border-[rgba(70,69,84,0.2)] px-[24px] pt-[25px] pb-[24px] sm:flex-row sm:items-center">
      <div className="flex items-center gap-[12px]">
        <StatusDot tone="accent" size="md" />
        <MonoLabel className="whitespace-nowrap">{footer.statusLabel}</MonoLabel>
      </div>

      <SlidePagination footer={footer} />
    </footer>
  );
}