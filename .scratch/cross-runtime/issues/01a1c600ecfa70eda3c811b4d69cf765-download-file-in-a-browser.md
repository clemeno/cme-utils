# 01a1c600ecfa70eda3c811b4d69cf765: DOWNLOAD_FILE saves through the browser without writeFile

Status: ready-for-agent
Blocked by: none

## What

`DOWNLOAD_FILE` (`ts/file/download-file.util.ts`) gets `srcUrl` with axios (`responseType: 'arraybuffer'`), then calls `_.writeFile(_.destPath, response.data)`, the `writeFile` of `node:fs/promises`. It runs on Node and bun only (its JSDoc says so).

## Decision

User, 2026-11-10: without `writeFile`, `DOWNLOAD_FILE` triggers a browser download.

## Design

- `writeFile` becomes optional. When it is given, nothing changes.
- Without it, in a browser:
  1. wrap `response.data` in a `Blob`;
  2. `URL.createObjectURL(blob)`;
  3. create an `<a>` through `window.document` (lint forbids the bare `document` in `ts/`), with `href` set to the object URL and `download` set to the last segment of `destPath`;
  4. click it, remove it, and revoke the URL.
- Without `writeFile` and without a document (Node or bun called without it), reject with a clear `Error`, naming `writeFile` as the fix. The file would otherwise go nowhere.
- JSDoc: both paths, a browser example line, and the `Runs on Node and bun only` line replaced by the rule above.

## Acceptance

- A test with a mocked `window.document` (as `tests/space/set-locale.test.ts` installs one, restored in `afterEach`) checks:
  - the link's `download` and `href`;
  - the click;
  - the removal of the link;
  - the revoke of the object URL.
- A test without `writeFile` and without `window` gets the rejection.
- The `writeFile` rows still pass.
- `bun run check` passes; `feat:` commit.
