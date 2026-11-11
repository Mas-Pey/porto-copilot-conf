---
description: Fastify backend development rules, plugin encapsulation, and strict validation
applyTo: "backend/**/*.ts"
---
# Fastify Backend Architectural Standards

To ensure a clean, production-ready backend service:

1. **Plugin Encapsulation**:
  - Every feature or route group must be encapsulated as a Fastify plugin using `fastify-plugin`.
2. **Schema Validation**:
  - Strictly use schema validation (Zod / TypeBox) for request bodies, query parameters, and route parameters.
3. **Layered Separation**:
  - Keep route handlers clean; isolate business logic into a dedicated `services/` or `controllers/` layer.
4. **Strict TypeScript & Logging**:
  - Absolutely NO `any` types. Use structured logging via Pino for error tracking.