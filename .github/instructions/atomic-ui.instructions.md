---
description: Atomic Design rules for UI components in Presentation Layer
applyTo: "**/components/**/*.tsx"
---
# Atomic Design Rules (Presentation Layer)

All UI components inside `components/` MUST be strictly categorized into Atomic Design directories:
- `/atoms`: The smallest, indivisible building blocks (e.g., Button, Badge, Input, Typography, Icon, Avatar).
- `/molecules`: Simple groups of atoms functioning together as a unit (e.g., SearchBar, ProjectCard, SkillBadgeGroup, NavItem).
- `/organisms`: Complex, distinct UI sections composed of molecules and atoms (e.g., Navbar, HeroSection, ProjectShowcaseGrid, Footer).

## Component Implementation Guidelines
- **Purely Presentational**: Components in `/atoms` and `/molecules` must be strictly presentational and receive data exclusively via `props`.
- **Strict Typing**: Component prop interfaces must be imported from the `interface/` directory (Data Layer) or explicitly typed without `any`.
- **No Direct Data Fetching**: Never fetch data or hardcode static arrays directly inside `/atoms` or `/molecules`.