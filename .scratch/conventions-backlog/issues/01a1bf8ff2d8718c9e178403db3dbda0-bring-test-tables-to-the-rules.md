# 01a1bf8ff2d8718c9e178403db3dbda0: Bring the test tables to the AGENTS.md rules

Status: resolved
Blocked by: none

## What

`AGENTS.md` (Testing Pattern) covers every test file (user decision, 2026-11-09). Older files break it:
- about 284 of 316 test files have untyped rows (`const testCases = [`); type them as `Array<{ name: string, ... }>`;
- 13 files branch with `if` inside a test body, e.g. `tests/array/array-sum.test.ts:22` (`if (isNaN) {`); split them into separate tables (for example a `toBeNaN` table and a `toBe` table);
- unused destructured `name` in the `it.each` callback, e.g. `tests/array/array-sum.test.ts`.

## Acceptance

- `grep -rn "const testCases = \[" tests` finds nothing.
- No `if` inside an `it` / `it.each` body.
- `bun install`, then `bun run prepare`, `bun run lint`, `bun test`, `bun run test:types` pass; the test count does not drop; coverage stays at 100% lines and functions.
- One commit per `tests/` category folder, `test:` type.

## Comments

2026-11-09: done in 25 `test:` commits, one per `tests/` folder, plus review fixes. A TypeScript-compiler codemod typed 303 tables from their rows (a structural union longer than 60 characters became `unknown`, a union holding `{}` became `unknown`) and dropped 27 unused destructured `name`s; about 15 columns were typed by hand where `unknown` was too loose. The `if`s left the test bodies: NaN rows moved to `toBeNaN()` tables (`.github/instructions/new-utility.instructions.md` §6), `toBe(undefined)` replaced the `isUndefined` flags, `ws-axios-sp-request` and `set-document-tz` compare the whole result and request with `toEqual`, and the `is-a-function` input calls (coverage of the test file only, which `coverageSkipTestFiles` skips) went. Fixed in passing: the `is-odd` title printed `%s` literally. `bun run check` passes with 3004 tests (the count before), 100% lines and functions. Left for [01a1c0755cd5745fb6b20ab977fa30c7](01a1c0755cd5745fb6b20ab977fa30c7-name-every-test-row.md): tables keyed `label` or with no name column.
