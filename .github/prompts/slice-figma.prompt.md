---
name: slice-figma
description: Slice Figma designs into Next.js Atomic Design components via Figma MCP
agent: agent
---
Please slice the UI from the provided Figma link into the specified target module (`abroad` or `portfolio`) following this exact orchestration workflow:

1. **Inspect Figma via MCP**:
  - Use the Figma MCP tool (`@com.figma.mcp/mcp`) to read the node structure, layout, typography, colors, spacing, and assets from the provided Figma URL.
2. **Deconstruct into Atomic Design (`Presentation Layer`)**:
  - Break down the UI into reusable components inside `components/atoms/`, `components/molecules/`, and `components/organisms/`.
  - Assemble the final section or page inside `app/`.
3. **Separate Data & Interfaces (`Data` & `Logic Layer`)**:
  - Do NOT hardcode dynamic text lists, profile details, or project items inside UI components.
  - Create TypeScript interfaces in `interface/`.
  - Place mock/dummy data inside `services/`.
  - Create or update a custom hook in `hooks/` to supply the data to the presentation layer (ready for future React Query / Backend CMS integration).
4. **Styling & Responsiveness**:
  - Implement clean, responsive Tailwind CSS classes matching the exact Figma specifications.