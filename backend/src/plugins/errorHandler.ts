import fp from 'fastify-plugin';

/** Minimal shape of an HTTP-aware error (Fastify error or `@fastify/sensible`). */
interface HttpErrorLike {
  readonly statusCode: number;
  readonly name: string;
  readonly message: string;
}

function isHttpErrorLike(value: unknown): value is HttpErrorLike {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate['statusCode'] === 'number' &&
    typeof candidate['name'] === 'string' &&
    typeof candidate['message'] === 'string'
  );
}

function toHttpError(error: unknown): HttpErrorLike {
  if (isHttpErrorLike(error)) {
    return error;
  }

  return {
    statusCode: 500,
    name: error instanceof Error ? error.name : 'InternalServerError',
    message:
      error instanceof Error ? error.message : 'An unexpected error occurred.',
  };
}

/**
 * Translates uncaught errors into a uniform JSON envelope.
 *
 * - HTTP-aware errors (Fastify / `@fastify/sensible`) keep their status and message.
 * - Unexpected errors are logged at `error` level and masked from the client.
 */
export const errorHandlerPlugin = fp(
  async (fastify) => {
    fastify.setErrorHandler((error, request, reply) => {
      const normalized = toHttpError(error);
      const statusCode =
        normalized.statusCode >= 400 && normalized.statusCode <= 599
          ? normalized.statusCode
          : 500;

      if (statusCode >= 500) {
        request.log.error(
          { err: error, method: request.method, url: request.url },
          'Unhandled request error',
        );
      } else {
        request.log.warn(
          {
            statusCode,
            method: request.method,
            url: request.url,
            message: normalized.message,
          },
          'Request rejected',
        );
      }

      void reply.status(statusCode).send({
        statusCode,
        error: statusCode >= 500 ? 'InternalServerError' : normalized.name,
        message:
          statusCode >= 500
            ? 'An unexpected error occurred. Please try again later.'
            : normalized.message,
      });
    });

    fastify.setNotFoundHandler((request, reply) => {
      void reply.status(404).send({
        statusCode: 404,
        error: 'NotFound',
        message: `Route ${request.method} ${request.url} not found.`,
      });
    });
  },
  {
    name: 'app-error-handler',
  },
);

export default errorHandlerPlugin;