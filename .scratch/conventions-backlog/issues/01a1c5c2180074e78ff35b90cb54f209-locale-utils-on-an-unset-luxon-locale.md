# 01a1c5c2180074e78ff35b90cb54f209: Handle an unset luxon `defaultLocale` in the locale utils

Status: needs-triage
Blocked by: none

## What

luxon starts with `Settings.defaultLocale === null` (`node_modules/luxon/src/settings.js`), while `@types/luxon` and `AppLuxonSettings` type it `string`. Until the app calls `SET_LOCALE` (or sets `Settings.defaultLocale`):
- `GET_LOCALE(Settings)` returns `null` and writes it to the document `locale` attribute;
- `GET_LANG` and `GET_GEO` call `.split` on it;
- `TO_LOCAL_NUMBER*` call `toLocaleString(null)`, which throws `TypeError` (checked with bun on 2026-11-10).

Found by the Spec review of 01a1c0c798b775c68fe6b020e2426672.

## Decision needed

The fallback for an unset locale:
- the system locale, as luxon itself uses (`new Intl.DateTimeFormat().resolvedOptions().locale`);
- or `'en-gb'`, the fallback of `SET_LOCALE`;
- or none: document that `SET_LOCALE` must run first.

With a fallback, `AppLuxonSettings.defaultLocale` can become `string | null`, so tsc makes every reader handle it.

## Acceptance

- A test with `defaultLocale: null` fails on the old code and passes on the fix, for `GET_LOCALE` and `TO_LOCAL_NUMBER`.
- One `fix:` commit; `bun run check` passes.
