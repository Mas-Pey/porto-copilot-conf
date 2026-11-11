import type { FastifyPluginAsync } from 'fastify';

import {
  healthResponseSchema,
  type HealthCheckPayload,
} from '../interface/health.js';
import {
  buildHealthCheck,
  resolveHttpStatus,
} from '../services/healthService.js';

/**
 * Health-check route module.
 *
 * Deliberately NOT wrapped in `fastify-plugin`: route modules must stay
 * encapsulated so the parent's `prefix` option (`/api`) is applied.
 */
export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  const startedAt = Date.now();

  fastify.get(
    '/health',
    {
      schema: {
        tags: ['system'],
        summary: 'Service health check',
        description:
          'Returns the current liveness of the service together with basic build metadata.',
        response: {
          200: healthResponseSchema,
          503: healthResponseSchema,
        },
      },
    },
    async (_request, reply): Promise<HealthCheckPayload> => {
      const payload = buildHealthCheck({
        service: fastify.config.SERVICE_NAME,
        version: fastify.config.SERVICE_VERSION,
        environment: fastify.config.NODE_ENV,
        startedAt,
      });

      void reply.status(resolveHttpStatus(payload.status));

      return payload;
    },
  );
};

export default healthRoutes;