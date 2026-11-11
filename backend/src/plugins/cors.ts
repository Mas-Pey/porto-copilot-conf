import cors from '@fastify/cors';
import fp from 'fastify-plugin';

/**
 * Registers CORS using the allowed origins from configuration.
 * Requests without an `Origin` header (curl, server-to-server) are always allowed.
 */
export const corsPlugin = fp(
  async (fastify) => {
    const allowedOrigins = fastify.config.CORS_ORIGINS;
    const allowAnyOrigin = allowedOrigins.includes('*');

    await fastify.register(cors, {
      origin: allowAnyOrigin
        ? true
        : (origin, callback) => {
            if (origin === undefined || allowedOrigins.includes(origin)) {
              callback(null, true);
              return;
            }

            callback(new Error(`Origin "${origin}" is not allowed by CORS.`), false);
          },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86_400,
    });
  },
  {
    name: 'app-cors',
    dependencies: ['app-env'],
  },
);

export default corsPlugin;