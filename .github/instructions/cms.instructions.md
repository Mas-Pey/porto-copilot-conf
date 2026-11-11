---
applyTo: "cms/**/*.{ts,tsx}"
---

# CMS Dashboard Architecture & Development Guidelines

1. **Tech Stack & Libraries**:
   - Framework: Next.js (App Router) + TypeScript + Tailwind CSS (dark neutral theme matching `portfolio`).
   - Data Fetching: `@tanstack/react-query` (v5) for server state management (`useQuery`, `useMutation`).
   - HTTP Client: `axios` strictly wrapped via `satellite.ts`. Direct raw axios/fetch calls are banned.
   - Form & Data Validation: `zod` for schemas and runtime validations.
   - Global Client State & Auth: `zustand` (with persist middleware for token handling).

2. **Network Layer (`satellite.ts`)**:
   - Location: `cms/src/lib/satellite.ts` (or `cms/services/satellite.ts`).
   - Responsibilities:
     * Base Axios instance configured with `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:4000/api`).
     * Request interceptor: automatically reads Bearer token from Zustand auth store / storage and injects `Authorization: Bearer <token>` into headers.
     * Response interceptor: handles normalized error responses and triggers logout/redirect on 401 Unauthorized.

3. **Service & Query Conventions**:
   - Service functions in `services/` wrap `satellite` calls and return strictly typed data.
   - UI components must consume data via TanStack Query custom hooks (`useProjects`, `useCreateProject`, etc.).
   - Mutations must invalidate relevant query keys upon success.

4. **Code Quality**:
   - Strictly zero `any`.
   - Zod schemas must be used to infer TypeScript types for form inputs (`z.infer<typeof Schema>`).