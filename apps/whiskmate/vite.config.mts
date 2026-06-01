/// <reference types="vitest" />

import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

import { playwright } from '@vitest/browser-playwright';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [angular(), nxViteTsPaths()],

  test: {
    globals: true,

    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },

    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
