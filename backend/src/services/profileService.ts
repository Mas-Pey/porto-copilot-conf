import type { PrismaClientInstance } from '../plugins/prisma.js';
import type { IProfile } from '../interface/api.js';
import type { UpdateProfileBody } from '../interface/apiSchema.js';
import { serializeStats, toProfileDto } from './mappers.js';

/**
 * Profile reads/writes.
 *
 * The MVP keeps a single Profile row; `getProfile` returns it and
 * `updateProfile` upserts it so the endpoint works even on an empty database.
 */

export async function getProfile(
  prisma: PrismaClientInstance,
): Promise<IProfile | null> {
  const row = await prisma.profile.findFirst({ orderBy: { id: 'asc' } });

  return row === null ? null : toProfileDto(row);
}

export async function updateProfile(
  prisma: PrismaClientInstance,
  input: UpdateProfileBody,
): Promise<IProfile> {
  const data = {
    headline: input.headline,
    bio: input.bio,
    location: input.location,
    status: input.status,
    education: input.education,
    stats: serializeStats(input.stats),
  };

  const existing = await prisma.profile.findFirst({
    orderBy: { id: 'asc' },
    select: { id: true },
  });

  const row =
    existing === null
      ? await prisma.profile.create({ data })
      : await prisma.profile.update({ where: { id: existing.id }, data });

  return toProfileDto(row);
}