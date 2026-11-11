import type { TTone } from "@/interface/ui";

/**
 * Data contracts for the `portfolio` module.
 *
 * These interfaces are the single source of truth for the landing page
 * content. Both the mock service layer and the future Backend CMS response
 * must satisfy them, so the Presentation Layer never changes when the data
 * source is swapped for React Query.
 */

/** Call-to-action link rendered somewhere on the page. */
export interface IActionLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly variant: "primary" | "secondary";
  readonly iconSrc?: string;
  readonly size?: "md" | "sm";
  /** Renders the anchor with the `download` attribute. */
  readonly download?: boolean;
  /** Opens the target in a new tab. */
  readonly external?: boolean;
}

/** Navigation entry in the header and footer. */
export interface INavLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly isActive?: boolean;
}

/** Brand cluster in the top-left of the header. */
export interface IBrandIdentity {
  readonly monogram: string;
  readonly title: string;
  readonly subtitle: string;
  readonly href: string;
}

/** Header / top navigation payload. */
export interface ISiteHeader {
  readonly brand: IBrandIdentity;
  readonly navLinks: readonly INavLink[];
  readonly cta: IActionLink;
}

/** One inline segment of a headline line (allows gradient highlights). */
export interface IHeadlineSegment {
  readonly id: string;
  readonly text: string;
  readonly gradient?: boolean;
}

/** One visual line of the hero headline. */
export interface IHeadlineLine {
  readonly id: string;
  readonly segments: readonly IHeadlineSegment[];
}

/** Dotted tech badge (React 19, Next.js 15, …). */
export interface ITechBadge {
  readonly id: string;
  readonly label: string;
  readonly tone: TTone;
}

/** Terminal syntax highlighting tones. */
export type TTerminalTone =
  | "plain"
  | "keyword"
  | "string"
  | "module"
  | "comment"
  | "variable"
  | "accent";

/** A single colored run inside a terminal line. */
export interface ITerminalToken {
  readonly id: string;
  readonly text: string;
  readonly tone: TTerminalTone;
}

/** A single terminal line with fixed indentation depth. */
export interface ITerminalLine {
  readonly id: string;
  readonly indent: 0 | 1 | 2;
  readonly tokens: readonly ITerminalToken[];
}

/** Interactive-looking terminal preview card in the hero. */
export interface ITerminalPreview {
  readonly filename: string;
  readonly copyIconSrc: string;
  readonly copyLabel: string;
  readonly lines: readonly ITerminalLine[];
  readonly promptIconSrc: string;
  readonly footerCommand: string;
}

/** One KPI card below the hero. */
export interface IStatItem {
  readonly id: string;
  readonly iconSrc: string;
  /** Intrinsic icon width in px — keeps the source SVG undistorted. */
  readonly iconWidth: number;
  /** Intrinsic icon height in px — keeps the source SVG undistorted. */
  readonly iconHeight: number;
  readonly value: string;
  readonly label: string;
}

/** Hero section payload (copy, actions, terminal, and KPI strip). */
export interface IHeroSection {
  readonly availabilityLabel: string;
  readonly headline: readonly IHeadlineLine[];
  readonly descriptionLines: readonly string[];
  readonly actions: readonly IActionLink[];
  readonly techStackLabel: string;
  readonly techStack: readonly ITechBadge[];
  readonly terminal: ITerminalPreview;
  readonly stats: readonly IStatItem[];
}

/** One row in the profile "quick snapshot" spec list. */
export interface IProfileSpec {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  /** Renders the value in teal with a leading dot. */
  readonly highlight?: boolean;
  /** Draws a hairline under the row. */
  readonly divider?: boolean;
}

/** Avatar + identity card inside the About section. */
export interface IAboutProfile {
  readonly avatarSrc: string;
  readonly avatarAlt: string;
  readonly name: string;
  readonly role: string;
  readonly specs: readonly IProfileSpec[];
  readonly cta: IActionLink;
}

/** One "core pillar" card in the About section. */
export interface IPillar {
  readonly id: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly title: string;
  readonly description: string;
}

/** One role in the career timeline. */
export interface ICareerEntry {
  readonly id: string;
  readonly period: string;
  readonly role: string;
  readonly description: string;
  readonly isCurrent: boolean;
}

/** Career timeline block inside the About section. */
export interface ICareerTimeline {
  readonly title: string;
  readonly iconSrc: string;
  readonly items: readonly ICareerEntry[];
}

/** About section payload. */
export interface IAboutSection {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly profile: IAboutProfile;
  readonly bio: readonly string[];
  readonly pillars: readonly IPillar[];
  readonly timeline: ICareerTimeline;
}

/** One skill category card. */
export interface ISkillCategory {
  readonly id: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly title: string;
  readonly description: string;
  readonly skills: readonly ITechBadge[];
  readonly footnote: string;
}

/** Skills section payload. */
export interface ISkillsSection {
  readonly eyebrow: string;
  readonly eyebrowTone: TTone;
  readonly title: string;
  readonly subtitle: string;
  readonly footnoteIconSrc: string;
  readonly categories: readonly ISkillCategory[];
}

/** One project filter chip. */
export interface IProjectFilter {
  readonly id: string;
  readonly label: string;
  /** Optional count rendered in parentheses. */
  readonly count?: number;
}

/** One featured project card. */
export interface IProject {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly techStack: readonly string[];
  readonly demo: IActionLink;
  readonly source: IActionLink;
  /** Filter ids this project belongs to. */
  readonly tags: readonly string[];
}

/** Featured projects section payload. */
export interface IProjectsSection {
  readonly eyebrow: string;
  readonly eyebrowTone: TTone;
  readonly title: string;
  readonly subtitle: string;
  readonly filters: readonly IProjectFilter[];
  readonly projects: readonly IProject[];
  readonly allFilterId: string;
}

/** Quick contact channel (email row, social pill). */
export interface IContactLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly iconSrc: string;
  readonly external?: boolean;
}

/** One field in the contact form. */
export interface IFormField {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly type: "text" | "email" | "textarea";
  readonly autoComplete?: string;
}

/** Contact form payload. */
export interface IContactForm {
  readonly title: string;
  readonly fields: readonly IFormField[];
  readonly submitLabel: string;
  /** Label shown while a submission is in flight. */
  readonly submittingLabel?: string;
  readonly submitIconSrc: string;
  readonly successMessage: string;
}

/** Contact / CTA banner section payload. */
export interface IContactSection {
  readonly badge: string;
  readonly title: string;
  readonly descriptionLines: readonly string[];
  readonly emailLabel: string;
  readonly emailValue: string;
  readonly emailHref: string;
  readonly emailIconSrc: string;
  readonly socials: readonly IContactLink[];
  readonly form: IContactForm;
}

/** Footer payload. */
export interface IFooterContent {
  readonly brand: string;
  readonly note: string;
  readonly copyright: string;
  readonly links: readonly INavLink[];
}

/** Full landing page payload. */
export interface IPortfolioPage {
  readonly header: ISiteHeader;
  readonly hero: IHeroSection;
  readonly about: IAboutSection;
  readonly skills: ISkillsSection;
  readonly projects: IProjectsSection;
  readonly contact: IContactSection;
  readonly footer: IFooterContent;
}