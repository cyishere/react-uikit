import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // tsup always injects `baseUrl: '.'` into the DTS build, which TS 6 reports
  // as a deprecation error. Silence it here so the shared tsconfig stays clean.
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0'
    }
  },
  sourcemap: true,
  // Never clean in watch mode: `dist/styles.css` is produced by a separate
  // styles build (build:css / dev:styles), and a `clean` on watch startup would
  // wipe it with nothing to regenerate it, breaking the docs dev server.
  clean: !options.watch,
  external: ['react', 'react-dom', 'uikit']
}));
