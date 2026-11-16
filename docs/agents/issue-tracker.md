# Issue tracker: Local Markdown

Issues and specs for this repo live as markdown files in `.scratch/`. They are committed with the code, so a push publishes them on the public GitHub repo.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<id>-<slug>.md`, never a single combined tickets file
- `<id>` is a fresh UUID v7 in hex, without `-`. Generate it, never hand-write or shorten it: `bun -e "console.log(Bun.randomUUIDv7().replaceAll('-',''))"`
- The ticket's title is `# <id>: <title>`. File names, references, commits and replies name the ticket by that id.
- Order of work lives in a `Blocked by: <id>, <id>` line near the top of each ticket. Create the blockers first: a UUID v7 sorts by creation time.
- Each acceptance line names a check that runs the changed code (a test, a probe, `bun run check`) and goes red without the change: before writing the line, open the code that check runs and confirm that deleting the changed line fails it. A row that still passes with the step deleted proves nothing, even at 100% line coverage (zone rows that never reached `setZone`, 2026-11-16).
- A ticket that refactors or changes existing outputs adds an acceptance line for an old-vs-new run over each input kind: `git worktree add --detach .scratch/tmp/old <base>` (`--detach` also takes a branch checked out here, such as `main`), import `./ts/index.ts` and `./.scratch/tmp/old/ts/index.ts` in one `bun -e` probe, then `git worktree remove .scratch/tmp/old`. Every output the run finds changed is named in the ticket; any other change is a regression (dashed UUIDs that became the NIL UUID, 2026-11-16).
- A Decision that changes a shared type or an exported function names each of its users inside `ts/` (Grep), as the "Callers inside `ts/` to switch" column of the one-uuid-text-form ticket does: flags added to the shared `WhereInParams` also reached `WHERE_IN_OR_FALSE` (2026-11-16).
- State is recorded as a `Status:` line near the top of each issue file: a triage role string of `triage-labels.md`, then `claimed` once work starts and `resolved` when done. A `resolved` or `wontfix` ticket is closed; any other is open.
- Comments and conversation history append to the bottom of the file under a `## Comments` heading
- On resolving a ticket, after the code commits: set `Status: resolved`, append a dated note under `## Comments` that names where the work differs from the ticket's design, grep the repo for its id (`AGENTS.md`, docs, other tickets) and update or drop each pointer that still sends readers to it as open work, then commit the ticket alone as `docs: close the <slug> ticket` with a `Ticket: <id>` trailer

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
