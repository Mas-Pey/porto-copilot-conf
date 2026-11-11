"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/** Default staleness for CMS reads — dashboard data changes rarely. */
const STALE_TIME_MS = 30_000;

/** Garbage-collection window for unused queries. */
const GC_TIME_MS = 5 * 60_000;

export interface IQueryProviderProps {
  readonly children: ReactNode;
}

/**
 * Owns the `QueryClient`.
 *
 * The client is created inside `useState` so every browser session gets its own
 * cache and the server render never shares state between requests.
 */
export function QueryProvider({ children }: IQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIME_MS,
            gcTime: GC_TIME_MS,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;