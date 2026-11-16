# 01a1e404007c7733b4fa6d76960a0a08: One classifier behind the image location resolvers

Status: ready-for-agent
Blocked by: none

## What

`GET_UPLOADED_FILE_FROM_ANY_STRING`, `GET_UPLOADED_FILE_LINK_FROM_ANY_STRING` and `GET_CLOUDFRONT_URL_FROM_ANY_STRING` (`ts/string/`) each run the same classification of their input (a UUID, an upload path, a static path, a URL, a file name) before placing the file under their own root. The architecture review of 2026-11-16 also counted the trailing-slash join of a folder and a file name 12 times across the 22 image location files of `ts/string/`.

Because the UUID check comes first, `/uploads/<uuid>_dark.png` and `/uploads/<uuid>.pdf` both resolve to `<uuid>.png`, and no JSDoc says so.

## Decisions

Maintainer, 2026-11-16: the UUID-first rule is intended. Every upload is `<uuid>.png`, and any string holding the UUID resolves to that light image. The JSDoc of the 3 resolvers states it.

Share the classification in one module the 3 resolvers call, with no change of output. `tests/exports.test.ts` needs every export of a `ts/` file to be public, so the shared module is a new public export with its own JSDoc and table. Reuse an existing join util (`GET_UPLOADED_FILE_PATH` joins a folder and a file name) where its output is the same.

## Acceptance

- The existing tables of the 3 resolvers pass unchanged.
- The new classifier has a named table over each input kind, including the `_dark.png` and `.pdf` rows above.
- The JSDoc of the 3 resolvers has a `@example` line for a `_dark.png` input; `bun run check` passes.
- One `refactor:` commit; the new export is additive.

## Out of scope

- Any change of output; merging the per-root exports (4 roots × file / light / dark).
