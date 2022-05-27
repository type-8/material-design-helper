/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const { rules: airbnbStyleRules } = require('eslint-config-airbnb-base/rules/style');
/* eslint-enable */

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'solid',
    'import',
    'jsdoc',
  ],
  extends: [
    'eslint:recommended',
    'plugin:solid/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  rules: {
    'max-len': ['error', 140, 2, airbnbStyleRules['max-len'][3]],

    'no-console': PROD ? 'error' : 'warn',
    'no-debugger': PROD ? 'error' : 'warn',
    '@typescript-eslint/no-unused-vars': PROD ? 'error' : 'warn',

    'no-void': 'off',
    'no-plusplus': 'off',
    'no-multi-assign': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-globals': 'off',
    'no-restricted-exports': ['error', { restrictedNamedExports: ['then'] }],

    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/naming-convention': 'off',

    'solid/reactivity': 'off',

    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      pathGroupsExcludedImportTypes: ['builtin', 'type'],
      alphabetize: { order: 'asc' },
      'newlines-between': 'never',
    }],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',

    'jsdoc/require-jsdoc': 'off',
    'jsdoc/newline-after-description': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/check-line-alignment': ['warn', 'always', { tags: ['param', 'returns'] }],
    'jsdoc/tag-lines': ['warn', 'any', { dropEndLines: true, noEndLines: true }],
    'no-trailing-spaces': ['error', { ignoreComments: true }],
  },
};
