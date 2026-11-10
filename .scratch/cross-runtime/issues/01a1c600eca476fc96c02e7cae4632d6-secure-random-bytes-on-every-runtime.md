# 01a1c600eca476fc96c02e7cae4632d6: Secure random bytes on every runtime

Status: ready-for-agent
Blocked by: none

## What

Three utils draw random numbers, and fall short of a secure source somewhere:
- `UUID_V4` (`ts/uuid/uuid-v4.util.ts`): `crypto.randomUUID()`, else `crypto.getRandomValues`, else `Math.random`;
- `UUID_V7` (`ts/uuid/uuid-v7.util.ts`): `crypto.getRandomValues`, else `Math.random`;
- `GET_RANDOM_INT_BETWEEN` (`ts/number/get-random-int-between.util.ts`): always `Math.random` (its JSDoc says "Not secure").

`Math.random` is not cryptographically secure. The global `crypto` is missing on Node 16 to 18 by default (`engines` allows `>=16`, user decision 2026-11-10 to keep it), and the fallbacks are silent.

## Decision

User, 2026-11-10: no throwing. Use a better source than `Math.random` wherever one exists, and keep `Math.random` only as the last resort.

What old runtimes offer, without an import (`ts/` imports nothing, AGENTS.md):
- Node 16.15+, 17.6+ and 18 have the global `crypto` behind the `--experimental-global-webcrypto` flag; Node 19+ has it by default. Check this against the Node docs.
- Node 15+ has `webcrypto` in `node:crypto`, which only the caller can import: take its `getRandomValues` through the object parameter.
- Not usable: `process.getBuiltinModule` (Node 20.16+ and 22.3+, where the global exists anyway), and a dynamic `import('node:crypto')`, which is async (the UUID utils are sync) and which bundlers follow into browser builds.

## Design

- A new util `GET_RANDOM_BYTE_LIST({ length, getRandomValues? })` returns a `Uint8Array` filled by the first source available: the injected `getRandomValues`, then `globalThis.crypto.getRandomValues`, then `Math.random`. It is exported through `ts/number/index.ts` (or wherever the folder layout fits best) and `ts/index.ts`.
- `UUID_V4` and `UUID_V7` take an optional `_?: { getRandomValues? }` and draw their bytes from it; `UUID_V4` keeps `crypto.randomUUID()` first.
- `GET_RANDOM_INT_BETWEEN` gains `getRandomValues?` in its object parameter, and draws with rejection sampling, so every integer of the range is equally likely: no modulo bias. It must cover any range between safe integers.
- The JSDoc of the 4 utils states the order of the sources and the fix for Node 16 to 18: pass `getRandomValues: webcrypto.getRandomValues.bind(webcrypto)` (from `node:crypto`), or run Node with `--experimental-global-webcrypto`. With neither, the bytes come from `Math.random`. The "Not secure" line of `GET_RANDOM_INT_BETWEEN` and the "On Node 16 to 18 …" lines of the UUID utils change to match.

## Acceptance

- Tests with an injected `getRandomValues` returning fixed bytes give exact UUIDs, and exact integers, including one draw that rejection sampling discards.
- A test with no global `crypto` (stubbed, then restored) reaches the `Math.random` path.
- A test without injection reaches the global `crypto` path.
- `bun run check` passes; `feat:` commit (the new optional parameters), with `fix:` for the bias if it is split out.
