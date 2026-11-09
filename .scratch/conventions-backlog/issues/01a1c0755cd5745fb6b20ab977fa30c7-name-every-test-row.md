# 01a1c0755cd5745fb6b20ab977fa30c7: Name every test row

Status: needs-triage
Blocked by: none

## What

`AGENTS.md` (Testing Pattern) says every test case has a descriptive `name`, used as the `'$name'` title. The review of [01a1bf8ff2d8718c9e178403db3dbda0](01a1bf8ff2d8718c9e178403db3dbda0-bring-test-tables-to-the-rules.md) found tables that predate the rule and break it:
- 28 files key their rows with `label` instead of `name` (`{ label: string, ... }` tables, titles `'$label'`), e.g. `tests/check/is-bool.test.ts`, `tests/check/is-set.util.test.ts`, `tests/compare/same-date.test.ts`, `tests/convert/display-ns-or-nb.test.ts`, `tests/object/is-key-of-object.test.ts`;
- 9 tables have no name column and build the title from `$input` and `$expected`: `tests/convert/from-js-to-constant-case.test.ts`, `from-js-to-snake-case`, `from-snake-to-camel-case`, `tests/number/is-numeric.test.ts`, `tests/regex/regex-dec-int-and-not-empty`, `regex-dec-int-or-empty`, `regex-hex-int-and-not-empty`, `regex-no-whitespace-string`, `regex-no-whitespace`.

Their titles already print descriptive text, so this is a consistency change, not a broken-output fix. Watch for row data that has its own `label` field (`tests/sort/sort-by-label.test.ts`, `tests/convert/from-list-to-record.test.ts`): only the row key that feeds the title is renamed.

## Acceptance

- Every table row type starts with `name: string`, and every `it.each` title uses `$name`.
- Test titles keep their text; the test count does not drop; `bun run check` passes.
- One commit per `tests/` category folder, `test:` type.
