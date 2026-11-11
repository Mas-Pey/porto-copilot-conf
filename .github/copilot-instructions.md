# Project Architecture & Global Rules

This repository contains two main Next.js applications/modules: `abroad` and `portfolio`.
Core Tech Stack: Next.js (App Router), TypeScript, Tailwind CSS.

## 4-Layer Architecture Standard
Both `abroad` and `portfolio` MUST strictly follow this 4-layer directory structure:
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

## Strict Coding Rules
- **NO `any` type**: Strictly forbidden to use `any` in TypeScript. Always define explicit interfaces in the `interface/` directory.
- **No Hardcoded Content in UI**: Never hardcode dynamic or list data (e.g., project lists, skill lists, profile bio) directly inside `components/`. Always place dummy data in `services/` and pass it down via props or custom hooks.