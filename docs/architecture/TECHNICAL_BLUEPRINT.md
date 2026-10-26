# ROCKSOUL GAME — Technical Blueprint
**Status:** Proposed standalone game architecture; no infrastructure deployed/connected by this document. Owner prefers JS-first Fastify/Next workflow; game can use Next.js app APIs initially without Fastify or extra services.

## 1 — Scope and relationship
`rocksoul-game` is now the intentionally separate game-specific repository; `moonwitnessxv` owns the broader knowledge/research/witness and existing ARSY Hub/Signal infrastructure. **No automatic use of XV's database or identity.** Integration requires a scoped ADR, public/authorized API and privacy/security review. Do not copy secrets or copyrighted content from prior repositories.

## 2 — Initial deployment topology
```text
Browser (Next.js/React UI; Phaser later)
   ├── HTTP(S) → Vercel-hosted Next.js routes / server-side actions
   │                    └── Supabase Postgres (RLS + server-authoritative functions)
   ├── Supabase Auth / authenticated game profile
   ├── Supabase Realtime (future chat/lobby/presence only)
   └── IndexedDB + Cache API (future opt-in offline scenes)
             ↳ reviewed reconciliation when online
```

**No Colyseus/Nakama/Redis/Docker/VPS on MVP path.** Consider an authoritative realtime game room only after a tested multiplayer demand needs it.

## 3 — Runtime boundaries
| Layer | Owns | Must not do |
|---|---|---|
| Next.js shell | responsive screens, auth entry, player UI, accessibility and localization | Trust client money/inventory math |
| Phaser game canvas (when added) | 2D movement, tilemaps, animations, scene rendering | Become source of truth for shared transactions |
| Shared pure JS game rules | deterministic quest evaluation, safe idle *preview*, balancing constants | Embed service role secrets |
| Next.js server routes | validate identity/input, orchestrate ledger actions, version control | Handle long-lived 60 FPS multiplayer rooms on normal requests |
| Supabase PostgreSQL | durable player state, producer ownership, reward ledger, content versions, unique constraints | Expose private secrets or unrestricted writes |
| Supabase Realtime (later) | social presence/broadcast; moderated chat feeds | Unbounded high-frequency authoritative movement |
| Offline IndexedDB (later) | local chapter progress, queued safe events and cached scenes | Mint online trade items/currency |
| GitHub/Vercel | source and deploy pipeline | Treat green CI as production certification |

## 4 — Proposed database owner and RLS
`profiles`, `player_saves`, `owned_producers`, `quests`, `quest_progress`, `content_releases`, `reward_ledger`, `idempotency_keys`, `event_outbox`, `report_blocks` (social later). Favor one `user_id` per save; allow multiple characters only after a stable identity model.
- RLS deny-by-default for user-owned rows; server-side rewards granted by restricted audited functions, **never direct client write to balance**.
- Use unique `(user_id, request_id)` idempotency, transaction isolation and `content_version`; robust online/offline sync needs explicit reconciliation.
- No storage of actual witness journals/medical/faith classification in player tables. IDs from external narrative sources are **foreign references** not duplicated authoritative originals.
- Database migration scripts must be repeatable and reviewed; no auto schema rewrite in runtime requests.

## 5 — Contracts before code
- `docs/story/CANON_POLICY.md` establishes classification; story JSON models require `content_class`, `rights_state`, `review_state`.
- `docs/game/GAME_DESIGN.md` defines first progression loop and server-authoritative reward rules.
- API response: versioned `{ok, data, error, requestId}`; redact private errors. All auth-related failure modes 401/403 tested.
- Player events: `game.player.created`, `game.quest.started`, `game.quest.completed`, `game.resource.settled`; schema version and event id compulsory.
- Authoring can start as static local JSON in repo until a reviewed publishing system is required; do not create a parallel knowledge/corpus CMS.

## 6 — Repo target layout (not yet shipped)
```text
.
├── README.md
├── TODO.md
├── docs/
│   ├── story/         # canon, source-bound scripts, characters, eras
│   ├── world/         # regions and fictional world map
│   ├── game/          # gameplay and economy balance
│   ├── architecture/  # tech and security boundary
│   ├── research/      # source atlas and unrecovered originals
│   └── decisions/     # explicit ADRs
├── src/               # Next app only after scaffold milestone
├── public/            # licensed assets only after review
├── supabase/          # reviewed SQL migrations only once implemented
└── tests/             # unit, integration, E2E after scaffold
```

## 7 — Deployment phases and verification
- **M0 docs:** source/ownership, story canon, first playable test plan.
- **M1 boot:** Next.js JavaScript shell deploy preview to Vercel from GitHub. Offline not promised; no Supabase secrets in browser bundle.
- **M2 account/save:** Supabase project manually connected by owner, env vars only in Vercel protected settings; RLS deny negative test and migrations verified.
- **M3 idle:** versioned energy rules, server settle via transaction; anti-duplicate and two-tab tests.
- **M4 story:** read-only dialogue JSON, localization, quest state and clean content flags.
- **M5 offline:** cache manifests, service worker updates, bounded local events, sync conflict tests.
- **M6 exploration:** Phaser 2D canvas with accessible fallback and route-based split bundles.
- **M7 multiplayer:** phased social features, abuse controls and resource authority tests.
Never introduce a second backend simply because future XV apps have different frontend names.

## 8 — Environment examples (no secrets)
```bash
# Future only — do not commit actual values:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# Confidential server credentials, if ever required, must remain Vercel secrets.
```
Public anon/publishable keys are not authorization. Enforce RLS for each user-facing table and avoid leaking any service-role key.

## 9 — Coding discipline
Use JavaScript ESM; avoid Express. Prefer small modules and explicit tests. Add dependencies only at a milestone that requires them; no speculative framework sprawl. Protect root `main` from accidental force pushes, maintain commit traceability and no unwanted branch proliferation.
