import type { FastifyPluginAsync } from 'fastify';

import {
  ApiErrorSchema,
  CreateProjectBodySchema,
  IdParamsSchema,
  ProjectSchema,
  UpdateProjectBodySchema,
  collectionResponse,
  type CreateProjectBody,
  type IdParams,
  type UpdateProjectBody,
} from '../interface/apiSchema.js';
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../services/projectService.js';

const ProjectCollectionSchema = collectionResponse(ProjectSchema);

/** Project CRUD routes. Plain module so the `/api` prefix applies. */
export const projectRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/projects',
    {
      schema: {
        response: { 200: ProjectCollectionSchema },
      },
    },
    async () => {
      const data = await getProjects(fastify.prisma);

      return { count: data.length, data };
    },
  );

  fastify.get<{ Params: IdParams }>(
    '/projects/:id',
    {
      schema: {
        params: IdParamsSchema,
        response: {
          200: ProjectSchema,
          404: ApiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const project = await getProjectById(fastify.prisma, request.params.id);

      if (project === null) {
        return reply.notFound(`Project ${request.params.id} was not found.`);
      }

      return project;
    },
  );

  fastify.post<{ Body: CreateProjectBody }>(
    '/projects',
    {
      schema: {
        body: CreateProjectBodySchema,
        response: {
          201: ProjectSchema,
          400: ApiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const project = await createProject(fastify.prisma, request.body);

      return reply.code(201).send(project);
    },
  );

  fastify.put<{ Params: IdParams; Body: UpdateProjectBody }>(
    '/projects/:id',
    {
      schema: {
        params: IdParamsSchema,
        body: UpdateProjectBodySchema,
        response: {
          200: ProjectSchema,
          400: ApiErrorSchema,
          404: ApiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const project = await updateProject(
        fastify.prisma,
        request.params.id,
        request.body,
      );

      if (project === null) {
        return reply.notFound(`Project ${request.params.id} was not found.`);
      }

      return project;
    },
  );

  fastify.delete<{ Params: IdParams }>(
    '/projects/:id',
    {
      schema: {
        params: IdParamsSchema,
        response: {
          204: { type: 'null' },
          404: ApiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const deleted = await deleteProject(fastify.prisma, request.params.id);

      if (!deleted) {
        return reply.notFound(`Project ${request.params.id} was not found.`);
      }

      return reply.code(204).send();
    },
  );
};

export default projectRoutes;