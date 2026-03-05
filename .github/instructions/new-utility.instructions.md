---
description: "Use when creating a new utility function, adding a new export, or registering a new module. Covers file naming, function shape, JSDoc, barrel exports in subfolder index.ts and ts/index.ts, and test file structure."
applyTo: "ts/**/*.util.ts, tests/**/*.test.ts"
---

# Creating a New Utility

## 1. File Location and Naming

- Source: `ts/<category>/kebab-case.util.ts`
- Test: `tests/<category>/kebab-case.test.ts`
- Use an existing category subfolder (e.g. `check/`, `convert/`, `array/`). Only create a new subfolder when the category truly does not exist.

## 2. Function Shape

```typescript
/**
 * One-line description of what the function does.
 * @param v - description
 * @returns description
 * @example
 * ```typescript
 * MY_UTIL(42)   // returns ...
 * MY_UTIL(null) // returns ...
 * ```
 */
export function MY_UTIL (v: InputType): ReturnType {
  // implementation
  return result
}
```

Rules:
- Name: `UPPER_SNAKE_CASE` (e.g. `IS_AN_INT`, `TO_NUMBER`, `ARRAY_SUM`)
- Max **1 parameter**; wrap multiple inputs in a single object parameter
- Max **1 `return` statement** per function (throwing is allowed for the error path)
- Explicit return type on every named export
- Prefer `unknown` with type guards over `any`
- Named `function` declaration for public exports; arrow functions only for anonymous callbacks

## 3. JSDoc (required on every export)

- `@param` for each parameter, `@returns`, and at least one `@example` block
- The example must show at least the happy path and one edge case (e.g. `null`, empty array)

## 4. Barrel — Subfolder `ts/<category>/index.ts`

Add the new export in **alphabetical order**. Use the `.js` extension (ESM output):

```typescript
export { MY_UTIL } from './my-util.util.js'
```

## 5. Barrel — Root `ts/index.ts`

Find the line that re-exports from `'./<category>/index.js'` and add the new name to the destructured list, keeping it **alphabetical**:

```typescript
export { ..., MY_UTIL, ... } from './<category>/index.js'
```

## 6. Test File

```typescript
import { describe, expect, it } from 'bun:test'
import { MY_UTIL } from '../../ts/<category>/my-util.util.js'

describe(
  'MY_UTIL',
  () => {
    const testCases = [
      { name: 'descriptive name for happy path', input: ..., expected: ... },
      { name: 'edge case: null', input: null, expected: ... },
    ]

    it.each(testCases)(
      '$name',
      ({ input, expected }) => {
        expect(MY_UTIL(input)).toBe(expected)
      }
    )
  }
)
```

Rules:
- Import from `../../ts/` source, **not** `../../esm/`
- Every test case must have a descriptive `name` string
- Use `$name` (not `%s`) as the test title template
- Split into separate `testCases` arrays when grouping by logical scenario helps clarity
- Use `toBeNaN()` for NaN assertions (not `.toBe(NaN)`)

## 7. After Creating Files

Run in order and fix every error before committing:
```bash
bun run lint
bun test
bun run build
```
