# 01a1c5ebc99072b3a2800cef8e4203e8: AES-GCM on Web Crypto, for the browser too

Status: resolved
Blocked by: none

## What

Every utility runs in a browser, on Node and on bun (user decision, 2026-11-10: "maximise compatibility everywhere, report utils that fail on a runtime or another"). `CIPHER_AES_GCM_TO_BUFFER` and `DECIPHER_AES_GCM_TO_UTF8` take `createCipheriv` / `createDecipheriv` / `randomBytes` of `node:crypto` and a `Buffer`, so they run on Node and bun only; their JSDoc says so.

Web Crypto (`crypto.subtle`) does AES-GCM in all three runtimes, and its output fits the current layout: `subtle.encrypt` returns the ciphertext followed by the 16-byte tag, so `IV (12 bytes) + its output` is the same byte layout as `CIPHER_AES_GCM_TO_BUFFER` makes. Data ciphered on a server would then decipher in a browser, and back.

## Decision

User, 2026-11-10: keep both. The new Web Crypto utils sit beside the sync `node:crypto` ones, which stay for their sync callers.

## Design

- Two new async utils on `crypto.subtle`, with `Uint8Array` in and out and the same byte layout: `CIPHER_AES_GCM_TO_BYTES` and `DECIPHER_AES_GCM_BYTES_TO_UTF8`.
- The Web Crypto object is taken through the object parameter as `crypto`, optional, `globalThis.crypto` by default (user decision, 2026-11-12: one object rather than `subtle` alone, which leaves the IV no secure source on Node 16 to 18). Node 16 to 18 (`engines` keeps `>=16`, user decision) have no global `crypto`: there the caller passes `crypto: webcrypto` of `node:crypto`, or runs Node with `--experimental-global-webcrypto`.
- The 12-byte IV comes from `crypto.getRandomValues` of the same Web Crypto object.
- No fallback where Web Crypto is missing: a non-secure browser context (neither https nor localhost) or Node 16 to 18 without the injection. AES can't be done safely by hand, so the promise rejects with an error that names the cause, and the JSDoc says so. The other random sources fall back to `Math.random` (ticket 01a1c600eca476fc96c02e7cae4632d6, resolved).

## Acceptance

- A test ciphers with `CIPHER_AES_GCM_TO_BUFFER` (Node API) and deciphers with the Web Crypto util, and the reverse.
- The JSDoc of the new utils has no `Runs on Node and bun only` line; `bun run check` passes.

## Comments

2026-11-12, resolved: `CIPHER_AES_GCM_TO_BYTES` (`ts/aes/cipher-aes-gcm-to-bytes.util.ts`) and `DECIPHER_AES_GCM_BYTES_TO_UTF8` (`ts/aes/decipher-aes-gcm-bytes-to-utf8.util.ts`) run on `crypto.subtle`, with the byte layout of `CIPHER_AES_GCM_TO_BUFFER`. Tests (`tests/aes/aes-gcm-web-crypto.test.ts`) cover round trips, both cross-runtime directions, the NIST GCM vectors 1 and 2, the missing sources and the failing ones. Differences from the design:
- The Web Crypto object comes in whole, as `crypto` (user decision above), typed by the new exported interface `AesGcmWebCrypto` (`ts/aes/aes-gcm-web-crypto-type.ts`): only the members the utils call, since the DOM and Node types of a `CryptoKey` differ. The decipher takes `subtle` alone.
- The key and the ciphered bytes may be any `Uint8Array` or `Buffer`, typed plain `Uint8Array`: the utils copy them, since Web Crypto refuses a view on a `SharedArrayBuffer`. The output is a `Uint8Array<ArrayBuffer>`.
- A 24- or 32-byte key works too (AES-192, AES-256); only a 16-byte key matches the `aes-128-gcm` of the `node:crypto` utils.
