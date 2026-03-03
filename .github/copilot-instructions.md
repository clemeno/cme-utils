# Copilot Instructions

## Commands

```bash
bun run build          # Transpile ts/ → esm/ (tsc)
bun run lint           # Check code style (ESLint + neostandard)
bun run lint:fix       # Auto-fix linting issues
bun test               # Run all tests
bun test --watch       # Run tests in watch mode
bun test --coverage    # Run tests with coverage
```

Run a single test file:
```bash
bun test tests/array/array-sum.test.ts
```

**After any file change:** always run `bun run lint`, `bun test`, and `bun run build` and resolve all errors/warnings.

## Architecture

- `ts/` — TypeScript source (the only place to edit)
- `esm/` — Build output (auto-generated, never edit manually)
- `cjs/` — Hand-maintained CJS files for the ESLint plugin only (`max-return-statements-per-function`)
- `tests/` — Bun test files, mirroring the `ts/` folder structure
- `ts/index.ts` — Single barrel re-export for the entire public API

Each category is a subfolder (e.g. `ts/array/`, `ts/convert/`) with its own `index.ts` barrel. New utilities must be exported through the subfolder's `index.ts` and then through `ts/index.ts`.

The library has **zero runtime dependencies**. All `devDependencies` are build/test only.

## Key Conventions

### Naming
- Public constants and functions: `UPPER_SNAKE_CASE` (e.g., `ARRAY_SUM`, `TO_NUMBER`)
- Classes and interfaces: `PascalCase` (e.g., `AppExceptionOnly`)
- Boolean variables: must start with `b` prefix (e.g., `bIsValid`, `bHasItems`)
- Source files: `kebab-case.util.ts` for utilities, `kebab-case.test.ts` for tests

### Code Style (enforced by ESLint)
- No semicolons at end of statements
- Single quotes for strings; template literals over concatenation
- `const` over `let`, never `var`
- Always use explicit braces `{}` for all blocks
- Strict equality only (`===` / `!==`); no implicit coercion
- No `switch` — use object literal lookup instead
- No `break` or `continue`
- No `forEach` — use `for...of` loops
- Use `+= 1` / `-= 1` instead of `++` / `--`
- No TypeScript `enum` — use explicit `const` objects

### Function Rules (critical)
- **Max 1 parameter per function** — if multiple inputs are needed, wrap them in a single object parameter
- **Max 1 return statement per function** — throwing errors is allowed outside the nominal path
- Use named functions for better stack traces; arrow functions only for anonymous callbacks
- Explicit return types on all named functions and methods
- Prefer `unknown` with type guards over `any`

### Testing Pattern
```typescript
import { describe, expect, it } from 'bun:test'
import { MY_UTIL } from '../../ts/category/my-util.util.js'

describe('MY_UTIL', () => {
  const testCases = [
    { name: 'descriptive name', input: ..., expected: ... },
  ]

  it.each(testCases)('%s', ({ name, input, expected }) => {
    expect(MY_UTIL(input)).toBe(expected)
  })
})
```
All test cases must have a descriptive `name`. Tests import directly from `ts/` source, not from `esm/`.

### ESLint Config
`eslint.config.js` is authoritative — do not modify it unless explicitly instructed. Key rules in effect:
- `max-return-statements-per-function`: 1 (custom plugin from `cjs/`)
- `max-params`: warn at 2+ params
- `@typescript-eslint/strict-boolean-expressions`: strings and numbers disallowed in boolean context
- `curly`: always required
- `no-plusplus`: enforced

Use `// eslint-disable-next-line max-params` only for callbacks/sorting functions with fixed signatures imposed by an external API.

### JSDoc
All exported functions must have JSDoc with `@param`, `@returns`, and `@example`.
