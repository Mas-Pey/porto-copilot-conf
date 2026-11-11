import type { FastifyPluginAsync } from 'fastify';

import healthRoutes from './health.js';
import messageRoutes from './messages.js';
import profileRoutes from './profile.js';
import projectRoutes from './projects.js';
import skillRoutes from './skills.js';

/**
 * Aggregates every route group behind the `/api` prefix.
 * New route modules are registered here and nowhere else.
 *
 * Deliberately NOT wrapped in `fastify-plugin`, so the `/api` prefix is
 * actually applied and each module keeps its own encapsulated scope.
 */
export const apiRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(healthRoutes, { prefix: '/api' });
  await fastify.register(profileRoutes, { prefix: '/api' });
  await fastify.register(projectRoutes, { prefix: '/api' });
  await fastify.register(skillRoutes, { prefix: '/api' });
  await fastify.register(messageRoutes, { prefix: '/api' });
};

export default apiRoutes;