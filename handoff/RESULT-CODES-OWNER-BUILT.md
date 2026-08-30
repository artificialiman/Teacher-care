# Result-checker codes — owner-built, not agent scope

Direct instruction, recorded so no agent re-litigates or builds this.

## Decision

Result-checker codes (what a parent/guardian uses to unlock a student's
result on `tendercare-portal`) are:

- **One code per student, per term** — not the current shared
  student-password model (`tendercare-portal/scripts/set_shared_student_password.ts`),
  and not per-class or per-family.
- **Valid until the next term** — generated once at the start of a term,
  stays live for that whole term, then needs regenerating.
- **A revenue-generation stream for the school.** Because of that, this
  is an explicit invariant the owner is building **personally, by hand**
  — not something for an agent to design or implement.
- **Shared via WhatsApp**, to contacts — no gate/auth on that sharing
  step itself, at least not yet.

## What this means for any agent working here

- Do not build the code-generation mechanism, the WhatsApp share flow,
  or a `result_codes`-equivalent table/schema.
- A placeholder only exists in the admin UI (`tendercare-teacher`'s
  `/admin` home) — a disabled "Result Codes" tile, no route behind it,
  no logic. That's the extent of what should exist here until the
  owner builds the real thing.
- If asked to touch anything result-code/WhatsApp-adjacent, flag this
  doc rather than proceeding.
