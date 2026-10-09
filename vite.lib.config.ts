/* eslint-disable prettier/prettier */
import react from '@vitejs/plugin-react';
import { appendFileSync, copyFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, Plugin, UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import packageJson from './package.json' with { type: 'json' };

const externalDependencies = [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime'];

const coreIconsDir = './node_modules/@tedi-design-system/core/icons';

/**
 * The bundled CSS has no icon fonts (styles use core's index-without-icons). Keep index.css
 * backward compatible by appending all three Material Symbols styles to it, and ship the
 * icon-less bundle as index-without-icons.css so apps can pair it with one icons/<style>.css.
 * Font URLs are written as /fonts/ to match the rest of the bundle; the build script rewrites them.
 */
const iconStylesheets = (): Plugin => ({
  name: 'tedi-icon-stylesheets',
  apply: 'build',
  closeBundle() {
    const indexCss = resolve(__dirname, 'dist/index.css');
    copyFileSync(indexCss, resolve(__dirname, 'dist/index-without-icons.css'));
    const allIcons = readFileSync(resolve(__dirname, coreIconsDir, 'all.css'), 'utf8');
    appendFileSync(indexCss, allIcons.replace(/\.\.\/fonts\//g, '/fonts/'));
  },
});

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
          src: ['package.json', 'README.md', 'component.manifest.json', 'DESIGN.md'],
          dest: './',
        },
        {
          src: './node_modules/@tedi-design-system/core/fonts',
          dest: './',
        },
        {
          src: `${coreIconsDir}/*.css`,
          dest: './icons',
        },
      ],
    }),
    iconStylesheets(),
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
