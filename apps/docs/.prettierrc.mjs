import base from '../../.prettierrc.json' with { type: 'json' };

/** @type {import("prettier").Config} */
export default {
  ...base,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
};
