import type { IOrientationPage } from "@/interface/abroad";

/**
 * Mock content for the "Welcome Aboard" orientation slide.
 *
 * All copy lives here so the Presentation Layer stays data-agnostic. When the
 * Backend CMS is ready, only this module is replaced with a `fetch` call — the
 * hook signature and every component stay untouched.
 */
const orientationPage: IOrientationPage = {
  brand: {
    name: "Berijalan",
    division: "ACADEMY DIVISION",
    markSrc: "/icons/brand-mark.svg",
  },
  status: {
    label: "STREAM READY",
    isLive: true,
  },
  metaPills: [
    {
      id: "cohort",
      label: "Q2 COHORT",
      iconSrc: "/icons/cohort.svg",
    },
  ],
  hero: {
    badge: "BERIJALAN • BATCH 19 • INTENSIF FULL STACK & AI ENGINEERING",
    titlePrimary: "Welcome Aboard",
    titleAccent: "Bootcamp Batch 19",
    descriptionLines: [
      "Perjalanan transformatif Anda menjadi engineer profesional berkelas dunia",
      "dimulai dari sini. Siapkan diri, bangun kolaborasi, dan ciptakan karya",
      "berdampak.",
    ],
  },
  highlights: [
    {
      id: "track",
      index: "01",
      category: "TRACK",
      iconSrc: "/icons/icon-track.svg",
      title: "16 Minggu Intensif",
      descriptionLines: [
        "Kurikulum komprehensif dari",
        "fundamental hingga deployment siap",
        "industri.",
      ],
    },
    {
      id: "craft",
      index: "02",
      category: "CRAFT",
      iconSrc: "/icons/icon-craft.svg",
      title: "Real-World Projects",
      descriptionLines: [
        "Bangun portfolio produk digital nyata",
        "yang teruji skala produksi.",
      ],
    },
    {
      id: "guild",
      index: "03",
      category: "GUILD",
      iconSrc: "/icons/icon-guild.svg",
      title: "Mentorship 1-on-1",
      descriptionLines: [
        "Didampingi langsung oleh senior",
        "engineers dan tech leads.",
      ],
    },
  ],
  actions: [
    {
      id: "start-orientation",
      label: "Mulai Sesi Orientasi",
      href: "#mulai-sesi-orientasi",
      variant: "primary",
      iconSrc: "/icons/arrow-right.svg",
    },
    {
      id: "learning-portal",
      label: "Akses Portal Belajar",
      href: "#portal-belajar",
      variant: "secondary",
      iconSrc: "/icons/book.svg",
    },
  ],
  footer: {
    statusLabel: "ORIENTATION KEYNOTE • STAGE ACTIVE",
    slideLabel: "Slide",
    slideIndex: "01",
    totalSlides: "01",
  },
};

/**
 * Returns the orientation slide payload.
 *
 * Swap the body for an `await fetch(...)` against the Backend CMS; the return
 * type is already `Promise`-compatible at the hook boundary.
 */
export function getOrientationPage(): IOrientationPage {
  return orientationPage;
}