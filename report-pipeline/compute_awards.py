#!/usr/bin/env python3
"""
Top-3-per-class-arm academic performers, for tendercare-web's awards page.

Reuses generate.py's class-completeness gate rather than reimplementing
it: a class-arm only produces a top-3 list once it has a term that
clears the same 40%-complete threshold that gates individual result
sheets. No separate, looser bar for "who gets named on the awards page"
than for "whose actual scores are visible" -- same rule either way.

For each class_arm, finds its most recent PUBLISHED (academic_year,
term_name) -- the latest one clearing the 40% gate -- and ranks that
class's students by their average for that specific term. A class with
no published term yet (the common case until real score data is
migrated in) gets no entry, not a fabricated one.

Usage:
    python3 compute_awards.py            # writes output/top3.json

Output is a plain JSON file, meant to be copied into tendercare-web as
a static data file at build time -- same "hardcoded into repo, not
queried live" rule as everything else score-derived.
"""
import json
from pathlib import Path

from generate import (
    OUTPUT,
    CLASS_PUBLISH_THRESHOLD,
    load_all_students,
    compute_class_term_stats,
    term_is_complete,
)

TERM_ORDER = {"First": 1, "Second": 2, "Third": 3}


def term_sort_key(academic_year: str, term_name: str):
    """Sortable key so 'latest term' comparisons work correctly across
    years, e.g. 2025/2026 Second > 2024/2025 Third."""
    start_year = academic_year.split("/")[0]
    return (start_year, TERM_ORDER.get(term_name, 0))


def latest_published_term(class_arm: str, class_stats: dict):
    """The most recent (academic_year, term_name) for this class_arm
    that clears the 40% gate, or None if the class has no published
    term yet."""
    published = [
        (year, term)
        for (arm, year, term), stat in class_stats.items()
        if arm == class_arm and stat["pct"] >= CLASS_PUBLISH_THRESHOLD
    ]
    if not published:
        return None
    return max(published, key=lambda yt: term_sort_key(*yt))


def student_average_for_term(student: dict, academic_year: str, term_name: str):
    """This student's average for exactly this (academic_year, term_name),
    or None if they don't have a complete entry for it -- an incomplete
    student can't be ranked even if their class overall published."""
    for year in student.get("years", []):
        if year["academic_year"] != academic_year:
            continue
        for term in year["terms"]:
            if term["term_name"] != term_name:
                continue
            if not term_is_complete(term):
                return None
            subjects = term["subjects"]
            total = sum(s["ca"] + s["exam"] for s in subjects)
            return round(total / len(subjects), 2)
    return None


def compute_top3(all_students: list, class_stats: dict) -> dict:
    class_arms = sorted({s["class_arm"] for s in all_students})
    result = {}
    for class_arm in class_arms:
        latest = latest_published_term(class_arm, class_stats)
        if latest is None:
            continue  # no published term for this class yet -- no entry, not a guess
        academic_year, term_name = latest

        ranked = []
        for student in all_students:
            if student["class_arm"] != class_arm:
                continue
            avg = student_average_for_term(student, academic_year, term_name)
            if avg is not None:
                ranked.append({"name": student["full_name"], "average": avg})

        ranked.sort(key=lambda r: r["average"], reverse=True)
        if ranked:
            result[class_arm] = {
                "academic_year": academic_year,
                "term_name": term_name,
                "top3": ranked[:3],
            }
    return result


def main():
    all_students = load_all_students()
    if not all_students:
        print("No student JSON files found in students/")
        return
    class_stats = compute_class_term_stats(all_students)
    top3 = compute_top3(all_students, class_stats)

    OUTPUT.mkdir(exist_ok=True)
    out_path = OUTPUT / "top3.json"
    out_path.write_text(json.dumps(top3, indent=2))

    if not top3:
        print("No class-arm has a published term yet -- top3.json written empty ({}).")
        print("This is expected until real score data replaces the current demo set.")
    else:
        print(f"wrote {out_path}: {len(top3)} class-arm(s) with a published top-3")
        for class_arm, data in top3.items():
            names = ", ".join(f"{r['name']} ({r['average']})" for r in data["top3"])
            print(f"  {class_arm} ({data['academic_year']} {data['term_name']}): {names}")


if __name__ == "__main__":
    main()
