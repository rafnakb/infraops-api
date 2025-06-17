import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2022,
      },
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'no-console': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
  eslintConfigPrettier,
];
