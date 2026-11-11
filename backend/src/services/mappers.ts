import type { Profile, Project, Skill, Message } from '../generated/prisma/client.js';
import type {
  IProfile,
  IProject,
  ISkill,
  IMessage,
  IStatItem,
} from '../interface/api.js';

/**
 * Row -> DTO mappers.
 *
 * The Prisma models store `stats` and `techStack` as comma/JSON encoded
 * strings because SQLite has no array type. All decoding lives here so
 * services and routes never touch the raw representation.
 */

/** Parses the JSON-encoded `Profile.stats` column, tolerating bad data. */
export function parseStats(raw: string): readonly IStatItem[] {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.flatMap((entry): IStatItem[] => {
      if (typeof entry !== 'object' || entry === null) {
        return [];
      }

      const candidate = entry as Record<string, unknown>;
      const value = candidate['value'];
      const label = candidate['label'];

      return typeof value === 'string' && typeof label === 'string'
        ? [{ value, label }]
        : [];
    });
  } catch {
    return [];
  }
}

/** Encodes `IStatItem[]` for storage. */
export function serializeStats(stats: readonly IStatItem[]): string {
  return JSON.stringify(stats);
}

/** Splits the comma-separated `Project.techStack` column. */
export function parseTechStack(raw: string): readonly string[] {
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

/** Joins a tech stack for storage. */
export function serializeTechStack(techStack: readonly string[]): string {
  return techStack.map((entry) => entry.trim()).filter(Boolean).join(',');
}

export function toProfileDto(row: Profile): IProfile {
  return {
    id: row.id,
    headline: row.headline,
    bio: row.bio,
    location: row.location,
    status: row.status,
    education: row.education,
    stats: parseStats(row.stats),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toProjectDto(row: Project): IProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    imageUrl: row.imageUrl,
    techStack: parseTechStack(row.techStack),
    createdAt: row.createdAt.toISOString(),
  };
}

export function toSkillDto(row: Skill): ISkill {
  return {
    id: row.id,
    name: row.name,
    badgeUrl: row.badgeUrl,
    category: row.category,
  };
}

export function toMessageDto(row: Message): IMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  };
}