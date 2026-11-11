/**
 * Data contracts for the REST API surface.
 *
 * These DTOs are the boundary between the HTTP layer and the service layer.
 * They intentionally mirror the columns of the Prisma models while keeping
 * transport concerns (validation, serialization) explicit.
 */

/** KPI card rendered under the hero section. */
export interface IStatItem {
  readonly value: string;
  readonly label: string;
}

/** `Profile` row as returned by the API. */
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

/** `Project` row as returned by the API. */
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
export interface IUpdateProjectBody extends ICreateProjectBody {}

/** `Skill` row as returned by the API. */
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

/** `Message` row as returned by the API. */
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

/** Envelope used for list responses. */
export interface ICollectionResponse<TItem> {
  readonly count: number;
  readonly data: readonly TItem[];
}