import { afterAll, beforeAll, describe, expect, it, spyOn } from 'bun:test'
import { Glob } from 'bun'
import { createCipheriv, createDecipheriv, randomBytes, webcrypto } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { DateTime, Duration, Interval, Settings } from 'luxon'
import ts from 'typescript'
import * as lib from '../ts/index.js'

// The public API: every export of a ts/ file is re-exported by its folder's index.ts and by ts/index.ts, and every
// exported function has a JSDoc (AGENTS.md, JSDoc) whose example lines state what the call returns.

const repoDir = join(import.meta.dir, '..')

// exports reached by their own path rather than the barrels: the ESLint plugin entry points, and a deprecated util
const notInBarrels = new Set([
  'ts/max-return-statements-per-function.plugin.ts MAX_RETURN_STATEMENTS_PER_FUNCTION_PLUGIN',
  'ts/max-return-statements-per-function.rule.ts MAX_RETURN_STATEMENTS_PER_FUNCTION_RULE',
  'ts/check/check.util.ts CHECK',
])

// outside APIs an example names without this test providing them (a knex query builder, files, HTTP, the browser): those
// lines are skipped, and the typecheck declares them as any
const outsideApis = new Set(['qb', 'createReadStream', 'writeFile', 'axios', 'FileReader'])

// the outside modules every example runs and typechecks with, besides the library
const providedModules: Record<string, Record<string, unknown>> = {
  luxon: { DateTime, Duration, Interval, Settings },
  'node:crypto': { createCipheriv, createDecipheriv, randomBytes, webcrypto },
}

// the names every example runs and typechecks with, besides its own module's exports; luxon is set as the examples assume:
// en-US, Europe/Paris, now 2024-03-15T15:30:45+01:00
const scope: Record<string, unknown> = Object.assign({}, lib, ...Object.values(providedModules))
const exampleNow = DateTime.fromISO('2024-03-15T15:30:45.000+01:00').toMillis()
const luxonDefaults = { defaultLocale: Settings.defaultLocale, defaultZone: Settings.defaultZone, now: Settings.now }

const transpiler = new Bun.Transpiler({ loader: 'ts', deadCodeElimination: false, trimUnusedImports: false })

interface ExportedFunction {
  file: string
  name: string
  bTakesParameter: boolean
  tags: readonly ts.JSDocTag[]
}

interface ExampleBlock {
  name: string
  util: string
  file: string
  line: number
  code: string
}

interface CheckedLine {
  label: string
  call: () => Promise<unknown>
  expected?: () => unknown
}

/* Parses a file of the repo */
function sourceOf (path: string): ts.SourceFile {
  return ts.createSourceFile(path, readFileSync(join(repoDir, path), 'utf8'), ts.ScriptTarget.Latest, true)
}

/* Tells whether a statement carries the export keyword */
function isExported (statement: ts.Statement): boolean {
  return (ts.canHaveModifiers(statement) ? ts.getModifiers(statement) ?? [] : []).some(m => m.kind === ts.SyntaxKind.ExportKeyword)
}

/* Lists the names a statement exports, re-exports included */
function namesOf (statement: ts.Statement): string[] {
  let names: string[] = []

  if (ts.isExportDeclaration(statement) && (statement.exportClause != null) && ts.isNamedExports(statement.exportClause)) {
    names = statement.exportClause.elements.map(e => e.name.text)
  } else if (isExported(statement) && ts.isVariableStatement(statement)) {
    names = statement.declarationList.declarations.map(d => d.name.getText())
  } else if (isExported(statement) && (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement))) {
    names = (statement.name != null) ? [statement.name.text] : []
  }

  return names
}

/* Lists the names a file exports */
function exportedNamesOf (path: string): string[] {
  return sourceOf(path).statements.flatMap(statement => namesOf(statement))
}

const moduleFiles = [...new Glob('ts/**/*.ts').scanSync(repoDir)]
  .map(f => f.replace(/\\/g, '/'))
  .filter(f => !f.endsWith('/index.ts'))
  .sort()
const rootNames = new Set(exportedNamesOf('ts/index.ts'))

/* Lists the exports of a file that its folder's index.ts or ts/index.ts misses */
function barrelGapsOf (path: string): string[] {
  const folder = path.slice(0, path.lastIndexOf('/'))
  const folderNames = (folder === 'ts') ? rootNames : new Set(exportedNamesOf(`${folder}/index.ts`))

  return exportedNamesOf(path)
    .filter(name => !(folderNames.has(name) && rootNames.has(name)))
    .map(name => `${path} ${name}`)
    .filter(key => !notInBarrels.has(key))
}

/* Lists the exported functions of a statement: a function declaration, or consts whose value is a function */
function functionsOf (_: { file: string, statement: ts.Statement }): ExportedFunction[] {
  const tags = ts.getJSDocTags(_.statement)
  let functions: ExportedFunction[] = []

  if (isExported(_.statement) && ts.isFunctionDeclaration(_.statement) && (_.statement.name != null)) {
    functions = [{ file: _.file, name: _.statement.name.text, bTakesParameter: _.statement.parameters.length > 0, tags }]
  } else if (isExported(_.statement) && ts.isVariableStatement(_.statement)) {
    functions = _.statement.declarationList.declarations
      .map(d => ({ name: d.name.getText(), value: scope[d.name.getText()] }))
      .filter(({ value }) => typeof value === 'function')
      .map(({ name, value }) => ({ file: _.file, name, bTakesParameter: (value as (...args: unknown[]) => unknown).length > 0, tags }))
  }

  return functions
}

