import type { FastifyPluginAsync } from 'fastify';

import {
  ApiErrorSchema,
  CreateSkillBodySchema,
  IdParamsSchema,
  SkillSchema,
  collectionResponse,
  type CreateSkillBody,
  type IdParams,
} from '../interface/apiSchema.js';
import { createSkill, deleteSkill, getSkills } from '../services/skillService.js';

const SkillCollectionSchema = collectionResponse(SkillSchema);

/** Skill routes. Plain module so the `/api` prefix applies. */
export const skillRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/skills',
    {
      schema: {
        response: { 200: SkillCollectionSchema },
      },
    },
    async () => {
      const data = await getSkills(fastify.prisma);

      return { count: data.length, data };
    },
  );

  fastify.post<{ Body: CreateSkillBody }>(
    '/skills',
    {
      schema: {
        body: CreateSkillBodySchema,
        response: {
          201: SkillSchema,
          400: ApiErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const skill = await createSkill(fastify.prisma, request.body);

      return reply.code(201).send(skill);
    },
  );

  fastify.delete<{ Params: IdParams }>(
    '/skills/:id',
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
      const deleted = await deleteSkill(fastify.prisma, request.params.id);

      if (!deleted) {
        return reply.notFound(`Skill ${request.params.id} was not found.`);
      }

      return reply.code(204).send();
    },
  );
};

export default skillRoutes;