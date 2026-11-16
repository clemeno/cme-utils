# 01a1e40400577010932e095ca1449dfe: One zone rule for the luxon same-period checks, real tests for the local formats

Status: ready-for-agent
Blocked by: none

## What

The architecture review of 2026-11-16 found:
- `LUXON_IS_SAME_Y` to `LUXON_IS_SAME_YMDHM` (`ts/time/luxon-is-same-*.util.ts`) compare the wall-clock fields of each moment in its own zone, but `LUXON_IS_SAME_YMDHMS` compares the instant (`toUnixInteger()`). For `2026-01-01T12:00:00Z` in Europe/Paris and in UTC, `LUXON_IS_SAME_YMDHM` returns `false` and `LUXON_IS_SAME_YMDHMS` returns `true` (checked with `bun -e` and luxon 3.7).
- The tests of the 12 `FROM_{UNIX,ISO}_TO_LOCAL_*` utils only assert `typeof 'string'`, and the mock's `setZone` does nothing, so the zone step (`setZone(GET_TZ(Settings))`) is never tested.

## Decisions

Set by the agent from the review, 2026-11-16:
- `LUXON_IS_SAME_YMDHMS` compares the `second` field and `LUXON_IS_SAME_YMDHM`, like its siblings and like luxon's own `hasSame`. `LUXON_IS_SAME` stays the instant comparison. The JSDoc of the family says so and points to `LUXON_IS_SAME` for the same instant.

Maintainer, 2026-11-16: the 10 format wrappers (`_D`, `_DT`, `_DTT`, `_T`, `_TT`) stay; they fix a format choice.

## Acceptance

- A `LUXON_IS_SAME_YMDHMS` row with the Paris / UTC pair above expects `false`, and a row with the same wall clock in two zones expects `true`.
- The format tests use the real luxon `DateTime` (a devDependency) with a pinned locale and zone, and assert exact strings: one row per wrapper, and zone rows for `FROM_UNIX_TO_LOCAL_FORMAT` and `FROM_ISO_TO_LOCAL_FORMAT` (unix `0` in Asia/Tokyo is 09:00). They pass whatever the machine's locale and zone, and luxon's global `Settings` is restored after each test.
- `bun run check` passes. Commits: `fix!:` for `LUXON_IS_SAME_YMDHMS`, `test:` for the format tests.

## Out of scope

- Removing or merging the format wrappers or the same-period family.
