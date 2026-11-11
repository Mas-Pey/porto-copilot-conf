import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Canonical resolution of the SQLite connection string.
 *
 * `DATABASE_URL` may be relative (`file:./dev.db`), which is portable across
 * machines but resolves against the process CWD. That means the same config
 * points at different files depending on where the process was started.
 *
 * This module pins every `file:` URL to an absolute path anchored at the
 * `backend/` package root, so the CLI and the HTTP server always agree.
 *
 * NOTE: `prisma7.config.ts` imports this module on purpose. Keep the functions
 * free of side effects and free of imports from the server runtime.
 */

const FILE_PROTOCOL = 'file:';

/** Default relative location, also used by `.env.example`. */
export const DEFAULT_DATABASE_URL = 'file:./dev.db';

/**
 * Absolute path to the `backend/` package root.
 *
 * Both `src/services/` (tsx) and `dist/services/` (compiled) sit exactly two
 * levels below it, so the same expression works in every runtime.
 */
export const PACKAGE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
);

/** Prisma accepts POSIX-style paths on every platform, including Windows. */
function toPosixPath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

/** `file:///C:/x` -> `/C:/x` -> `C:/x`; `file:./dev.db` -> `./dev.db`. */
function stripUrlSlashes(rawPath: string): string {
  const withoutDoubleSlash = rawPath.startsWith('//')
    ? rawPath.replace(/^\/+/, '')
    : rawPath;

  // `/C:/dir/db.sqlite` is an absolute Windows path with a redundant slash.
  return /^\/[a-zA-Z]:[\\/]/.test(withoutDoubleSlash)
    ? withoutDoubleSlash.slice(1)
    : withoutDoubleSlash;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Resolves a `DATABASE_URL` value to an absolute `file:` URL.
 *
 * - Relative `file:` URLs are resolved against {@link anchorDir}.
 * - Absolute `file:` URLs are normalized to POSIX separators.
 * - In-memory databases and non-`file:` schemes are returned untouched.
 */
export function resolveDatabaseUrl(
  raw: string | undefined,
  anchorDir: string = PACKAGE_ROOT,
): string {
  const value = (raw ?? '').trim();
  const candidate = value === '' ? DEFAULT_DATABASE_URL : value;

  if (!candidate.startsWith(FILE_PROTOCOL)) {
    // `:memory:`, `postgres://…`, `libsql://…` and friends are left as-is.
    return candidate;
  }

  const rawPath = candidate.slice(FILE_PROTOCOL.length);

  // SQLite in-memory targets (`:memory:`, `:memory:?cache=shared`) keep the
  // special `:memory:` pseudo-path and must never be turned into a real path.
  if (rawPath === '' || rawPath.startsWith(':memory:') || rawPath.includes('mode=memory')) {
    return candidate;
  }

  const decoded = safeDecode(stripUrlSlashes(rawPath));

  const absolutePath = path.isAbsolute(decoded)
    ? decoded
    : path.resolve(anchorDir, decoded);

  return `${FILE_PROTOCOL}${toPosixPath(absolutePath)}`;
}

/** Convenience wrapper reading `process.env.DATABASE_URL`. */
export function resolveDatabaseUrlFromEnv(
  env: Readonly<Record<string, string | undefined>> = process.env,
  anchorDir: string = PACKAGE_ROOT,
): string {
  return resolveDatabaseUrl(env['DATABASE_URL'], anchorDir);
}

/** Filesystem path behind a resolved `file:` URL, for logging. */
export function databaseFileFromUrl(url: string): string {
  return url.startsWith(FILE_PROTOCOL) ? url.slice(FILE_PROTOCOL.length) : url;
}