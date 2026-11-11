---
name: setup-db
description: Setup SQLite database with Prisma ORM for Portfolio MVP
agent: agent
---
Please set up an SQLite database using Prisma inside the `backend/` directory for our MVP:

1. Inside `backend/`, install `@prisma/client` and dev dependency `prisma`.
2. Initialize Prisma with SQLite provider (`npx prisma init --datasource-provider sqlite`).
3. Create the schema in `backend/prisma/schema.prisma` with 4 models:
   - `Profile`: id (Int autoincrement), headline (String), bio (String), location (String), status (String), education (String), updatedAt (DateTime)
   - `Project`: id (Int autoincrement), title (String), description (String), category (String), imageUrl (String), techStack (String), createdAt (DateTime default now)
   - `Skill`: id (Int autoincrement), name (String), badgeUrl (String), category (String)
   - `Message`: id (Int autoincrement), name (String), email (String), message (String), createdAt (DateTime default now)
4. Execute `npx prisma db push` to create the SQLite file `dev.db` and generate the Prisma Client.
5. Create an encapsulated Fastify plugin at `backend/src/plugins/prisma.ts` using `fastify-plugin` that decorates Fastify with `prisma`, handles `$disconnect()` on app close, and provides TypeScript typing for `fastify.prisma`.
6. Register the Prisma plugin inside `backend/src/app.ts`.
7. Verify the build with `npm run typecheck` or `npx tsc --noEmit`.