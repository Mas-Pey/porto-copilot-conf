/**
 * Data contracts mirrored from the Fastify backend (`backend/src/interface/api.ts`).
 *
 * The CMS must never guess the transport shape: these DTOs are the single
 * source of truth for request bodies and responses coming from `/api`.
 */

/** KPI card rendered under the hero section of the public site. */
export interface IStatItem {
  readonly value: string;
  readonly label: string;
}

/** `Profile` row as returned by `GET /api/profile`. */
export interface IProfile {
  readonly id: number;
  readonly headline: string;
  readonly bio: string;
  readonly location: string;
  readonly status: string;
  readonly education: string;
  readonly stats: readonly IStatItem[];
  readonly updatedAt: string;
}

/** Body accepted by `PUT /api/profile`. All fields are required. */
export interface IUpdateProfileBody {
  readonly headline: string;
  readonly bio: string;
  readonly location: string;
  readonly status: string;
  readonly education: string;
  readonly stats: readonly IStatItem[];
}

/** `Project` row as returned by `GET /api/projects`. */
export interface IProject {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly techStack: readonly string[];
  readonly createdAt: string;
}

/** Body accepted by `POST /api/projects`. */
export interface ICreateProjectBody {
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly techStack: readonly string[];
}

/** Body accepted by `PUT /api/projects/:id`. */
export type IUpdateProjectBody = ICreateProjectBody;

/** `Skill` row as returned by `GET /api/skills`. */
export interface ISkill {
  readonly id: number;
  readonly name: string;
  readonly badgeUrl: string;
  readonly category: string;
}

/** Body accepted by `POST /api/skills`. */
export interface ICreateSkillBody {
  readonly name: string;
  readonly badgeUrl: string;
  readonly category: string;
}

/** `Message` row as returned by `GET /api/messages`. */
export interface IMessage {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly createdAt: string;
}

/** Body accepted by `POST /api/messages`. */
export interface ICreateMessageBody {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

/** Route params carrying a numeric resource id. */
export interface IIdParams {
  readonly id: number;
}

/** Envelope used by every list endpoint. */
export interface ICollectionResponse<TItem> {
  readonly count: number;
  readonly data: readonly TItem[];
}

/** Normalized Fastify error envelope (`400`, `401`, `404`, …). */
export interface IApiError {
  readonly statusCode: number;
  readonly error: string;
  readonly message: string;
}