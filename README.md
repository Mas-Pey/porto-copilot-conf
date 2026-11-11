# Copilot Config 

A multi-application workspace built end-to-end through an agentic GitHub Orchestration Framework. The repository contains three primary applications (`portfolio`, `backend`, `cms`) plus a secondary client site (`abroad`), a shared architectural standard, and the layered prompt/skill configuration that produced them.

---

## 1. Overview

| Application | Stack | Role |
| --- | --- | --- |
| `portfolio` | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 | Public-facing client site. Renders the profile, skills, projects, and contact form. Ships with a bundled mock data layer so the first paint never blocks on the network, then upgrades to live API data when the backend answers. |
| `backend` | Fastify 5, TypeScript (ESM / NodeNext), Prisma 7, SQLite (`better-sqlite3` adapter), TypeBox | REST API and single source of truth for portfolio content. Plugin-driven: schema-first validation, TypeBox-derived DTOs, encapsulated route modules, graceful shutdown. |
| `cms` | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, TanStack Query v5, Axios, Zod, Zustand | Internal dashboard. Full CRUD over profile, projects, skills, and inbound messages through a single Axios gateway (`services/satellite.ts`) and typed query hooks. |
| `abroad` | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 | Secondary client site (orientation slide page). Same 4-Layer Architecture; exercises the frontend scaffolding and slicing workflow independently of `portfolio`. |

### Shared architectural standard

Every frontend module (`portfolio`, `abroad`, `cms`) is organized into the same four layers. This is enforced by the baseline rules, not by convention alone.

| Layer | Directories | Responsibility |
| --- | --- | --- |
| Infra | `.next/`, `node_modules/`, `public/`, `assets/` | Build output, dependencies, static assets |
| Data | `services/`, `interface/` | HTTP clients, mock data, DTOs, type contracts |
| Logic | `hooks/`, `utils/`, `store/` | Custom hooks, helpers, client state |
| Presentation | `app/`, `components/{atoms,molecules,organisms}` | Routes, layouts, Atomic Design components |

The `backend` mirrors the same discipline with its own four layers: entry (`src/index.ts`, `src/app.ts`), plugins (`src/plugins/`), routes (`src/routes/`), and services/contracts (`src/services/`, `src/interface/`).

---

## 2. Agentic Orchestration Architecture

The workspace does not rely on a single monolithic prompt. It uses a layered configuration where each layer has a distinct scope, lifetime, and trigger condition. Lower layers are always active; higher layers activate on demand.

### Layer 1 - Baseline Rules

**File:** `.github/copilot-instructions.md`

Always loaded, workspace-wide. Defines the non-negotiable invariants:

- The 4-Layer directory structure for both frontend and backend modules.
- No `any` type anywhere in the monorepo; explicit interfaces or schemas only.
- No hardcoded content in UI components; list and dynamic data live in `services/` and arrive via hooks.
- KISS and decoupled modules.

This layer answers "what must always be true", independent of the file being edited.

### Layer 2 - Pattern-Scoped Instructions

**Directory:** `.github/instructions/*.instructions.md`

Each file carries YAML frontmatter with an `applyTo` glob. The instruction is only injected when the file being edited matches the pattern, which keeps context tight and rules relevant.

| File | `applyTo` | Governs |
| --- | --- | --- |
| `atomic-ui.instructions.md` | `**/components/**/*.tsx` | Atoms / molecules / organisms categorization, presentational purity, prop typing from `interface/` |
| `data-prep.instructions.md` | `**/{portfolio,abroad}/**/*.{ts,tsx}` | Mock data placement in `services/`, DTO placement in `interface/`, hook abstraction shape for a future React Query migration |
| `fastify-be.instructions.md` | `backend/**/*.ts` | Plugin encapsulation, TypeBox/Zod validation on every boundary, service-layer isolation, no `any` |
| `cms.instructions.md` | `cms/**/*.{ts,tsx}` | Mandatory `satellite.ts` gateway, TanStack Query conventions, Zod-inferred form types, optimistic-invalidation rules |

This is the layer that makes the "4-Layer Architecture" enforceable per file type rather than aspirational.

### Layer 4 - Repeatable Workflows

**Directory:** `.github/prompts/*.prompt.md`

