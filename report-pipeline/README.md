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
