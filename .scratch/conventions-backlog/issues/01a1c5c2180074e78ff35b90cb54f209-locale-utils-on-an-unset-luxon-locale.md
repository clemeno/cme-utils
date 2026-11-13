# 01a1c5c2180074e78ff35b90cb54f209: Handle an unset luxon `defaultLocale` in the locale utils

Status: resolved
Blocked by: none

## What

luxon starts with `Settings.defaultLocale === null` (`node_modules/luxon/src/settings.js`), while `@types/luxon` and `AppLuxonSettings` type it `string`. Until the app calls `SET_LOCALE` (or sets `Settings.defaultLocale`):
- `GET_LOCALE(Settings)` returns `null` and writes it to the document `locale` attribute;
- `GET_LANG` and `GET_GEO` call `.split` on it;
- `TO_LOCAL_NUMBER*` call `toLocaleString(null)`, which throws `TypeError` (checked with bun on 2026-11-10).

Found by the Spec review of 01a1c0c798b775c68fe6b020e2426672.

## Decision

User decision, 2026-11-10: an unset locale falls back to the system locale, the one luxon itself formats with (`new Intl.DateTimeFormat().resolvedOptions().locale`). The other options were `'en-gb'` (the fallback of `SET_LOCALE`) and no fallback.

`AppLuxonSettings.defaultLocale` becomes `string | null`, so tsc makes every reader handle it; `GET_LOCALE` returns the fallback, and writes it to the document `locale` attribute like any other locale.

The fix must run in a browser, Node and bun (user, 2026-11-10): `Intl.DateTimeFormat` is ECMA-402, in all three (checked: bun and Node v26 both give `fr-FR` on this machine), so it needs no platform parameter.

## Acceptance

- A test with `defaultLocale: null` fails on the old code and passes on the fix, for `GET_LOCALE` and `TO_LOCAL_NUMBER`.
- One `fix:` commit; `bun run check` passes.

## Comments

2026-11-13, resolved in 82f8741: `GET_LOCALE` (`ts/space/get-locale.util.ts`) falls back to `new Intl.DateTimeFormat().resolvedOptions().locale`, and `AppLuxonSettings.defaultLocale` is `string | null`. `GET_LOCALE` is its only reader: `GET_LANG`, `GET_GEO` and the 3 `TO_LOCAL_NUMBER*` utils go through it, so they change in no line. The tests stub `Intl.DateTimeFormat.prototype.resolvedOptions` to give `de-DE`, so they pass whatever the machine's locale. Differences from the decision:
- An empty locale falls back too: luxon treats `''` as unset (`locale || Settings.defaultLocale`, `node_modules/luxon/src/impl/locale.js`), and `toLocaleString('')` throws `RangeError: invalid language tag`.
- `createMockSettings` (`tests/mocks/luxon-mock.ts`) accepts a `null` locale.
