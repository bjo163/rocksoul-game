# M2 — Supabase Setup & Safe Online Save

**Status:** SQL and optional browser account client scaffolded. **No Supabase project, SQL migration execution, user signup or authenticated saved progress has been verified yet.**

## Owner steps (do not paste credentials here)

1. Open [Supabase Dashboard](https://supabase.com/dashboard/projects) and create or select a dedicated **ROCKSOUL GAME** project. Do **not** reuse XV's operational database by default.
2. In SQL Editor, apply `supabase/migrations/202610260001_game_accounts.sql` after reviewing schema, role grants and RLS policies. Prefer the Supabase CLI migrations workflow when project is linked. This creates only `game_profiles`, `game_saves`, and a server-owned Auth signup trigger. The trigger function lives in unexposed `game_private` and there is **no privileged public RPC**. It creates no reward payout or tradable balance API.
3. Under Authentication → URL Configuration, set the **Site URL** to your real verified canonical Vercel production domain. Add exact allowed redirect URLs for `/id/account` and `/en/account`, including preview sites only when controlled.
4. Under Project Settings → API Keys, obtain the **Project URL** and **publishable key** (NOT secret/service-role key).
5. In Vercel **rocksoul-game → Settings → Environment Variables**, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for production/preview as appropriate. Redeploy `main` so these browser-bundled values are included. Never share secret keys in chat or Git.
6. Open `/id/account`. Request email magic link; follow it; verify newly provisioned save shows `ERA_01`, `revision=0`, beacon is not repaired. Confirm redirect works in both languages.
7. Run **two-user negative tests**: anonymous user cannot read tables or access the private trigger; user A cannot select user B's save; neither user can insert/update/delete save rows directly. Verify no public account-bootstrap RPC can forge user ownership; the trigger only uses the new Auth user's ID.
8. Run Supabase CLI `supabase test db` against a disposable local/test database and record output and exact commit. Do not mark M2 RLS secure solely because static tests or CI are green.

## Current architecture contract

- Browser account auth is **client-only** via `@supabase/supabase-js` and PKCE email link. It does **not** claim server-rendered authenticated pages, SSR session cookies or cross-app SSO.
- Supabase handles browser session persistence. Postgres Auth UID, grants and RLS enforce isolation. The browser cannot directly alter game resource balances.
- `game_private.create_player_on_signup()` runs only through an `auth.users` INSERT trigger using `NEW.id`. It uses `SECURITY DEFINER` with fixed empty `search_path`; the private schema and function are not executable by browser roles. **New signups** receive starter saves; preexisting users need a separately reviewed backfill.
- Browser game `localStorage` demo remains unrelated to an online save. No migration from demo progress, no online currency credits, no multiplayer presence and no offline server-authoritative rewards yet.
- After this foundation, implement server-validated quest transitions and separate atomic reward settlement with idempotency, anti-double-claim tests, and explicit offline replay rules in M3. Do not allow direct updates to `game_saves` balances.

## Security notes

Supabase projects can grant privileges by default. This migration explicitly revokes table grants and grants authenticated users only `SELECT` plus RLS self-read policies. Database functions default to PUBLIC execute, so the trigger function explicitly revokes EXECUTE and private-schema USAGE. The signup trigger must be tested with real registrations because a trigger failure can block signup; real-token isolation tests remain required.

Primary docs: [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [secure Postgres functions](https://supabase.com/docs/guides/database/functions), [Email OTP](https://supabase.com/docs/reference/javascript/auth-signinwithotp).

## Unblocked / blocked

| Task | State |
|---|---|
| SQL schema migration authored | DONE IN REPO, NOT APPLIED |
| Database-level pgTAP security smoke test authored | DONE IN REPO, NOT EXECUTED |
| Conditional account page + magic link client | CODED, needs real project |
| Actual Supabase provisioning, email and RLS negative tests | **BLOCKED UNTIL PROJECT CONNECTED** |
| M2 secure online save release | **NOT VERIFIED** |

## Connected Supabase discovery — 2026-10-26

The Supabase plugin successfully listed **one organization** named `bjo163's projects` on the **Free** plan. No `rocksoul-game` project is present; older MOONWITNESS and unrelated projects are currently `INACTIVE`. No database was modified. Creating a new project requires selecting the intended organization and acknowledging any provider cost. Do not reuse dormant databases. The original public `SECURITY DEFINER` bootstrap RPC was removed from the **unapplied** migration in favor of a private Auth signup trigger.
