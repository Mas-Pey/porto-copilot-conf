---
name: init-fastify
description: Initialize Fastify backend project with TypeScript and modular plugin architecture
agent: agent
---
Please initialize and scaffold the Fastify backend project inside the `backend/` directory following these exact steps:

1. Check if the `backend` directory exists. If not, create it and initialize a Node.js project (`npm init -y`).
2. Install the necessary dependencies:
  - Dependencies: `fastify`, `@fastify/cors`, `@fastify/sensible`, `dotenv`
  - Dev dependencies: `typescript`, `@types/node`, `tsx`
3. Create `tsconfig.json` configured for ESM / NodeNext resolution and strict type checking.
4. Update `package.json` with the following scripts:
  - `"dev"`: `"tsx watch src/index.ts"`
  - `"build"`: `"tsc"`
  - `"start"`: `"node dist/index.js"`
5. Scaffold the source directory structure under `backend/src/`:
  - `plugins/` (Fastify plugin wrappers)
  - `routes/` (modular route plugins)
  - `services/` (business logic)
  - `interface/` (DTOs and type definitions, no `any`)
6. Create `backend/src/index.ts` as the entry point:
  - Configure structured logging with Pino
  - Register CORS and sensible plugins
  - Add a `/api/health` health-check route
  - Listen on port `4000` (host `0.0.0.0`)
7. Verify compilation with `npx tsc --noEmit` to ensure the project setup is clean and ready.