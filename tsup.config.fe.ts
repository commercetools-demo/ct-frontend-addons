import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/*/frontend/index.tsx'],
  format: ['esm','cjs'],
  dts: true,
  splitting: false,
  outDir: 'dist',
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  external: [],
  target: 'es2020',
});
