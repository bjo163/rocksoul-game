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

## Live project provisioned — 2026-10-26

- Project **rocksoul-game**: Supabase ID `uownhjziknlzrvnvfruu`, Singapore (`ap-southeast-1`), `ACTIVE_HEALTHY` on creation.
- Provider quoted project creation cost **US$0/month** for the chosen Free-plan organization; future billable usage/limits are subject to Supabase's plan terms.
- Git source migration `202610260001_game_accounts.sql` applied as remote migration version `20261026132826`, name `game_accounts_foundation`.
- Public tables `game_profiles`, `game_saves` created with RLS; no accounts/save rows present at inspection. Verified: anon SELECT false, authenticated SELECT true, authenticated UPDATE false, private schema usage false, signup trigger installed, exactly two self-read policies.
- Supabase Security Advisor returned zero reported findings. This does not substitute live two-account negative tests.
- Vercel project environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` configured for production/preview, using a **publishable** key only. No secret/service-role key is committed.
- **Open:** a new Vercel production build is required to embed the newly created environment variables, and Supabase Auth Site URL/allowed redirect URL settings need verification. The Vercel deployment creation API returned `403 Forbidden`; push-based Git integration can trigger a new build. Browser magic-link login, signup trigger E2E and two-user RLS negative tests are not yet verified.


## 2026-10-26 autonomous verification checkpoint

- Browser tab exposed the earlier ROCKSOUL `/id/play` demo and its interactive UI content; no live user signup was attempted.
- Read-only SQL transaction with `SET LOCAL ROLE authenticated` and **no JWT sub** returned 0 visible profiles, 0 visible saves, `INSERT=false`, `UPDATE=false`. Because both tables were empty, this does **not** prove actual cross-user isolation. No users were created.
- The Supabase connector currently has no documented management action for **Auth Site URL** or **allowed redirect URLs**. PostgreSQL SQL cannot be substituted for GoTrue Auth configuration. Do not claim those settings changed.
- A real sign-in requires those Auth redirect settings to include the canonical Vercel production origin and `/id/account`, `/en/account`. Once settings are accessible via a supported authorized management action or a logged-in UI in Work mode, configure them and run a real two-account signup/RLS test.
- Latest Vercel environment variables are already set; do not ask for or expose secret keys.

## Username + password alpha — 2026-10-26

The owner requested removing the magic-link requirement. Supabase email/password is used **internally**; players enter only a username and password. No custom password hash is stored. The public Supabase Edge Function `game-username-auth` uses a server-side admin client to create a confirmed synthetic-email Auth identity and a private username mapping; the browser receives only Supabase session tokens and then uses `setSession`. Email is neither required nor collected from players. This bypasses the Auth Site URL/redirect dependency for ordinary login, but it does **not** configure password recovery.

- DB migrations `202610260002_username_auth.sql` and `202610260003_register_username.sql` were **applied** to the isolated production ROCKSOUL database. `game_private.game_login_emails` and rate-limit rows have no browser access. The `public.rocksoul_auth_email`, `public.rocksoul_auth_throttle` and `public.rocksoul_auth_register` wrappers are **service_role-only** with `SECURITY INVOKER`.
- Deployed Supabase Edge Function `game-username-auth` (active v2) is public to accept registration/login, restricts browser Origins to project domains, caps request sizes, validates username/password length, and uses service-side username/IP throttling. **Origin checks are not a standalone security boundary**; endpoints also require rate limits and normal credential verification.
- No user email or password is required in the browser. Username characters: 3–24 ASCII lowercase letters/numbers/underscore, starting with a letter. Password length: 12–128.
- **Limitations:** user-initiated password reset has not been built. Lost password currently requires an approved recovery process. This early alpha should not be advertised as production-ready public registration until signup/sign-in, throttling, race conditions, and two-user isolation are tested from a real browser.
- **Test status:** GitHub CI validates the source and app build, live database checks confirm browser grants are absent and security advisors report no warnings. Actual registration/login over the Edge HTTP endpoint is **NOT yet exercised** by this agent; the connected tool set has no HTTP POST test interface and sandbox network resolution was unavailable.

