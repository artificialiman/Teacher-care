# Report-card generation pipeline

Generates each student's static, hardcoded transcript page from a plain
JSON file -- no database, no network call, at generation time or at
view time. This is what backs `tendercare-portal`'s `/result/[id]`
route (which serves whatever this produces from its `static/reports/`
folder) and is meant to eventually replace the older hand-written files
in `UTMEDaily/Tendercare/Directory`.

- `schema/student_schema.json` -- the data shape one student's file
  must match. `schema/seniority_map.json` -- how many years of history
  each class-arm's seniority implies (JSS1 = 1 year through SS3 = 6),
  used only as a sanity check, never to fabricate history that isn't
  in the student's own JSON.
- `templates/report_template.html.j2` -- the shared Jinja2 template.
  Implements the multi-term/year navigation pattern that roughly half
  of the existing UTMEDaily report files already use (TCH-2025-032 is
  a good reference) -- year sections, term pills, and a placeholder
  panel for any term not yet digitized, rather than a flat single-term
  page. Watermark crest, corner logo, and both remark boxes (Class
  Teacher's / Principal's Comment) are baked into every generated page.
- `generate.py` -- reads a student JSON file, computes each subject's
  total/grade (WAEC-style A1-F9 bands) and the term summary band, and
  renders the template. `python3 generate.py students/TCH-2025-032.json`
  for one student, `--all` for every file in `students/`.
- `students/` -- 12 example files, one per class-arm. Two carry real
  digitized scores (TCH-2025-032, TCH-2025-214, matching the real
  UTMEDaily files of the same ID). The other ten (`TCH-0000-*`) are
  clearly-labeled demo data -- never real student IDs, never meant to
  ship as-is.
- `output/` -- what `generate.py --all` produced from the above. This
  is exactly what's now bundled into `tendercare-portal/static/reports/`.

## Class completeness gate

A term never renders with real scores until at least 40% of that
student's class_arm has that term fully complete (every subject has
both CA and exam filled). Below the threshold, `generate.py` writes
that term as "not yet digitized" regardless of what the JSON says --
this is a publish gate on the generator's output, not a restriction on
what can be entered in a student's file. Re-running the generator
after more of the class is filled in picks the term up automatically
the moment it crosses 40%; nothing needs to be manually unlocked.

This was verified against a synthetic 6-student class (not just read
by eye): 2/5 = 40% correctly published, 2/6 = 33% correctly blocked,
and the blocked case was confirmed in the actual rendered HTML output
(real CA/exam numbers suppressed, "Record not yet digitized" shown
instead), not just in the console warning.

## Top-3 per class-arm (awards page)

`compute_awards.py` produces `output/top3.json` for tendercare-web's
awards page: the top-3 students by average, per class-arm, for that
class's most recent term that clears the same 40% completeness gate
`generate.py` uses -- reused via import, not reimplemented, so there's
one publish threshold across the whole pipeline, not a looser one for
"who gets named on the awards page" than for "whose scores are
visible." A class with no published term yet gets no entry, not a
guess.

`python3 compute_awards.py` after `generate.py --all` (or independently
-- it loads students/ itself). The output is meant to be copied into
tendercare-web as a static data file at build time, same as every
other score-derived artifact -- never queried live.

Verified with a synthetic 6-student class (5 complete at genuinely
different score levels via distinct per-subject multipliers, 1
undigitized): correctly ranked by real average, correctly excluded the
undigitized student from ranking while still counting them toward the
class-size denominator for the gate, correctly returned only 3 despite
5 being eligible.

## What this doesn't do

It doesn't regenerate all 267 existing UTMEDaily report files, and it
shouldn't be pointed at all of them blindly -- 126 of those already use
the multi-term pattern this template also implements; only the other
141 (listed in the crosscheck report) are still on the old single-term
format and would actually need migrating. That migration is a data
problem before it's a code problem: it needs real per-student class
history and CSV term data, not something to synthesize here. This
pipeline is the mechanism; running it against the full real roster is
a separate, deliberate next step.
