import { defineConfig, UserConfig } from 'vite';

// Storybook's vite builder auto-merges this file. Keep it minimal: only the CSS-module
// and SCSS settings the components rely on. The full library build lives in
// vite.lib.config.ts (used by `npm run build` via --config) so its lib mode, peer-dep
// externalization and build-only plugins never leak into the Storybook bundle.
const config: UserConfig = {
  css: {
    modules: {
      generateScopedName: '[local]-[hash:8]',
      localsConvention: undefined,
    },
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
};

export default defineConfig(config);
