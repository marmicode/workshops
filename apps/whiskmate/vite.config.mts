import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [angular({ jit: false }), nxViteTsPaths()],
  define: {
    'import.meta.vitest': true,
  },
});
