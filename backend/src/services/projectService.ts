import type { PrismaClientInstance } from '../plugins/prisma.js';
import type { IProject } from '../interface/api.js';
import type {
  CreateProjectBody,
  UpdateProjectBody,
} from '../interface/apiSchema.js';
import { serializeTechStack, toProjectDto } from './mappers.js';

/**
 * Project CRUD.
 *
 * `techStack` arrives as a string array and is stored comma-separated;
 * decoding is handled by the shared mappers.
 */

export async function getProjects(
  prisma: PrismaClientInstance,
): Promise<readonly IProject[]> {
  const rows = await prisma.project.findMany({ orderBy: { id: 'asc' } });

  return rows.map(toProjectDto);
}

/** Returns `null` when no project matches the id, so routes can map to 404. */
export async function getProjectById(
  prisma: PrismaClientInstance,
  id: number,
): Promise<IProject | null> {
  const row = await prisma.project.findUnique({ where: { id } });

  return row === null ? null : toProjectDto(row);
}

export async function createProject(
  prisma: PrismaClientInstance,
  input: CreateProjectBody,
): Promise<IProject> {
  const row = await prisma.project.create({
    data: {
      title: input.title,
      description: input.description,
      category: input.category,
      imageUrl: input.imageUrl,
      techStack: serializeTechStack(input.techStack),
    },
  });

  return toProjectDto(row);
}

/** Returns `null` when the project does not exist. */
export async function updateProject(
  prisma: PrismaClientInstance,
  id: number,
  input: UpdateProjectBody,
): Promise<IProject | null> {
  const exists = await prisma.project.findUnique({
    where: { id },
    select: { id: true },
  });

  if (exists === null) {
    return null;
  }

  const row = await prisma.project.update({
    where: { id },
    data: {
      title: input.title,
      description: input.description,
      category: input.category,
      imageUrl: input.imageUrl,
      techStack: serializeTechStack(input.techStack),
    },
  });

  return toProjectDto(row);
}

/** Returns `false` when the project does not exist. */
export async function deleteProject(
  prisma: PrismaClientInstance,
  id: number,
): Promise<boolean> {
  const result = await prisma.project.deleteMany({ where: { id } });

  return result.count > 0;
}