Declarative, re-runnable procedures invoked as slash commands. Each prompt is a deterministic recipe: it names the steps, the exact directories to create, the dependencies to install, and the verification command that must pass before the workflow is considered done.

| Command | Prompt file | Purpose |
| --- | --- | --- |
| `/init-project` | `init-project.prompt.md` | Scaffold `abroad` and `portfolio` and create the 4-Layer directory tree |
| `/slice-figma` | `slice-figma.prompt.md` | Slice a Figma node into Atomic Design components while keeping data out of the presentation layer |
| `/init-fastify` | `init-fastify.prompt.md` | Scaffold the Fastify service with Pino logging, CORS, sensible, and `/api/health` |
| `/setup-db` | `setup-db.prompt.md` | Create the Prisma SQLite schema, the encapsulated Prisma plugin, and the typed decorator |
| `/init-cms` | `init-cms.prompt.md` | Scaffold the CMS with the 4-Layer tree, Query provider, Axios satellite, Zustand auth, and DTO mirror |

The prompts are idempotent by design: each begins with an existence check so re-running a workflow repairs state instead of duplicating it.

### Layer 5 - Domain SOPs

**Directory:** `.agents/skills/`, tracked by `skills-lock.json`

Standard operating procedures pulled from upstream sources and pinned by content hash. They supply the deep domain knowledge that prompts reference but should not inline.

| Skill | Source | Applied to |
| --- | --- | --- |
| `fastify-best-practices` | `mcollina/skills` (`skills/fastify/SKILL.md`) | Backend route definition, plugin encapsulation, JSON Schema validation, error handling, Pino logging, TypeScript integration |

`skills-lock.json` records `source`, `skillPath`, and `computedHash` per skill, so the exact SOP revision is reproducible across machines and contributors.

> The numbering (1, 2, 4, 5) is kept intentionally unchanged for parity with the framework's reference naming. No third layer is configured in this workspace.

### Layer composition

```text
.github/copilot-instructions.md        always on      invariants
        |
        +-- .github/instructions/*.instructions.md     on file-pattern match
        |       atomic-ui | data-prep | fastify-be | cms
        |
        +-- .github/prompts/*.prompt.md                on explicit slash command
        |       init-project | slice-figma | init-fastify | setup-db | init-cms
        |
        +-- .agents/skills/<skill>/SKILL.md            on task-domain match
                fastify-best-practices
```

The result is a hierarchy where architecture is enforced globally, conventions activate by path, procedures run on demand, and domain expertise is version-pinned.

---

## 3. Step-by-Step Development Journey

The build proceeded in three chronological phases. Each phase starts with a workflow prompt, is constrained by the active instruction layers, and ends with a verification command.

### Phase 1 - Frontend (`abroad` and `portfolio`)

1. **Scaffolding.** `/init-project` created both Next.js applications (App Router, TypeScript, Tailwind, ESLint) and generated the 4-Layer tree in each: `services/`, `interface/`, `hooks/`, `utils/`, `store/`, `assets/`, and `components/{atoms,molecules,organisms}`. `/slice-figma` then wired Figma MCP reads into the slicing procedure, with `atomic-ui` and `data-prep` ensuring no content leaked into components.

2. **UI slicing.** `/slice-figma` deconstructed each Figma node into atoms, molecules, and organisms, then assembled the page in `app/`. Copy, nav links, and asset paths were pushed down into services rather than inlined.

3. **Chain-of-Thought refactoring.** With the layout stable, a CoT refactoring pass replaced placeholder content with real personal profile data and extracted the remaining duplication. The concrete outcome is visible in `portfolio/services/portfolioService.ts` (single mock source of truth) and `portfolio/hooks/usePortfolioPage.ts` (seeded state plus live-data swap). `abroad` received the equivalent treatment in `services/abroadService.ts` and `hooks/useOrientationPage.ts`.

Phase 1 exit criteria: presentational components hold zero literal content, and every data shape is typed in `interface/`.

### Phase 2 - Backend (`backend`)

1. **Service scaffolding.** `/init-fastify` created the project, installed `fastify`, `@fastify/cors`, `@fastify/sensible`, and dev tooling, then scaffolded `plugins/`, `routes/`, `services/`, and `interface/` under `backend/src/`, with an entry point listening on port `4000`.

