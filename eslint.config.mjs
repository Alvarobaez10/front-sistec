import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      prettier,
      react: pluginReact,
    },

    rules: {
      'prettier/prettier': 'warn',
      'linebreak-style': 'off',
      'no-console': 'off',
      'no-debugger': 'error',
      eqeqeq: 'error',
      curly: ['error', 'all'],
      'max-lines': ['warn', 450],
      'no-empty': 'warn',
      'no-empty-function': 'warn',
      'prefer-const': 'warn',
      'no-constant-condition': 'warn',
      'no-duplicate-imports': 'error',
      'no-case-declarations': 'off',
      camelcase: [
        'warn',
        {
          properties: 'never',
          ignoreDestructuring: true,
        },
      ],
      'no-self-compare': 'error',
      'no-setter-return': 'error',
      'no-func-assign': 'error',
      'no-unreachable': 'error',
      'no-unused-private-class-members': 'warn',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'use-isnan': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^(err|error|_error)$',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['package.json', 'package-lock.json', 'node_modules/*', '.next/*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
