import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import packageJson from './package.json' assert { type: 'json' };

const externalDependencies = [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime'];

const config: UserConfig = {
  define: {
    'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
  },
  mode: 'production',
  plugins: [
    dts({
      tsconfigPath: './tsconfig.lib.json',
      entryRoot: './src',
      outDir: './dist/src',
    }),
    react(),
    checker({
      overlay: false,
      typescript: {
        tsconfigPath: './tsconfig.lib.json',
      },
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    visualizer({
      filename: './dist/bundle-stats.html',
      title: '@tedi-design-system/react bundle stats',
    }),
    viteStaticCopy({
      targets: [
        {
          src: ['package.json', 'README.md'],
          dest: './',
        },
        {
          src: './node_modules/@tedi-design-system/core/fonts',
          dest: './',
        },
      ],
    }),
  ],
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
  build: {
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    emptyOutDir: true,
    cssCodeSplit: false,
    copyPublicDir: false,
    lib: {
      entry: {
        community: resolve(__dirname, './src/community/index.ts'),
        tedi: resolve(__dirname, './src/tedi/index.ts'),
      },
      name: '@tedi-design-system/react',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName.replace(/node_modules\//g, 'external/')}.${format}.js`,
    },
    rollupOptions: {
      external: (id) => externalDependencies.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
      output: {
        preserveModules: true,
        dir: resolve(__dirname, 'dist'),
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name || '';
        },
      },
      plugins: [preserveDirectives()],
    },
  },
};

export default defineConfig(config);
