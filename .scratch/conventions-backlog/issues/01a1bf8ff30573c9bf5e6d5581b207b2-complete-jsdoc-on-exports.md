# 01a1bf8ff30573c9bf5e6d5581b207b2: Complete the JSDoc of every export

Status: ready-for-agent
Blocked by: 01a1bf8ff29e765a994f7eca358c1d96

## What

`AGENTS.md` (JSDoc) requires `@param`, `@returns` and `@example` on every exported function (user decision, 2026-11-09). On 2026-11-09, 195 of 307 `ts/**/*.util.ts` files had any JSDoc, and 12 had an `@example`. The latest additions carry one line only, e.g. `ts/query/where-in-or-false.util.ts:5`.

Blocked by the const-to-function migration: both rewrite the head of every export, so this one goes second to avoid conflicts.

## Acceptance

- Every export of `ts/` has a JSDoc block with `@param` for its parameter, `@returns`, and an `@example` showing the happy path and one edge case (`null`, empty array, ...), as in section 3 of `.github/instructions/new-utility.instructions.md`.
- Each example states what the call returns; check it against the tests of that util.
- `bun run prepare`, `bun run lint`, `bun run test:types` pass.
- One commit per `ts/` category folder, `docs:` type.
