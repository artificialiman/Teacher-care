# Tendercare invariants — the standing contract

This is the canonical list. Anyone (any agent, any session) working on
`tendercare-web`, `tendercare-teacher`, `tendercare-portal`, or the
`Teacher-care`/UTMEDaily report-sheet system should read this first and
treat it as a contract, not a suggestion. Update this file — don't
let a restatement drift into chat history only.

Status tags: **Done**, **Partial** (schema/mechanism exists, missing a
piece), **Not started**, **Contradicted** (current code does the
opposite).

## Architecture — decided, not open for reinterpretation

- Three-repo split (`tendercare-web`, `tendercare-teacher`,
  `tendercare-portal`), SvelteKit + Supabase. **Done**, holding.
- Supabase is used for whatever it's genuinely best at in the antifail
  doctrine — cheap credential checks, structured CRUD for staff-entered
  data (roster, remarks). It does **not** host results, and is not the
  place for heavy report files or tedious network queries on every
  page view. **Done** as of the portal rewrite — `/result/[id]` now
  serves a static generated file instead of querying `students`/`scores`.
- Result transcripts are static and hardcoded into the repo — generated
  ahead of time (schema + Jinja2 template + `generate.py`, see
  `Teacher-care/report-pipeline/`), not rendered from a live query.
  **Done** for the mechanism and 12 example files; **not done** for
  populating every real student — that's a data problem (real per-
  student class history + CSV term data), not a code problem.
- Real per-student/per-staff auth is deliberately deferred. Current
  state is two shared staff/admin logins and one shared student
  password — intentional interim shape, not a bug. **Holding**, by
  explicit instruction ("I'll figure out a proper auth/security policy
  soon, for now we are firmly within the antifail mindset").

## Numbered invariants

**1. Permanent stakeholder / family office / admin bio on the site.**
**Partial.** A dedicated placeholder section exists on `tendercare-web`'s
About page ("Stewardship"), clearly marked as content to be added by
direct file edit — not generated, not database-backed, not something
any agent should fabricate. Real content is the biggest "secret" of
the build and goes in manually.

**2. Teacher-side editing of student bio/info/remarks.**
**Done** for remarks — `tendercare-teacher`'s roster page has a working
remarks editor (Class Teacher's / Principal's Comment), gated by the
existing `staff`-role RLS policy on the `remarks` table, scoped to the
current term. **Not started** for a student "bio" field — no such
column exists in the schema yet.

**3. Media/bulletin info on the main website.**
**Done** as a baseline (feed/sports/awards pages carry real content),
but see items 11–13 below, which extend this with concrete portrait/
yearbook mechanics not yet built.

**4. Automatic promotion/archiving for classes/terms/graduands.**
**Not started**, now specified concretely by items 9–10 and 12 below —
build against those, not a generic interpretation of "promotion."

**5. Permanent logo SVG watermark background + letterhead.**
**Done** on generated report pages, both portal directory pages, and
the teacher homepage. See item 14 below for the PDF-export-specific
requirement, which needs its own verification.

**6. Automatic deletion of feed activity every week.**
**Not started.** No cron/scheduled job exists anywhere in the suite,
and the feed itself still runs on `localStorage` on `tendercare-web`
rather than the `feed_comments`/`feed_likes` tables that already exist
in `tendercare-teacher`'s schema.

**7. Anything over 10KB needs a good reason to go in the DB.**
**Holding**, untested — no large asset (photos, PDFs) is being stored
in Supabase yet either way. Becomes a real constraint the moment item
11's portrait-upload provision is built — that decision needs to
respect this rule from the start (object storage / static file /
Supabase Storage with a size-appropriate policy, not a base64 blob in
a table row).

**8. Result transcripts hardcoded in repo; admin app generates
passwords for the entire school, gating IDs to match.**
**Done** for the static/hardcoded half (see Architecture section
above). **Partial** for the admin password-generation half —
`scripts/set_shared_student_password.ts` exists and does this for the
*shared* password scheme currently in place; no admin *app* (a UI,
rather than a script run from a terminal) exists yet.

## Added — promotion, portraits, yearbook, print

**9. Automatic promotion.** Every student is automatically promoted to
the next class on September 1st each year. **Not started.**

**10. Repeat / pardon.** A student can be assigned to repeat a class
(overriding the automatic promotion in #9 for that student), and that
repeat assignment can later be pardoned — reversed, restoring normal
promotion. **Not started.** Needs its own state on the student record
(distinct from the soft-delete `active` flag already there), not a
side effect of the promotion job itself.

**11. Portrait/highlight provision on the main site.** `tendercare-web`
needs a real provision for accepting new student portraits and
highlights (even just as embedded links, not necessarily a full upload
pipeline) — tied specifically to that student's class yearbook page.
**Not started.**

**12. Yearbook rollover.** On September 1st each year, the *priority*
yearbook class (whichever one is featured/foregrounded) updates to
that year's new graduands. **Not started** — depends on #9's promotion
job existing first, since "graduands" is defined by that promotion
logic.

**13. Portrait scope — deliberately limited.** A student's picture only
needs to appear in two places: the yearbook, and beside their name in
the result roster or the auth/login gate. Not a requirement to surface
photos anywhere else on the site. Worth holding to this scope
explicitly — it's the difference between a small, bounded feature and
an open-ended photo-management system, and it directly interacts with
invariant #7 (10KB DB rule): three defined surfaces makes it much
easier to pick a storage approach that respects that rule than an
unbounded "photos everywhere" version would.

**14. Crest/stamp/signature must survive on printout/PDF, prominently.**
**Partial, needs explicit verification.** The generated report template
has print-media CSS (`@media print`) that keeps the watermark crest
visible (opacity bumped up for print rather than hidden) and keeps the
corner logo. This has been *read* as correct but not verified against
an actual PDF export the way the earlier crest-preview session did
(`tendercare-crest-preview/3-result-sheet-pdf-export.png` and the real
`4-result-sheet-actual.pdf` — check those against the new template's
output, don't assume the same treatment carried over automatically).
The signature blocks (teacher/principal) are present in the HTML;
whether they render acceptably in an actual print/PDF context hasn't
been separately checked either.
