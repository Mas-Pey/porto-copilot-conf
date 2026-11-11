import type { IMonoLabelProps, TTone } from "@/interface/ui";

const toneClasses: Record<TTone, string> = {
  neutral: "text-[#908fa0]",
  accent: "text-[#c0c1ff]",
  teal: "text-[#4fdbc8]",
};

/**
 * Small uppercase monospaced label used for metadata and badges.
 * Presentational only — text arrives via children.
 */
export function MonoLabel({
  children,
  tone = "neutral",
  className = "",
}: IMonoLabelProps) {
  return (
    <span
      className={`font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] uppercase ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}