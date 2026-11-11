"use client";

import { useEffect } from "react";
import { LayoutDashboard, X } from "lucide-react";

import { SidebarNav } from "@/components/organisms/SidebarNav";
import { useUiStore } from "@/store/useUiStore";

/**
 * Mobile navigation drawer.
 *
 * Rendered as a fixed overlay below `md`; on desktop the sidebar in `AppShell`
 * takes over. Escape and backdrop clicks close it, and navigating closes it.
 */
export function MobileDrawer() {
  const isOpen = useUiStore((state) => state.isDrawerOpen);
  const closeDrawer = useUiStore((state) => state.closeDrawer);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeDrawer]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="relative flex h-full w-72 max-w-[85vw] flex-col border-r border-ink-faint/30 bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-ink-faint/25 px-4 py-4">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg border border-accent-violet/40 bg-accent-violet/10 text-accent-violet"
            >
              <LayoutDashboard className="size-4" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-sans text-sm font-semibold text-ink-strong">
                Portfolio CMS
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
                Content
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close navigation"
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-inset hover:text-ink-strong"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav onNavigate={closeDrawer} />
        </div>

        <p className="border-t border-ink-faint/25 px-4 py-3 font-mono text-[10px] text-ink-faint">
          localhost:4000/api
        </p>
      </aside>
    </div>
  );
}

export default MobileDrawer;