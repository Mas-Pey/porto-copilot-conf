/**
 * Intrinsic geometry of every SVG asset shipped in `public/icons`.
 *
 * The values mirror the `width`/`height` declared inside each SVG file, so the
 * browser can derive the correct aspect ratio. Components keep control of the
 * rendered slot size; the glyph itself is never stretched beyond a sub-pixel
 * rounding difference.
 *
 * Update this map whenever an icon in `public/icons` is replaced.
 */
export interface IIconGeometry {
  readonly width: number;
  readonly height: number;
}

const iconGeometry: Readonly<Record<string, IIconGeometry>> = {
  "/icons/about-download.svg": { width: 12, height: 12 },
  "/icons/contact-mail.svg": { width: 16.6667, height: 13.3333 },
  "/icons/contact-send.svg": { width: 14.25, height: 12 },
  "/icons/header-arrow.svg": { width: 10.6667, height: 10.6667 },
  "/icons/hero-arrow-primary.svg": { width: 12, height: 12 },
  "/icons/hero-arrow-secondary.svg": { width: 12, height: 12 },
  "/icons/pillar-agility.svg": { width: 14.6667, height: 18.3333 },
  "/icons/pillar-clean-code.svg": { width: 16.5, height: 16.5 },
  "/icons/pillar-user-centric.svg": { width: 18.3333, height: 18.3333 },
  "/icons/project-code-arrow.svg": { width: 13.3333, height: 8 },
  "/icons/project-demo-arrow.svg": { width: 12, height: 12 },
  "/icons/skill-backend.svg": { width: 19.5, height: 19.5 },
  "/icons/skill-check.svg": { width: 14.6667, height: 14 },
  "/icons/skill-devops.svg": { width: 21.6667, height: 17.3333 },
  "/icons/skill-frontend.svg": { width: 21.6667, height: 17.3333 },
  "/icons/skill-uiux.svg": { width: 21.6667, height: 21.6667 },
  "/icons/social-github.svg": { width: 15, height: 12 },
  "/icons/social-linkedin.svg": { width: 15, height: 15 },
  "/icons/social-twitter.svg": { width: 13.5, height: 15 },
  "/icons/stat-experience.svg": { width: 23.3333, height: 14 },
  "/icons/stat-projects.svg": { width: 23.3879, height: 23.4157 },
  "/icons/stat-satisfaction.svg": { width: 23.3333, height: 23.3333 },
  "/icons/terminal-copy.svg": { width: 11.3333, height: 13.3333 },
  "/icons/terminal-prompt.svg": { width: 11.6667, height: 9.33333 },
  "/icons/timeline-clock.svg": { width: 16.25, height: 13.3333 },
};

/** Returns the intrinsic geometry of a known icon, or `undefined`. */
export function getIconGeometry(src: string): IIconGeometry | undefined {
  return iconGeometry[src];
}