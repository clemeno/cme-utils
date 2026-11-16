# 01a1e404007c7733b4fa6d76960a0a08: One classifier behind the image location resolvers

Status: resolved
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

## Comments

### 2026-11-16: resolved

Resolved in 8e11b6d (the classifier) and b2a2ed9 (the review's fixes). The Spec review ran the old and new resolvers side by side on 3,312 calls: no output changed. Differences from the design:
- The classifier is `GET_FILE_NAME_AND_KIND_FROM_ANY_STRING`, returning `{ kind, filename }` with `kind` one of `'uuid'`, `'upload'`, `'static'`, `'url'`, `'url-without-file'`, `'name'`. The extra `'url-without-file'` kind is what lets the resolvers return `''` for a URL without a file name: `filename === ''` can't signal it, since `s = ''` gives `'/uploads/'`.
- All 12 trailing-slash joins now go through one util: the 3 resolvers and the 11 per-root exports call `GET_UPLOADED_FILE_PATH` or the per-root join that calls it (`GET_CLOUDFRONT_LINK_PATH`, `GET_CLOUDFRONT_URL_FILE`, `GET_PUBLIC_API_URL_FILE`). Its parameter is named `fileUploadFolder`, which reads oddly under a CloudFront or public API root; a neutral name would be its own change.
- `GET_CLOUDFRONT_URL_FROM_ANY_STRING` now constrains its `basename` generic to `(s: string) => string`, as its 2 siblings do: a TypeScript caller passing anything else no longer compiles, where it would have failed at run time.
