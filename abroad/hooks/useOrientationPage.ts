import { getOrientationPage } from "@/services/abroadService";
import type { IOrientationPage } from "@/interface/abroad";

/** Shape returned by `useOrientationPage`. */
export interface IUseOrientationPageResult {
  readonly data: IOrientationPage;
}

/**
 * Supplies the orientation slide data to the Presentation Layer.
 *
 * Currently returns mock data synchronously from `services/abroadService`.
 * To migrate to a Backend CMS, replace the body with:
 *
 * ```ts
 * const { data, isLoading, error } = useQuery({
 *   queryKey: ["orientation-page"],
 *   queryFn: fetchOrientationPage,
 * });
 * ```
 *
 * No component in `app/` or `components/` needs to change — they only consume
 * `data` from this hook.
 */
export function useOrientationPage(): IUseOrientationPageResult {
  // Static mock read while there is no network call to await.
  const data = getOrientationPage();

  return { data };
}