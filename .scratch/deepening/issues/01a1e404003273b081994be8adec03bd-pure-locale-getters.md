# 01a1e404003273b081994be8adec03bd: Pure locale getters; only the setters write the document

Status: resolved
Blocked by: none

## What

`GET_LOCALE`, `GET_LANG`, `GET_GEO` (`ts/space/`) and `GET_TZ` (`ts/time/`) write their own attribute to `document.documentElement` when it differs from luxon `Settings`. A read re-syncs one attribute only: the architecture review of 2026-11-16 formatted a number and a date under fr-CA / Asia/Tokyo and found `{"lang":"en","geo":"GB","locale":"fr-CA","tz":"Asia/Tokyo"}`. Every formatter that reads the locale or zone (`TO_LOCAL_NUMBER*`, `FROM_{UNIX,ISO}_TO_LOCAL_*`, `NOW_APP`) writes to the document as a side effect, so its tests need a mocked window. The locale → lang / geo split is written 4 times.

## Decisions

Maintainer, 2026-11-16: the getters become pure.
- `GET_LOCALE`, `GET_LANG`, `GET_GEO` and `GET_TZ` read `Settings` only; they neither read nor write the document.
- `SET_LOCALE` and `SET_TZ` are the only writers: `SET_LOCALE` sets `Settings.defaultLocale`, then writes `locale`, `lang` and `geo`, taking lang and geo from `GET_LANG` / `GET_GEO`, so the split lives in those two getters only. `SET_TZ` writes `tz`.
- `SET_DOCUMENT_LANG_FROM_LOCALE` and `SET_DOCUMENT_GEO_FROM_LOCALE` go. `SET_DOCUMENT_LOCALE`, `SET_DOCUMENT_LANG`, `SET_DOCUMENT_GEO` and `SET_DOCUMENT_TZ` stay.
- Breaking for an app that sets `Settings.defaultLocale` or `defaultZone` directly and relied on a read to update the document: the JSDoc of each getter says that only `SET_LOCALE` / `SET_TZ` update it.

## Acceptance

- Each getter's table asserts its return value and that the document's `setAttribute` is never called; `GET_TZ` asserts the zone name, not `typeof`.
- One table for `SET_LOCALE` asserts the 3 attributes it writes (`fr-CA` gives `locale` `fr-CA`, `lang` `fr`, `geo` `CA`), and `SET_TZ` its 1.
- The 2 removed exports are gone from `ts/`, the barrels, `tests/` and `examples/`; `bun run check` passes.
- Commits: `fix!:` for the pure getters, `refactor!:` for the removals.

## Out of scope

- The formatters' own logic; they become pure through the getters with no change of their own.

## Comments

### 2026-11-16: resolved

Resolved in 72e6778 (`fix!:`, the pure getters), faa21cc (`refactor!:`, the 2 removals) and 75d5256 (the review's fixes). `bun run check` passes with 3389 tests. No formatter file changed. Differences from the design:
- The getter tables also assert that the document's `getAttribute` is never called, since the getters "neither read nor write" it. `GET_TZ` has a two-row table (`Europe/Paris`, `UTC`).
- The getters' JSDoc says only `SET_LOCALE` / `SET_TZ` **or a `SET_DOCUMENT_*` util** update the document: those 4 writers stay public, so "only `SET_LOCALE`" was not true.
- `tests/space/document-utils.test.ts` (the utils that reach the document: a missing one is skipped, a throwing one throws) drops the 4 getters and gains `SET_LOCALE` and `SET_TZ`, the remaining writers.
- `SET_LOCALE` has a row for `'en'`, a locale without geo, which writes `geo` `''`: the removed `SET_DOCUMENT_GEO_FROM_LOCALE` tests covered that case.
