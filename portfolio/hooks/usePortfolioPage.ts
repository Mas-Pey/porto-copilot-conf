"use client";

import { useMemo, useState } from "react";
import { getPortfolioPage } from "@/services/portfolioService";
import type { IPortfolioPage, IProject } from "@/interface/portfolio";

/** Shape returned by `usePortfolioPage`. */
export interface IUsePortfolioPageResult {
  readonly data: IPortfolioPage;
  /** Id of the currently selected project filter chip. */
  readonly activeFilterId: string;
  /** Selects a project filter chip. */
  readonly setActiveFilterId: (filterId: string) => void;
  /** Projects matching the active filter. */
  readonly visibleProjects: readonly IProject[];
}

/**
 * Supplies the portfolio landing page data to the Presentation Layer.
 *
 * Currently returns mock data synchronously from `services/portfolioService`.
 * To migrate to a Backend CMS, replace the body with:
 *
 * ```ts
 * const { data, isLoading, error } = useQuery({
 *   queryKey: ["portfolio-page"],
 *   queryFn: fetchPortfolioPage,
 * });
 * ```
 *
 * No component in `app/` or `components/` needs to change — they only consume
 * `data`, `activeFilterId`, `setActiveFilterId`, and `visibleProjects`.
 */
export function usePortfolioPage(): IUsePortfolioPageResult {
  const data = getPortfolioPage();
  const [activeFilterId, setActiveFilterId] = useState<string>(
    data.projects.allFilterId,
  );

  const visibleProjects = useMemo<readonly IProject[]>(() => {
    if (activeFilterId === data.projects.allFilterId) {
      return data.projects.projects;
    }

    return data.projects.projects.filter((project) =>
      project.tags.includes(activeFilterId),
    );
  }, [activeFilterId, data.projects.allFilterId, data.projects.projects]);

  return { data, activeFilterId, setActiveFilterId, visibleProjects };
}

/**
 * Returns the site header payload.
 *
 * Split out so the header organism can be rendered and cached independently of
 * the page body once the CMS lands.
 */
export function useSiteHeader() {
  const data = getPortfolioPage();
  return { data: data.header };
}