2. **Database.** `/setup-db` initialized Prisma with the SQLite provider and defined four models: `Profile`, `Project`, `Skill`, and `Message`. It also produced the encapsulated Prisma plugin at `backend/src/plugins/prisma.ts` decorating `fastify.prisma`, with `$disconnect()` on close and a typed declaration.

3. **Domain SOP adoption.** The `fastify-best-practices` skill was added under `.agents/skills/` and recorded in `skills-lock.json`. From that point, route and plugin work followed the pinned SOP rather than ad-hoc patterns.

4. **Seeding and implementation.** The seed script (`backend/prisma/seed.ts`) mirrors the portfolio mock payload and is idempotent: re-running resets rows instead of accumulating duplicates. Implementation then proceeded through the 4-layer split:
   - `interface/apiSchema.ts` - TypeBox schemas that both validate requests and serialize responses, so a handler cannot leak an unpublished field.
   - `services/*.ts` - pure business logic (`projectService`, `skillService`, `profileService`, `messageService`, `healthService`, `envService`, `databaseUrl`).
   - `routes/*.ts` - encapsulated route modules registered under a single `/api` prefix in `routes/index.ts`.
   - `plugins/*.ts` - `env`, `cors`, `sensible`, `errorHandler`, `prisma`.

5. **Frontend live-API integration with fallback.** `portfolio/services/apiClient.ts` gained a timeout-bounded HTTP client (`AbortController`, 4 second ceiling) and `portfolioService.loadPortfolioPage()` merges backend payloads over the mock baseline. `usePortfolioPage` keeps the mock as initial state and swaps in live data when the API resolves, exposing `isLive` and `isLoading`. An unreachable backend degrades silently to mock content; the page never blocks.

Phase 2 exit criteria: `npm run typecheck` passes in `backend/`, and the portfolio renders identically with the API up or down.

### Phase 3 - CMS Dashboard (`cms`)

1. **Scaffolding.** `/init-cms` created the Next.js app with `axios`, `@tanstack/react-query`, `zod`, `zustand`, and `lucide-react`, then generated the 4-Layer tree plus `components/templates/` and `components/providers/`.

2. **Foundations.** The generated set included `services/satellite.ts` (the only permitted HTTP gateway, with request interceptor injecting the Bearer token and a response interceptor normalizing errors and logging out on `401`), `components/providers/QueryProvider.tsx`, `store/useAuthStore.ts` (Zustand with `persist` behind a safe storage adapter), and `interface/api.ts` mirroring the backend DTOs.

3. **Full UI slicing.** The dashboard shell (`components/templates/AppShell.tsx`, sidebar on `md+`, drawer below `md`) and the five route groups under `app/(dashboard)/` were sliced: `page` (overview), `projects`, `skills`, `messages`, and `profile`.

4. **TanStack Query + Zod CRUD integration.**
   - Query keys are centralized in `services/queryKeys.ts` so mutations invalidate precisely.
   - Per-resource services wrap `satellite` and return strictly typed data.
   - Hooks (`useProjects`, `useSkills`, `useMessages`, `useProfile`, `useDashboardCounts`) expose `useQuery`/`useMutation` pairs.
   - Forms use `react-hook-form` with `zodResolver`; schemas in `interface/schemas.ts` mirror the backend TypeBox constraints exactly, so client-side validation cannot drift from the server contract.

Phase 3 exit criteria: `npm run typecheck` and `npm run build` pass in `cms/`, and each resource round-trips against the running backend.

---

## 4. Backend API Reference

All routes are registered behind the `/api` prefix by `backend/src/routes/index.ts`. Every payload is validated on the way in and serialized on the way out through the TypeBox schemas in `backend/src/interface/apiSchema.ts`.

### Health

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness snapshot: status, service name, version, environment, uptime, ISO timestamp. Returns `200` when healthy, `503` otherwise. |

### Profile

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/profile` | Returns the single profile row, including the JSON-decoded `stats` KPI array. `404` if the profile has not been configured. |
| `PUT` | `/api/profile` | Replaces the profile. All fields required: `headline`, `bio`, `location`, `status`, `education`, `stats`. |

### Projects

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/projects` | Lists projects as `{ count, data }`. |
| `GET` | `/api/projects/:id` | Returns one project. `404` when absent. |
| `POST` | `/api/projects` | Creates a project from `title`, `description`, `category`, `imageUrl`, `techStack`. Returns `201`. |
| `PUT` | `/api/projects/:id` | Updates a project. `404` when absent. |
| `DELETE` | `/api/projects/:id` | Removes a project. Returns `204`. |

