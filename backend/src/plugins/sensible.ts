import sensible from '@fastify/sensible';
import fp from 'fastify-plugin';

/**
 * Adds `@fastify/sensible` helpers (`httpErrors`, `reply.notFound()`, etc.)
 * so route handlers can raise consistent HTTP errors.
 */
export const sensiblePlugin = fp(
  async (fastify) => {
    await fastify.register(sensible);
  },
  {
    name: 'app-sensible',
  },
);

export default sensiblePlugin;