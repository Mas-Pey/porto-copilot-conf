import type { ReactNode } from "react";

/** Props for the ambient background glow layers. */
export interface IAmbientBackdropProps {
  /** Optional extra classes for relative positioning tweaks. */
  readonly className?: string;
}

/**
 * Decorative atmospheric backdrop: a fine grid overlay plus two coloured
 * blurred orbs. Purely visual and marked `aria-hidden`.
 */
export function AmbientBackdrop({ className = "" }: IAmbientBackdropProps): ReactNode {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* Fine grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.03) 2.5%, rgba(255,255,255,0) 2.5%), linear-gradient(180deg, rgba(255,255,255,0.03) 2.5%, rgba(255,255,255,0) 2.5%)",
        }}
      />
      {/* Indigo orb, top centre */}
      <div className="absolute top-[-160px] left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-[9999px] bg-[rgba(128,131,255,0.15)] blur-[140px]" />
      {/* Teal orb, bottom right */}
      <div className="absolute right-[40px] bottom-[-160px] h-[350px] w-[500px] rounded-[9999px] bg-[rgba(4,180,162,0.1)] blur-[130px]" />
    </div>
  );
}