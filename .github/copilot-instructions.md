# Project Architecture & Global Rules

This repository contains multi-module applications:
- `abroad`: Next.js (App Router), TypeScript, Tailwind CSS
- `portfolio`: Next.js (App Router), TypeScript, Tailwind CSS
- `backend`: Node.js, Fastify, TypeScript

## Frontend Architecture Standard (abroad & portfolio)
Both frontend modules MUST strictly follow this 4-layer directory structure:
1. **Infra Layer**: `.next/`, `node_modules/`, `public/`
2. **Data Layer**: 
   - `services/` (API fetchers, data services, and mock/dummy data)
   - `interface/` (TypeScript interfaces and type definitions)
3. **Logic Layer**: 
   - `hooks/` (Custom React hooks and future React Query hooks)
   - `utils/` (Helper functions)
   - `store/` (State management)
4. **Presentation Layer**: 
   - `app/` (Next.js App Router pages and layouts)
   - `components/` (UI components strictly divided into `/atoms`, `/molecules`, `/organisms`)
   - `assets/` (Static images, icons, fonts)

## Backend Architecture Standard (backend)
The Fastify backend service follows a modular plugin-driven pattern:
1. **Infra / Entry**: `src/index.ts`, `node_modules/`, `dist/`
2. **Plugins**: `src/plugins/` (Encapsulated Fastify plugins, CORS, Sensible, DB connections)
3. **Routes**: `src/routes/` (Route handlers registered as plugins)
4. **Logic / Services**: `src/services/` (Business logic and database queries)
5. **Data Contracts**: `src/interface/` (Strict TypeScript types/DTOs, schemas)

## Strict Global Coding Rules
- **NO `any` type**: Strictly forbidden to use `any` in TypeScript across all modules. Always define explicit interfaces or schemas.
- **No Hardcoded Content in UI**: Never hardcode dynamic or list data directly inside `components/`. Place mock/fetched data in `services/` and consume via custom hooks.
- **KISS & Clean Code**: Keep modules decoupled, focused, and maintainable.