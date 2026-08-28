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
- **`report-pipeline/`** — see the note below; this one's a genuinely
  open question, not settled.

## Note on `report-pipeline/`

This folder (schema, Jinja2 template, `generate.py`, `compute_awards.py`)
produces the static, hardcoded result sheets and awards data that
`tendercare-portal` and `tendercare-web` actually serve — it's active
tooling, not historical reference, and it's had real commits landed
directly in this "reference-only" repo across several recent sessions.
That's a live inconsistency worth resolving, not something this note
papers over: either this folder should move into `tendercare-teacher`
(which has taken over this repo's role) or `tendercare-portal` (which
consumes its output), or it stays here deliberately as a separate
build-tooling concern with its own justification for not living in an
app repo. Not decided yet — flagged, not resolved, in the commit that
added this note.
