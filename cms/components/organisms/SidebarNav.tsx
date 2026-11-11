"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/utils/navigation";
import { cn } from "@/utils/cn";

export interface ISidebarNavProps {
  /** Called after a destination is chosen (used by the mobile drawer). */
  readonly onNavigate?: () => void;
  readonly className?: string;
}

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Navigation list shared by the desktop sidebar and the mobile drawer. */
export function SidebarNav({ onNavigate, className }: ISidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard sections"
      className={cn("flex flex-col gap-1", className)}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-accent-violet/10 text-accent-violet"
                : "text-ink-body hover:bg-surface-inset/70 hover:text-ink-strong",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "size-4 shrink-0 transition-colors",
                active ? "text-accent-violet" : "text-ink-faint group-hover:text-ink-muted",
              )}
            />
            <span className="flex-1 truncate">{item.label}</span>
            {active ? (
              <span
                aria-hidden="true"
                className="h-4 w-0.5 rounded-full bg-accent-violet"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default SidebarNav;