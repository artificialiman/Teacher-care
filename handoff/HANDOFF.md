# Handoff — Tendercare crest branding + interim logins + code fixes

> **This repo (`Teacher-care`) is reference-only, not part of the live
> architecture.** Its role has been fully taken over by
> `tendercare-teacher`. This handoff describes patches that were applied
> *to `tendercare-web`/`tendercare-teacher`/`tendercare-portal`* — the
> work product lives in those repos, not here. See the root `README.md`
> for what this repo actually is now.

**Status: applied, pushed, and live as of this update.** The three
patches below were originally built read-only against fresh clones in
an earlier session. A later session applied all three, adapted the
portal one further (see "Since this handoff" below), and ran the
Supabase-side setup against the real project — none of this is
still pending.

See `INVARIANTS.md` in this same folder for the full standing contract
this work is checked against — read that first, especially before
starting anything new.

For the add-student ID logic, the static-file sync mechanism, and the
`tendercare-teacher` brand/watermark gap specifically, see
`ADD-STUDENT-AND-BRAND-SPEC.md` in this same folder — written so an
agent with no push access and no DB access can act on it directly,
every fact in it verified against the real code/database rather than
inferred.

## Folder structure

```
handoff/
├── HANDOFF.md                          ← this file
├── INVARIANTS.md                       ← the standing contract — read first
├── SETUP-logins.md                     ← Supabase-side steps (now DONE — see status note in that file)
├── tendercare-web-nav-crest.patch      → applied to tendercare-web
├── tendercare-teacher-full.patch       → applied to tendercare-teacher
├── tendercare-portal-full.patch        → applied to tendercare-portal (then adapted, see below)
└── tendercare-crest-preview/           ← visual proof from the original patch-writing session
    ├── 1-home-directory.png
    ├── 2-result-sheet-screen.png
    ├── 3-result-sheet-pdf-export.png
    ├── 4-result-sheet-actual.pdf
    ├── 6-web-nav-crest.png
    └── 7-teacher-landing-page.png
```

`report-pipeline/` has moved -- it now lives at
`tendercare-teacher/scripts/report-pipeline/`, resolving what used to
be an open question about where it belonged. Schema, Jinja2 template,
and `generate.py` for static per-student report pages. See its own
README.

## What's actually live now

- `tendercare-web` — nav-crest patch applied (commit `c394458`). Also
  added a "Stewardship" placeholder section on the About page for
  invariant #1 (stakeholder/family bios) — not part of the original
  patch.
- `tendercare-teacher` — full patch applied (commit `6f51592`):
  `/login`, session-gated `/roster`, the RLS role-sync migration, the
  atomic `create_student()` function. Also added a real watermark
  background on the homepage (the patch itself only had a small icon)
  and a working remarks editor on the roster page (invariant #2).
- `tendercare-portal` — full patch applied (commit `5eb0059`), then
  adapted further: the patch's result page still queried Supabase live
  for scores, which contradicts the "results are static, not a
  network query" invariant. `/result/[id]` now serves a static
  generated file from `static/reports/` instead, once the password
  check passes.
- **Migrations `0003` and `0004` are applied to the real Supabase
  project** (`iaokbdpqmopubeuhbadv`) — this was the one thing the
  original patch-writing session explicitly couldn't verify (no live
  Postgres available then). Confirmed working: `app_metadata.role` is
  correctly synced for both accounts below, checked directly against
  `auth.users`, not assumed.
- **Both staff/admin auth accounts exist and are confirmed working**:
  `staff@tendercare.local` / `password`, `admin@tendercare.local` /
  `tender`.
- **376 active students have the shared password (`12345678`) set** in
  `portal_credentials`, bcrypt-hashed — set directly via SQL rather
  than running `scripts/set_shared_student_password.ts` from a
  terminal, but the same hash format and same result. That script is
  still the right tool for changing the shared password later.

## Apply order (for reference — already done, see above)

Teacher app's SQL migrations needed numeric order (0001 → 0002 → 0003
→ 0004) before login/roster code would work — already satisfied.

```bash
cd tendercare-web      && git apply tendercare-web-nav-crest.patch
cd tendercare-teacher  && git apply tendercare-teacher-full.patch
cd tendercare-portal   && git apply tendercare-portal-full.patch
```

## What each patch contains

**`tendercare-web-nav-crest.patch`**
- Vendors the school crest (`src/lib/assets/crest.svg`, `Crest.svelte`)
- Replaces the nav's `<span>TCC</span>` placeholder with the real crest,
  tinted white on the transparent/hero nav state and dark ink on the
  scrolled/solid state

**`tendercare-teacher-full.patch`**
- Same crest vendoring
- `/login` page — Staff/Admin dropdown + password, real Supabase Auth session
- `/roster` now redirects to `/login` without a session
- Home page rebuilt (was the untouched SvelteKit starter stub)
- `supabase/migrations/0003_staff_auth_roles.sql` — trigger syncing
  `user_metadata.role` → `app_metadata.role` so RLS's
  `auth.jwt() ->> 'role'` check actually resolves
