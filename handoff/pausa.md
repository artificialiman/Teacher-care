## these are paused processes by my agents

do well to build something that isnt tackled here

paused session:
Let me check two things first — whether pg_cron is available on the Supabase project (needed for #9/#12's Sept 1 trigger), and what the yearbook page currently looks like (needed to scope #12 correctly) — then I'll just get moving on what's actually buildable.

Ran a command, used Supabase integration · 1 note
Execute SQL

Good — pg_cron is available, just not installed yet. Real scheduling is possible. Now the yearbook page:

Check the current yearbook page implementation

Yearbook page is fully hardcoded/curated right now — no dynamic "current class" concept at all, hand-written dedication text and baked-in image paths. Rebuilding it to auto-rotate is a bigger, more opinionated change than the others; I'll flag that one rather than guess at it. Here's what's actually safe to knock out now, starting with verification since it needs no design decisions:

Ran 2 commands · 1 note
Check what's available for real PDF rendering

wkhtmltopdf is available — using it for a real print-media render, since that engine actually applies @media print CSS the way a browser's print dialog does.

Render the generated report to an actual PDF

Font fetch is blocked by this sandbox's network allowlist (not a real issue — Vercel will fetch it fine in production), but that killed the whole render. Retrying with network errors ignored so it falls back to system fonts — sufficient to verify layout, watermark, and print CSS.

Ran 2 commands
Retry PDF render ignoring the blocked font fetch
Strip the Google Fonts link tags and re-render to avoid the blocked network call entirely

That render came back nearly blank (1.2KB) — and now I see why: this page has a client-side password gate that only reveals content after a real click event, which a static HTML-to-PDF tool never simulates. A real user's browser would work fine (they click through first), but I can't just trust that — let me actually simulate the click with Playwright and export a true post-unlock PDF.

Ran a command
Install Playwright's Chromium browser for a real interactive render

Hit a wall there — Playwright needs to download a real browser binary, and that domain isn't in this sandbox's network allowlist, so I can't get a literal screenshot/PDF proof. Being straight about that rather than pretending I verified something I didn't. What I can do is trace the actual CSS/JS logic by hand, which explains why my first attempt came back blank and settles whether the real (interactive) path is correct:

The gate hides #site-content until a real button click sets its style.display = "block" via JS — an inline style, which a static non-interactive tool never triggers, hence the blank render. For an actual user who unlocks first, that inline style persists into print. The @media print rules correctly hide the gate/nav/header chrome and boost watermark opacity, and .term-panel[hidden] correctly keeps only the currently-selected term visible in the printout, not all terms stacked. The crest <symbol> definition sits right after <body>, outside both the gate and the content div, so every <use> reference — corner logo, header logo, watermark — resolves regardless of gate state. By code inspection, this is correct.

Edited 6 files, read a memory, ran a command · 4 notes
Recalled memory
Areas
›
Tendercare Svelte Migration
Tendercare Svelte migration — tendercare-web (public site), tendercare-teacher, tendercare-portal replacing the old Testy/Teacher-care sites; read when working on any of these three repos or their Vercel deploys

Now moving to #10 (repeat/pardon) and #11 (portrait link, scoped to roster + auth gate only). Both are schema + UI additions I can build cleanly without more input.

Check the current students table shape before adding columns
Migration 0005: repeat/pardon state and portrait_url on students

Now updating roster.ts with the write functions, and the roster UI with controls for both:

Edited roster.ts
+12
-8
Edited roster.ts
+48
-7

Now the roster page UI — adding repeat/pardon toggle and a portrait URL field to the row actions and the remark modal area:

Edited +page.svelte
+15
-12
Edited +page.svelte
+8
-4
Edited +page.svelte
+59
-21

Now the row markup — adding portrait thumbnail, repeat badge/toggle, and portrait-edit button:

Edited +page.svelte
+31
-17
