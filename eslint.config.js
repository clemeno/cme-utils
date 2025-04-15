import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import maxReturnStatementsPerFunctionPlugin from './max-return-statements-per-function.plugin.cjs'

const optionList = [
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
    ts: true,
  }),
  {
    rules: {
      'no-plusplus': 'error',
      yoda: 0,
      'max-params': ['warn', 1],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/comma-dangle': [
        'warn',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
    },
  },
  {
    plugins: { 'max-return-statements-per-function': maxReturnStatementsPerFunctionPlugin },
    rules: {
      'max-return-statements-per-function/max-return-statements-per-function': ['error', 1],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/strict-boolean-expressions': ['error', { allowString: false, allowNumber: false, allowNullableObject: false }],
    },
  },
]

export default optionList
