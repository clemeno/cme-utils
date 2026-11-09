# 01a1c08f17e5708c9e7e5df3e144fed0: Check the JSDoc of every export in `bun run check`

Status: needs-triage
Blocked by: none

## What

`AGENTS.md` (JSDoc) requires `@param`, `@returns` and `@example` on every exported function, and [01a1bf8ff30573c9bf5e6d5581b207b2](01a1bf8ff30573c9bf5e6d5581b207b2-complete-jsdoc-on-exports.md) brought all 276 to it. Nothing keeps them there: a new util without JSDoc, or an example whose stated result drifts from the code, passes `bun run check`.

That pass checked the examples with a throwaway script, worth turning into a test:
- for each exported function of `ts/` (TypeScript compiler API: `ts.getJSDocTags`), report a missing `@param` (when it takes one), `@returns` or `@example`;
- in each ```` ```typescript ```` example, run every `CALL // returns VALUE` line and compare with `Bun.deepEquals`, and expect `CALL // throws ...` to throw; a VALUE that is not a JS expression is prose and is skipped; a `ReferenceError` (an example needing luxon `DateTime`, a knex `qb`, node crypto) is skipped too;
- it found 0 wrong values in 710 lines after the pass, and 8 wrong luxon examples (12-hour times) once luxon was installed in a scratch folder.

Prerequisite: bun cannot load `ts/index.ts`, so the script imported the built `m/index.js`. About 15 barrel lines re-export a type without `type` (`export { EsNode } from './es-node-type.js'` in `ts/eslint/index.ts`; `bool`, `int`, `AppValidatorFn`, `AppSpDate`, ... in `ts/index.ts`), which bun reports as `SyntaxError: export 'EsNode' not found`. Setting `"isolatedModules": true` in `tsconfig.json` makes tsc flag each one; `export type { ... }` (or an inline `type` modifier) fixes them, and makes `ts/` loadable by bundlers too (the package ships `ts/`).

## Decision needed

Whether the check is worth its upkeep: luxon is not a dev dependency, so the time examples would stay unchecked unless it is added.

## Acceptance

- `tsconfig.json` sets `isolatedModules`, and every type re-export uses `type`.
- A test under `tests/` fails on an exported function without `@param` / `@returns` / `@example`, and on a `// returns` line whose value differs from the call's result.
- `bun run check` passes.
