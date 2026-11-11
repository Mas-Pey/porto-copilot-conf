/**
 * Data contract for the `/api/health` endpoint.
 */

export type HealthStatus = 'ok' | 'degraded' | 'down';

export interface HealthCheckPayload {
  readonly status: HealthStatus;
  readonly service: string;
  readonly version: string;
  readonly environment: string;
  readonly uptimeSeconds: number;
  readonly timestamp: string;
}

/** Input required to build a health snapshot. */
export interface HealthSnapshotInput {
  readonly service: string;
  readonly version: string;
  readonly environment: string;
  /** Epoch milliseconds captured when the process started. */
  readonly startedAt: number;
}

/**
 * JSON Schema for the health response.
 * Fastify validates serialization against this schema, so the payload
 * can never drift from the documented contract.
 */
export const healthResponseSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'status',
    'service',
    'version',
    'environment',
    'uptimeSeconds',
    'timestamp',
  ],
  properties: {
    status: { type: 'string', enum: ['ok', 'degraded', 'down'] },
    service: { type: 'string' },
    version: { type: 'string' },
    environment: { type: 'string' },
    uptimeSeconds: { type: 'integer', minimum: 0 },
    timestamp: { type: 'string', format: 'date-time' },
  },
} as const;