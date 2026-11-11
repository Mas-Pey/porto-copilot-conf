"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu } from "lucide-react";

import { MobileDrawer } from "@/components/organisms/MobileDrawer";
import { SidebarNav } from "@/components/organisms/SidebarNav";
import { ToastViewport } from "@/components/molecules/ToastViewport";
import { useUiStore } from "@/store/useUiStore";
import { findNavItem } from "@/utils/navigation";

/**
 * Template: the responsive application shell.
 *
 * - `md+`: persistent sidebar, sticky header, scrolling content column.
 * - `<md`: hamburger in the header opens a drawer with the same navigation.
 *
 * Layout only — no data fetching and no business rules.
 */
export function AppShell({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();
  const openDrawer = useUiStore((state) => state.openDrawer);
  const current = findNavItem(pathname);

  return (
    <div className="flex min-h-full flex-1">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-ink-faint/25 bg-surface md:flex">
        <div className="flex items-center gap-2 border-b border-ink-faint/25 px-4 py-4">
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

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav />
        </div>

        <p className="border-t border-ink-faint/25 px-4 py-3 font-mono text-[10px] text-ink-faint">
          localhost:4000/api
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-ink-faint/25 bg-background/85 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={openDrawer}
              aria-label="Open navigation"
              className="rounded-lg border border-ink-faint/30 p-2 text-ink-body transition-colors hover:bg-surface-inset hover:text-ink-strong md:hidden"
            >
              <Menu aria-hidden="true" className="size-4" />
            </button>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
                Portfolio CMS
              </p>
              <h1 className="truncate font-sans text-base font-semibold text-ink-strong">
                {current?.label ?? "Dashboard"}
              </h1>
            </div>

            <span className="hidden font-mono text-[11px] text-ink-muted sm:block">
              {current?.description ?? ""}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>

      <MobileDrawer />
      <ToastViewport />
    </div>
  );
}

export default AppShell;