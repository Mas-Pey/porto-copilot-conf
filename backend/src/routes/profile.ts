import type { FastifyPluginAsync } from 'fastify';

import {
  ApiErrorSchema,
  ProfileSchema,
  UpdateProfileBodySchema,
  type UpdateProfileBody,
} from '../interface/apiSchema.js';
import { getProfile, updateProfile } from '../services/profileService.js';

/**
 * Profile routes.
 *
 * Plain (non `fastify-plugin`) module: the parent's `/api` prefix applies and
 * the handlers keep their own encapsulated scope.
 */
export const profileRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    '/profile',
    {
      schema: {
        response: {
          200: ProfileSchema,
          404: ApiErrorSchema,
        },
      },
    },
    async (_request, reply) => {
      const profile = await getProfile(fastify.prisma);

      if (profile === null) {
        return reply.notFound('Profile has not been configured yet.');
      }

      return profile;
    },
  );

  fastify.put<{ Body: UpdateProfileBody }>(
    '/profile',
    {
      schema: {
        body: UpdateProfileBodySchema,
        response: {
          200: ProfileSchema,
          400: ApiErrorSchema,
        },
      },
    },
    async (request) => updateProfile(fastify.prisma, request.body),
  );
};

export default profileRoutes;