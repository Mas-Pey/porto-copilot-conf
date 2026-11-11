import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export interface ISurfacePanelProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Raised dark surface used as the base container across the dashboard. */
export function SurfacePanel({ children, className }: ISurfacePanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink-faint/30 bg-surface-raised p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default SurfacePanel;