import { Type, type Static } from '@sinclair/typebox';

/**
 * TypeBox schemas for the REST API.
 *
 * Schemas serve two purposes:
 * 1. Fastify validates/normalizes request payloads against them.
 * 2. Fastify serializes responses through them, so a handler can never leak
 *    a field that is not part of the published contract.
 *
 * The `Static<>` types are the single source of truth for request types;
 * `interface/api.ts` documents the externally visible DTO shapes.
 */

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

export const IdParamsSchema = Type.Object(
  {
    id: Type.Integer({ minimum: 1 }),
  },
  { additionalProperties: false },
);

export type IdParams = Static<typeof IdParamsSchema>;

export const StatsSchema = Type.Array(
  Type.Object(
    {
      value: Type.String({ minLength: 1, maxLength: 32 }),
      label: Type.String({ minLength: 1, maxLength: 120 }),
    },
    { additionalProperties: false },
  ),
  { maxItems: 12 },
);

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const ProfileSchema = Type.Object(
  {
    id: Type.Integer(),
    headline: Type.String(),
    bio: Type.String(),
    location: Type.String(),
    status: Type.String(),
    education: Type.String(),
    stats: StatsSchema,
    updatedAt: Type.String({ format: 'date-time' }),
  },
  { additionalProperties: false },
);

export type ProfileDto = Static<typeof ProfileSchema>;

export const UpdateProfileBodySchema = Type.Object(
  {
    headline: Type.String({ minLength: 1, maxLength: 200 }),
    bio: Type.String({ minLength: 1, maxLength: 5000 }),
    location: Type.String({ minLength: 1, maxLength: 120 }),
    status: Type.String({ minLength: 1, maxLength: 60 }),
    education: Type.String({ minLength: 1, maxLength: 160 }),
    stats: StatsSchema,
  },
  { additionalProperties: false },
);

export type UpdateProfileBody = Static<typeof UpdateProfileBodySchema>;

/* ------------------------------------------------------------------ */
/* Project                                                             */
/* ------------------------------------------------------------------ */

export const ProjectSchema = Type.Object(
  {
    id: Type.Integer(),
    title: Type.String(),
    description: Type.String(),
    category: Type.String(),
    imageUrl: Type.String(),
    techStack: Type.Array(Type.String()),
    createdAt: Type.String({ format: 'date-time' }),
  },
  { additionalProperties: false },
);

export type ProjectDto = Static<typeof ProjectSchema>;

export const CreateProjectBodySchema = Type.Object(
  {
    title: Type.String({ minLength: 1, maxLength: 160 }),
    description: Type.String({ minLength: 1, maxLength: 2000 }),
    category: Type.String({ minLength: 1, maxLength: 60 }),
    imageUrl: Type.String({ minLength: 1, maxLength: 500 }),
    techStack: Type.Array(Type.String({ minLength: 1, maxLength: 60 }), {
      minItems: 1,
      maxItems: 20,
    }),
  },
  { additionalProperties: false },
);

export type CreateProjectBody = Static<typeof CreateProjectBodySchema>;

export const UpdateProjectBodySchema = CreateProjectBodySchema;

export type UpdateProjectBody = Static<typeof UpdateProjectBodySchema>;

/* ------------------------------------------------------------------ */
/* Skill                                                               */
/* ------------------------------------------------------------------ */

export const SkillSchema = Type.Object(
  {
    id: Type.Integer(),
    name: Type.String(),
    badgeUrl: Type.String(),
    category: Type.String(),
  },
  { additionalProperties: false },
);

export type SkillDto = Static<typeof SkillSchema>;

export const CreateSkillBodySchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 120 }),
    badgeUrl: Type.String({ minLength: 1, maxLength: 500 }),
    category: Type.String({ minLength: 1, maxLength: 60 }),
  },
  { additionalProperties: false },
);

export type CreateSkillBody = Static<typeof CreateSkillBodySchema>;

/* ------------------------------------------------------------------ */
/* Message                                                             */
/* ------------------------------------------------------------------ */

export const MessageSchema = Type.Object(
  {
    id: Type.Integer(),
    name: Type.String(),
    email: Type.String(),
    message: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
  },
  { additionalProperties: false },
);

export type MessageDto = Static<typeof MessageSchema>;

export const CreateMessageBodySchema = Type.Object(
  {
    name: Type.String({ minLength: 1, maxLength: 120 }),
    email: Type.String({ format: 'email', maxLength: 200 }),
    message: Type.String({ minLength: 1, maxLength: 5000 }),
  },
  { additionalProperties: false },
);

export type CreateMessageBody = Static<typeof CreateMessageBodySchema>;

/* ------------------------------------------------------------------ */
/* Generic envelopes                                                   */
/* ------------------------------------------------------------------ */

export const ApiErrorSchema = Type.Object(
  {
    statusCode: Type.Integer(),
    error: Type.String(),
    message: Type.String(),
  },
  { additionalProperties: false },
);

/** `{ count, data }` list envelope for a given item schema. */
export function collectionResponse<TItem extends ReturnType<typeof Type.Object>>(
  item: TItem,
) {
  return Type.Object(
    {
      count: Type.Integer(),
      data: Type.Array(item),
    },
    { additionalProperties: false },
  );
}