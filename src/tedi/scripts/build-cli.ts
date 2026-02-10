import { build } from 'esbuild';

build({
  entryPoints: ['src/tedi/scripts/import-figma-theme.ts'],
  outfile: 'dist/scripts/import-figma-theme.cjs',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node18',
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  external: ['commander', 'fs', 'path'],
  minify: true,
  sourcemap: false,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
