import type { IStatusDotProps, TTone } from "@/interface/ui";

const toneClasses: Record<TTone, string> = {
  neutral: "bg-[#908fa0]",
  accent: "bg-[#c0c1ff]",
  teal: "bg-[#4fdbc8]",
};

/**
 * Small solid dot used for live/ready indicators.
 * Purely presentational — no data fetching, no internal content.
 */
export function StatusDot({
  tone = "teal",
  size = "sm",
  withGlow = false,
}: IStatusDotProps) {
  const sizeClass = size === "sm" ? "size-[6px]" : "size-[8px]";

  return (
    <span className="relative inline-flex shrink-0 items-center justify-center">
      {withGlow ? (
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full opacity-75 blur-[0px] ${toneClasses[tone]} ${sizeClass}`}
        />
      ) : null}
      <span
        className={`relative rounded-full ${toneClasses[tone]} ${sizeClass} ${
          withGlow ? "shadow-[0px_0px_8px_0px_rgba(79,219,200,0.8)]" : ""
        }`}
      />
    </span>
  );
}