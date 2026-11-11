import 'dotenv/config';

import type {
  EnvConfig,
  LogLevel,
  NodeEnvironment,
} from '../interface/env.js';
import { resolveDatabaseUrlFromEnv } from './databaseUrl.js';

const LOG_LEVELS: readonly LogLevel[] = [
  'fatal',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
  'silent',
];

const NODE_ENVIRONMENTS: readonly NodeEnvironment[] = [
  'development',
  'production',
  'test',
];

const DEFAULT_PORT = 4000;
const DEFAULT_HOST = '0.0.0.0';
const FALLBACK_ORIGINS = 'http://localhost:3000,http://127.0.0.1:3000';

function parseNodeEnv(raw: string | undefined): NodeEnvironment {
  if (raw === undefined || raw.trim() === '') {
    return 'development';
  }

  const value = raw.trim();
  const match = NODE_ENVIRONMENTS.find((candidate) => candidate === value);

  if (match === undefined) {
    throw new Error(
      `Invalid NODE_ENV "${value}". Expected one of: ${NODE_ENVIRONMENTS.join(', ')}.`,
    );
  }

  return match;
}

function parsePort(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === '') {
    return DEFAULT_PORT;
  }

  const value = Number(raw.trim());

  if (!Number.isInteger(value) || value < 1 || value > 65535) {
    throw new Error(
      `Invalid PORT "${raw}". Expected an integer between 1 and 65535.`,
    );
  }

  return value;
}

function parseLogLevel(raw: string | undefined): LogLevel {
  if (raw === undefined || raw.trim() === '') {
    return 'info';
  }

  const value = raw.trim();
  const match = LOG_LEVELS.find((candidate) => candidate === value);

  if (match === undefined) {
    throw new Error(
      `Invalid LOG_LEVEL "${value}". Expected one of: ${LOG_LEVELS.join(', ')}.`,
    );
  }

  return match;
}

function parseCorsOrigins(raw: string | undefined): readonly string[] {
  const source = raw === undefined || raw.trim() === '' ? FALLBACK_ORIGINS : raw;

  return source
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

/**
 * Reads and validates the process environment into a frozen, typed object.
 * Throws on invalid values so misconfiguration fails fast at boot.
 */
export function loadEnvConfig(): EnvConfig {
  return Object.freeze({
    NODE_ENV: parseNodeEnv(process.env['NODE_ENV']),
    HOST: process.env['HOST']?.trim() || DEFAULT_HOST,
    PORT: parsePort(process.env['PORT']),
    LOG_LEVEL: parseLogLevel(process.env['LOG_LEVEL']),
    CORS_ORIGINS: Object.freeze(parseCorsOrigins(process.env['CORS_ORIGINS'])),
    SERVICE_NAME: process.env['SERVICE_NAME']?.trim() || 'config1-backend',
    SERVICE_VERSION: process.env['SERVICE_VERSION']?.trim() || '1.0.0',
    DATABASE_URL: resolveDatabaseUrlFromEnv(),
  });
}