// import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import { MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN } from './esm/max-return-statements-per-function.plugin.js'

const tsRules = {
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/strict-boolean-expressions': ['error', { allowString: false, allowNumber: false, allowNullableObject: false }],
  '@typescript-eslint/restrict-template-expressions': [
    'error',
    {
      allowAny: false,
      allowArray: false,
      allowBoolean: false,
      allowNever: false,
      allowNullish: false,
      allowNumber: true,
      allowRegExp: false,
    },
  ],
}

const optionList = [
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
    ts: true,
  }),
  {
    rules: {
      curly: ['error', 'all'],
      'no-plusplus': 'error',
      'no-dupe-else-if': 'error',
      'no-lonely-if': 'error',
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
    plugins: { 'max-return-statements-per-function': MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN },
    rules: {
      'max-return-statements-per-function/max-return-statements-per-function': ['error', 1],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['tests/**/*', 'examples/**/*'],
    // plugins: {
    //   '@typescript-eslint': tsEslintPlugin,
    // },
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: tsRules,
  },
  {
    files: ['tests/**/*.ts', 'tests/**/*.tsx'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.tests.json',
      },
    },
    rules: tsRules,
  },
  {
    files: ['examples/**/*.ts', 'examples/**/*.tsx'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.examples.json',
      },
    },
    rules: tsRules,
  },
]

export default optionList
