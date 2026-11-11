---
name: init-project
description: Initialize Next.js apps for abroad and portfolio with the 4-Layer Architecture and Atomic Design folders
agent: agent
---
Please initialize the workspace structure for `abroad` and `portfolio` following these exact steps:

1. Check if the `abroad` and `portfolio` directories already exist. If not, scaffold Next.js applications using `npx create-next-app@latest` (with TypeScript, Tailwind CSS, ESLint, App Router, and `--use-npm` or `--use-pnpm` non-interactively) for both `abroad` and `portfolio`.
2. Inside BOTH `abroad` and `portfolio` projects, create the missing directories required by our **4-Layer Architecture**:
   - **Data Layer**: `services/`, `interface/`
   - **Logic Layer**: `hooks/`, `utils/`, `store/`
   - **Presentation Layer**: `assets/`, `components/atoms/`, `components/molecules/`, `components/organisms/`
3. Verify the folder tree is clean and ready for UI slicing.