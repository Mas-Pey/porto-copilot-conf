import type { IPanelProps, TPanelVariant } from "@/interface/ui";

const variantClasses: Record<TPanelVariant, string> = {
  /** Frosted glass card used by most content sections. */
  glass:
    "backdrop-blur-[12px] bg-[rgba(17,24,39,0.7)] border border-[rgba(255,255,255,0.08)]",
  /** Opaque raised card used for the terminal header and stat tiles. */
  solid: "bg-[#1c1f2a] border border-[rgba(70,69,84,0.4)]",
  /** Soft, barely-there surface used inside cards. */
  inset:
    "backdrop-blur-[8px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]",
  /** Deep, darkest surface used for the contact form. */
  form: "bg-[rgba(10,14,24,0.8)] border border-[rgba(70,69,84,0.3)]",
};

/**
 * Generic surface panel. Consumers add radius, padding, and layout so the atom
 * stays reusable across the hero, about, skills, projects, and contact blocks.
 */
export function Panel({
  children,
  variant = "glass",
  className = "",
}: IPanelProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`}>{children}</div>
  );
}