require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    '@rushstack/eslint-config/profile/web-app',
    '@rushstack/eslint-config/mixins/react'
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    react: {
      version: '18.2.0'
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@tanstack/query'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error'
  }
};
