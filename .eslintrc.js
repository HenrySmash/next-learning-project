module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect'
    }
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json'
  },
  plugins: ['@typescript-eslint', 'react', 'import', 'require-explicit-generics'],
  rules: {
    'no-console': 'error',
    'linebreak-style': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object'
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }
    ],
    'react/prop-types': 0,
    'react/require-default-props': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10
      }
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': [0, 'never'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [2, 'always'],
    'space-before-function-paren': [0, 'never'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0
      }
    ],
    'react/no-invalid-html-attribute': 'off',
    'react/no-array-index-key': 'off',
    'react/destructuring-assignment': 'off',
    'react/function-component-definition': 'off',
    'max-len': [
      'error',
      {
        code: 120
      }
    ],
    'no-underscore-dangle': [
      'error'
    ],
    'require-explicit-generics/require-explicit-generics': [
      'error',
      ['useState']
    ],
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off'
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'max-len': 'off'
      }
    }
  ]
};