/* Extracts the code of a ```typescript fence from an @example tag */
function exampleCodeOf (tag: ts.JSDocTag): string {
  return (ts.getTextOfJSDocComment(tag.comment) ?? '').match(/```typescript\r?\n([\s\S]*?)```/)?.[1] ?? ''
}

/* Lists the JSDoc tags an exported function lacks */
function missingTagsOf (fn: ExportedFunction): string[] {
  const tagNames = new Set(fn.tags.map(t => t.tagName.text))
  const bExample = fn.tags.some(t => (t.tagName.text === 'example') && (exampleCodeOf(t) !== ''))

  return [
    (fn.bTakesParameter && !tagNames.has('param')) ? '@param' : '',
    tagNames.has('returns') ? '' : '@returns',
    bExample ? '' : '@example with a ```typescript fence',
  ].filter(tag => tag !== '')
}

const exportedFunctions = moduleFiles.flatMap(file => sourceOf(file).statements.flatMap(statement => functionsOf({ file, statement })))

/* Gives the line, counted from 1 in its file, of the first code line of an @example fence (0 without a fence) */
function firstCodeLineOf (tag: ts.JSDocTag): number {
  const sourceFile = tag.getSourceFile()
  const fence = sourceFile.text.indexOf('```typescript', tag.pos)

  return (fence < 0) ? 0 : sourceFile.getLineAndCharacterOfPosition(fence).line + 2
}

const exampleBlocks: ExampleBlock[] = exportedFunctions.flatMap(fn => fn.tags
  .filter(t => t.tagName.text === 'example')
  .map(t => ({ name: `${fn.name} @example (${fn.file})`, util: fn.name, file: fn.file, line: firstCodeLineOf(t), code: exampleCodeOf(t) })))

// the in-memory file the examples typecheck in, at the repo root so that its imports resolve as the tests' do
const examplesPath = join(repoDir, 'jsdoc-examples.ts').replace(/\\/g, '/')

/* Builds one file holding each example block in its own async function, after the names the doc-test provides */
function examplesFileOf (blocks: ExampleBlock[]): { text: string, startLines: number[] } {
  const lines = [
    `import { ${[...rootNames].join(', ')} } from './ts/index.js'`,
    ...[...notInBarrels].map(key => key.split(' ')).map(([file, name]) => `import { ${name} } from './${file.replace(/\.ts$/, '.js')}'`),
    ...Object.entries(providedModules).map(([module, names]) => `import { ${Object.keys(names).join(', ')} } from '${module}'`),
    `declare const ${[...outsideApis].map(name => `${name}: any`).join(', ')}`,
  ]
  const startLines: number[] = []

  for (const [i, block] of blocks.entries()) {
    lines.push(`export async function example${i} (): Promise<void> {`)
    startLines.push(lines.length)
    lines.push(...block.code.split('\n'), '}')
  }

  return { text: lines.join('\n'), startLines }
}

/* Typechecks the example blocks with the tests' compiler options, and lists each error at its line in the util's JSDoc */
function typeErrorsOf (blocks: ExampleBlock[]): string[] {
  const { text, startLines } = examplesFileOf(blocks)
  const { options } = ts.parseJsonConfigFileContent(ts.readConfigFile(join(repoDir, 'tsconfig.tests.json'), ts.sys.readFile).config, ts.sys, repoDir)
  const baseHost = ts.createCompilerHost(options)
  const getSourceFile = baseHost.getSourceFile.bind(baseHost)
  const host: ts.CompilerHost = {
    ...baseHost,
    getSourceFile: (...args) => (args[0].replace(/\\/g, '/') === examplesPath) ? ts.createSourceFile(args[0], text, args[1]) : getSourceFile(...args),
  }
  const program = ts.createProgram({ rootNames: [examplesPath], options, host })
  const sourceFile = program.getSourceFile(examplesPath)

  if (sourceFile == null) {
    throw new Error(`${examplesPath} is missing from the program`)
  }

  return [...program.getSyntacticDiagnostics(sourceFile), ...program.getSemanticDiagnostics(sourceFile)].map(diagnostic => {
    const line = sourceFile.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line
    const blockIndex = startLines.filter(start => start <= line).length - 1
    const block = blocks[blockIndex]
    const where = (blockIndex < 0) ? `the imports of the examples, line ${line + 1}` : `${block.file}:${block.line + line - startLines[blockIndex]} ${block.util}`

    return `${where}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n  ')}`
  })
}

/* Tells whether a text parses as a JavaScript expression, rather than prose */
function isExpression (code: string): boolean {
  let bExpression = true

  try {
    transpiler.transformSync(`;(${code})`)
  } catch {
    bExpression = false
  }

  return bExpression
}

