# 01a1e403ffdb7253b50b2f13eb09f8d6: One UUID text form, and the true duplicates go

Status: ready-for-agent
Blocked by: none

## What

The architecture review of 2026-11-16 found the 8-4-4-4-12 grouping written 7 times, each with its own padding, overflow and `0x` rule. Checked with `bun -e` on 7a72ee3:
- `FROM_BASE_16_TO_UUID('0xFF')` returns `00000000-0000-0000-0000-000000000xff`, while `FROM_HEX_TO_UUID('0xFF')` strips the `0x`.
- `BUFFER_TO_UUID(new Uint8Array([255]))` returns `'ff----'` and `BUFFER_TO_UUID([])` returns `'----'`, while `FROM_BUFFER_TO_UUID_ALWAYS` pads to the NIL UUID.
- Too long an input overflows the last group: 17 bytes in `FROM_BUFFER_TO_UUID_ALWAYS`, 33 hex digits in `FROM_HEX_TO_UUID` and `UUID_HEX_TO_V4`.
- `STRING_TO_HEX('\n\tA')` returns `'a941'`: char codes under 0x10 lose their leading zero, and `STRING_TO_UUID` inherits it.
- `IS_UUID` only calls `IS_UUID_STRING`.

## Decisions

Maintainer, 2026-11-16: remove the true duplicates (two names, one job) in 7.0.0, keep the wrappers that fix a choice.

| Goes | Stays | Callers inside `ts/` to switch |
|---|---|---|
| `BUFFER_TO_UUID` (`ts/convert/buffer-to-uuid.util.ts`) | `FROM_BUFFER_TO_UUID_ALWAYS` | none |
| `BYTE_ARRAY_TO_UUID` (`ts/uuid/byte-array-to-uuid.util.ts`) | `FROM_BUFFER_TO_UUID_ALWAYS` | `UUID_V4`, `UUID_V7` |
| `FROM_BASE_16_TO_UUID` (`ts/convert/from-base-16-to-uuid.util.ts`) | `FROM_HEX_TO_UUID` | none |
| `IS_UUID` (`ts/string/is-uuid.util.ts`) | `IS_UUID_STRING` | `EXTRACT_UUID_FROM_STRING` |
| `GET_AES_GCM_KEY_SFTP_BUFFER` (differs only in its parameter name) | `GET_AES_GCM_KEY_BUFFER` | none |

One rule for every UUID text form (set by the agent from the review, 2026-11-16):
- `FROM_HEX_TO_UUID` is the one hex → UUID formatter: lowercase, strip a leading `0x`, left-pad to 32 digits, keep the first 32. A string holding a non-hex character gives the NIL UUID.
- `FROM_BUFFER_TO_UUID_ALWAYS` turns bytes into 2 hex digits each, then formats with `FROM_HEX_TO_UUID`. A value with no bytes gives the NIL UUID. Keep the lookup-table speed of `BYTE_ARRAY_TO_UUID` for typed arrays: `UUID_V4` and `UUID_V7` go through it.
- `STRING_TO_UUID` and `UUID_HEX_TO_V4` format through `FROM_HEX_TO_UUID`.
- `STRING_TO_HEX` pads each char code to 2 digits: `'\n\tA'` gives `'0a0941'`.

## Acceptance

- `tests/uuid/from-hex-to-uuid.test.ts` has one named table over `0x`, `0X`, upper case, short, empty, 33 digits and non-hex input, and `bun test tests/uuid` passes.
- `FROM_BUFFER_TO_UUID_ALWAYS` has rows for a Buffer, a `Uint8Array`, a `number[]`, 1 byte, 17 bytes and `null`.
- `STRING_TO_HEX` has a `'\n\tA'` → `'0a0941'` row.
- The 5 removed exports are gone from `ts/`, the barrels, `tests/` and `examples/`; `bun run check` passes.
- Commits: `fix!:` for the changed output, `refactor!:` for the removals; the commit body names each removed export and its survivor.

## Out of scope

- The `UUID_V4_TO_HEX` / `UUID_V7_TO_HEX` / `*_TO_0XHEX` direction, unless the shared codec makes them one line.
- The base conversions (`BIG_*`, `REBASE`, `BASE_CONVERT_BBSN`).
