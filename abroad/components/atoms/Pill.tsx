import type { IPillProps, TTone } from "@/interface/ui";

const toneClasses: Record<TTone, string> = {
  neutral:
    "bg-[rgba(38,42,53,0.5)] border border-[rgba(255,255,255,0.05)]",
  accent:
    "bg-[rgba(38,42,53,0.6)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[12px]",
  teal: "bg-[rgba(23,27,38,0.7)] border border-[rgba(255,255,255,0.08)] backdrop-blur-[12px]",
};

/**
 * Rounded capsule container used for badges, status chips, and metadata.
 * Layout-agnostic; consumers control the inner content via children.
 */
export function Pill({
  children,
  tone = "neutral",
  interactive = false,
  className = "",
}: IPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-[8px] rounded-full px-[13px] py-[7px] ${toneClasses[tone]} ${
        interactive ? "cursor-pointer transition-colors hover:bg-[rgba(56,60,72,0.6)]" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}