/* Turns `CALL // returns VALUE` and `CALL // throws ...` into checked calls; any other line runs as written */
function checkedLineOf (_: { line: string, label: string }): string {
  const match = _.line.match(/^(.*?\S)\s*\/\/\s*(returns|throws)\b\s*(.*)$/)
  let out = _.line

  if (match != null) {
    const [, left, verb, right] = match
    // a leading `;` guards a line starting with `[` or `(` from the line above, as in code
    const call = left.replace(/^\s*;/, '').replace(/;\s*$/, '')
    const label = JSON.stringify(_.label)

    if (verb === 'throws') {
      out = `await __throws({ label: ${label}, call: async () => (${call}) });`
    } else if (isExpression(right)) {
      out = `await __returns({ label: ${label}, call: async () => (${call}), expected: () => (${right}) });`
    } else if (/^['"`[{(\d-]/.test(right)) {
      // a value that starts like a JavaScript value but does not parse is a typo: as prose, the line would only run
      out = `await __runs({ label: ${label}, call: async () => { throw new SyntaxError(${JSON.stringify(`the value after // returns does not parse: ${right}`)}) } });`
    } else {
      out = `await __runs({ label: ${label}, call: async () => (${call}) });`
    }
  }

  return out
}

/* Runs an example block and lists the lines whose result differs from what they state */
async function failuresOf (_: { name: string, file: string, code: string }): Promise<string[]> {
  const failures: string[] = []
  // its own module too: an export left out of the barrels, such as the deprecated CHECK
  const blockScope: Record<string, unknown> = { ...scope, ...(await import(join(repoDir, _.file))) }
  const blockNames = Object.keys(blockScope)

  /* Records an error, unless it is a reference to an outside API the test does not provide */
  function fail (error: { label: string, error: unknown }): void {
    const missingName = (error.error instanceof ReferenceError) ? (error.error.message.match(/^(\S+) is not defined/)?.[1] ?? '') : ''

    if (!outsideApis.has(missingName)) {
      failures.push(`${error.label}\n  ${String(error.error)}`)
    }
  }

  /* Checks a `// returns` line */
  async function returns (line: CheckedLine): Promise<void> {
    try {
      const expected = line.expected?.()
      const actual = await line.call()

      if (!Bun.deepEquals(actual, expected, true) && !Object.is(actual, expected)) {
        failures.push(`${line.label}\n  returned ${Bun.inspect(actual)}`)
      }
    } catch (error) {
      fail({ label: line.label, error })
    }
  }

  /* Checks a `// throws` line */
  async function throws (line: CheckedLine): Promise<void> {
    try {
      const actual = await line.call()
      failures.push(`${line.label}\n  did not throw, returned ${Bun.inspect(actual)}`)
    } catch (error) {
      if (error instanceof ReferenceError) {
        fail({ label: line.label, error })
      }
    }
  }

  /* Runs a line whose stated result is prose */
  async function runs (line: CheckedLine): Promise<void> {
    try {
      await line.call()
    } catch (error) {
      fail({ label: line.label, error })
    }
  }

  const body = transpiler.transformSync([..._.code.split('\n').entries()].map(([i, line]) => checkedLineOf({ line, label: `${_.name}:${i + 1}: ${line.trim()}` })).join('\n'))

  Settings.defaultLocale = 'en-US'
  Settings.defaultZone = 'Europe/Paris'
  Settings.now = () => exampleNow

  try {
    // eslint-disable-next-line no-new-func -- the example text is the input under test: running it is the check
    const run = new Function('__returns', '__throws', '__runs', ...blockNames, `return (async () => {\n${body}\n})()`)
    await run(returns, throws, runs, ...blockNames.map(n => blockScope[n]))
  } catch (error) {
    fail({ label: `${_.name} (setup)`, error })
  }

  return failures
}

describe(
  'exports',
  () => {
    // some examples show an invalid input that the util reports on the console
    const consoleLog = spyOn(console, 'log')

    beforeAll(() => {
      consoleLog.mockImplementation(() => {})
    })

    afterAll(() => {
      consoleLog.mockRestore()
      Settings.defaultLocale = luxonDefaults.defaultLocale
      Settings.defaultZone = luxonDefaults.defaultZone
      Settings.now = luxonDefaults.now
    })

    it(
      're-exports every export of a ts/ file from its folder index.ts and from ts/index.ts',
      () => {
        expect(moduleFiles.flatMap(file => barrelGapsOf(file))).toEqual([])
      }
    )

    it(
      'documents every exported function with @param, @returns and a typescript @example',
      () => {
        expect(exportedFunctions.filter(fn => missingTagsOf(fn).length > 0).map(fn => `${fn.file} ${fn.name}: ${missingTagsOf(fn).join(', ')}`)).toEqual([])
      }
    )

    it(
      'typechecks every @example block',
      () => {
        expect(typeErrorsOf(exampleBlocks.filter(block => block.code !== ''))).toEqual([])
      },
      60_000
    )

    it.each(exampleBlocks)(
      '$name',
      async ({ name, file, code }) => {
        expect(await failuresOf({ name, file, code })).toEqual([])
      }
    )
  }
)
