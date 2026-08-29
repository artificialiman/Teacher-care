# Add-student ID logic, static-file sync, and brand matching — spec

Written for an agent with **no push access and no DB access** — every
fact below was verified directly (real function body pulled from the
live database, real files diffed against each other), not inferred, so
you shouldn't need either to act on this. Where a decision is still
open rather than settled, it's marked as such rather than left implicit.

---

## 1. Add-student / ID-assignment logic

### Current state (verified against the live `tenderexam` Supabase
project, not just read from the migration file)

```sql
CREATE OR REPLACE FUNCTION public.create_student(p_full_name text, p_class_id text)
 RETURNS students
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  last_id text;
  next_n int;
  new_id text;
  new_row students;
begin
  if coalesce(auth.jwt() ->> 'role', '') <> 'staff' then
    raise exception 'only staff may create students';
  end if;

  perform pg_advisory_xact_lock(hashtext('next_student_id'));

  select id into last_id from students order by id desc limit 1;

  if last_id is null then
    next_n := 1;
  else
    next_n := (split_part(last_id, '-', 3))::int + 1;
  end if;

  new_id := 'TCH-2025-' || lpad(next_n::text, 3, '0');

  insert into students (id, full_name, class_id, created_by)
  values (new_id, p_full_name, p_class_id, auth.uid())
  returning * into new_row;

  return new_row;
end;
$function$
```

### The confirmed bug

`'TCH-2025-'` is a **literal string constant**, not derived from
anything — `to_char(now(), 'YYYY')`, an academic-year table lookup,
nothing. Every student created through this function, forever,
regardless of what year it's actually run in, gets an ID starting
`TCH-2025-`. Run this in 2027 and the 377th student ever created still
gets `TCH-2025-377`.

The advisory lock and the "take the max ID, add one" logic are both
sound — that part doesn't need touching. Only the year prefix does.

### The "any teacher" requirement — already satisfied, don't rebuild it

`if coalesce(auth.jwt() ->> 'role', '') <> 'staff' then raise
exception` — the check is against a single `staff` role, not a
specific named account. Per the invariants doc, all three teacher
types (full-time, part-time, youth corper) currently share identical
privileges. So "any teacher can add a student" is **already true**
today, as long as that teacher has a `staff`-role login. Nothing here
needs to change to satisfy that part of the requirement — only the
year-prefix bug does.

### Recommended fix (a documented default, not a locked decision)

Replace the literal `'TCH-2025-'` with a year derived from the current
date, and decide — this part **is** an open decision — whether the
sequence number resets per year or keeps counting globally:

```sql
new_id := 'TCH-' || to_char(now(), 'YYYY') || '-' || lpad(next_n::text, 3, '0');
```

If sequence numbers should reset each year (i.e. the first student
added in 2027 becomes `TCH-2027-001`, not `TCH-2027-377`), the `select
... order by id desc limit 1` needs to filter to IDs starting with the
current year's prefix before taking the max, e.g.:

```sql
select id into last_id from students
where id like 'TCH-' || to_char(now(), 'YYYY') || '-%'
order by id desc limit 1;
```

Either way, this is a small, self-contained migration (`0005_...sql`)
— doesn't touch RLS, doesn't touch any other function. Test it the
same way `0004`'s advisory lock was verified originally: concurrent
calls shouldn't produce duplicate IDs, and the sequence should
increment cleanly across a year boundary if you simulate one (e.g.
temporarily insert a student with a `2026` and a `2027` prefix by hand
and confirm the next `create_student()` call picks the right base).

---

## 2. Static-file generation + sync-back — the actual gap

### What's confirmed to exist right now

- **Live roster**: 376 real students in the `students` table in
  Supabase (`tenderexam`), added/removed through `tendercare-teacher`'s
  `/roster` screen, which calls `create_student()` / soft-deletes via
  `active = false`.
- **Static report generator**: `Teacher-care/report-pipeline/`
  (`generate.py`, `compute_awards.py`) reads student JSON files from
  `report-pipeline/students/*.json` and renders static HTML — this is
  what `tendercare-portal` is meant to actually serve (per the "results
  STATIC AND HARDCODED INTO REPO" architecture decision — Supabase is
  the authoring/roster backend, never queried live for results).
- **The gap**: `report-pipeline/students/` currently has **12 files**
  — 10 explicitly-labeled demo/fake students (`TCH-0000-*`) plus 2 real
  ones (`TCH-2025-032`, `TCH-2025-214`) added by hand during earlier
  testing. **There is no mechanism connecting the live 376-student
  Supabase roster to this folder at all.** Adding or removing a student
  via `tendercare-teacher` today has zero effect on what
  `report-pipeline/` or `tendercare-portal` know about.

### What the requirement actually is (direct instruction, not inferred)

> "generated static file plus sync back sounds okay, students wont be
> added/removed every week so theres no super-live-real-time
> requirement... it just needs to be an any teacher functionality that
> updates everywhere without fail."

Breaking that down precisely:
- **No real-time requirement.** A sync that runs periodically (e.g.
  triggered manually, or on a schedule, or on every push to
  `tendercare-teacher`) is fine — it does not need to fire the instant
  a teacher clicks "Add."
- **Must be reliable ("without fail").** Whatever mechanism exists,
  it needs to actually converge the static files to match Supabase's
  roster every time it runs — not silently skip students, not
  duplicate them, not leave stale entries for removed/soft-deleted
  students.
