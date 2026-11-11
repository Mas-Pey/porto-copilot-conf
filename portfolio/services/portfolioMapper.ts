import type {
  IApiProfile,
  IApiProject,
  IApiSkill,
  IApiStatItem,
} from "@/interface/api";
import type {
  IAboutSection,
  IHeroSection,
  IProject,
  IProjectFilter,
  IProjectsSection,
  ISkillCategory,
  ISkillsSection,
  IStatItem,
  ITechBadge,
} from "@/interface/portfolio";
import type { TTone } from "@/interface/ui";

/**
 * Maps Backend CMS payloads onto the presentation contracts.
 *
 * The backend owns *content* (copy, entity rows). The presentation layer owns
 * *chrome* (icons, sizes, tones, CTA links). These pure functions merge the
 * two, always starting from the mock baseline so a sparse or partial API
 * response can never produce a broken UI.
 */

/** Deterministic tone cycle for badges created from API data. */
const TONES: readonly TTone[] = ["accent", "teal", "sky", "neutral"];

const CATEGORY_ICONS: Record<string, { src: string; width: number; height: number }> = {
  "AI Engineering": { src: "/icons/skill-frontend.svg", width: 22, height: 18 },
  "Agents & Automation": { src: "/icons/skill-devops.svg", width: 22, height: 18 },
  Fullstack: { src: "/icons/skill-backend.svg", width: 20, height: 20 },
  "UI/UX Design": { src: "/icons/skill-uiux.svg", width: 22, height: 22 },
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toneAt(index: number): TTone {
  return TONES[index % TONES.length] ?? "accent";
}

/** Icons for KPI cards, keyed by the mock baseline order. */
function mergeStats(
  baseline: IHeroSection["stats"],
  apiStats: readonly IApiStatItem[],
): readonly IStatItem[] {
  if (apiStats.length === 0) {
    return baseline;
  }

  return apiStats.map((stat, index) => {
    const match =
      baseline.find((item) => item.label === stat.label) ?? baseline[index];

    return {
      id: match?.id ?? `stat-${index}`,
      iconSrc: match?.iconSrc ?? "/icons/stat-experience.svg",
      iconWidth: match?.iconWidth ?? 23,
      iconHeight: match?.iconHeight ?? 23,
      value: stat.value,
      label: stat.label,
    };
  });
}

/** Overrides hero + about content with the Profile row. */
export function mergeProfile(
  hero: IHeroSection,
  about: IAboutSection,
  api: IApiProfile,
): { readonly hero: IHeroSection; readonly about: IAboutSection } {
  const bioBlocks = api.bio
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0);

  return {
    hero: {
      ...hero,
      stats: mergeStats(hero.stats, api.stats),
    },
    about: {
      ...about,
      bio: bioBlocks.length > 0 ? bioBlocks : about.bio,
      profile: {
        ...about.profile,
        role: api.headline || about.profile.role,
        specs: about.profile.specs.map((spec) => {
          if (spec.id === "location") {
            return { ...spec, value: api.location || spec.value };
          }

          if (spec.id === "status") {
            return { ...spec, value: api.status || spec.value };
          }

          if (spec.id === "education") {
            return { ...spec, value: api.education || spec.value };
          }

          return spec;
        }),
      },
    },
  };
}

/** Groups API skills into the category cards the Skills section renders. */
export function mergeSkills(
  baseline: ISkillsSection,
  apiSkills: readonly IApiSkill[],
): ISkillsSection {
  if (apiSkills.length === 0) {
    return baseline;
  }

  const grouped = new Map<string, IApiSkill[]>();

  for (const skill of apiSkills) {
    const bucket = grouped.get(skill.category);

    if (bucket === undefined) {
      grouped.set(skill.category, [skill]);
    } else {
      bucket.push(skill);
    }
  }

  const categories: ISkillCategory[] = [];

  for (const [category, skills] of grouped) {
    const existing = baseline.categories.find((item) => item.title === category);
    const chrome = CATEGORY_ICONS[category];
    const badges: readonly ITechBadge[] = skills.map((skill, index) => ({
      id: slugify(skill.name) || `skill-${index}`,
      label: skill.name,
      tone: toneAt(index),
    }));

    categories.push({
      id: existing?.id ?? slugify(category),
      iconSrc: existing?.iconSrc ?? chrome?.src ?? "/icons/skill-frontend.svg",
      iconWidth: existing?.iconWidth ?? chrome?.width ?? 22,
      iconHeight: existing?.iconHeight ?? chrome?.height ?? 18,
      title: category,
      description: existing?.description ?? category,
      footnote: existing?.footnote ?? "Core Discipline",
      skills: badges,
    });
  }

  return {
    ...baseline,
    categories:
      categories.length > 0 ? categories : baseline.categories,
  };
}

/** Derives filter chips from the merged project list. */
function buildFilters(
  baseline: IProjectsSection,
  projects: readonly IProject[],
): readonly IProjectFilter[] {
  const knownTags = baseline.filters
    .filter((filter) => filter.id !== baseline.allFilterId)
    .map((filter) => filter.id);

  const discovered = Array.from(
    new Set(projects.flatMap((project) => project.tags)),
  ).filter((tag) => !knownTags.includes(tag));

  const tagIds = [...knownTags, ...discovered];

  return [
    { id: baseline.allFilterId, label: "All", count: projects.length },
    ...tagIds.map((tag) => {
      const existing = baseline.filters.find((filter) => filter.id === tag);

      return {
        id: tag,
        label: existing?.label ?? tag.charAt(0).toUpperCase() + tag.slice(1),
        count: projects.filter((project) => project.tags.includes(tag)).length,
      };
    }),
  ];
}

/** Matches an API category ("UI/UX") to a filter tag ("uiux"). */
function toTag(category: string): string {
  return slugify(category).replace(/-/g, "");
}

/** Merges API projects into the Projects section, keeping CTA chrome. */
export function mergeProjects(
  baseline: IProjectsSection,
  apiProjects: readonly IApiProject[],
): IProjectsSection {
  if (apiProjects.length === 0) {
    return baseline;
  }

  const projects: readonly IProject[] = apiProjects.map((project, index) => {
    const match = baseline.projects.find(
      (item) => item.title.toLowerCase() === project.title.toLowerCase(),
    );

    const fallback = baseline.projects[index];
    const tag = toTag(project.category);

    return {
      id: slugify(project.title) || `project-${index}`,
      category: project.category,
      title: project.title,
      description: project.description,
      imageSrc: project.imageUrl || match?.imageSrc || fallback?.imageSrc || "",
      imageAlt: match?.imageAlt ?? `${project.title} preview`,
      techStack: project.techStack,
      tags: [tag],
      demo:
        match?.demo ?? {
          id: `${slugify(project.title)}-demo`,
          label: "Live Demo",
          href: "#",
          variant: "primary",
          iconSrc: "/icons/project-demo-arrow.svg",
          size: "sm",
          external: true,
        },
      source:
        match?.source ?? {
          id: `${slugify(project.title)}-source`,
          label: "Source Code",
          href: "#",
          variant: "secondary",
          iconSrc: "/icons/project-code-arrow.svg",
          size: "sm",
          external: true,
        },
    };
  });

  return {
    ...baseline,
    filters: buildFilters(baseline, projects),
    projects,
  };
}