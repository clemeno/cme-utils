# 01a1e40400577010932e095ca1449dfe: One zone rule for the luxon same-period checks, real tests for the local formats

Status: resolved
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

## Comments

### 2026-11-16: resolved

Resolved in f42f3c5 (`fix!:`, `LUXON_IS_SAME_YMDHMS`), 4ea66d2 and b64d117 (the format tests) and d656064 (the review's JSDoc fix). Differences from the design:
- "Like luxon's own `hasSame`" holds for every tested row but not at a DST fold: `2025-10-26T00:30Z` and `01:30Z` both read 02:30 in Europe/Paris, so the util (like its siblings) returns `true` where `hasSame` returns `false`. The JSDoc says so, and points to `setZone` on both moments, or `LUXON_IS_SAME` (to the millisecond), to compare instants.
- The zone rows pass `createMockSettings({ initialZone })` with the real `DateTime`, while luxon's global zone stays UTC. With luxon's own `Settings`, `fromSeconds` / `fromISO` already return the moment in that zone, so no row could reach `setZone(GET_TZ(Settings))`. Removing that step fails exactly these 4 rows. The step changes nothing when an app passes luxon's own `Settings`, its usual case.
- Each of the 12 format test files sets and restores luxon's locale and zone inline, as `tests/time/set-tz.test.ts` does, rather than through a shared helper.
