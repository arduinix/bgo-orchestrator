const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin')
const eslintRecommended = require('eslint/conf/eslint-recommended')
const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin/dist/configs/recommended')
const airbnbBase = require('eslint-config-airbnb-base/rules')

module.exports = [
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        browser: true,
        node: true,
        es2020: true,
      },
    },
    ignores: ['node_modules/', 'dist/'],
    rules: {
      semi: ['error', 'always'],
      'no-console': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    ...eslintRecommended,
    ...typescriptEslintRecommended,
    ...airbnbBase,
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
    },
  },
]
