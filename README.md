# ROCKSOUL GAME — THE LOST SIGNAL

> **The Moon Watches. The Record Remembers. Not Everything Forgotten Was Without Value.**

**A MOONWITNESS XV story universe game** — a narrative-first, offline-ready 2D adventure RPG × idle restoration × optional social multiplayer. The game is **in preproduction**. This repository is the game-specific home; **[moonwitnessxv](https://github.com/bjo163/moonwitnessxv)** remains the broader knowledge, witness, research and ecosystem source.

**Status:** `FOUNDATION / STORY CANON CANDIDATE` — story adaptation is drafted, **no playable build, Vercel deployment, Supabase project, or approved release is claimed**.

## Premise

A signal goes missing. Records begin combining people with similar names, erasing contradictions and “correcting” what they cannot understand. The Listener, a **new proposed player role**, follows lost transmissions to discover the difference between broken memories, unresolved stories and a person's legitimate wish to be forgotten. THE SHADOW intentionally asked to be forgotten. THE BATTERY wants to patch everything. BABY-DOLL may know why a crucial record is missing. The world must decide: **what deserves to continue?**

THE PERFECT RECORD is a **new proposed fictional antagonist**, not a recovered original MoonWitness character. Original lore, scriptural research, authored personal testimony, and new game fiction remain separately classified.

## Design thesis

- **Explore / witness:** meet the crew; discover signals, fragmented testimony, maps, dialogue, puzzles, quest episodes.
- **Restore / idle:** rehabilitate radio beacons, the archive and a safe basecamp; obtain resources under server-validated rules when connected.
- **Choose / learn:** preserve source integrity, uncertainty, consent, human agency, compassion, correction and responsibility.
- **Connect / multiplayer later:** co-op, shared events and social features; **not a day-one MMO promise**.
- **Play online first; design for offline:** future PWA + IndexedDB for cached adventures and local saves with deliberately restricted reconciliation.

## Story roots and records

The original [MOONWITNESS II](https://github.com/bjo163/moonwitness-II/blob/main/docs/MASTER_BLUEPRINT.md) narrative sequence is **BEFORE LIGHT → THE ARRIVAL → THE WITNESS → THE RUNAWAYS → THE EXPOSURE → THE CHANGE → END OF AN ERA → NEXT PHASE**. Its method is **CAPTURE → CONNECT → WITNESS → UNDERSTAND → PRESERVE → PROMOTE → MOVE FORWARD**. These are story-era stages, **not** religious stations or date/time values.

Read the full foundation in this order:

1. [**Master Blueprint**](BLUEPRINT.md) — product contracts and boundaries.
2. [**Master Story Bible**](docs/story/MASTER_STORY_BIBLE.md) — story vision, source-based foundations, world/characters, complete eight-era adaptation, plot decisions, source gaps.
3. [**Canon & editorial policy**](docs/story/CANON_POLICY.md) — fact vs interpretation vs fiction, privacy, religious/identity boundaries, rights.
4. [**Character bible**](docs/story/CHARACTERS.md) — identities/aliases, conflicts and distinctions.
5. [**Story arc and quests**](docs/story/ERA_ARCS.md) — eight-era spine and playable chapter loops.
6. [**World atlas**](docs/world/WORLD_ATLAS.md) — proposed regions, AETHERION boundaries and travel system.
7. [**Game design document**](docs/game/GAME_DESIGN.md) — gameplay pillars, MVP vertical slice, offline/online split, fair economy.
8. [**Technical blueprint**](docs/architecture/TECHNICAL_BLUEPRINT.md) — Next.js/JS, Phaser (later), Supabase, Vercel, offline strategy.
9. [**Source atlas & gaps**](docs/research/SOURCE_ATLAS.md) — traceability and unresolved archival originals.
10. [**Roadmap & microtasks**](TODO.md) — proposed stages, dependencies, acceptance gates.
11. [**Decisions register**](docs/decisions/README.md) — explicit approved vs proposed architecture and narrative decisions.
12. [**Visual direction**](docs/design/VISUAL_DIRECTION.md) — manga-lines, grunge, faceless crew, accessible UI and licensing.
13. [**99 chapter coverage**](docs/research/ARCHIVE_COVERAGE_99.md) and [**33 World Patch registry**](docs/research/WORLD_PATCHES_33.md) — archival indices, not authenticated playable canon.
14. [**AGENTS.md**](AGENTS.md) — local coding agent rules and no-duplicate-branch practice.

## Proposed stack, not yet implemented

| Concern | Proposed first approach |
| --- | --- |
| Web shell & account UI | Next.js + React, JavaScript-first |
| First playable | Web-based idle/restoration loop, accessible responsive UI |
| Exploration (later slice) | Phaser 2D, dynamic import / browser-only canvas |
| Hosting | Vercel, **not deployed yet** |
| Account/storage | Supabase Auth + PostgreSQL with Row Level Security, **not configured yet** |
| Social (later) | Supabase Realtime for lobby/chat/presence; not 60 FPS action synchronization |
| Local play (later) | PWA / cache + IndexedDB; explicit local save boundary |
| Real-time fast action (future only) | Evaluate an authoritative game server when truly necessary |

**Critical boundary:** offline saves never mint competitive items, shared currency or leaderboard results automatically. Server owns transactions and multiplayer state.

## Repo & source-of-truth rules

This is the **owner-created independent game repository** as of 2026-10-26, superseding the earlier idea to keep the game under `moonwitnessxv/apps/rocksoul-game`. Do not create branches or duplicate repos merely for planning. Work directly on the existing `main` branch per owner workflow, but verify HEAD before writes, record commit SHA and never overwrite unreviewed content.

- **This repo owns:** game adaptation scripts, quest designs, game code, balance/economy specifications, licensed game art/audio and builds.
- **XV owns:** broader vision, knowledge/research and source lineage; do not fork XV's hub / IAM / canonical corpus or claim app integrations are already active.
- **Historical repositories own their original records:** refer to their immutable revisions before adapting; do not present synthesis as an original transcript.
- **No divine authority claims:** ALLAH the religious referent is **not** an NPC, algorithm, avatar, score, economy currency, or representation of THE BATTERY. `A-L-L-A-H` is a technical/project acronym.
- **No unlicensed excerpts, portraits or music assets** bundled into game by default; personal materials are private unless explicit publication authorization exists.
- **No 'all tasks complete' solely from green CI**, and no fabricated canon where primary source is missing.

## First playable target

The first **vertical slice** is *The First Signal*: one restoration screen, one radio beacon, one energy loop, one NPC dialogue, one playable story quest, a saved progress record and a verifiable online game loop. Add local cache/Phaser only when the core reward/identity contracts are in place.

## License & contributions

**License not yet selected.** No blanket permission to reuse story text, illustrations, music, third-party trademarks or datasets is granted by public repository visibility. Propose a deliberate code/content dual-license strategy before opening external contribution or shipping assets.

---

*MOONWITNESS: One universe, many witnesses. ROCKSOUL: One journey, many choices.*
