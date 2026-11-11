// Prisma CLI configuration.
// The datasource URL is resolved to an absolute `file:` path so the CLI and the
// HTTP server always target the same `dev.db`, regardless of the CWD.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

import { resolveDatabaseUrlFromEnv } from './src/services/databaseUrl.js';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // Prisma 7 reads the seed command from here (the old `package.json`
    // "prisma": { "seed": ... } block is no longer honoured).
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: resolveDatabaseUrlFromEnv(),
  },
});
