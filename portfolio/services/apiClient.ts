import type {
  IApiCollection,
  IApiMessage,
  IApiProfile,
  IApiProject,
  IApiSkill,
  ICreateMessagePayload,
} from "@/interface/api";

/**
 * Thin HTTP client for the Fastify Backend CMS.
 *
 * Every call is bounded by a timeout so an unreachable backend degrades into
 * the mock fallback quickly instead of hanging the render.
 */

/** Base URL of the backend; override with `NEXT_PUBLIC_API_BASE_URL`. */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000"
).replace(/\/+$/, "");

const REQUEST_TIMEOUT_MS = 4000;

/** Raised when the backend responds with a non-2xx status. */
export class ApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Extracts a readable message from a Fastify error envelope. */
function readErrorMessage(payload: unknown, fallback: string): string {
  if (isRecord(payload) && typeof payload["message"] === "string") {
    return payload["message"];
  }

  return fallback;
}

async function requestJson<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init?.body === undefined ? {} : { "Content-Type": "application/json" }),
        ...init?.headers,
      },
      cache: "no-store",
    });

    const text = await response.text();
    const payload: unknown = text === "" ? null : (JSON.parse(text) as unknown);

    if (!response.ok) {
      throw new ApiError(
        readErrorMessage(payload, `Request to ${path} failed.`),
        response.status,
      );
    }

    return payload as TResponse;
  } finally {
    clearTimeout(timeout);
  }
}

/** Parses a `{ count, data }` envelope defensively. */
function toCollection<TItem>(payload: unknown): IApiCollection<TItem> {
  if (!isRecord(payload) || !Array.isArray(payload["data"])) {
    return { count: 0, data: [] };
  }

  const data = payload["data"] as readonly TItem[];
  const count =
    typeof payload["count"] === "number" ? payload["count"] : data.length;

  return { count, data };
}

export async function fetchProfile(): Promise<IApiProfile> {
  return requestJson<IApiProfile>("/api/profile");
}

export async function fetchProjects(): Promise<readonly IApiProject[]> {
  const payload = await requestJson<unknown>("/api/projects");

  return toCollection<IApiProject>(payload).data;
}

export async function fetchSkills(): Promise<readonly IApiSkill[]> {
  const payload = await requestJson<unknown>("/api/skills");

  return toCollection<IApiSkill>(payload).data;
}

export async function postMessage(
  payload: ICreateMessagePayload,
): Promise<IApiMessage> {
  return requestJson<IApiMessage>("/api/messages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}