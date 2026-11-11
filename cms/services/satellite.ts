import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type { IApiError } from "@/interface/api";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * `satellite` — the single HTTP gateway to the Fastify backend.
 *
 * Direct `fetch`/`axios` calls anywhere else in the app are banned: every
 * request must travel through this instance so the bearer token, error
 * normalization, and the 401 handling stay in one place.
 */

/** Base URL of the backend REST API. */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api"
).replace(/\/+$/, "");

/** Upper bound for a request so an unreachable backend cannot hang the UI. */
const REQUEST_TIMEOUT_MS = 15000;

/** Normalized failure surfaced to TanStack Query and the forms. */
export class ApiError extends Error {
  public readonly status: number;
  public readonly details: IApiError | null;

  constructor(message: string, status: number, details: IApiError | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Extracts a readable message from a Fastify error envelope. */
function readErrorMessage(payload: unknown, fallback: string): string {
  if (isRecord(payload) && typeof payload.message === "string") {
    return payload.message;
  }

  return fallback;
}

export const satellite: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ------------------------------------------------------------------ */
/* Request: attach the bearer token                                    */
/* ------------------------------------------------------------------ */

satellite.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore.getState();

    if (token !== null && token.length > 0) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

/* ------------------------------------------------------------------ */
/* Response: normalize errors, drop the session on 401                 */
/* ------------------------------------------------------------------ */

satellite.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(
        new ApiError("Unexpected client error. Please retry.", 0),
      );
    }

    const axiosError = error as AxiosError<unknown>;
    const status = axiosError.response?.status ?? 0;
    const payload = axiosError.response?.data;
    const details = isRecord(payload) && typeof payload.statusCode === "number"
      ? (payload as unknown as IApiError)
      : null;

    if (status === 401) {
      useAuthStore.getState().logout();
    }

    const fallback =
      status === 0
        ? "Cannot reach the API. Check that the backend is running."
        : axiosError.message;

    return Promise.reject(
      new ApiError(readErrorMessage(payload, fallback), status, details),
    );
  },
);

export default satellite;