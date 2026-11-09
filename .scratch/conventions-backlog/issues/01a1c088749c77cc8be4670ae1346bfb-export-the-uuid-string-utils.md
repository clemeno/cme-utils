# 01a1c088749c77cc8be4670ae1346bfb: Export the UUID string utils from the barrels

Status: resolved
Blocked by: none

## What

The JSDoc pass of [01a1bf8ff30573c9bf5e6d5581b207b2](01a1bf8ff30573c9bf5e6d5581b207b2-complete-jsdoc-on-exports.md) found two tested utils that `import { ... } from 'cme-utils'` cannot reach, against the `AGENTS.md` rule that a util is exported through its folder's `index.ts`, then through `ts/index.ts`:
- `IS_UUID` (`ts/string/is-uuid.util.ts`) is in `ts/string/index.ts` but not in `ts/index.ts`;
- `EXTRACT_ALL_UUIDS_FROM_STRING` (`ts/string/extract-all-uuids-from-string.util.ts`) is in neither barrel.

`IS_UUID` only calls `IS_UUID_STRING` (exported from `ts/uuid/`), with a narrower parameter type (`string`, no type guard). Exporting it adds a second name for the same check; deprecating or deleting it is the other way out.

`CHECK` (`ts/check/check.util.ts`) is also in no barrel, but it is `@deprecated`, so it stays out.

## Decision needed

Export both (a `feat:` for the next minor release), or export `EXTRACT_ALL_UUIDS_FROM_STRING` only and deprecate `IS_UUID` in favour of `IS_UUID_STRING`.

## Acceptance

- The chosen names are in `ts/string/index.ts` and `ts/index.ts`, alphabetically.
- `bun run check` passes.

## Comments

2026-11-09: the user chose to export them all, like the other utils. `feat: export IS_UUID, EXTRACT_ALL_UUIDS_FROM_STRING and ANY_SORT_FUNCTION_TYPE from the barrels`: a scan of every export against its folder `index.ts` and `ts/index.ts` also found the `ANY_SORT_FUNCTION_TYPE` type of `ts/sort/sort-objects.util.ts`. `CHECK` (deprecated) and the ESLint plugin entry points stay out. `tests/exports.test.ts` now fails on any export a barrel misses ([01a1c08f17e5708c9e7e5df3e144fed0](01a1c08f17e5708c9e7e5df3e144fed0-check-the-jsdoc-in-bun-run-check.md)).
