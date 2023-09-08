module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    '@rushstack/eslint-config/profile/web-app',
    '@rushstack/eslint-config/mixins/react',
    'plugin:storybook/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    react: {
      version: '18.2.0'
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@tanstack/query', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    '@typescript-eslint/typedef': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-no-bind': 'off',
    '@rushstack/typedef-var': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index']
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ]
  }
};
