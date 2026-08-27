# Handoff — Tendercare crest branding + interim logins + code fixes

Everything here is an unapplied `git diff` patch. Nothing has been pushed —
apply, review, commit, and push from wherever you have real repo access
(these were built read-only against fresh clones, no write access existed
from that session).

## Folder structure

```
/mnt/user-data/outputs/
├── HANDOFF.md                          ← this file
├── SETUP-logins.md                     ← manual steps after applying the patches
├── tendercare-web-nav-crest.patch      → apply to tendercare-web
├── tendercare-teacher-full.patch       → apply to tendercare-teacher
├── tendercare-portal-full.patch        → apply to tendercare-portal
└── tendercare-crest-preview/           ← visual proof, not code — reference only
    ├── 1-home-directory.png            portal directory page, crest + watermark
    ├── 2-result-sheet-screen.png       portal result sheet, on-screen render
    ├── 3-result-sheet-pdf-export.png   same sheet, actual headless-Chromium PDF export
    ├── 4-result-sheet-actual.pdf       the real PDF file (open it directly)
    ├── 6-web-nav-crest.png             web nav, both light-on-hero and scrolled states
    └── 7-teacher-landing-page.png      teacher app's new landing page
```

## Apply order

No cross-repo dependency at the patch level, but the **teacher app's SQL
migrations must be applied in numeric order** (0001 → 0002 → 0003 → 0004)
before that app's login/roster code will work against a live Supabase
project. Nothing here has been run against a real database — see
"Not yet verified" below.

```bash
cd tendercare-web      && git apply tendercare-web-nav-crest.patch
cd tendercare-teacher  && git apply tendercare-teacher-full.patch
cd tendercare-portal   && git apply tendercare-portal-full.patch
```

Then follow `SETUP-logins.md` for the Supabase-side manual steps (creating
the two staff/admin auth users, running the student-password script).

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

## Not yet verified

- **No live Postgres.** The `0003`/`0004` migrations, the RLS role check,
  and the advisory-lock logic in `create_student()` are correct by careful
  reading, not by running against a real database — there was none
  available. Apply the migrations to a real (or scratch) Supabase project
  and exercise `/roster`'s add-student flow, ideally with two concurrent
  requests, before trusting the concurrency fix in production.
- **No real Supabase project connected anywhere in the suite yet** — this
  was already true before this session (see `tendercare-web/handoff/
  whats-left-for-tendercare-svelte-migration.md`), still true now.
- Screenshots/PDF in `tendercare-crest-preview/` were rendered from
  standalone HTML mirroring the real component CSS, via headless
  Chromium — not screenshots of the actual deployed apps (none are
  deployed yet). They're a faithful proxy, not a substitute for checking
  the real build once it's live.

## Explicitly out of scope / not done

- No shared design-token package (`@artificialiman/tendercare-ui` or
  similar) extracted — `tendercare.css` is still copy-pasted per repo.
  Flagged as optional in an earlier round; no decision made either way.
- No change to framework, architecture, or the three-repo split — all
  three of those were explicit prior decisions, not reopened here.
- Real per-staff and per-student auth (replacing the two-shared-password
  interim setup) — deliberately deferred; the person wants to design that
  auth strategy themselves before it gets built.
