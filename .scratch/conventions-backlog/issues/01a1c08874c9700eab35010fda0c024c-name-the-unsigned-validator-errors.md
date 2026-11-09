# 01a1c08874c9700eab35010fda0c024c: Name the error keys of the unsigned int validators

Status: resolved
Blocked by: none

## What

The JSDoc pass of [01a1bf8ff30573c9bf5e6d5581b207b2](01a1bf8ff30573c9bf5e6d5581b207b2-complete-jsdoc-on-exports.md) found three Angular form validators that return the same error key:
- `IS_SMALL_INT_UNSIGNED_VALIDATOR` (`ts/form/is-small-int-unsigned-validator.util.ts`) returns `{ isSmallInt: true }`;
- `IS_INT_UNSIGNED_VALIDATOR` (`ts/form/is-int-unsigned-validator.util.ts`) and `IS_TINY_INT_UNSIGNED_VALIDATOR` (`ts/form/is-tiny-int-unsigned-validator.util.ts`) return `{ isSmallInt: true }` too, which looks copied from the small-int one. Their tests pin that key.

A template can't tell which range failed from the key, but a consumer that reads `errors.isSmallInt` after either of the two validators breaks if the key changes.

## Decision needed

Keep the shared key (and document it as a generic "out of range" key), or rename to `isInt` / `isTinyInt` as a breaking change, listed in the release notes.

## Acceptance

- The chosen keys are returned, documented in each JSDoc, and pinned by the tests.
- `bun run check` passes.

## Comments

2026-11-09: the user chose the rename, the next release being a major version. `fix!: name the error key of each unsigned int validator after its range`: `IS_INT_UNSIGNED_VALIDATOR` returns `{ isInt: true }`, `IS_TINY_INT_UNSIGNED_VALIDATOR` `{ isTinyInt: true }`. In the same spirit, `refactor!:` renamed `ts/bigint/bigint-div-trunk.util.ts` to `bigint-div-trunc.util.ts` and `ts/http/base-uri.util.ts` to `get-base-uri.util.ts`, the two util files not named after their export.
