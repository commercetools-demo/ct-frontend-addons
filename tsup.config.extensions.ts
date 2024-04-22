import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/extensions.ts'],
  format: ['esm'],
  dts: true,
  splitting: true,
  outDir: 'dist',
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  target: 'es2020',
});
