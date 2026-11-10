# 01a1c5e3cb7f723fb0fd39a1ded4f99a: Typecheck the JSDoc examples

Status: resolved
Blocked by: none

## What

`tests/exports.test.ts` runs every `@example` block, but strips its types first (`Bun.Transpiler`), so an example that no longer typechecks still passes. When 01a1c0c798b775c68fe6b020e2426672 typed luxon's `Settings`, the examples of 9 utils passed partial objects (`GET_LOCALE({ defaultLocale: 'fr-CA' })`) that the new type rejects: nothing failed, and a grep found them. Typing the `DateTime` parameter of the 20 time utils (still a `TypeofDateTime = any` generic) will meet the same wall. (User decision, 2026-11-10 retro: ticket it, to run before that typing.)

## How

Typecheck the same blocks `exports.test.ts` extracts, as part of `bun run check`:
- every block in its own scope (`{ … }` or an async function), since examples reuse `const` names;
- in scope, what the doc-test provides: the library (`ts/index.ts`), luxon's `DateTime`, `Duration`, `Interval`, `Settings`, and `createCipheriv`, `createDecipheriv`, `randomBytes` of `node:crypto`;
- the outside APIs the doc-test skips (its `outsideApis`: `qb`, `createReadStream`, `writeFile`, `axios`, `FileReader`) declared, typed as loosely as needed;
- the `// returns` comments stay comments.

Either generate one `.ts` file into a git-ignored folder and add it to `test:types`, or typecheck in memory with the `typescript` API from `exports.test.ts`. Pick the one that keeps the error's file and line pointing at the util's JSDoc.

## Acceptance

- Putting back `GET_LOCALE({ defaultLocale: 'fr-CA' })` in `ts/space/get-locale.util.ts` fails `bun run check`, with the util's name in the message (check it once, then revert).
- Every example that fails today is fixed in the same change, or listed here with the reason it can't typecheck.
- `bun run check` passes.

## Resolution (2026-11-10)

`tests/exports.test.ts` typechecks in memory with the `typescript` API ("typechecks every @example block"). It builds one file that holds each example in its own async function, after imports of the library, luxon and `node:crypto`, and declares the outside APIs as `any`. It checks that file under `tsconfig.tests.json` and reports each error as `<util file>:<JSDoc line> <UTIL>: <message>`. The whole check takes about 2 s. The `GET_LOCALE({ defaultLocale: 'fr-CA' })` line failed it as `ts/space/get-locale.util.ts:14 GET_LOCALE: Argument of type '{ defaultLocale: string; }' is not assignable to parameter of type 'AppLuxonSettings'.`, then was reverted.

The examples of 12 utils failed; all are fixed:
- ASI: as plain code, a line starting with `[` joined the line above. The doc-test hid this, because it rewrites each checked line into a statement of its own. `IGNORE_DUPLICATES`, `SORT_BY_LABEL` and `SORT_OBJECTS` now take a leading `;`, which the doc-test strips from a checked call.
- Partial ESLint nodes: the examples of `GET_PROPERTY_NAME` and `GET_FUNCTION_NAME_WITH_KIND` cast them `as EsNode`. `EsNode.parent` is required and recursive, so no finite literal satisfies it.
- An untyped `basename` in the examples of the 3 `*_FROM_ANY_STRING` utils, and a `timezone_type: 3` widened to `number` in `FROM_SP_DATETIME_OBJECT_TO_LUXON`: both are now typed.
- A `null` input that the code handles and the `@returns` documents, but the types excluded. Their types are widened (user decision, 2026-11-10), which is not breaking: `BIG_10_TO_BIG_16`, `BIG_16_TO_BIG_10`, `FROM_BASE_10_TO_CSN_DISPLAY` `from`, `FROM_SP_DATETIME_OBJECT_TO_LUXON` `spDate`, each now `| null | undefined`.
