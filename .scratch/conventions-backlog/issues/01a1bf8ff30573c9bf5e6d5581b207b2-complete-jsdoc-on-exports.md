# 01a1bf8ff30573c9bf5e6d5581b207b2: Complete the JSDoc of every export

Status: resolved
Blocked by: 01a1bf8ff29e765a994f7eca358c1d96

## What

`AGENTS.md` (JSDoc) requires `@param`, `@returns` and `@example` on every exported function (user decision, 2026-11-09). On 2026-11-09, 195 of 307 `ts/**/*.util.ts` files had any JSDoc, and 12 had an `@example`. The latest additions carry one line only, e.g. `ts/query/where-in-or-false.util.ts:5`.

Blocked by the const-to-function migration: both rewrite the head of every export, so this one goes second to avoid conflicts.

## Acceptance

- Every export of `ts/` has a JSDoc block with `@param` for its parameter, `@returns`, and an `@example` showing the happy path and one edge case (`null`, empty array, ...), as in section 3 of `.github/instructions/new-utility.instructions.md`.
- Each example states what the call returns; check it against the tests of that util.
- `bun run prepare`, `bun run lint`, `bun run test:types` pass.
- One commit per `ts/` category folder, `docs:` type.

## Comments

2026-11-09: done in 27 `docs:` commits, one per `ts/` folder, plus `docs: apply the review of the JSDoc pass`. Scope taken: the 276 exported functions (function declarations, and UPPER_SNAKE consts holding a function: `SAME_DATE`, `SAME_DATETIME`, `SORT_BY_LABEL`, the form validators), as `AGENTS.md` (JSDoc) says "All exported functions"; the 178 exported constants (`HTTP_*`, `LUXON_FORMAT_*`, `MAX_INT*`, ...), 19 types and 7 classes have no parameter or return to document and were left out. Reopen if they should get a JSDoc block too.

Each `CALL // returns VALUE` line was run against the built library by a throwaway script: 710 lines pass, 780 with luxon installed in a scratch folder (Settings.defaultLocale `en-US`, defaultZone `Europe/Paris`, and the fixed now an example states); it caught 8 time examples that showed 12-hour output from the 24-hour `T` / `TT` formats. The knex `qb`, node crypto, `FileReader` and axios examples were checked by reading the code and the tests. Turning that script into a test is [01a1c08f17e5708c9e7e5df3e144fed0](01a1c08f17e5708c9e7e5df3e144fed0-check-the-jsdoc-in-bun-run-check.md).

Found in passing and fixed in their own commits: the `to-local-number*` tests passed `{ locale }` where `GET_LOCALE` reads `defaultLocale`, so they held only on a fr-FR machine; `BIGINT_DIV_FLOOR`, `BIGINT_DIV_CEIL` and `BIGINT_DIV_ROUND` were wrong for quotients between -1 and 1, odd divisors and negative operands; four query utils named their object parameter `inParams` instead of `_`. Left as decisions: [01a1c088749c77cc8be4670ae1346bfb](01a1c088749c77cc8be4670ae1346bfb-export-the-uuid-string-utils.md) (barrel exports) and [01a1c08874c9700eab35010fda0c024c](01a1c08874c9700eab35010fda0c024c-name-the-unsigned-validator-errors.md) (validator error keys). `bun run check` passes with 3020 tests, 100% lines and functions.
