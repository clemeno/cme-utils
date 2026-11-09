# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files in `.scratch/`. They are committed with the code, so a push publishes them on the public GitHub repo.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<id>-<slug>.md`, never a single combined tickets file
- `<id>` is a fresh UUID v7 in hex, without `-`. Generate it, never hand-write or shorten it: `bun -e "console.log(Bun.randomUUIDv7().replaceAll('-',''))"`
- The ticket's title is `# <id>: <title>`. File names, references, commits and replies name the ticket by that id.
- Order of work lives in a `Blocked by: <id>, <id>` line near the top of each ticket. Create the blockers first: a UUID v7 sorts by creation time.
- State is recorded as a `Status:` line near the top of each issue file: a triage role string of `triage-labels.md`, then `claimed` once work starts and `resolved` when done. A `resolved` or `wontfix` ticket is closed; any other is open.
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create `.scratch/<feature-slug>/issues/<id>-<slug>.md` (creating the directories if needed); a spec goes to `.scratch/<feature-slug>/spec.md`.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the ticket id directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `.scratch/<effort>/issues/<id>-<slug>.md`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: <id>, <id>` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `.scratch/<effort>/issues/` for files that are open, unblocked, and unclaimed; the lowest id (the oldest ticket) wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.
