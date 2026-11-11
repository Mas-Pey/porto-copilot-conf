/**
 * Data contracts for the Fastify Backend CMS.
 *
 * These mirror the JSON returned by `backend/` (see
 * `backend/src/interface/apiSchema.ts`). They are deliberately separate from
 * the presentation contracts in `interface/portfolio.ts`: the API describes
 * storage rows, the presentation layer describes rendered UI. The mapping
 * between the two lives in `services/portfolioMapper.ts`.
 */

/** One KPI card stored on the Profile row. */
export interface IApiStatItem {
  readonly value: string;
  readonly label: string;
}

/** `GET /api/profile` response body. */
export interface IApiProfile {
  readonly id: number;
  readonly headline: string;
  readonly bio: string;
  readonly location: string;
  readonly status: string;
  readonly education: string;
  readonly stats: readonly IApiStatItem[];
  readonly updatedAt: string;
}

/** `GET /api/projects` item. */
export interface IApiProject {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly techStack: readonly string[];
  readonly createdAt: string;
}

/** `GET /api/skills` item. */
export interface IApiSkill {
  readonly id: number;
  readonly name: string;
  readonly badgeUrl: string;
  readonly category: string;
}

/** `GET /api/messages` item, also returned by `POST /api/messages`. */
export interface IApiMessage {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly createdAt: string;
}

/** Common `{ count, data }` list envelope. */
export interface IApiCollection<TItem> {
  readonly count: number;
  readonly data: readonly TItem[];
}

/** Body accepted by `POST /api/messages` (the contact form). */
export interface ICreateMessagePayload {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}