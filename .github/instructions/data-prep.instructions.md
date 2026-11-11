---
description: Data separation rules for mock data and future Backend CMS (React Query) migration
applyTo: "**/{portfolio,abroad}/**/*.{ts,tsx}"
---
# Data Layer Separation & Backend Migration Readiness

To ensure clean separation of concerns and seamless future migration to a Backend CMS API (via React Query):

1. **Type Contracts (`interface/`)**:
  - Define all data structures and entity models inside `interface/` (e.g., `IProfile`, `ISkill`, `IProject`).
2. **Mock/Dummy Data (`services/`)**:
  - Store all dummy/static content (such as portfolio profile details, selected projects, skills, or abroad programs) inside `services/mockData.ts` or dedicated service files (e.g., `services/portfolioService.ts`).
  - Make it easy to swap or edit dummy data in one centralized file without touching UI components.
3. **Hook Abstraction (`hooks/`)**:
  - Create custom hooks inside `hooks/` (e.g., `usePortfolioData`, `useProjects`) that fetch from `services/`.
  - Currently, these hooks return the dummy data from `services/`, but they must be structured so they can later be replaced with `useQuery` (React Query) hitting a real Backend API without modifying any code in the `Presentation Layer` (`components/` or `app/`).