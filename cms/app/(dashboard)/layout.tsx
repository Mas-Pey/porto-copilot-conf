import { AppShell } from "@/components/templates/AppShell";

/**
 * Route group layout for every dashboard page.
 *
 * Keeping the shell here (instead of the root layout) means the chrome is
 * mounted once and `next/link` navigation only swaps the content column.
 */
export default function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}