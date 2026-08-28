# Tendercare invariants — the standing contract

This is the canonical list. Anyone (any agent, any session) working on
`tendercare-web`, `tendercare-teacher`, `tendercare-portal`, or the
`Teacher-care`/UTMEDaily report-sheet system should read this first and
treat it as a contract, not a suggestion. Update this file — don't
let a restatement drift into chat history only.

> Note: this file physically lives in `Teacher-care`, but `Teacher-care`
> itself is reference-only — not part of the live architecture, its
> role fully taken over by `tendercare-teacher`. This doc stays here
> because it's the shared contract *about* the three live repos, not
> because `Teacher-care` is one of them. See the root `README.md` in
> this repo for what's actually still active here (`report-pipeline/`
> — itself an open question, not settled) versus purely historical.

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
- Results must never be tampered with once entered, and a class's
  results can only be pushed/published once at least 40% of that class
  has CA, Exam, *and* Total filled for a given term — the existing
  publish gate in `generate.py` already enforces exactly this. **Done**,
  reconfirmed directly by instruction, not just inferred from earlier
  design work.

## Per-page workflow — tendercare-web / -portal / -teacher

Captured here verbatim-in-substance so it isn't lost to chat history.
Nothing here overrides the doctrine above — explicitly reconfirmed:
"none of this discredits current invariants and doctrine, still in
antifail doctrine mode."

**Home** — Student Life's CTA slot is deliberately replaced by "Check
Result" linking to the portal's student-portal login (**Done**,
confirmed express instruction, not to be reverted). Results/Portal nav
buttons removed since Check Result covers that job — alternative
considered was repurposing them into an Archive/Alumni Almanac link
instead of removing outright; not decided, **not started** either way.

**Yearbook rollover, precise mechanics** (refines invariant #12): after
the September 1st reset, **SS2 and JSS2 become the new priority
yearbook classes** — not the graduating class itself. Separately, **new
SS1 and JSS1 become the priority source for stock/illustrative images**
used anywhere else across the site that needs a generic student photo.
Two distinct rules, not one. **Not started.**

**Portrait/media hosting** (refines invariant #11): media can either be
hosted directly or embedded from a separate, dedicated admin media-
upload tool, linked in whenever that's ready — left deliberately
flexible, not a forced single approach. **Not started.**

**Sports page** — generally fine as-is, but needs a moving/swiping/
scrolling image effect to compensate for no video (bandwidth/size
constraint), and must support GIFs. **Not started.**

**Awards page** — ranking criterion is real averages (internal only);
what's actually *displayed* is portrait (by student ID) and a remark
matching that average's band — never the raw number itself. Ranking
computed correctly, exposure deliberately restricted. See "Awards
system" section below for the concrete build. More award categories
are coming beyond the single top-3-overall one (per-subject, per-skill)
— categories aren't defined yet, so the generator should be built
*extensible* for them now rather than hardcoded to one category.

### Awards system — concrete build (`Teacher-care` `22a221d`, `tendercare-web` `8dad837`)

**Mechanism: done and tested. Real award data: not populated yet** —
same "data problem, not a code problem" situation as the rest of
`report-pipeline/students/`, which still only has 12 demo/sample files.

- `compute_awards.py` reuses `generate.py`'s 40% class-completeness
  gate via import — one publish threshold for the whole pipeline, not
  a separate/looser one for who gets named on the awards page.
- Output is `categories.<category_id>.classes.<class_arm>.top3`, each
  entry `{student_id, name, remark}` — no numeric average anywhere in
  the output. `category_overall_average()` is the reference
  implementation (gate-checked, remark-banded, portrait-by-ID) for
  whatever categories get defined later; `CATEGORIES` at the bottom of
  the file is the one place to register a new one.
- `tendercare-web`'s awards page loops over every category present
  rather than assuming just one, and shows a small circular portrait
  (`{base}/img/portraits/{student_id}.jpg`) next to each name.
- Shipped with an honest empty `classes: {}` in `awards.json` — no
  fabricated placeholder winners.
- Caught and fixed a real bug during testing: SvelteKit's prerenderer
  fails the whole site's build on a missing `<img src>`, same as a
  broken link — and almost every student is missing a portrait right
  now. Fixed via a `handleHttpError` function in `tendercare-web`'s
  `vite.config.ts` that selectively ignores 404s under
  `/img/portraits/` specifically; verified a genuinely broken
  non-portrait link still fails the build correctly.

**Feed** — becomes a notification board for admin/result activity
(upload dates, class averages, media changes, new teacher roles,
part-time staff/corps-member arrivals), cleared every year on the
reset date. Not open for student comments — reactions only, and each
reaction registers as 3 toward the displayed count (inflated, not
literal). **Not started** — current feed still runs on localStorage
with open commenting, the opposite of this spec.

**About** — needs a placeholder for a WhatsApp link and social-media
feed embeds (in addition to the Stewardship bio placeholder already
built), and needs to handle full-time/part-time/youth-corps-member
staff distinctions, determined either by admin assignment or by staff
self-selection on their own platform. **Not started** beyond the
Stewardship section already in place.

**Teacher app** — three staff types (part-time, full-time, youth
corps-member); a person can be both a class teacher and a subject
teacher simultaneously; a teacher selects their specific subject from
only the subjects actually offered (not an open list). All three types
carry the same privileges for now — permission tiers between them are
explicitly undecided ("until I figure out the actual lines to draw").
The app's primary purpose: editing transcripts/scores, tracking
averages, editing remarks/range. **Not started** beyond the current
single `staff` role and the remarks editor already built.

**Cross-cutting** — "everything is listening for changes": realtime
reactivity is the target, not manual-refresh/stale data, wherever this
suite reads from Supabase. Not yet audited against this standard.

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
but see items 11–13 below, and the per-page workflow section above,
which extend this with concrete portrait/yearbook/awards mechanics not
yet fully built.

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
