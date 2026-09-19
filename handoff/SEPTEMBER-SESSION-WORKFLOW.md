# September-session rollover — 3-agent workflow split

**Read `handoff/INVARIANTS.md` in full before touching anything.** It's
the contract; this file only exists to divide what's left among three
agents working in parallel without stepping on each other. Reconciled
against actual repo state on 2026-09-19 (all three live repos cloned
and checked directly, not assumed from docs) — treat that pass as
current ground truth.

**Coordination rule:** stay inside your own lane's file list below. If
a task genuinely requires touching a file another lane owns, stop and
post a note in `pausa.md` before doing it rather than editing it
silently — that's the one shared file all three of you write to, so
it's also the collision point if two agents touch it at once. Append,
don't rewrite what's already there.

**Content ownership, restated because it bites hardest in Lane 1:**
never invent text attributed to a real person — no fabricated student
quotes, no invented ambitions/dedications, no placeholder "about me"
copy that reads as if a real student wrote it. Where real content
doesn't exist yet, leave an unmistakable placeholder (`[QUOTE NEEDED —
Iman to supply]`, not a plausible-sounding fake one). This is not a
style preference, it's the difference between a template and a
fabrication with a real kid's name on it.

---

## Lane 1 — Yearbook, portraits, About page (`tendercare-web` only)

**Files:** `src/routes/yearbook/`, `src/routes/about/`,
`src/routes/portal-adjacent` result/roster display where portraits
surface, `src/lib/` any new data file this needs. Do not touch
`src/routes/sports/`, `src/routes/feed/`, or anything in
`tendercare-teacher`.

**Important finding, read before starting:** the current
`/yearbook` page is NOT data-driven. It's ~40 individually
hand-authored student cards (real names, real hand-written quotes,
hardcoded "Class of 2025") — closer to a printed yearbook laid out by
hand than a template. That means "yearbook rollover" (item 12) can't
be a simple data swap the way `alumni.json` was for the Alumni Almanac
— there is no existing per-student quote/ambition data for SS2/JSS2 to
promote into that slot, and inventing one is exactly the fabrication
the note above forbids.

Build instead: a genuinely new, data-driven yearbook template —
roster pulled from Supabase (or a generated JSON, same pattern as
`alumni.json`: honest, sourced, never fabricated) for whichever class
is currently the priority cohort per invariant 12's rule (SS2/JSS2
after the Sept 1 reset). Each card's quote/ambition field is either
genuinely populated from wherever that content actually lives (ask
before assuming it doesn't exist anywhere), or rendered as an explicit
placeholder state a non-technical admin can obviously spot and fill
in later — never silently blank, never invented. The current Class of
2025 hand-authored page doesn't need to be deleted; it can stay
reachable as that class's specific page while the new template becomes
what a "yearbook" route means going forward. Use your judgment on the
routing once you see how big the gap actually is — this is a genuine
design call, not a mechanical port.

Also in this lane:
- **Portrait provision (item 11).** `students.portrait_url` already
  exists (`tendercare-teacher` migration `0005`) — this lane only
  needs to *consume* it: wire it into the new yearbook template above,
  and into the two other scopes invariant #13 actually calls for (the
  result roster and the auth/login gate — check `tendercare-portal`
  and `tendercare-teacher`'s login page for where a per-student image
  would go; if that crosses into `tendercare-teacher`, that's the one
  cross-repo exception worth a `pausa.md` note rather than silently
  editing Lane 2's territory). NULL is the common case — never assume
  every student has one, fall back to the existing static placeholder
  path.
- **About page.** WhatsApp link placeholder, social-media embed
  placeholders (both genuinely just placeholders — real links are his
  to supply, not yours to guess or fabricate), and the
  full-time/part-time/corps-member staff distinction display. Per
  invariants doc: determined either by admin assignment or staff
  self-selection — if no existing data source answers "which is this
  staff member," build the display to read `staff.staff_type`
  (`tendercare-teacher` migration `0010`, already populated) rather
  than inventing a second source of truth.

---

## Lane 2 — Feed as a real notification board (`tendercare-teacher` backend + `tendercare-web` display)

**Files:** `tendercare-teacher/supabase/migrations/` (new migration),
`tendercare-teacher/src/lib/` (feed-posting listeners),
`tendercare-web/src/routes/feed/`. This is the one lane that
legitimately spans both repos — it's a single feature (write side +
read side), not two agents' worth of scope, so it stays with one agent
rather than splitting further and needing to coordinate a shared table
shape mid-build.

The spec, per `INVARIANTS.md`'s Feed entry — build against this
exactly, not a generic activity-feed interpretation:
- Content: admin/result activity only — upload dates, class averages,
  media changes, new teacher roles, part-time/corps-member arrivals.
  Not open student commentary.
- Reactions only, no comments. Each reaction registers as **3** toward
  the displayed count (inflated by design, not a bug to "fix" later).
- Cleared every year on the Sept 1 reset (full wipe, tied to the same
  rollover event as promotion) — separate from item 6's **weekly**
  deletion, which is feed-specific and runs regardless of the yearly
  reset. Two distinct jobs, already resolved as non-contradictory in
  the invariants doc — don't collapse them into one.
- `feed_comments`/`feed_likes` tables already exist in
  `tendercare-teacher`'s schema per the invariants doc — check their
  actual shape against this spec before assuming they just need
  wiring up; the doc flags real feed listeners as "not started," so
  treat the existing tables as a starting point to verify, not a
  finished contract.
- `tendercare-web`'s `/feed` page currently reads `localStorage` with
  open commenting — the opposite of this spec. Full replacement, not
  an incremental patch.

---

## Lane 3 — Sports (additive only), student bio UI (`tendercare-web` sports + `tendercare-teacher` roster)

**Files:** `tendercare-web/src/routes/sports/+page.svelte`,
`tendercare-teacher/src/routes/roster/+page.svelte`,
`tendercare-teacher/src/lib/roster.ts`. Two unrelated small tasks
bundled into one lane because neither is large enough alone and
neither touches Lane 1 or Lane 2's files.

**Sports — explicit instruction: add, don't remove.** The existing
video-modal system (hero section, house-results, timeline, the works)
stays exactly as it is. The actual gap is a swipeable/GIF-capable
image gallery to compensate for the site generally avoiding video on
bandwidth grounds — add that as a new section alongside what's already
there (a natural slot: near the STATS or NARRATIVE section, your
judgment on exact placement), not a replacement for the video modal.
If you're touching this file, resist the urge to also "clean up" or
restructure anything already working — this instruction was explicit
and specific: add, don't tweak.

**Student bio (item 2, refined).** `students.bio` already exists
(`tendercare-teacher` migration `0008`) — schema-only right now, no
UI reads or writes it. Wire it into the roster page: teacher-editable,
same access pattern as the existing remark/portrait fields on that
page (remarks are now read-only/auto-assigned, don't follow that
pattern for bio — bio stays teacher-editable free text, that's the
whole point of item 2).

---

## Explicitly NOT in any lane — don't pick these up

- **Whether `run_promotion()` has actually been run for 2026/2027.**
  Not a build task — check `promotion_already_run()` against the live
  database, or just look at whether the Attendance page's promotion
  button is still showing. If it hasn't run, that's a one-click action
  for Iman, not something an agent should trigger unilaterally.
- **Staff permission tiers.** Explicitly undecided by Iman ("until I
  figure out the actual lines to draw") — `staff_type` exists and is
  stored, but building differentiated permissions now would mean
  guessing at a decision that's genuinely still open.
- **Awards categories beyond `overall_average`.** The generator
  (`compute_awards.py`) is already built extensible for this
  (`CATEGORIES` dict, one place to register a new one) — what's
  missing is Iman defining what the categories actually are, which is
  a curriculum/content decision, not an engineering one.
- **Real student population for the report pipeline.** Still 12 demo
  files. Explicitly a data problem (needs Iman's real per-student
  class history + term data), not a code problem — no amount of
  engineering closes this gap.
- **The result-checker admin app.** He's building the actual
  generation/WhatsApp-share mechanism himself, personally and
  manually — agent scope is a disabled placeholder tile only, already
  built, nothing further here.
