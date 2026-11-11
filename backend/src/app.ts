import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify';

import type { EnvConfig } from './interface/env.js';
import corsPlugin from './plugins/cors.js';
import envPlugin from './plugins/env.js';
import errorHandlerPlugin from './plugins/errorHandler.js';
import prismaPlugin from './plugins/prisma.js';
import sensiblePlugin from './plugins/sensible.js';
import apiRoutes from './routes/index.js';
import { loadEnvConfig } from './services/envService.js';

export interface BuildAppOptions {
  /** Override the resolved configuration (handy for tests). */
  readonly config?: EnvConfig;
}

/**
 * Creates a fully-wired Fastify instance.
 * Kept free of side effects (no `listen`), so tests can inject it directly.
 */
export async function buildApp(
  options: BuildAppOptions = {},
): Promise<FastifyInstance> {
  const config = options.config ?? loadEnvConfig();

  const loggerOptions: FastifyServerOptions['logger'] = {
    level: config.LOG_LEVEL,
    ...(config.NODE_ENV === 'development'
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:HH:MM:ss.l',
              ignore: 'pid,hostname',
            },
          },
        }
      : {}),
  };

  const app = Fastify({
    logger: loggerOptions,
    trustProxy: true,
    ajv: {
      customOptions: {
        coerceTypes: true,
        removeAdditional: 'all',
        allErrors: true,
      },
    },
  });

  await app.register(envPlugin, { config });
  await app.register(sensiblePlugin);
  await app.register(corsPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(prismaPlugin);
  await app.register(apiRoutes);

  app.addHook('onClose', async (instance) => {
    instance.log.info('Fastify instance closed');
  });

  return app;
}

export default buildApp;