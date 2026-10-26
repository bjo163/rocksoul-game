# ROCKSOUL GAME — Vercel Deployment Runbook
**Date:** 2026-10-26. Owner imported the project. Vercel lists a READY production deployment; browser accessibility remains externally unverified.

## Verified build
GitHub Actions [workflow run 40323160770](https://github.com/bjo163/rocksoul-game/actions/runs/40323160770) succeeded for commit `973cd1429643c60a79921048d3c4ce6a488aaa65`: dependency installation, structure checks, JS tests and Next.js 16 production build. Newer commits need independent CI success at their own SHA.

## Vercel automated attempt
Authenticated Vercel team discovered: `bjo163's projects` (`bjo163s-projects`, `team_8xeyKKgB1yo4gNkmXrsmwbjo`). Creating a Git-linked `rocksoul-game` project returned **403 forbidden / insufficient permission** through the connected Vercel tool on 2026-10-26. A Vercel CLI fallback was not available in the execution environment. **No project or URL was created by that call.** Do not claim a deployed preview or retry the same 403 request blindly.

## Owner-completed Vercel import (verified in provider listing)

The owner imported the GitHub repository, superseding the earlier connector's 403. On 2026-10-26, Vercel `list_projects` returned:
- Project: `rocksoul-game`; project ID `prj_XA2zzvTgPw5JkopVgxiXQofICSCO`.
- Team: `bjo163s-projects`; project linked to `bjo163/rocksoul-game`.
- Production deployment ID: `dpl_3Xd3g1pH7tQQc5jowAENmErkCPyA`.
- Deployment URL from provider (not invented): https://rocksoul-game-amfoq93b9-bjo163s-projects.vercel.app
- Git source: branch `main`, SHA `4e38bbee4cf6f076c079486e17352a64fb3c14c1`.
- Reported state: **READY**.

**Important:** the external web verifier could not retrieve pages at `/id`, `/en` and `/id/play`. Provider list READY confirms Vercel build readiness, not public accessibility, access-protection state, custom DNS or browser rendering. Direct project/deployment inspector tool requests also returned 404 despite provider lists showing the resource; do not infer these contradictory endpoints imply deployment removal. Confirm route access in your browser.

## Follow-up production route validation
1. Open [Vercel new project](https://vercel.com/new) in the correct account/team; select **Import Git Repository** → `bjo163/rocksoul-game`. If GitHub is not offered, confirm Git integration permissions in Vercel.
2. Framework preset: **Next.js**, root directory `./`, project name `rocksoul-game`, production branch `main`.
3. Deploy after reviewing the repository and enabled team access. Build command `npm run build`, install `npm install`, runtime **Node 22**.
4. Verify `/id`, `/en`, `/id/play`, `/en/world`, `/id/archive` directly. Test localized links, mobile layout, keyboard, no audio dependency and browser demo reload/reset.
5. Record actual Vercel project/deployment URL, deployment ID, commit SHA, build result and access/protection status in this document. Do not guess links.

## Database status
**No Supabase project is connected to this repo.** An M2 auth client, separate DB migration and protected starter-save policy are now authored, but not provisioned or exercised. See [Supabase setup](../architecture/SUPABASE_M2_SETUP.md). Server-authoritative inventory, Realtime multiplayer and offline PWA remain future milestones. Public browser demo uses localStorage only and is not a real shared online game. Do not place database credentials or service-role keys in Git or client bundles.

## Risk management
Direct main pushes are the user's current workflow; protect release integrity with GitHub Actions. This standalone preview does not require integration with XV's Fastify/ARSY Hub. For the first real online accounts, implement RLS + cross-user negative tests before saving personal data. Roll back deployment from Vercel's deployment history only after verifying affected environment.

## Automatic redeploy after M2 scaffold — verified

- Source SHA: `648626bd0dd74346d2cf81c94ae5d2a7df68999c` (branch `main`).
- [GitHub Actions 40325699040](https://github.com/bjo163/rocksoul-game/actions/runs/40325699040) completed **SUCCESS** for npm install, Node tests, structure and Next production build.
- Vercel `list_deployments` returned production **READY** for that exact SHA; deployment ID `dpl_6cENP4S8mXhfRqLJ4y1WwKKAQxVU`.
- Actual deployment hostname from provider: `rocksoul-game-31krc7tnn-bjo163s-projects.vercel.app` (use [deployment URL](https://rocksoul-game-31krc7tnn-bjo163s-projects.vercel.app/id)).
- A Vercel READY flag does not prove public access; browser smoke/protection review is still open.
- The hosted account route is **conditionally disabled** until the owner's Supabase URL and publishable key are configured; no SQL migration has been applied by this repository push.


## Supabase connection status — 2026-10-26

Plugin connection is active, but listing shows no dedicated `rocksoul-game` Supabase project. Organization `bjo163's projects` has Free plan and older inactive projects; none were changed. The safer private signup-trigger migration is in GitHub only. Auth production readiness awaits explicit database target, running migration, and negative RLS tests.
