import {
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Sparkles,
  UserRound,
} from "lucide-react";

import type { INavItem } from "@/interface/ui";

/** Primary navigation, in display order. Shared by sidebar and drawer. */
export const NAV_ITEMS: readonly INavItem[] = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
    description: "Traffic-light summary of the whole site",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
    description: "Create, edit, and retire portfolio projects",
  },
  {
    label: "Skills",
    href: "/skills",
    icon: Sparkles,
    description: "Badge library grouped by category",
  },
  {
    label: "Messages",
    href: "/messages",
    icon: Inbox,
    description: "Inbound contact-form submissions",
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
    description: "Headline, bio, and hero stats",
  },
];

/** Resolves the nav entry that owns a pathname. */
export function findNavItem(pathname: string): INavItem | undefined {
  if (pathname === "/") {
    return NAV_ITEMS[0];
  }

  return NAV_ITEMS.find(
    (item) => item.href !== "/" && pathname.startsWith(item.href),
  );
}