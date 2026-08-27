#!/usr/bin/env python3
"""
Tendercare report-card generator.

Reads one JSON file per student (schema/student_schema.json) and renders
it, plus the shared Jinja2 template, into that student's static HTML
report page. The output is a plain file -- no database call happens when
a student or parent opens it later. This is the whole point: results
stay hardcoded in the repo, and Supabase is never in the request path
for viewing a result.

Usage:
    python3 generate.py students/TCH-2025-032.json
    python3 generate.py --all        # every *.json in students/

Grades and totals are computed here, not hand-entered in the JSON, so a
student file only ever needs raw CA/exam numbers -- the same WAEC-style
band (A1 >= 75 down to F9 < 40) already used across every existing
report sheet.
"""
import argparse
import json
import sys
from pathlib import Path

from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).parent
TEMPLATES = ROOT / "templates"
STUDENTS = ROOT / "students"
OUTPUT = ROOT / "output"

GRADE_BANDS = [
    (75, "A1", "ga1"), (70, "B2", "gb2"), (65, "B3", "gb3"),
    (60, "C4", "gc4"), (55, "C5", "gc5"), (50, "C6", "gc6"),
    (45, "D7", "gd7"), (40, "E8", "ge8"), (0, "F9", "gf9"),
]


def grade_for(total):
    for floor, label, css in GRADE_BANDS:
        if total >= floor:
            return label, css
    return "F9", "gf9"


def compute_term(term):
    """Fill in per-subject totals/grades and the term summary band, in
    place, from raw ca/exam numbers. A subject missing either ca or exam
    (e.g. a CA-only entry pending an exam score) is left ungraded --
    'pending' in the template -- rather than guessed at."""
    if not term.get("digitized"):
        return term

    total_score = 0
    graded_count = 0
    for s in term.get("subjects", []):
        if s.get("ca") is not None and s.get("exam") is not None:
            s["total"] = s["ca"] + s["exam"]
            s["grade"], s["grade_class"] = grade_for(s["total"])
            total_score += s["total"]
            graded_count += 1
        else:
            s["total"] = None
            s["grade"] = None
            s["grade_class"] = None

    term["subject_count"] = len(term.get("subjects", []))
    term["total_score"] = total_score
    term["max_score"] = graded_count * 100
    term["average"] = round(total_score / graded_count, 2) if graded_count else 0
    return term


def find_current_term_id(years):
    """The most recent digitized term across all years, or the most
    recent term at all if none are digitized yet -- matches the existing
    files' behavior of opening on the latest real record."""
    last_id = None
    last_digitized_id = None
    for yi, year in enumerate(years):
        for ti, term in enumerate(year["terms"], start=1):
            term_id = f"y{yi}t{ti}_{year['academic_year'].replace('/', '-')}"
            last_id = term_id
            if term.get("digitized"):
                last_digitized_id = term_id
    return last_digitized_id or last_id


def render_student(data: dict) -> str:
    for year in data["years"]:
        year["terms"] = [compute_term(t) for t in year["terms"]]

    env = Environment(loader=FileSystemLoader(str(TEMPLATES)), autoescape=False)
    template = env.get_template("report_template.html.j2")

    context = dict(data)
    context.setdefault("access_code_hint", "12345678")
    context["current_term_id"] = find_current_term_id(data["years"])
    return template.render(**context)


def generate_one(json_path: Path):
    data = json.loads(json_path.read_text())
    html = render_student(data)
    out_path = OUTPUT / f"{data['student_id']}.html"
    out_path.write_text(html)
    print(f"wrote {out_path} ({len(html):,} bytes)")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("path", nargs="?", help="a single student JSON file")
    parser.add_argument("--all", action="store_true", help="render every students/*.json")
    args = parser.parse_args()

    OUTPUT.mkdir(exist_ok=True)

    if args.all:
        files = sorted(STUDENTS.glob("*.json"))
        if not files:
            print("No student JSON files found in students/", file=sys.stderr)
            sys.exit(1)
        for f in files:
            generate_one(f)
    elif args.path:
        generate_one(Path(args.path))
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
