import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import fp from 'fastify-plugin';

import { PrismaClient } from '../generated/prisma/client.js';
import { databaseFileFromUrl } from '../services/databaseUrl.js';

export interface PrismaPluginOptions {
  /** Overrides `config.DATABASE_URL`; useful for tests using an in-memory database. */
  readonly databaseUrl?: string;
}

/** Prisma client singleton bound to the Fastify instance lifetime. */
export type PrismaClientInstance = PrismaClient;

/**
 * Decorates the instance with a Prisma client and disconnects it on close.
 *
 * Prisma 7 requires a driver adapter, so `@prisma/adapter-better-sqlite3`
 * is wired explicitly instead of relying on the datasource URL alone.
 * The URL is resolved to an absolute path so the file is opened regardless of
 * the process CWD.
 */
export const prismaPlugin = fp<PrismaPluginOptions>(
  async (fastify, options) => {
    const databaseUrl = options.databaseUrl ?? fastify.config.DATABASE_URL;

    fastify.log.info(
      { databaseFile: databaseFileFromUrl(databaseUrl) },
      'Connecting Prisma client',
    );

    const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
    const prisma = new PrismaClient({ adapter });

    await prisma.$connect();

    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', async (instance) => {
      instance.log.info('Disconnecting Prisma client');
      await instance.prisma.$disconnect();
    });
  },
  {
    name: 'app-prisma',
    dependencies: ['app-env'],
  },
);

export default prismaPlugin;