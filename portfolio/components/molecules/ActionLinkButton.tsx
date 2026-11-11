import type { IActionLink } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";

/** Props for the CTA link molecule. */
export interface IActionLinkButtonProps {
  readonly action: IActionLink;
  readonly className?: string;
  readonly fullWidth?: boolean;
}

/**
 * Single call-to-action rendered as an anchor. The visual variant and size are
 * driven by the data payload so the presentation layer never branches on URLs.
 */
export function ActionLinkButton({
  action,
  className = "",
  fullWidth = false,
}: IActionLinkButtonProps) {
  const isPrimary = action.variant === "primary";
  const isSmall = action.size === "sm";

  const base =
    "inline-flex items-center justify-center gap-[8px] rounded-[8px] transition-all focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f131d] focus-visible:outline-none";

  const sizeClasses = isSmall
    ? "px-[16px] py-[8px]"
    : "px-[24px] py-[14px]";

  const variantClasses = isPrimary
    ? "bg-[#c0c1ff] text-[#1000a9] shadow-[0px_0px_20px_-3px_rgba(99,102,241,0.5)] hover:bg-[#d0d1ff]"
    : "border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] text-[#dfe2f1] backdrop-blur-[8px] hover:bg-[rgba(255,255,255,0.06)]";

  const labelClasses = isPrimary
    ? "font-semibold"
    : "font-medium";

  const iconSize = isSmall ? 12 : 12;

  return (
    <a
      href={action.href}
      download={action.download ? "" : undefined}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      className={`${base} ${sizeClasses} ${variantClasses} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <span
        className={`font-mono text-[11px] leading-[14px] tracking-[0.6px] uppercase whitespace-nowrap ${labelClasses}`}
      >
        {action.label}
      </span>
      {action.iconSrc ? (
        <IconGlyph
          src={action.iconSrc}
          alt=""
          width={iconSize}
          height={iconSize}
        />
      ) : null}
    </a>
  );
}