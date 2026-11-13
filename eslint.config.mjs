// import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsEslintParser from '@typescript-eslint/parser'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import { MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN } from './m/max-return-statements-per-function.plugin.js'

const tsRules = {
  'func-style': ['error', 'declaration', { allowTypeAnnotation: true }],
  'no-implicit-coercion': 'error',
  'prefer-template': 'error',
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
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

const restrictedSyntax = [
  {
    selector: 'BreakStatement',
    message: 'break is forbidden — refactor with if or array methods (find/some/every/findIndex). For a justified case use // eslint-disable-next-line no-restricted-syntax with a comment explaining why.',
  },
  {
    selector: 'SwitchStatement',
    message: 'switch is forbidden — use an if/else-if chain or a key→handler lookup map. For a justified case use // eslint-disable-next-line no-restricted-syntax with a comment explaining why.',
  },
  {
    selector: 'CallExpression[callee.property.name="forEach"]',
    message: 'forEach is forbidden — use a for...of loop, over GET_OBJECT_ENTRY_LIST or Array.entries() when the key or index is used.',
  },
  {
    selector: 'TSEnumDeclaration',
    message: 'TypeScript enum is forbidden — use export const values instead. No magic numbers or strings, just named constants.',
  },
  {
    // a Buffer is a Uint8Array<ArrayBufferLike>: an input typed Uint8Array<ArrayBuffer> refuses it (interfaces mirroring Web Crypto keep their narrow types)
    selector: ':function > .params TSTypeReference[typeName.name=/^(Uint8|Int8|Uint8Clamped|Uint16|Int16|Uint32|Int32|Float32|Float64|BigUint64|BigInt64)Array$/][typeArguments]',
    message: 'type a typed-array input without its buffer argument (Uint8Array, not Uint8Array<ArrayBuffer>), so a Buffer or any Uint8Array fits; copy it with new Uint8Array(x) where an API wants an ArrayBuffer-backed view.',
  },
]

// the mechanical rules of AGENTS.md (Testing Pattern) and .github/instructions/new-utility.instructions.md (section 6)
const testRestrictedSyntax = [
  {
    selector: 'CallExpression[callee.property.name="toBe"] > Identifier.arguments[name="NaN"]',
    message: 'toBe(NaN) — assert NaN with toBeNaN(), in a table of its own.',
  },
  {
    selector: 'CallExpression[callee.callee.property.name="each"] > Literal.arguments[value=/%s/]',
    message: 'bun prints %s literally for an object row — give each row a name and use \'$name\' as the title.',
  },
  {
    selector: 'CallExpression[callee.callee.property.name="each"] > :matches(Literal.arguments:first-child:not([value=/[$]name/]), TemplateLiteral.arguments:first-child:not(:has(TemplateElement[value.raw=/[$]name/])))',
    message: 'a .each title shows its row\'s name — start each row with a descriptive name: string and put $name in the title (\'$name\', or \'$name: $input -> $expected\').',
  },
  {
    selector: ':matches(CallExpression[callee.name=/^(it|test)$/], CallExpression[callee.callee.object.name=/^(it|test)$/]) > :function IfStatement',
    message: 'no if inside a test body — split the rows into separate tables, one per kind of assertion.',
  },
  {
    selector: 'VariableDeclarator[id.name=/Cases$/][init.type="ArrayExpression"]:not([id.typeAnnotation])',
    message: 'type the table rows: const testCases: Array<{ name: string, input: ..., expected: ... }> = [',
  },
  {
    // bun-types types the matchers of .rejects / .resolves as void, so no-floating-promises misses them
    selector: 'ExpressionStatement > CallExpression > MemberExpression.callee MemberExpression[property.name=/^(rejects|resolves)$/][object.type="CallExpression"][object.callee.name="expect"]',
    message: 'await expect(...).rejects / .resolves: unawaited, the test can end before the assertion runs, and passes whatever the promise does.',
  },
]

// every util runs in a browser, on Node and on bun (AGENTS.md): what only one runtime has comes through the object parameter
const nodeOnlyGlobals = ['Buffer', 'process', 'require', 'module', 'exports', '__dirname', '__filename', 'global', 'setImmediate', 'clearImmediate', 'Bun']
const browserOnlyGlobals = ['document', 'self', 'FileReader', 'localStorage', 'sessionStorage', 'navigator', 'location', 'XMLHttpRequest', 'indexedDB', 'alert']
const runtimeRules = {
  'no-restricted-globals': [
    'error',
    ...nodeOnlyGlobals.map(name => ({ name, message: `${name} exists on Node or bun only: take it through the object parameter, or read globalThis.${name} behind a check, so the util also runs in a browser.` })),
    ...browserOnlyGlobals.map(name => ({ name, message: `${name} exists in a browser only: use an API all three runtimes have (Blob.text() for FileReader), read it from globalThis.window behind a check (globalThis.window?.document), or take it through the object parameter.` })),
  ],
  'no-restricted-imports': [
    'error',
    { patterns: [{ regex: '^[^.]', message: 'ts/ imports nothing from outside ts/: take the platform or library API through the object parameter, so the util runs in a browser, on Node and on bun.' }] },
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
      // strict even against null (neostandard ignores it): IS_SET tells null or undefined apart from a value
      eqeqeq: ['error', 'always'],
      'no-plusplus': 'error',
      'no-dupe-else-if': 'error',
      'no-lonely-if': 'error',
      'no-continue': 'error',
      // an invisible character in a string or template is written as an escape (\u202f, \u200B), so it shows in the diff
      'no-irregular-whitespace': ['error', { skipStrings: false, skipTemplates: false }],
      'no-restricted-syntax': ['error', ...restrictedSyntax],
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
    rules: { ...tsRules, ...runtimeRules },
  },
  {
    files: ['tests/**/*.ts', 'tests/**/*.tsx'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: './tsconfig.tests.json',
      },
    },
    rules: {
      ...tsRules,
      'no-restricted-syntax': ['error', ...restrictedSyntax, ...testRestrictedSyntax],
    },
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
