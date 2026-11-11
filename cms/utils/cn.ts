/**
 * Tiny class-name joiner.
 *
 * Kept dependency-free on purpose: the CMS only needs conditional composition,
 * and every extra runtime dependency is bundle weight on the dashboard.
 */
export type TClassValue = string | false | null | undefined;

/** Joins truthy class fragments with a single space. */
export function cn(...values: readonly TClassValue[]): string {
  return values.filter((value): value is string => Boolean(value)).join(" ");
}