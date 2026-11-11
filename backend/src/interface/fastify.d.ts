import type { PrismaClientInstance } from '../plugins/prisma.js';
import type { EnvConfig } from './env.js';

declare module 'fastify' {
  interface FastifyInstance {
    /** Validated runtime configuration, decorated by `plugins/env.ts`. */
    readonly config: EnvConfig;
    /** Prisma client, decorated by `plugins/prisma.ts` and closed with the app. */
    readonly prisma: PrismaClientInstance;
  }
}

export {};