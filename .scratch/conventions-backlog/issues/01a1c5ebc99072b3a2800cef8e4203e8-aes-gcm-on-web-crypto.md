# 01a1c5ebc99072b3a2800cef8e4203e8: AES-GCM on Web Crypto, for the browser too

Status: needs-triage
Blocked by: none

## What

Every utility runs in a browser, on Node and on bun (user decision, 2026-11-10: "maximise compatibility everywhere, report utils that fail on a runtime or another"). `CIPHER_AES_GCM_TO_BUFFER` and `DECIPHER_AES_GCM_TO_UTF8` take `createCipheriv` / `createDecipheriv` / `randomBytes` of `node:crypto` and a `Buffer`, so they run on Node and bun only; their JSDoc says so.

Web Crypto (`crypto.subtle`) does AES-GCM in all three runtimes, and its output fits the current layout: `subtle.encrypt` returns the ciphertext followed by the 16-byte tag, so `IV (12 bytes) + its output` is the same byte layout as `CIPHER_AES_GCM_TO_BUFFER` makes. Data ciphered on a server would then decipher in a browser, and back.

## Proposed design (to confirm)

- Two new async utils on `crypto.subtle`, with `Uint8Array` in and out, e.g. `CIPHER_AES_GCM_TO_BYTES` and `DECIPHER_AES_GCM_BYTES_TO_UTF8`, same byte layout.
- `subtle` taken through the object parameter, optional, `globalThis.crypto.subtle` by default: Node 16 to 18 (`engines` allows `>=16`) have no global `crypto`, only `require('node:crypto').webcrypto.subtle`.
- The `node:crypto` versions stay, for their sync callers.

## Decisions needed

- The names, and whether the `node:crypto` versions stay or are deprecated in 7.0.0.
- In a browser, `crypto.subtle` exists only in a secure context (https or localhost): acceptable?

## Acceptance

- A test ciphers with `CIPHER_AES_GCM_TO_BUFFER` (Node API) and deciphers with the Web Crypto util, and the reverse.
- The JSDoc of the new utils has no `Runs on Node and bun only` line; `bun run check` passes.
