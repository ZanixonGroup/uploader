import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['./src/index.ts'],
  outExtension({ format }) {
    if (format === 'cjs') return { js: '.cjs' };
    if (format === 'esm') return { js: '.mjs' };
    return { js: '.js' };
  },
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
});