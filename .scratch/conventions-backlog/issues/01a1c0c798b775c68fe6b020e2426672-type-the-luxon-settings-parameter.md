# 01a1c0c798b775c68fe6b020e2426672: Type the luxon `Settings` parameter structurally

Status: ready-for-agent
Blocked by: none

## What

27 utils take luxon's `Settings` as a generic `TypeofSettings = any` and read it through `as any`, so tsc accepts any object. The `to-local-number*` tests passed `{ locale: 'en-US' }` where `GET_LOCALE` reads `defaultLocale`: tsc stayed silent, the tests held only on a fr-FR machine, and the first CI run failed (fixed by `548bf66`; user decision, 2026-11-09 retro: ticket it for 7.0.0, since it changes public types).

The utils:
- `ts/number/`: `to-local-number`, `to-local-number-with-1-f-digit`, `to-local-number-with-2-f-digits`;
- `ts/space/`: `get-geo`, `get-lang`, `get-locale`, `set-locale`;
- `ts/time/`: `from-iso-to-local-{d,dt,dtt,format,t,tt}`, `from-unix-to-local-{d,dt,dtt,format,t,tt}`, `get-7-days-ago-start`, `get-7-days-before-start`, `get-day-stop`, `get-today-stop`, `get-tz`, `now-app`, `now-app-iso`, `set-tz`.

What they use of it: `defaultLocale` (read by `GET_LOCALE`, written by `SET_LOCALE`) and `defaultZone` (its `.name` read by `GET_TZ`, a string written by `SET_TZ`). One exported interface (in `ts/`, re-exported with `type` like the other types, `AGENTS.md`: an `interface` for a type used in several places) can describe that shape, e.g. `defaultLocale: string` and `defaultZone: { name: string }` with a setter accepting a string; luxon's `typeof Settings` must satisfy it, and so must the luxon mock in `tests/mocks/`.

## Acceptance

- The 27 utils type their `Settings` with that interface; no `TypeofSettings` generic and no `as any` on `Settings` remain.
- A test row passing `{ locale: 'en-US' }` as `Settings` fails `bun run test:types` (check it once, then remove the probe).
- `examples/` still typecheck with luxon's real `Settings`.
- `bun run check` passes; one `refactor!:` commit with a `BREAKING CHANGE:` footer naming the new type.
