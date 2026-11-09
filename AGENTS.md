# Agent Instructions

## Commands

```bash
bun run prepare        # Transpile ts/ → m/ (tsc)
bun run lint           # Check code style (ESLint + neostandard)
bun run lint:fix       # Auto-fix linting issues
bun test               # Run all tests
bun test:watch         # Run tests in watch mode
bun test:coverage      # Run tests with coverage
bun run test:types     # Typecheck tests/ and examples/ (tsc --noEmit)
```

Run a single test file:
```bash
bun test tests/array/array-sum.test.ts
```

**After any file change:** run `bun run prepare` first (lint loads the return-count plugin from its build in `m/`), then `bun run lint:fix`, `bun run lint`, `bun test` and `bun run test:types`. Resolve all errors and warnings.

## Architecture

- `ts/` — TypeScript source (the only place to edit, besides `cjs/`)
- `m/` — Build output (auto-generated ESM, never edit manually)
- `cjs/` — Hand-kept CommonJS copy of the ESLint plugin (`max-return-statements-per-function`) for CJS users; change it together with `ts/max-return-statements-per-function.*.ts`
- `tests/` — Bun test files, mirroring the `ts/` folder structure
- `examples/` — Usage examples of the public API, typechecked by `bun run test:types`
- `ts/index.ts` — Single barrel re-export for the entire public API

Each category is a subfolder (e.g. `ts/array/`, `ts/convert/`) with its own `index.ts` barrel. New utilities must be exported through the subfolder's `index.ts` and then through `ts/index.ts`.

To add a utility, follow [.github/instructions/new-utility.instructions.md](.github/instructions/new-utility.instructions.md). Search the existing utilities first, and reuse them rather than writing a new one.

The library has **zero runtime dependencies**. All `devDependencies` are build/test only. Use no deprecated package and no version with a known vulnerability.

`ts/` imports nothing from outside `ts/`, not even `node:` built-ins: a utility that needs a platform or library API (`createReadStream`, `createCipheriv`, luxon's `DateTime`) takes it through its object parameter. `package.json` sets `"sideEffects": false`, so no module may run code at import time.

## Key Conventions

### Naming
- Public constants and functions: `UPPER_SNAKE_CASE` (e.g., `ARRAY_SUM`, `TO_NUMBER`)
- Local variables and attributes: `camelCase`
- Classes and interfaces: `PascalCase` (e.g., `AppExceptionOnly`)
- Boolean variables: must start with `b` prefix (e.g., `bIsValid`, `bHasItems`)
- Parameter: `_` for the single object parameter, `v` for a single plain value
- Source files: `kebab-case.util.ts` for utilities, `kebab-case.test.ts` for tests

### Code Style (enforced by ESLint)
- No semicolons at end of statements
- Single quotes for strings
- `const` over `let`, never `var`
- Always use explicit braces `{}` for all blocks
- Strict equality (`===` / `!==`); `== null` / `!= null` is the one exception, to match both `null` and `undefined`
- No `switch` — use object literal lookup instead
- No `break` or `continue`
- Use `+= 1` / `-= 1` instead of `++` / `--`
- No TypeScript `enum` — use explicit `const` objects

### Code Style (not linted: check by hand)
- Template literals over concatenation
- No implicit coercion: convert explicitly
- No `forEach` — use `for...of` loops, over `GET_OBJECT_ENTRY_LIST` or `Array.entries()` when the key or index is used
- Index `for` loops only for arrays of more than 1e6 items, or when the loop condition carries an early exit (a flag or status check)
- `async` / `await` over callbacks and `.then()` / `.catch()`
- Optional chaining and nullish coalescing for safe property access
- Destructure objects and arrays, except a value used only once

### Function Rules (critical)
- **Max 1 parameter per function** — if multiple inputs are needed, wrap them in a single object parameter; that parameter is optional only when all its fields are optional
- **Max 1 return statement per function** — throwing errors is allowed outside the nominal path; never return from inside a loop
- Exports are named `function` declarations (`export function NAME (_: { ... }): T { ... }`), for clear stack traces; arrow functions only for anonymous callbacks. The older `export const NAME = (...) =>` exports are migrated by [01a1bf8ff29e765a994f7eca358c1d96](.scratch/conventions-backlog/issues/01a1bf8ff29e765a994f7eca358c1d96-migrate-const-arrow-exports-to-function.md)
- Explicit return types on all named functions and methods
- Prefer `unknown` with type guards over `any`
- Prefer an `interface` for a complex object type used in several places

### Testing Pattern
Template: section 6 of [.github/instructions/new-utility.instructions.md](.github/instructions/new-utility.instructions.md). These rules cover every test file; older files that break them are fixed by [01a1bf8ff2d8718c9e178403db3dbda0](.scratch/conventions-backlog/issues/01a1bf8ff2d8718c9e178403db3dbda0-bring-test-tables-to-the-rules.md).
- All test cases must have a descriptive `name`, used as the `'$name'` title: bun prints `'%s'` literally for object rows.
- Tests import directly from `ts/` source, not from `m/`.
- Type the table rows (`const testCases: Array<{ name: string, input: ..., expected: ... }> = [`), so `bun run test:types` stays at 0 errors.
- No `if` inside a test body: split returns and throws into separate tables.
- Prefer exact assertions (`toEqual` / `toBe` of the whole value) over `toContain` or `typeof` spot checks.
- No runtime tests for type-only files (interfaces, type aliases).
- `tests/mocks/*.test.ts` follow the same table rules.
- Keep coverage at 100% lines and functions (`bun test:coverage`); bun reports no branches, so check them by hand.

### ESLint Config
`eslint.config.mjs` is authoritative — do not modify it unless explicitly instructed. Key rules in effect:
- `max-return-statements-per-function`: 1 (custom plugin, built from `ts/` and loaded from `m/`)
- `max-params`: warn at 2+ params
- `@typescript-eslint/strict-boolean-expressions`: strings and numbers disallowed in boolean context
- `curly`: always required
- `no-plusplus`: enforced

Avoid disable comments. The allowed ones:
- `// eslint-disable-next-line no-restricted-syntax` for a justified `break` or `switch`, with a comment explaining why (the config's own message asks for it)
- `// eslint-disable-next-line max-params` for a callback, sort function or type definition whose signature an external API fixes, and for mocks whose signature the mocked API fixes
- `// @ts-ignore` for runtime-environment differences (browser vs Node, Node versions) or broken third-party type definitions
- In `tests/` only: a rule whose violation is the test input or the mocked API's shape (e.g. `no-new-wrappers` to build a `new String()` input, `@typescript-eslint/no-useless-constructor` in a mock)

### JSDoc
All exported functions must have JSDoc with `@param`, `@returns`, and `@example`. Older exports that lack it are completed by [01a1bf8ff30573c9bf5e6d5581b207b2](.scratch/conventions-backlog/issues/01a1bf8ff30573c9bf5e6d5581b207b2-complete-jsdoc-on-exports.md).

## Git

Conventional commit messages (`feat:`, `fix:`, `chore:`, ...); semantic versioning for releases.

## Agent skills

### Issue tracker

Local markdown tickets under `.scratch/<feature>/issues/`, named by UUID v7 id and committed with the code. See `docs/agents/issue-tracker.md`.

### Triage labels

Default role strings (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`) in each ticket's `Status:` line. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and one `docs/adr/` at the repo root. See `docs/agents/domain.md`.
