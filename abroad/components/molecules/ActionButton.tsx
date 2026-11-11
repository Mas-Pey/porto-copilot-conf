import Image from "next/image";
import type { IActionLink } from "@/interface/abroad";

/** Props for the action button molecule. */
export interface IActionButtonProps {
  readonly action: IActionLink;
}

/**
 * Single CTA rendered as a link. Visual variant is driven by
 * `action.variant` so the presentation layer never branches on raw URLs.
 */
export function ActionButton({ action }: IActionButtonProps) {
  const isPrimary = action.variant === "primary";

  if (isPrimary) {
    return (
      <a
        href={action.href}
        className="inline-flex items-center justify-center gap-[12px] rounded-[12px] bg-[#8083ff] px-[32px] py-[16px] shadow-[0px_10px_25px_-5px_rgba(128,131,255,0.3)] transition-colors hover:bg-[#9093ff] focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f131d] focus-visible:outline-none"
      >
        <span className="font-sans text-[15px] leading-[22.5px] font-semibold whitespace-nowrap text-[#0d0096]">
          {action.label}
        </span>
        {action.iconSrc ? (
          <span className="relative block size-[12px]">
            <Image
              src={action.iconSrc}
              alt=""
              fill
              sizes="12px"
              unoptimized
              className="object-contain"
            />
          </span>
        ) : null}
      </a>
    );
  }

  return (
    <a
      href={action.href}
      className="inline-flex items-center justify-center gap-[10px] rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-[rgba(38,42,53,0.5)] px-[25px] py-[17px] transition-colors hover:bg-[rgba(48,52,63,0.6)] focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f131d] focus-visible:outline-none"
    >
      {action.iconSrc ? (
        <span className="relative block h-[14.25px] w-[13.5px]">
          <Image
            src={action.iconSrc}
            alt=""
            fill
            sizes="14px"
            unoptimized
            className="object-contain"
          />
        </span>
      ) : null}
      <span className="font-sans text-[15px] leading-[22.5px] font-medium whitespace-nowrap text-[#dfe2f1]">
        {action.label}
      </span>
    </a>
  );
}