### Skills

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/skills` | Lists skills as `{ count, data }`. |
| `POST` | `/api/skills` | Creates a skill from `name`, `badgeUrl`, `category`. Returns `201`. |
| `DELETE` | `/api/skills/:id` | Removes a skill. Returns `204`. |

### Messages

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/messages` | Submits a contact message from `name`, `email`, `message`. Returns `201`. |
| `GET` | `/api/messages` | Lists inbound messages as `{ count, data }`, newest first. |

Thirteen endpoints total. Note the intentional asymmetry: messages support create and list only (no update or delete), while skills support list, create, and delete (no update). The CMS DTOs and hooks match this surface exactly.

### Data models

| Model | Fields |
| --- | --- |
| `Profile` | `id`, `headline`, `bio`, `location`, `status`, `education`, `stats` (JSON string of `{ value, label }`), `updatedAt` |
| `Project` | `id`, `title`, `description`, `category`, `imageUrl`, `techStack`, `createdAt` |
| `Skill` | `id`, `name`, `badgeUrl`, `category` |
| `Message` | `id`, `name`, `email`, `message`, `createdAt` |

---

## 5. Local Setup & Verification

### Requirements

- Node.js `>= 20` (enforced by `backend/package.json` `engines`)
- npm
- No external database server: Prisma targets a local SQLite file

### Port assignments

| Application | Directory | Port | Command |
| --- | --- | --- | --- |
| Backend | `backend/` | `4000` | `npm run dev` |
| Portfolio | `portfolio/` | `3000` | `npm run dev` |
| CMS | `cms/` | `3001` | `npm run dev -- --port 3001` |
| Abroad | `abroad/` | next free port | `npm run dev -- --port 3002` |

Both Next.js apps default to port `3000`, so run only one at that port at a time. CORS in `backend/.env` allows `3000` and `3001` on both `localhost` and `127.0.0.1`, whichever app claims each port. Requests without an `Origin` header (curl, server-to-server) are always permitted.

### Backend setup

```bash
cd backend
npm install                 # postinstall runs prisma generate

cp .env.example .env        # adjust PORT, LOG_LEVEL, CORS_ORIGINS as needed

npm run db:push             # create dev.db and sync the schema
npm run db:seed             # load profile, projects, and skills (idempotent)

npm run dev                 # http://localhost:4000
```

The datasource URL is resolved to an absolute `file:` path by `backend/prisma7.config.ts` and `src/services/databaseUrl.ts`, so the CLI and the HTTP server always target the same `dev.db` regardless of the working directory.

Available database scripts: `db:push`, `db:generate`, `db:seed`, `db:studio`.

### Frontend setup

```bash
cd portfolio && npm install && npm run dev
cd abroad    && npm install && npm run dev
cd cms       && npm install && npm run dev -- --port 3001
```

`cms/.env.local` points the dashboard at the API:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
NEXT_PUBLIC_ASSET_BASE_URL=http://localhost:3001
```

`portfolio` reads `NEXT_PUBLIC_API_BASE_URL` too and defaults to `http://localhost:4000` when it is unset.

### Verification commands

| Module | Type check | Lint | Build |
| --- | --- | --- | --- |
| `backend` | `npm run typecheck` | - | `npm run build` |
| `cms` | `npm run typecheck` | `npm run lint` | `npm run build` |
| `portfolio` | `npx tsc --noEmit` | `npm run lint` | `npm run build` |
| `abroad` | `npx tsc --noEmit` | `npm run lint` | `npm run build` |

Suggested order: backend first (it publishes the contract), then `cms` (it consumes the full CRUD surface), then the client sites.

### Smoke checks

```bash
# backend liveness
curl http://localhost:4000/api/health

# collection envelope
curl http://localhost:4000/api/projects

# end-to-end write path
curl -X POST http://localhost:4000/api/messages \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"message\":\"hello\"}"
```

Then open `http://localhost:3001/messages` in the CMS and confirm the submission appears, and `http://localhost:3000` in the portfolio and confirm the profile and projects render from live data.

### Reset

```bash
cd backend
rm dev.db
npm run db:push && npm run db:seed
```