module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  'extends': [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    indent: [
      'error',
      'tab',
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: [
        '**/tests/*.ts',
        '**/tests/unit/**/*.spec.ts',
      ],
      env: {
        jest: true,
      },
    },
    {
      'files': [
        '.eslintrc.js',
        '*.config.js',
        'tsconfig.json',
      ],
      'rules': {
        'indent': [
          'error',
          2,
        ],
        'linebreak-style': [
          'error',
          'unix',
        ],
      },
    },
  ],
}
