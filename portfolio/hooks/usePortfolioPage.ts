"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getMockPortfolioPage,
  loadPortfolioPage,
} from "@/services/portfolioService";
import type { IPortfolioPage, IProject } from "@/interface/portfolio";

/** Shape returned by `usePortfolioPage`. */
export interface IUsePortfolioPageResult {
  /** Page payload. Always populated — mock data until the CMS answers. */
  readonly data: IPortfolioPage;
  /** `true` once live backend data has replaced the mock baseline. */
  readonly isLive: boolean;
  /** `true` while the initial backend request is in flight. */
  readonly isLoading: boolean;
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
 * Seeds synchronously from the bundled mock so the first paint has real
 * content, then swaps in Backend CMS data once `loadPortfolioPage()` resolves.
 * If the backend is unreachable the mock simply stays, so the page never
 * blocks on the network.
 *
 * Migrating to React Query later is a body-only change — every consumer only
 * touches `data`, `isLive`, `isLoading`, `activeFilterId`,
 * `setActiveFilterId`, and `visibleProjects`.
 */
export function usePortfolioPage(): IUsePortfolioPageResult {
  const [data, setData] = useState<IPortfolioPage>(() => getMockPortfolioPage());
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void loadPortfolioPage()
      .then((result) => {
        if (cancelled) {
          return;
        }

        setData(result.data);
        setIsLive(result.isLive);
      })
      .catch(() => {
        // `loadPortfolioPage` already degrades per-request; this guard only
        // covers an unexpected programmer error. Mock data keeps rendering.
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filterId = activeFilterId ?? data.projects.allFilterId;

  const visibleProjects = useMemo<readonly IProject[]>(() => {
    if (filterId === data.projects.allFilterId) {
      return data.projects.projects;
    }

    return data.projects.projects.filter((project) =>
      project.tags.includes(filterId),
    );
  }, [filterId, data.projects.allFilterId, data.projects.projects]);

  return {
    data,
    isLive,
    isLoading,
    activeFilterId: filterId,
    setActiveFilterId,
    visibleProjects,
  };
}

/**
 * Returns the site header payload.
 *
 * Split out so the header organism can be rendered and cached independently of
 * the page body once the CMS lands.
 */
export function useSiteHeader() {
  const { data } = usePortfolioPage();
  return { data: data.header };
}