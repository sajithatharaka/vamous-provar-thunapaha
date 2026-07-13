# Fix: waitlist signup always failed with "Something went wrong"

Created: 2026-07-13

## Problem

Every waitlist/registration submission on the landing page (`src/app/page.jsx`'s `WaitlistForm`, wired to `captureEmail` in `src/lib/actions.js`) failed with the generic "Something went wrong — please try again." message, regardless of the email entered.

Reproduced by driving the running dev server with Playwright and reading the server-side log (`console.error("Supabase insert error:", ...)` in `src/lib/actions.js`) plus the live Supabase Postgres logs. The actual error was:

```
sql_state_code: 42501
event_message: "permission denied for table leads"
hint: "Grant the required privileges to the current role with: GRANT INSERT ON public.leads TO service_role;"
```

`supabase/migrations/20260622000000_create_leads_table.sql` created the `leads` table, enabled RLS, and added an insert policy — but never granted table-level privileges to `service_role`. Postgres checks `GRANT` before RLS policies are ever evaluated, so the insert was rejected at the privilege-check stage regardless of the RLS policy being correct. `supabase migration list --linked` confirmed the migration itself was applied remotely, so this wasn't a missing/unapplied migration — the original migration was just incomplete.

## Fix

Added `supabase/migrations/20260713000000_grant_leads_insert.sql`:

```sql
grant insert on public.leads to service_role;
grant select on public.leads to service_role;
```

`select` is included so the `23505` unique-violation path (already handled in `captureEmail`) and any future read access work without a second migration.

## How to apply

Run `npm run db:push` to push this migration to the linked Supabase project (per `docs/requirements/2026-07-12-dev-tooling-and-git-hooks.md`). Schema changes are migration-only — do not grant privileges via the Supabase dashboard.

## Verification

- `supabase migration list --linked` showed the original table migration as applied on both local and remote before this fix, ruling out "migration never pushed."
- Reproduced the failure end-to-end against the live dev server with Playwright (fill + submit the waitlist form), and confirmed the exact Postgres error via the project's Postgres logs.
- `tests/lib/actions.test.js`'s existing "reports a generic error on other Supabase failures" case already covers `captureEmail`'s handling of this error at the application layer (any non-`23505` Supabase error maps to the generic message) — the bug was purely in the missing `GRANT`, not in `captureEmail`'s logic, so no application code changed.
