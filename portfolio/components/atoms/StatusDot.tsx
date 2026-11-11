import type { IStatusDotProps, TTone } from "@/interface/ui";

const toneClasses: Record<TTone, string> = {
  neutral: "bg-[#908fa0]",
  accent: "bg-[#c0c1ff]",
  teal: "bg-[#4fdbc8]",
  sky: "bg-[#7bd0ff]",
};

const sizeClasses: Record<"xs" | "sm" | "md", string> = {
  xs: "size-[6px]",
  sm: "size-[8px]",
  md: "size-[10px]",
};

/** Small solid dot used for availability and status indicators. */
export function StatusDot({
  tone = "teal",
  size = "sm",
  withGlow = false,
}: IStatusDotProps) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex shrink-0 items-center justify-center ${sizeClasses[size]}`}
    >
      {withGlow ? (
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full opacity-75 ${toneClasses[tone]}`}
        />
      ) : null}
      <span
        className={`relative rounded-full ${toneClasses[tone]} ${
          sizeClasses[size]
        } ${
          withGlow && tone === "teal"
            ? "shadow-[0px_0px_8px_0px_#4fdbc8]"
            : ""
        }`}
      />
    </span>
  );
}