# Activating the staff/admin/student logins

Two patches, three manual steps once you have a real Supabase project connected.

## 1. Apply the patches

```bash
cd tendercare-teacher && git apply tendercare-teacher-staff-login.patch
cd tendercare-portal  && git apply tendercare-portal-full.patch
```

## 2. Run the new migration (tendercare-teacher)

Apply `supabase/migrations/0003_staff_auth_roles.sql` same as the existing
two — via `supabase db push` or pasted into the SQL editor, in order after
`0001` and `0002`.

## 3. Create the two staff/admin accounts

In the Supabase dashboard → Authentication → Users → "Add user", create:

| Email | Password | user_metadata |
|---|---|---|
| `staff@tendercare.local` | `password` (or whatever you're using now) | `{"role": "staff"}` |
| `admin@tendercare.local` | `tender` | `{"role": "admin"}` |

The `0003` migration's trigger copies `role` from `user_metadata` into
`app_metadata` on creation, which is what actually makes
`auth.jwt() ->> 'role' = 'staff'` true in RLS. If you create these users
*before* applying the migration, re-save their metadata afterward (even to
the same value) to fire the trigger — see the migration file's comment.

## 4. Set the shared student password

```bash
STUDENT_LOGIN_PASSWORD=12345678 \
PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
npx tsx scripts/set_shared_student_password.ts
```

Run from inside `tendercare-portal`. Safe to re-run any time you want to
change the shared password — it upserts every active student's row.

## What this gets you today

- Staff sign in at `/login` on `tendercare-teacher`, picking "Staff" or
  "Admin" from a dropdown, password `password` / `tender` respectively.
- `/roster` redirects to `/login` if there's no session.
- Students hit a password screen at `/result/[id]` on `tendercare-portal`,
  enter `12345678`, and get in — checked server-side against a bcrypt hash,
  not a value sitting in view-source.

## What's still deliberately temporary

Two shared logins instead of real per-staff accounts, and one shared
student password instead of per-student ones — same shape you asked for,
kept easy to rip out. Nothing in RLS or `roster.ts`/`data.ts` needs to
change when you pick a real strategy — only how a session gets its role
claim (teacher app) and how `/login` on the portal verifies a password
(student app).
