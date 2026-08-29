# Alumni ID recycling + admin analytics page — design, not yet built

Two pieces handed down directly (not agent-inferred): recycle a graduated
student's ID into a new JSS1 class exactly one year after that alumni set
graduated, and a plan for an admin page carrying data analytics/tracking
dashboards. `tendercare-web`'s Alumni Almanac page (`/alumni/`) is built and
pushed — see `alumni.json` and `routes/alumni/+page.svelte` in that repo.
This doc is the backend design for the recycling mechanism and the admin
page, held back from actual migration/build until the question below is
answered, since it touches real students' historical scores/remarks.

## Alumni ID recycling — the open question

Current ID scheme (`0007_fix_student_id_year.sql`): `TCH-<academic-year>-<seq>`,
sequence resets to 001 every September 1st automatically. That means no ID
*number* is ever actually scarce across cohorts — a 2027 admission never
competes with a 2025 ID for the same slot, because the year prefix already
separates them. So "recycle the ID" can mean one of two genuinely different
things, and they have very different risk profiles:

**A. Literal string reuse** — a real new JSS1 student, enrolling in (say)
2027, is issued the exact string `TCH-2025-014`, previously an alumnus's ID.
This requires archiving every row across `scores`, `remarks`,
`feed_comments`, `feed_likes`, and `portal_credentials` that FKs to that ID
under a separate alumni-history table *before* freeing the primary key for
reuse — otherwise the new student's future scores and the alumnus's
five-year academic history sit under the same primary key, which is exactly
the kind of silent corruption `students.id` as primary key was chosen to
prevent in the first place (see `0001_core_schema.sql`'s header). Doable,
but it's a hard-delete-into-archive operation, not a soft toggle.

**B. Freeing the *slot*, not the string** — a graduated student is flipped
to `active=false` (the promotion job, invariant #9, not yet built) and
simply stops appearing anywhere `active=true` is filtered — roster, portal,
directory, yearbook already all do this per `0001`'s soft-delete note. Their
ID stays permanently theirs, on their real historical records, and never
gets typed by anyone else. Nothing is "tied down" in any way that costs
anything, because the next JSS1 student already gets a fresh ID under next
year's own prefix regardless.

Given the schema already makes B free (it falls out of the promotion job
that's already planned as invariant #9), and A is a real archive-and-reissue
operation with genuine data-safety stakes, I'd default to B unless there's a
concrete reason the literal string needs to be reused — e.g. a fixed pool of
pre-printed physical ID cards or badges that can't just keep incrementing.
**Flagging rather than picking**, since guessing wrong here means either
building unnecessary archive machinery or, worse, actually reassigning a
real graduate's academic history to a stranger.

If it is genuinely A: the one-year timer is straightforward once the
promotion job exists — `alumni.json`-equivalent server-side table already
carries `graduated_on`; a scheduled job (pg_cron, available on the project
per the paused session's check) compares `now() - graduated_on >= 1 year`
and only then runs the archive-then-free step, one alumnus at a time, never
in bulk, with the archive write and the `students` delete in the same
transaction.

## Admin page — plan (not built)

Scope carried over from the existing invariants: admin adds/deletes staff
and assigns roles (decided, per the four staff-type discussion above),
alongside the "maddest data analytics graphs" ask. Proposed structure,
built on top of what already exists in the schema rather than inventing new
tables:

- **Staff & roles** — CRUD over the `staff`/auth-role side (part-time,
  full-time, youth corps-member), since permission tiers between them are
  still explicitly undecided and living here gives a single place to
  eventually enforce whatever tiers get chosen.
- **Class averages over time** — per-class, per-term trend lines from
  `scores`, reusing `compute_awards.py`'s 40%-completeness gate as the same
  single publish threshold, so the dashboard never shows a partially-entered
  term as if it were final.
- **Enrollment/promotion funnel** — cohort size by year, repeat/pardon
  counts (schema already exists per `0005_repeat_pardon_portrait.sql`),
  and, once the promotion job exists, a rolling view of promotions vs.
  repeats vs. graduations per September 1st cycle.
- **Feed activity** — volume/engagement over time, useful precisely because
  invariant #6 (weekly feed deletion) means the raw feed itself won't hold
  history — the dashboard becomes the only place that trend survives past a
  week.
- **Award category coverage** — once more categories exist beyond
  top-3-overall, a simple table of which class/category combinations
  actually clear the completeness gate each term, since categories are
  explicitly ongoing/continuous work rather than a one-time build.

None of this is built yet — flagging the shape so it's ready to pick up
once staff-role scaffolding (the actual access-control piece) exists to
gate it behind, since an analytics page is a bad place to be the first
thing that exposes real student averages without a login wall in front of
it.
