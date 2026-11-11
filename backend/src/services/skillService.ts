import type { PrismaClientInstance } from '../plugins/prisma.js';
import type { ISkill } from '../interface/api.js';
import type { CreateSkillBody } from '../interface/apiSchema.js';
import { toSkillDto } from './mappers.js';

/** Skill badge reads/writes. */

export async function getSkills(
  prisma: PrismaClientInstance,
): Promise<readonly ISkill[]> {
  const rows = await prisma.skill.findMany({ orderBy: { id: 'asc' } });

  return rows.map(toSkillDto);
}

export async function createSkill(
  prisma: PrismaClientInstance,
  input: CreateSkillBody,
): Promise<ISkill> {
  const row = await prisma.skill.create({
    data: {
      name: input.name,
      badgeUrl: input.badgeUrl,
      category: input.category,
    },
  });

  return toSkillDto(row);
}

/** Returns `false` when the skill does not exist. */
export async function deleteSkill(
  prisma: PrismaClientInstance,
  id: number,
): Promise<boolean> {
  const result = await prisma.skill.deleteMany({ where: { id } });

  return result.count > 0;
}