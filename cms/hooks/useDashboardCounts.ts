"use client";

import { useMessages } from "@/hooks/useMessages";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";

/** Aggregated counts for the overview cards. */
export interface IDashboardCounts {
  readonly projects: number;
  readonly skills: number;
  readonly messages: number;
  readonly isLoading: boolean;
}

/**
 * Composes the three list queries into overview counters.
 *
 * Each query stays individually cached under its own key, so navigating to a
 * module afterwards renders instantly from the same cache entry.
 */
export function useDashboardCounts(): IDashboardCounts {
  const projects = useProjects();
  const skills = useSkills();
  const messages = useMessages();

  return {
    projects: projects.data?.count ?? 0,
    skills: skills.data?.count ?? 0,
    messages: messages.data?.count ?? 0,
    isLoading:
      projects.isPending || skills.isPending || messages.isPending,
  };
}