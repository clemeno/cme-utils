# 01a1bf8ff2d8718c9e178403db3dbda0: Bring the test tables to the AGENTS.md rules

Status: ready-for-agent
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
