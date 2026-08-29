# Admin access model + feed cleanup — decisions, not yet built

Direct instruction, recorded here so no other agent re-litigates or
conflicts with it. Nothing in this note has been implemented yet —
documentation only, on purpose.

## Admin access model (supersedes the /admin nav card built earlier)

Admin is its own site in spirit, but still lives on the tendercare-teacher
domain, not a separate deployment. Access is via a secret/special URL, not
a visible nav link and not the shared staff/admin password login screen
that gates the rest of the app. Whoever builds this next should treat it
as capability-by-URL, not credential-by-form — consistent with the
owner's stated cybersecurity/antitheft doctrine being handled separately
and locally, outside these repos.

**Known gap against this decision, right now:** `tendercare-teacher`'s
`src/routes/+page.svelte` still has a visible "Admin" card in the
dashboard's feature grid, linking to `/admin`. That card needs to come
out once the secret-URL model is actually built — leaving it in place
defeats the purpose of "secret." Not removed yet since this pass was
documentation-only.

`/admin`, `/admin/staff`, and `/admin/analytics` themselves (built in the
alumni-ID-recycling session, see this same handoff folder) don't need to
move or be rebuilt — only how they're reached changes.

## Feed placeholder cleanup

`tendercare-web`'s feed (`src/routes/feed/+page.svelte`) currently ships
with two hardcoded placeholder announcement posts (`post-card--announcement`
blocks, `data-post-id="maths-1"` and `data-post-id="mgmt-1"`). Both should
come out. The only announcement post that should remain: **"New session
starts September 1."**

Explicitly not a redesign — the feed's UI/visual design is liked as-is.
This is a content swap only: remove the two placeholders, add the one real
announcement, keep everything else (layout, styling, comment/reaction
mechanics) untouched.
