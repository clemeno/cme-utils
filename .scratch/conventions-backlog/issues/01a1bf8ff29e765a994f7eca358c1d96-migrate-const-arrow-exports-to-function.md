# 01a1bf8ff29e765a994f7eca358c1d96: Migrate const arrow exports to function declarations

Status: resolved
Blocked by: none

## What

`AGENTS.md` (Function Rules) requires exports to be named `function` declarations. About 220 exports in `ts/` still have the form `export const NAME = (...) =>`. Rewrite them as `export function NAME (...): T { ... }` (user decision, 2026-11-09).

Forms to handle (counts from `grep` on 2026-11-09):
- plain arrows with a block body;
- one-line expression bodies, e.g. `IS_AN_ARRAY = <T = any> (v: any): v is T[] => Array.isArray(v)`: wrap in `{ return ... }`;
- generic arrows, e.g. `CIPHER_AES_GCM_TO_BUFFER = <Buffer = any, ...> (_: {...})`: move the type parameters after the name;
- 19 `async` arrows: `export async function NAME`.

## Typed consts stay

Consts annotated with a function type keep that type only as consts: `IS_INT_UNSIGNED_VALIDATOR: AppValidatorFn = control => {`, `NOOP: (..._: any) => void = () => {}`. A `function` declaration cannot take that annotation. User decision, 2026-11-09: keep typed const arrows as they are. Kept: `NOOP` and the four `ts/form/*-validator.util.ts`.

## Acceptance

- No `export const NAME = (...) =>` left in `ts/`, except the typed consts above.
- The public API is unchanged for callers: compare the `m/**/*.d.ts` before and after (`declare const X: (...) => T` becomes `declare function X(...): T`).
- `bun install`, then `bun run prepare`, `bun run lint`, `bun test`, `bun run test:types` pass; coverage stays at 100% lines and functions.
- One commit per `ts/` category folder, `refactor:` type.

## Comments

2026-11-09: done. 224 exports migrated in 25 `refactor:` commits (one per `ts/` folder); `NOOP` and the four form validators stay typed consts. Every runtime export (453) has an identical type before and after (identical-type check of the 3dc4905 build against the new one); lint, 2980 tests at 100% lines and functions, and `test:types` pass. The review added: parens and indent kept on multi-line returns, the three private helpers (`IS_NOT_EMPTY`, `IS_OFF`, `toIsoString`) converted too, and explicit `: string` on `GET_BASE_URI` and `BYTE_ARRAY_TO_UUID`.
