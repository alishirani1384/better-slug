import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
    'locales/index': 'src/locales/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  shims: true,
  treeshake: true,
  outDir: 'dist',
  target: 'es2020',
  platform: 'neutral',
  banner: {
    js: '#!/usr/bin/env node',
  },
});