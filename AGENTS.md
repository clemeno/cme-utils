# Agent Instructions

## Commands

```bash
bun run check          # build, lint, tests with the 100% coverage gate, typecheck of tests/ and examples/, load of the build in Node
bun run lint:fix       # auto-fix lint issues
bun test tests/array/array-sum.test.ts   # one test file
```

**After any file change:** run `bun run check` and resolve every error and warning. It builds first because lint loads the return-count plugin from its build in `m/`. CI (`.github/workflows/check.yml`) runs the same command.

## Architecture

- `ts/` — TypeScript source (the only place to edit, besides `cjs/`)
- `m/` — Build output (auto-generated ESM, never edit manually)
- `cjs/` — Hand-kept CommonJS copy of the ESLint plugin (`max-return-statements-per-function`) for CJS users; change it together with `ts/max-return-statements-per-function.*.ts`
- `tests/` — Bun test files, mirroring the `ts/` folder structure
- `examples/` — Usage examples of the public API, typechecked by `bun run test:types`
- `tools/` — Repo scripts (`load-in-node.mjs`: `bun run check` loads the build in Node)
- `ts/index.ts` — Single barrel re-export for the entire public API

Each category is a subfolder (e.g. `ts/array/`, `ts/convert/`) with its own `index.ts` barrel. New utilities must be exported through the subfolder's `index.ts` and then through `ts/index.ts`.

To add a utility, follow [.github/instructions/new-utility.instructions.md](.github/instructions/new-utility.instructions.md). Search the existing utilities first, and reuse them rather than writing a new one.

The library has **zero runtime dependencies**. All `devDependencies` are build/test only. Use no deprecated package and no version with a known vulnerability.

Every utility runs in a browser, on Node and on bun (user decision, 2026-11-10). `ts/` imports nothing from outside `ts/`, not even `node:` built-ins: a utility that needs a platform or library API (`createReadStream`, `createCipheriv`, luxon's `DateTime`) takes it through its object parameter. Lint flags the outside imports and the globals of one runtime (`Buffer`, `process`, `FileReader`, `document`...); `window` is read only inside `try` / `catch`. A utility that still can't run everywhere (it reads or writes a file by path, it needs `node:crypto`) says so in its JSDoc: `Runs on Node and bun only: <why>.` `package.json` sets `"sideEffects": false`, so no module may have an observable effect at import time (no global writes, I/O or timers); building a module-local table, as `byte-array-to-uuid.util.ts` does, is fine.

## Key Conventions

### Naming
- Public constants and functions: `UPPER_SNAKE_CASE` (e.g., `ARRAY_SUM`, `TO_NUMBER`)
- Local variables and attributes: `camelCase`
- Classes and interfaces: `PascalCase` (e.g., `AppExceptionOnly`)
- Boolean variables: must start with `b` prefix (e.g., `bIsValid`, `bHasItems`)
- Parameter: `_` for the single object parameter, `v` for a single plain value
- Source files: `kebab-case.util.ts` for utilities, `kebab-case.test.ts` for tests

### Code Style
`bun run check` lints the mechanical rules (`eslint.config.mjs` on top of neostandard); its messages say how to fix each one. What lint cannot check:
- Convert with `TO_NUMBER(x)` and `TO_STRING(x)`, not `+x`, `Number(x)` or `'' + x`: one strict definition everywhere (a string is a number only when `Number` and `parseFloat` agree). `IS_NUMERIC` uses the same test.
- `== null` / `!= null` is the one loose comparison, to match both `null` and `undefined`.
- Loops: `for...of`, over `GET_OBJECT_ENTRY_LIST` or `Array.entries()` when the key or index is used. An index `for` loop only for arrays of more than 1e6 items, or when the loop condition carries an early exit (a flag or status check).
- `async` / `await` over callbacks and `.then()` / `.catch()`; nullish coalescing for defaults; destructure objects and arrays, except a value used only once.
- Several inputs go in one object parameter, named `_`; it is optional only when all its fields are optional. Throwing is allowed outside the nominal path of the one `return`.
- A const typed with a function type (`export const IS_INT_UNSIGNED_VALIDATOR: AppValidatorFn = control => { ... }`) stays a const arrow; every other named function is a `function` declaration.
- `unknown` with type guards over `any`; an `interface` for a complex object type used in several places.

### Testing Pattern
Template: section 6 of [.github/instructions/new-utility.instructions.md](.github/instructions/new-utility.instructions.md). These rules cover every test file; the older tables still keyed `label` or without a name column are listed in [01a1c0755cd5745fb6b20ab977fa30c7](.scratch/conventions-backlog/issues/01a1c0755cd5745fb6b20ab977fa30c7-name-every-test-row.md).
- All test cases must have a descriptive `name`, used as the `'$name'` title: bun prints `'%s'` literally for object rows.
- Tests import directly from `ts/` source, not from `m/`.
- Type the table rows (`const testCases: Array<{ name: string, input: ..., expected: ... }> = [`), so `bun run test:types` stays at 0 errors.
- No `if` inside a test body: split returns and throws into separate tables.
- Prefer exact assertions (`toEqual` / `toBe` of the whole value) over `toContain` or `typeof` spot checks.
- No runtime tests for type-only files (interfaces, type aliases).
- `tests/mocks/*.test.ts` follow the same table rules.
- `bunfig.toml` fails the run below 100% lines and functions; bun reports no branches, so check them by hand.

### ESLint Config
`eslint.config.mjs` is authoritative — do not modify it unless explicitly instructed. Avoid disable comments. The allowed ones:
- `// eslint-disable-next-line no-restricted-syntax` for a justified `break` or `switch`, with a comment explaining why (the config's own message asks for it)
- `// eslint-disable-next-line max-params` for a callback, sort function or type definition whose signature an external API fixes, and for mocks whose signature the mocked API fixes
- `// @ts-ignore` for runtime-environment differences (browser vs Node, Node versions) or broken third-party type definitions
- In `tests/` only: a rule whose violation is the test input or the mocked API's shape (e.g. `no-new-wrappers` to build a `new String()` input, `@typescript-eslint/no-useless-constructor` in a mock)

### JSDoc
All exported functions must have JSDoc with `@param`, `@returns`, and `@example`. `tests/exports.test.ts` checks it, typechecks each example and runs its `// returns` lines; how to write them: section 3 of [.github/instructions/new-utility.instructions.md](.github/instructions/new-utility.instructions.md).

## Git

Conventional commit messages (`feat:`, `fix:`, `chore:`, ...); semantic versioning for releases.

## Agent skills

### Issue tracker

Local markdown tickets under `.scratch/<feature>/issues/`, named by UUID v7 id and committed with the code. See `docs/agents/issue-tracker.md`.

### Triage labels

Default role strings (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) in each ticket's `Status:` line. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and one `docs/adr/` at the repo root. See `docs/agents/domain.md`.
