# ROCKSOUL GAME — Instructions for Local Coding Agents

This is the **owner-created** standalone `bjo163/rocksoul-game` repository. Use existing **`main`**, do not create a new repository/branch/issue for ordinary execution, and never force push. Read `README.md`, `TODO.md`, `docs/story/MASTER_STORY_BIBLE.md`, `docs/story/CANON_POLICY.md`, `docs/architecture/TECHNICAL_BLUEPRINT.md` and `docs/decisions/README.md` before changing code/content.

## Operating rules
- Audit HEAD and existing files first. Do not overwrite authored content or claim tasks are complete solely because CI is green.
- Preserve all source names/versions/alias scopes. Only this **game** repo receives new game implementation; `moonwitnessxv` remains an independent knowledge/technology source.
- All dialogue/script prose created by an AI is `GAME_CANON_CANDIDATE` unless an explicit human canon decision changes it. Do not label as original real event/revelation/manuscript.
- Keep ALLAH Divine referent, A-L-L-A-H project brand and fictional THE BATTERY separate. Do not implement faith/salvation/holiness ranks or portray religious figures as farmable combat NPCs.
- Personal ChatGPT/private anecdotes are NOT public repository source. No personal export, medical detail, unlicensed song, full lyrics, private media, non-consensual face/portrait.
- Implement JavaScript-first ESM (no Express); prefer minimal Next + React, a pure game-rules package/module, and only integrate Phaser/Supabase/Realtime when their milestone demands.
- Server authoritative for shared balances, item transactions, reward settlement and multiplayer. Clients/offline saves cannot mint online money/trading inventory.
- Every change must have tests matched to behavior; for gameplay, verify determinism, player isolation, RLS, idempotency, reconnect sync, 401/403 cases and story privacy. If the tools/credentials needed to verify are absent, report the exact unverified gate.
- Working style: small scoped commits on existing branch, no speculative refactor, no duplicate canonical owner, truthful changelog, cross-reference TODO task IDs and SHA.

## Definition of Done
A task is done only if implemented within stated file scope, tests run and pass or limitations explicitly recorded, narrative metadata checked, security/rights constraints met where relevant, documentation updated, and repository HEAD verified after push.

## Best next action
Execute tasks starting at `TODO.md` M0/M1; do **not** invent Vercel deployment, Supabase keys, a live game economy, authorized story canon, completed prior manuscripts, or real multiplayer without evidence.
