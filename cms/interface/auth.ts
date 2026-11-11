/**
 * Auth contracts for the CMS session.
 *
 * `any` is banned across the workspace, so the authenticated principal is
 * described explicitly and can be narrowed by the backend later without
 * touching the store or the HTTP client.
 */

/** Role granted by the backend once authentication lands. */
export type TAuthRole = "admin" | "editor";

/** Authenticated principal persisted alongside the bearer token. */
export interface IAuthUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly role: TAuthRole;
}