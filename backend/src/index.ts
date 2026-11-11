import { buildApp } from './app.js';
import type { EnvConfig } from './interface/env.js';
import { loadEnvConfig } from './services/envService.js';

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function main(): Promise<void> {
  let config: EnvConfig;

  try {
    config = loadEnvConfig();
  } catch (error) {
    console.error('[bootstrap] Invalid environment configuration:', error);
    process.exit(1);
  }

  const app = await buildApp({ config });

  const shutdown = async (signal: NodeJS.Signals, exitCode: number): Promise<void> => {
    app.log.info({ signal }, 'Shutting down gracefully');

    const timer = setTimeout(() => {
      app.log.error('Graceful shutdown timed out, forcing exit');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);

    timer.unref();

    try {
      await app.close();
      process.exit(exitCode);
    } catch (error) {
      app.log.error({ err: error }, 'Error during shutdown');
      process.exit(1);
    }
  };

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      void shutdown(signal, 0);
    });
  }

  process.on('unhandledRejection', (reason) => {
    app.log.error({ err: reason }, 'Unhandled promise rejection');
  });

  process.on('uncaughtException', (error) => {
    app.log.fatal({ err: error }, 'Uncaught exception, shutting down');
    void shutdown('SIGTERM', 1);
  });

  try {
    await app.listen({ port: config.PORT, host: config.HOST });
    app.log.info(
      {
        environment: config.NODE_ENV,
        healthUrl: `http://${config.HOST}:${config.PORT}/api/health`,
      },
      `${config.SERVICE_NAME} v${config.SERVICE_VERSION} is ready`,
    );
  } catch (error) {
    app.log.error({ err: error }, 'Failed to start HTTP server');
    process.exit(1);
  }
}

void main();