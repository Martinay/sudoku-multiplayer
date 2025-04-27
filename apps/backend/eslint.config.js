import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import securityPlugin from 'eslint-plugin-security';
import unicornPlugin from 'eslint-plugin-unicorn';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  globalIgnores(['**/*.generated.ts']),
  // Security
  securityPlugin.configs.recommended,
  {
    files: ['**/*.ts'],
  },
  {
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      'func-style': ['error', 'expression'],
      'no-restricted-syntax': ['off', 'ForOfStatement'],
      'no-console': ['off'],
      'prefer-template': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
  // TypeScript Eslint
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
  // Unicorn
  {
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      'unicorn/empty-brace-spaces': 'off',
      'unicorn/no-null': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tsPlugin.configs.recommended,
  eslintPluginPrettier,
  {
    files: ['src/schema/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
