# 01a1c600ecd5728290b789dd957a5c39: Read files from web streams, so the readers run in a browser

Status: resolved
Blocked by: none

## What

`GET_FILE_FULL_TEXT_CONTENT` (`ts/file/get-file-full-text-content.util.ts`) reads `for await (const chunk of _.createReadStream(_.filePath))`: a Node stream of `node:fs`, so it runs on Node and bun only (its JSDoc says so). `GET_AES_GCM_KEY_BUFFER` and `GET_AES_GCM_KEY_SFTP_BUFFER` (`ts/aes/`) read their key file through it.

## Decision

User, 2026-11-10: the readers also accept a web `ReadableStream` source, so a browser caller passes, for example:

```typescript
const createReadStream = async (filePath: string) => {
  const response = await fetch(filePath)
  if (!response.ok) { throw new Error(`${response.status} ${filePath}`) }
  return response.body
}
```

The `Buffer` the key readers return stays as it is (user decision, 2026-11-10: the types were chosen to fit an API), so in a browser they also need a `Buffer` polyfill (the `buffer` package). Their file reading part runs anywhere.

## Design

- Keep the `createReadStream` parameter name, for API compatibility. Await what it returns, which may be a stream or a promise of one.
- A web `ReadableStream` (it has `getReader`) is read with a `getReader()` loop: Safari has no async iteration of `ReadableStream`. A Node stream, or any other async iterable, keeps `for await`.
- Chunks are decoded as today: one streaming `TextDecoder`, a string chunk taken as is, and the result trimmed once.
- JSDoc: both kinds of source, with the browser `fetch` adapter as an example line. The `Runs on Node and bun only` line of `GET_FILE_FULL_TEXT_CONTENT` goes away. Those of the 2 key readers become "in a browser, pass a `Buffer` polyfill and a `fetch` based `createReadStream`".

## Acceptance

- Tests with a `new ReadableStream` source, including a multi-byte character split between 2 chunks, and with a promise of a stream; the current Node-like async iterable rows still pass.
- A source whose reader rejects makes the util reject with that error, as a Node stream error does today.
- `bun run check` passes; `feat:` commit.

## Comments

2026-11-13, resolved: `GET_FILE_FULL_TEXT_CONTENT` (`ts/file/get-file-full-text-content.util.ts`) awaits what `createReadStream` returns. It reads a web `ReadableStream` through `getReader()`, and anything else through `for await`. The 2 key readers change their JSDoc only. Tests (`tests/file/get-file-full-text-content.test.ts`) use `createMockWebReadStream` (`tests/mocks/file-mocks.ts`): a real `ReadableStream` whose async iteration is removed, as in Safari, so the tests prove the reader path is taken. Differences from the design:
- A `null` stream reads as empty: a `fetch` response without body (a 204, a HEAD request) has a `null` body. An `undefined` one still rejects, so a `createReadStream` that forgot its `return` shows.
- The JSDoc's `fetch` adapter sits in `//` lines: `tests/exports.test.ts` would run a live `fetch` and fail, and it skips only lines that name an outside API.
