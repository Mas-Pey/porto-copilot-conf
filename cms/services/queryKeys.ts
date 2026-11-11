/**
 * Central TanStack Query key registry.
 *
 * Keys live in one place so a mutation can invalidate exactly what it touched
 * without string literals drifting between hooks.
 */
export const queryKeys = {
  profile: ["profile"] as const,
  projects: ["projects"] as const,
  project: (id: number) => ["projects", id] as const,
  skills: ["skills"] as const,
  messages: ["messages"] as const,
} as const;