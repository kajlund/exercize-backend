import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // 1. Load the environment variables for the current mode (e.g., 'test')
  // By default, this loads from .env.test and .env
  const env = loadEnv(mode, process.cwd(), '');
  // 2. You can use these variables to dynamically configure Vitest
  const TEST_TIMEOUT = parseInt(env.VITE_TEST_TIMEOUT || '10000', 10);

  return {
    test: {
      globals: true,
      environment: 'node',
      testTimeout: TEST_TIMEOUT,

      // Example: Setting a global variable accessible in tests
      // Note: All variables loaded this way are available in the config
      setupFiles: ['./vitest.setup.js'],

      // If you are using Vitest's process.env access in tests, the automatic
      // loading mechanisms are usually sufficient. This is primarily for config.
    },
  };
});
