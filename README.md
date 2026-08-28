# Teacher-care

> **This repo is reference-only.** It is not part of the live Tendercare
> architecture. Its role — the staff dashboard, roster management,
> broadsheets — has been fully taken over by
> [`tendercare-teacher`](https://github.com/artificialiman/tendercare-teacher).
> Nothing here is deployed, and new application code should not be added
> here going forward. It's kept as the historical source: the original
> student roster, score CSVs, and broadsheet files that seeded the real
> system, and the reasoning trail (see `handoff/`) for how the migration
> got from here to there.

## What's actually in this repo

- **Root-level files** (`*.html`, `*.csv`, `students_db.js`, etc.) — the
  original, pre-migration system: hand-built broadsheets, per-class CSV
  score exports, and the student database this all came from. Several
  of these files disagree with each other (documented in
  `handoff/HANDOFF.md` and the migration commit history in
  `tendercare-teacher`) — `student-directory.html`-derived data is what
  actually became authoritative, not any single file here.
- **`handoff/`** — the actual handoff documentation: `INVARIANTS.md` (the
  standing contract the new architecture is built against),
  `HANDOFF.md` (what was built and when), `SETUP-logins.md`, and
  `pausa.md` (a live session transcript).
- **`report-pipeline/`** — **moved.** This was flagged below as an open
  question and is now resolved: it's now `tendercare-teacher/scripts/
  report-pipeline/`, since the generation/authoring role belongs with
  the repo that took over Teacher-care's staff-dashboard role
  generally, not with `tendercare-portal` (which only consumes its
  output).

## Note on `report-pipeline/` — resolved, moved

This folder used to live here. It's active tooling (produces the
static result sheets and awards data `tendercare-portal`/`tendercare-web`
actually serve), not historical reference, which was flagged as a real
inconsistency with this repo's reference-only status. Resolved: it now
lives in `tendercare-teacher/scripts/report-pipeline/` — generation/
authoring tooling belongs with the repo whose role that is.
