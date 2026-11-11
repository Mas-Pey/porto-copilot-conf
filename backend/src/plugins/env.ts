import fp from 'fastify-plugin';

import type { EnvConfig } from '../interface/env.js';
import { loadEnvConfig } from '../services/envService.js';

export interface EnvPluginOptions {
  /** Pre-resolved config, useful for tests. Defaults to `loadEnvConfig()`. */
  readonly config?: EnvConfig;
}

/**
 * Decorates the instance with the validated `config` object.
 * Registered first so every later plugin can rely on `fastify.config`.
 */
export const envPlugin = fp<EnvPluginOptions>(
  async (fastify, options) => {
    const config = options.config ?? loadEnvConfig();

    fastify.decorate('config', config);
  },
  {
    name: 'app-env',
  },
);

export default envPlugin;