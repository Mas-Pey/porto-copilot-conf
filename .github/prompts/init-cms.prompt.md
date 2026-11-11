---
name: init-cms
description: Initialize Next.js CMS with 4-Layer Architecture, TanStack Query, Axios (satellite.ts), Zod, and Zustand Auth
agent: agent
---
Please initialize the workspace structure for the `cms` dashboard application with the following steps:

1. **Root Gitignore Check**:
   - Check the root `.gitignore`. Ensure `cms/.next/`, `cms/out/`, `cms/node_modules/`, and `cms/.env*.local` are ignored under `# CMS App`.

2. **Scaffold Next.js App**:
   - Check if the `cms` directory exists. If not, scaffold a clean Next.js app inside `cms`:
     - App Router, TypeScript, Tailwind CSS, ESLint, `--use-npm`.
   - Install required dependencies inside `cms`:
     `npm install axios @tanstack/react-query zod zustand lucide-react`

3. **4-Layer Architecture & Core Foundations**:
   - Create directories:
     * `services/`, `interface/` (or `types/`)
     * `hooks/`, `utils/`, `store/`
     * `components/atoms/`, `components/molecules/`, `components/organisms/`, `components/templates/`, `components/providers/`
   
4. **Implement Foundation Files**:
   - **Environment**: Create `cms/.env.local` with `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api`.
   - **Auth Store (`store/useAuthStore.ts`)**:
     * Zustand store with `persist` middleware storing `token: string | null`, `user: any | null`, `setToken`, and `logout`.
   - **HTTP Client Satellite (`services/satellite.ts` or `lib/satellite.ts`)**:
     * Axios instance pointing to `process.env.NEXT_PUBLIC_API_BASE_URL`.
     * Request interceptor attaching `Authorization: Bearer ${token}` from `useAuthStore`.
     * Response interceptor handling errors gracefully.
   - **React Query Provider (`components/providers/QueryProvider.tsx`)**:
     * Wrap children with `QueryClientProvider` and configure default stale times. Connect it to `app/layout.tsx`.
   - **API Types & DTOs (`interface/api.ts`)**:
     * Mirror backend DTOs for `Profile`, `Project`, `Skill`, and `Message`.
   - **Tailwind & Theme**:
     * Align `tailwind.config.ts` and base styles with the dark neutral theme from `portfolio`.

5. **Verification**:
   - Run `npm run typecheck` inside `cms/` to ensure zero compilation or type errors.