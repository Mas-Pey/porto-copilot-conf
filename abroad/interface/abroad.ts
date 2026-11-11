/**
 * Data contracts for the `abroad` module.
 *
 * These interfaces are the single source of truth for the orientation slide
 * content. Both the mock service layer and (future) Backend CMS responses must
 * satisfy them, so the Presentation Layer never changes when the data source
 * is swapped for React Query.
 */

/** Brand identity shown in the top-left header cluster. */
export interface IBrand {
  readonly name: string;
  readonly division: string;
  /** Path to the brand mark SVG inside `public/`. */
  readonly markSrc: string;
}

/** Live stream readiness indicator. */
export interface IStatusIndicator {
  readonly label: string;
  readonly isLive: boolean;
}

/** Small metadata capsule in the header (e.g. cohort, track). */
export interface IMetaPill {
  readonly id: string;
  readonly label: string;
  readonly iconSrc: string;
}

/** Top batch badge above the hero headline. */
export interface IBatchBadge {
  readonly label: string;
}

/** Hero headline + supporting copy. */
export interface IHeroContent {
  readonly badge: string;
  readonly titlePrimary: string;
  readonly titleAccent: string;
  /** Rendered as separate lines so line breaks match the design exactly. */
  readonly descriptionLines: readonly string[];
}

/** One "metric bento" card in the 3-up highlight row. */
export interface IHighlightCard {
  readonly id: string;
  /** Two-digit ordinal, e.g. `"01"`. */
  readonly index: string;
  /** Short category label, e.g. `"TRACK"`. */
  readonly category: string;
  readonly iconSrc: string;
  readonly title: string;
  readonly descriptionLines: readonly string[];
}

/** Call-to-action link rendered in the hero action cluster. */
export interface IActionLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly variant: "primary" | "secondary";
  readonly iconSrc?: string;
}

/** Slide-deck footer / pagination metadata. */
export interface IFooterMeta {
  readonly statusLabel: string;
  readonly slideLabel: string;
  /** Zero-padded current slide, e.g. `"01"`. */
  readonly slideIndex: string;
  /** Zero-padded total, e.g. `"01"`. */
  readonly totalSlides: string;
}

/** Full page payload for the orientation slide. */
export interface IOrientationPage {
  readonly brand: IBrand;
  readonly status: IStatusIndicator;
  readonly metaPills: readonly IMetaPill[];
  readonly hero: IHeroContent;
  readonly highlights: readonly IHighlightCard[];
  readonly actions: readonly IActionLink[];
  readonly footer: IFooterMeta;
}