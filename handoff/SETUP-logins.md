# Activating the staff/admin/student logins

**Status: done.** All four steps below have been carried out against the
real Supabase project (`iaokbdpqmopubeuhbadv`) — this file is kept as a
record of what was done and how to redo it (e.g. changing the shared
student password later), not as pending instructions.

## 1. Patches applied — see HANDOFF.md for commit hashes

## 2. Migrations applied

`0003_staff_auth_roles.sql` and `0004_atomic_student_id.sql` are both
live. Confirmed via direct query that the `0003` trigger correctly
copies `role` from `user_metadata` into `app_metadata` for both
accounts below — not assumed from reading the migration alone.

## 3. Staff/admin accounts — created and confirmed working

| Email | Password | app_metadata.role |
|---|---|---|
| `staff@tendercare.local` | `password` | `staff` (confirmed) |
| `admin@tendercare.local` | `tender` | `admin` (confirmed) |

## 4. Shared student password — set

376 active students have `12345678` set in `portal_credentials`,
bcrypt-hashed via `pgcrypto`'s `crypt()`/`gen_salt('bf')` directly
against the database (same hash format `scripts/set_shared_student_password.ts`
produces via `bcryptjs` — verified compatible before using this route).

To change the shared password later, either re-run that script the way
it was designed to be run:

```bash
STUDENT_LOGIN_PASSWORD=new_password \
PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
npx tsx scripts/set_shared_student_password.ts
```

or run the equivalent SQL directly against the project.

## What this gets you today

- Staff sign in at `/login` on `tendercare-teacher` — live, confirmed
  working.
- `/roster` redirects to `/login` if there's no session.
- Students hit a password screen at `/result/[id]` on
  `tendercare-portal`, enter `12345678`, and get in — checked
  server-side against a bcrypt hash.

## What's still deliberately temporary

Two shared logins instead of real per-staff accounts, and one shared
student password instead of per-student ones — same shape you asked
for, kept easy to rip out. Nothing in RLS or `roster.ts`/`data.ts`
needs to change when you pick a real strategy — only how a session
gets its role claim (teacher app) and how `/login` on the portal
verifies a password (student app). See `INVARIANTS.md` — this whole
setup is explicitly "for now, antifail mindset," not the final design.
