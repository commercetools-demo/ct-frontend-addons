import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*/frontend/index.tsx'],
  format: ['esm','cjs'],
  dts: true,
  splitting: true,
  outDir: 'dist',
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  external: [],
  target: 'es2020',
});
