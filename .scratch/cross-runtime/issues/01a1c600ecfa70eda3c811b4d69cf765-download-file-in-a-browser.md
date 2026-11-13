# 01a1c600ecfa70eda3c811b4d69cf765: DOWNLOAD_FILE saves through the browser without writeFile

Status: resolved
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

## Comments

2026-11-13, resolved: `DOWNLOAD_FILE` (`ts/file/download-file.util.ts`) takes `writeFile` as optional. Without it, in a browser, it saves the response through an `<a download>` link. Without it and without `globalThis.window?.document`, it rejects before the axios call, so nothing is downloaded for nothing. Tests (`tests/file/download-file.test.ts`) check the order of the steps on a mocked document: object URL, link, append, click with its `href` and `download`, removal, revoke. Differences from the design:
- The link is appended to `document.body` before the click, then removed: older Firefox clicks only a link that is in the document.
- The download name is what follows the last `/` or `\` of `destPath`. A `destPath` that ends with a separator gives an empty name, and the browser then picks one.
- The object URL is revoked 40 s after the click, not at once (user decision, 2026-11-13): Safari has failed downloads whose blob URL was revoked in the tick of the click, and FileSaver.js waits as long. The test drives the delay with bun's fake timers.
