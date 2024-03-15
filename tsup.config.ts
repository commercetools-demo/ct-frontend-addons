import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  entryPoints: ['src/index.ts', 'src/extensions.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
  outDir: 'dist',
  // minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  target: 'es2020',
});