- `supabase/migrations/0004_atomic_student_id.sql` — replaces the old
  client-side read-max-then-insert student ID allocation (racy under
  concurrent adds) with a single `create_student()` Postgres function:
  one transaction, an advisory lock, and an explicit `staff`-role check
  inside the function body (the first draft only gated via `GRANT
  EXECUTE TO authenticated`, which doesn't distinguish staff from any
  other logged-in caller — fixed before finalizing)
- `src/lib/roster.ts`'s `addStudent()` updated to call the new RPC instead

**`tendercare-portal-full.patch`**
- Crest on the directory page (header + full-page watermark) and result
  page (nav, letterhead, letterhead-scoped watermark)
- Fixed a `display: none` bug that made the result sheet invisible by
  default outside of print — carried over from a static-HTML donor page's
  since-removed tab-toggle logic
- Student password gate on `/result/[id]`: a `+server.ts` endpoint
  verifying a bcrypt hash in `portal_credentials` (server-only, via a new
  service-role client in `src/lib/server/supabaseAdmin.ts`)
- `scripts/set_shared_student_password.ts` — admin script to hash and set
  one shared password for every active student, reading the real value
  from an environment variable at run time (never committed as plaintext)

## Since this handoff (this session)

Three items, each built, tested against real edge cases (not just "it
compiles"), and pushed immediately per file — see commit messages for
full reasoning on each:

- **`tendercare-web` nav/home rework** (`85e07e7`) — "Student Life" CTA
  on the home page now reads "Check Result" and links to the portal's
  student-portal login; Results/Portal removed from nav entirely (both
  desktop and the mobile drawer) since Check Result now covers that
  job. Footer updated to match.

- **40% class-completeness publish gate** (`Teacher-care` `6bf6007`,
  README section "Class completeness gate") — a term in
  `generate.py`'s output only ever renders with real scores once at
  least 40% of that student's class_arm has that same term fully
  complete. Below the threshold, it renders as "not yet digitized"
  regardless of what the JSON says — a publish gate on the
  generator's *output*, not a restriction on what can be entered.
  Verified with a synthetic 6-student class: 2/5 (40%) published,
  2/6 (33%) blocked, confirmed in the actual rendered HTML (real
  scores suppressed), not just the console warning.

- **Awards page — top-3 per class-arm, extensible by category**
  (`Teacher-care` `22a221d`, `tendercare-web` `8dad837`) —
  `compute_awards.py` reuses the same 40% gate via import (one
  threshold across the pipeline, not two). Per correction mid-build:
  entries show a portrait looked up by student ID
  (`{base}/img/portraits/{student_id}.jpg`) and a qualitative remark
  band ("Excellent", "Very Good", ...) — **never the raw average** —
  and the output is structured as `categories.<category_id>` so
  per-subject/per-skill awards can be added later without restructuring,
  once those categories are actually defined (deliberately not guessed
  at here). Shipped with an honest empty `classes: {}` — no real class
  has a published term yet; only 12 demo/sample files exist in
  `tendercare-teacher/scripts/report-pipeline/students/`, 10 of them explicitly labeled fake.

  **A real bug was caught and fixed while testing this, not left for
  someone else to find**: SvelteKit's prerenderer treats a missing
  `<img src>` the same as a broken link, and with the site's
  `handleHttpError: 'fail'` (tightened once every internal route
  existed), a missing portrait — nearly every student right now, since
  portraits aren't provisioned — would have hard-failed the *entire
  site's* build the moment `awards.json` had real entries. Fixed with a
  `handleHttpError` function that selectively ignores 404s under
  `/img/portraits/` specifically; verified in both directions (a
  populated award entry with a missing portrait builds fine; a
  deliberately broken non-portrait link still fails the build).



- Screenshots/PDF in `tendercare-crest-preview/` were rendered from
  standalone HTML mirroring the real component CSS, via headless
  Chromium — not screenshots of the actual deployed apps. Still true:
  no live deployment URL has been checked against these images in the
  session that applied everything. Worth a real comparison pass,
  especially given INVARIANTS.md item #14 (crest/stamp survival on
  PDF export) is explicitly flagged there as needing verification
  against the *new* report template, not assumed carried over from
  this preview.
- The advisory-lock concurrency fix in `create_student()` has been
  applied to a live database, but not exercised with two genuinely
  concurrent add-student requests — the logic has been read carefully
  and the migration applied successfully, but the race condition it
  fixes hasn't been actively reproduced-then-fixed against real
  concurrent traffic.

## Explicitly out of scope / not done

- No shared design-token package (`@artificialiman/tendercare-ui` or
  similar) extracted — `tendercare.css` is still copy-pasted per repo.
  Flagged as optional in an earlier round; no decision made either way.
- No change to framework, architecture, or the three-repo split — all
  three of those were explicit prior decisions, not reopened here.
- Real per-staff and per-student auth (replacing the two-shared-password
  interim setup) — deliberately deferred; the person wants to design that
  auth strategy themselves before it gets built.
- Everything in INVARIANTS.md tagged **Not started**: weekly feed
  auto-deletion, automatic promotion (#9), repeat/pardon (#10),
  portrait/highlight provision (#11), yearbook rollover (#12), a
  student "bio" schema field, and an actual admin *app* for password
  generation (a script exists; a UI doesn't).
