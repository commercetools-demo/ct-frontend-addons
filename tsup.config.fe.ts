import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm','cjs'],
  dts: true,
  splitting: true,
  outDir: 'dist',
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  target: 'es2020',
});
