import jsLint from '@eslint/js';
import tsLint from 'typescript-eslint';

// structuredClone is not available in bun for some reason
// eslint-disable-next-line no-undef
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

export default [
  {
    ignores: ['src/client/**'],
  },
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
