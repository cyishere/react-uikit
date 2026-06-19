import { defineConfig } from 'tsup';

export default defineConfig({
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
  clean: true,
  external: ['react', 'react-dom', 'uikit']
});
