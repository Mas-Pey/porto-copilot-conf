import type {
  HealthCheckPayload,
  HealthSnapshotInput,
  HealthStatus,
} from '../interface/health.js';

/**
 * Builds an immutable health snapshot for the service.
 * Pure function: no I/O, no hidden state, easy to unit test.
 */
export function buildHealthCheck(
  input: HealthSnapshotInput,
  now: number = Date.now(),
): HealthCheckPayload {
  const uptimeMs = Math.max(0, now - input.startedAt);

  return {
    status: 'ok',
    service: input.service,
    version: input.version,
    environment: input.environment,
    uptimeSeconds: Math.floor(uptimeMs / 1000),
    timestamp: new Date(now).toISOString(),
  };
}

/** Maps a health status to the HTTP status code the endpoint should return. */
export function resolveHttpStatus(status: HealthStatus): 200 | 503 {
  return status === 'ok' ? 200 : 503;
}