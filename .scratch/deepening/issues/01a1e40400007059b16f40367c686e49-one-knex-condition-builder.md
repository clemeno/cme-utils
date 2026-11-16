# 01a1e40400007059b16f40367c686e49: One knex condition builder behind the WHERE and WHERE_IN families

Status: ready-for-agent
Blocked by: none

## What

The architecture review of 2026-11-16 found the IN family repeating one logic 4 times: `WHERE_IN`, `OR_WHERE_IN`, `WHERE_NOT_IN`, `OR_WHERE_NOT_IN` (`ts/query/`) each map the `§§not0§§` / `§§null§§` markers in a single-value branch and again in a loop (31 marker occurrences across 10 files). `WHERE` and `OR_WHERE` are 68 lines each and differ only in the knex method names.

The grouping rule is written nowhere: IN joins its values with OR, NOT IN with AND, and the values go in a group only when that inner connector differs from the outer one (`WHERE_IN` and `OR_WHERE_NOT_IN` group, `OR_WHERE_IN` and `WHERE_NOT_IN` do not). Each file reaches "an empty list adds no condition" its own way (an empty group, or an empty loop).

## Decisions

Maintainer, 2026-11-16: flags on the base exports, no new export, no file move.
- `WHERE_IN` takes optional `bOr` (outer connector OR) and `bNot` (NOT IN), and owns the markers, the grouping rule and the empty case. `OR_WHERE_IN`, `WHERE_NOT_IN` and `OR_WHERE_NOT_IN` become one-line delegates.
- `WHERE` takes an optional `bOr`; `OR_WHERE` becomes a one-line delegate.
- `WhereInParams` and `WhereParams` gain the optional flags; `OrWhereInParams` stays as it is, so the change is additive.

Settled before (memory, 2026-09-23), unchanged: the base utils add no condition for an empty list; `WHERE_IN_OR_FALSE`, `OR_WHERE_IN_OR_FALSE`, `WHERE_NOT_IN_OR_TRUE` and `OR_WHERE_NOT_IN_OR_TRUE` copy knex's empty-list SQL.

## Acceptance

- The existing tables of the 6 exports pass unchanged: the mock query builder records the same calls, so the SQL stays identical.
- New rows call `WHERE_IN` with each `bOr` × `bNot` pair and `WHERE` with `bOr`, and match the rows of the matching delegate.
- The JSDoc of `WHERE_IN` states the grouping rule; `bun run check` passes.
- One `refactor:` commit (no `!`: no interface narrows).

## Out of scope

- The `_OR_FALSE` / `_OR_TRUE` variants, which already delegate.
- Any change to the generated SQL.
