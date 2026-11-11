/**
 * Data contract for the runtime environment configuration.
 * Values are resolved once at boot time by `services/envService.ts`.
 */

export type LogLevel =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'debug'
  | 'trace'
  | 'silent';

export type NodeEnvironment = 'development' | 'production' | 'test';

export interface EnvConfig {
  readonly NODE_ENV: NodeEnvironment;
  readonly HOST: string;
  readonly PORT: number;
  readonly LOG_LEVEL: LogLevel;
  /** Allowed CORS origins. An empty list means "deny all cross-origin requests". */
  readonly CORS_ORIGINS: readonly string[];
  readonly SERVICE_NAME: string;
  readonly SERVICE_VERSION: string;
  /**
   * Absolute `file:` URL for the SQLite datasource.
   * Always resolved against the `backend/` package root, never the CWD.
   */
  readonly DATABASE_URL: string;
}