- **"Any teacher" applies to the *add/remove action*, not to the sync
  step.** A teacher adding a student through `tendercare-teacher`'s UI
  is the "any teacher" part — already satisfied per section 1 above.
  The sync-to-static-files step is backend/build tooling; it doesn't
  need to be something individual teachers trigger or have access to.

### Recommended shape (a default to build against, not a final spec)

A script — `sync_students_from_supabase.py`, living next to
`generate.py` in `report-pipeline/` — that:

1. Reads the live `students` table (`active = true` only) via the
   Supabase REST/JS client, using the **anon key** (read-only access is
   all this needs — the RLS policy `"active students are publicly
   readable"` already grants this without any special credential).
2. For each active student **not yet present** in
   `report-pipeline/students/{id}.json`, writes a new skeleton file
   matching `schema/student_schema.json` — `student_id`, `full_name`,
   `class_arm` populated from Supabase; `years`/`terms`/`subjects`
   empty/undigitized until a teacher enters real scores separately
   (score entry is a distinct, not-yet-built concern — this script's
   job is only to make sure every currently-enrolled student *has* a
   file to eventually digitize into, not to fabricate scores).
3. For each student file present that is **no longer active** in
   Supabase (removed or soft-deleted), either deletes the file or
   marks it inactive in some way that `generate.py`/`compute_awards.py`
   already respect — needs a decision on which, since a hard delete
   loses any scores that were already entered for that student, and a
   soft-delete-equivalent needs a field the schema doesn't have yet.
4. Is idempotent — running it twice in a row with no roster changes
   produces zero diffs, so it's safe to run on a schedule or on every
   `tendercare-teacher` deploy without babysitting it.

This keeps the sync itself simple, testable in isolation (mock the
Supabase response, assert on the files written), and consistent with
every other piece of this pipeline: read-only from Supabase, writes
land as plain files in the repo, `generate.py`/`compute_awards.py`
downstream are untouched by this change.

**Cross-reference**: `INVARIANTS.md` has a newer entry ("Student names
should load in as hardcoded, teacher/class-editable data — not a live
query on every page load... Not started") that's the same underlying
problem from a different angle — that one's about roster *display*
across the apps (not just result generation) moving off live queries.
Whoever builds either should read both entries together: the sync
script above (Supabase → static student JSON) is very likely the same
piece of infrastructure that entry needs, not a separate mechanism to
build twice.

---

## 3. Brand/watermark matching — corrected finding, real gap identified

**First, a correction to an earlier claim in this session**: an
earlier pass through this same investigation concluded
`report_template.html.j2` (the static result-sheet template) was
missing the crest watermark entirely. That was wrong — it was based on
a fetch that silently failed and returned an empty file, treated as
real content. Re-verified directly against a working local copy:
`report_template.html.j2` **already has the full watermark treatment**,
markup and CSS both, matching the original hand-built system exactly:

```css
.watermark-crest { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 640px; height: auto; max-height: 94%; color: var(--pd); opacity: 0.045; pointer-events: none; z-index: 0; }
.corner-logo { position: absolute; top: 24px; right: 28px; width: 54px; height: auto; color: var(--pd); opacity: 0.9; z-index: 2; }
```

```html
<div class="card-inner">
    <svg class="watermark-crest"><use href="#crest-symbol"/></svg>
    <svg class="corner-logo"><use href="#crest-symbol"/></svg>
    ...
```

**No work needed on `report_template.html.j2`.**

### The actual gap: `tendercare-teacher`

Verified directly:
- `tendercare-teacher/src/routes/+layout.svelte` imports nothing but a
  favicon — no `tendercare.css`, no design tokens, unlike
  `tendercare-web` and `tendercare-portal`, which both import the
  shared stylesheet at the root layout.
- A `Crest.svelte` component does exist (added by an earlier patch,
  labeled "add homepage watermark" in its commit message) — but it's
  not applied consistently. The `/roster` page specifically (built
  during this session) uses ad hoc inline styles with CSS-variable
  fallbacks (`var(--space-8, 2rem)`, `font-family: var(--font-sans,
  system-ui)`) that silently degrade to browser defaults because the
  variables they're falling back from are never actually defined
  anywhere in this app.

### What matching the brand concretely means here

1. Copy `tendercare.css` into `tendercare-teacher/src/lib/styles/`
   (same file, byte-for-byte, as already sits in `tendercare-web` and
   `tendercare-portal` — don't re-derive it) and import it in
   `+layout.svelte`, same pattern as the other two apps.
2. Apply the crest watermark to `tendercare-teacher`'s own pages, not
   just wherever the earlier patch happened to add it — using the same
   `.watermark-crest`/`.corner-logo` CSS shown above and the same
   `crest_symbol.svg.j2`-equivalent SVG def (a Svelte component wrapping
   the same crest path data works fine — `tendercare-web` already has
   one, `Crest.svelte`, worth reusing/copying rather than re-deriving).
3. Rebuild `/roster`'s styling against the real tokens instead of
   fallback values once the stylesheet is actually imported.

This is a real, scoped piece of work — not a redesign. The asset and
the CSS rules already exist twice over (in `tendercare-web` and in
`report-pipeline`'s template); this is a matter of bringing
`tendercare-teacher` up to the same standard the other two apps and the
static result sheets already meet.
