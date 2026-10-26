# ROCKSOUL GAME — Vercel Deployment Runbook
**Date:** 2026-10-26. This runbook describes a proposed Git-connected deployment; it does NOT prove the project is live.

## Verified build
GitHub Actions [workflow run 40323160770](https://github.com/bjo163/rocksoul-game/actions/runs/40323160770) succeeded for commit `973cd1429643c60a79921048d3c4ce6a488aaa65`: dependency installation, structure checks, JS tests and Next.js 16 production build. Newer commits need independent CI success at their own SHA.

## Vercel automated attempt
Authenticated Vercel team discovered: `bjo163's projects` (`bjo163s-projects`, `team_8xeyKKgB1yo4gNkmXrsmwbjo`). Creating a Git-linked `rocksoul-game` project returned **403 forbidden / insufficient permission** through the connected Vercel tool on 2026-10-26. A Vercel CLI fallback was not available in the execution environment. **No project or URL was created by that call.** Do not claim a deployed preview or retry the same 403 request blindly.

## Owner-controlled recovery
1. Open [Vercel new project](https://vercel.com/new) in the correct account/team; select **Import Git Repository** → `bjo163/rocksoul-game`. If GitHub is not offered, confirm Git integration permissions in Vercel.
2. Framework preset: **Next.js**, root directory `./`, project name `rocksoul-game`, production branch `main`.
3. Deploy after reviewing the repository and enabled team access. Build command `npm run build`, install `npm install`, runtime **Node 22**.
4. Verify `/id`, `/en`, `/id/play`, `/en/world`, `/id/archive` directly. Test localized links, mobile layout, keyboard, no audio dependency and browser demo reload/reset.
5. Record actual Vercel project/deployment URL, deployment ID, commit SHA, build result and access/protection status in this document. Do not guess links.

## Database status
**No Supabase project exists in this repo.** Sign-in, server-authoritative inventory, Realtime multiplayer and offline PWA remain future M2+. Public browser demo uses localStorage only and is not a real shared online game. Do not place database credentials or service-role keys in Git or client bundles.

## Risk management
Direct main pushes are the user's current workflow; protect release integrity with GitHub Actions. This standalone preview does not require integration with XV's Fastify/ARSY Hub. For the first real online accounts, implement RLS + cross-user negative tests before saving personal data. Roll back deployment from Vercel's deployment history only after verifying affected environment.
