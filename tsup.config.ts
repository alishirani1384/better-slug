import { defineConfig } from 'tsup';

export default defineConfig([
  // Main build
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: true,
    outDir: 'dist',
  },
  // CLI build
  {
    entry: ['src/cli.ts'],
    format: ['esm'],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: false,
    outDir: 'dist',
    banner: {
      js: '#!/usr/bin/env node'
    },
    esbuildOptions(options) {
      options.platform = 'node';
      options.packages = 'external';
    },
  },
  // Locales build
  {
    entry: ['src/locales/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: false,
    clean: false,
    outDir: 'dist/locales',
  }
]);