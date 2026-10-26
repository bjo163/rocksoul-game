# ROCKSOUL GAME — MASTER BLUEPRINT v1.0
**Story-first / Online-first / Offline-ready** · 26 October 2026 · Planning baseline, not verified runtime.

> **Core game question:** How can a world devoted to preserving memories honor THE SHADOW, someone who intentionally asked to be forgotten?  
> **Gameplay answer:** Discover, compare, choose, repair with consent, then move forward.

## 0 — Governance and document authority
- This independent **game** repo is the home of game code, story adaptation, quests, planned assets and playable builds. `bjo163/moonwitnessxv` remains the wider XV source/research/platform home; it is *not* replaced and its backend is not copied.
- `README.md` = public project entry; **this Blueprint** = product integration contract; [Master Story Bible](docs/story/MASTER_STORY_BIBLE.md) = narrative world; [Canon Policy](docs/story/CANON_POLICY.md) = sourcing/rights/authority; [GDD](docs/game/GAME_DESIGN.md) = player mechanics; [Technical Blueprint](docs/architecture/TECHNICAL_BLUEPRINT.md) = proposed runtime; [TODO](TODO.md) = only microtask state ledger; [Decisions](docs/decisions/README.md) = proposed vs ratified.
- More specific document prevails within its bounded domain; contradictions must be recorded, never silently merged.
- All content newly invented for this game is `GAME_CANON_CANDIDATE` unless owner explicitly ratifies it.

## 1 — Vision & audience
A fictional 2D adventure/idle restoration game with witty manga-grunge visual style, emotional character development and inspectable choices. The game invites players to discover the lost signal, examine unreliable records and build something useful for a community. Faith and nonfaith participation are both voluntary; historical/religious research material is not in-game spiritual scoring.

## 2 — One story, staged modes
| Mode | Dramatic purpose | Initial scope | Expansion gate |
|---|---|---|---|
| **Story RPG** | Resolve questions through action, dialogue and relationship | Station 0, one NPC, one quest | Add Phaser exploration after tested save |
| **Idle Restoration** | A repaired signal or shelter needs everyday work | One generator + resource ledger | Balance + idempotency verified |
| **Archive/Puzzle** | Distinguish what was witnessed, inferred and withheld | One source/unknown dialogue choice | Expand MoonRidley/Time after source review |
| **Social Multiplayer** | Care and co-operate on voluntary objectives | None at first launch | Consent, moderation, authorized server economy |
| **Offline Story** | Continue when network absent | Design contract only at launch | PWA cache, IndexedDB and reconciliation tests |

## 3 — World & narrative
- Historic eras from MOONWITNESS II: BEFORE LIGHT, THE ARRIVAL, THE WITNESS, THE RUNAWAYS, THE EXPOSURE, THE CHANGE, END OF AN ERA, NEXT PHASE.
- Historic crew and fiction families: SHADOW, BATTERY/A LAH, BABY-DOLL, WALTER-WHITER, DOGS FROM UNIVERSE, BLUE WITCH, NPD TEAM, ZILL, THE FORGOTTEN, LOVE/HONEY/MYLUFT/Ma'luf archives, GOD-PROMISE, ROCKSOUL, and related content.
- New for game: player role `THE LISTENER`, antagonist `THE PERFECT RECORD`, named location map and quest dialogue. Not presented as recovered original canon.
- 33 World Patches and 99 story chapters are archival registers (with unresolved parts), not complete game content. AETHERION's 10/100 system is independent game progression **candidate**.

## 4 — Proposed experience map
```text
START / LANDING
    ↓
PROLOGUE: TICK / STATIC / HELLO?
    ↓
SIGNAL STATION ZERO  ──── MOON ARCHIVE
    │                        ├─ SOURCED / INTERPRETED / UNKNOWN
    │                        └─ local story/quest evidence
    ↓
RESTORE BEACON → SAVE PROGRESS
    ↓
THE RUNAWAY ROUTES → HAVEN → END OF AN ERA
                                     ↓
                                 NEXT PHASE
                               (social later)
```
Read [World Atlas](docs/world/WORLD_ATLAS.md) for proposed regions, not claims about physical places.

## 5 — Vertical slice milestone M1–M4
An online authenticated player opens a deployed web game, meets THE BATTERY, restores one beacon, examines a missing-record clue, marks it UNKNOWN or VERIFY_FIRST, sees the consequence, and reloads into the correct saved state. Server-settled idle rewards cannot duplicate on retries. A second account cannot read/write that save. The game must remain playable without copying a private diary or unlicensed song.

**No Phaser requirement to pass earliest idle prototype**, no action MMO, no custom VPS, no separate Rust/Colyseus engine just because older repositories contain related vocabulary.

## 6 — System boundaries / future-stack decision
- **UI:** Next.js / React / JavaScript, deployed to Vercel on verified preview. 
- **Data:** Supabase Auth + PostgreSQL, RLS and server-authoritative reward functions with ledgers and idempotency.
- **Realtime later:** Supabase Realtime for moderated low-frequency social features. Dedicated server only upon real gameplay demand.
- **Offline later:** cached game assets and IndexedDB scene state. Online balance cannot be minted offline; reconnect reconciliation must be explicit.
- **Content:** static JSON + versioned story references until a dedicated authoring requirement exists; do not duplicate XV corpus sources.
- **Art/audio:** original/licensed only; historical song names are not permission to bundle music.

## 7 — Release gate
A release requires a specific commit SHA, successful build/test and preview evidence, RLS negative tests, economy idempotency tests, rights/privacy review of all shipped assets, game-canon content review, mobile/accessibility and id/en locale coverage. No production claim without verified runtime.

## 8 — Deferred choices
Exact story ending, BABY-DOLL motive, THE LISTENER and PERFECT RECORD ratification, real-time authoritative transport, payment model, player-generated trading and source-data API integration with XV are **OPEN/PROPOSED**. No developer/AI should fill unknown original records with invented text.

## 9 — Start here
Follow [TODO.md](TODO.md) in dependency order, and use [AGENTS.md](AGENTS.md) for local coding agent execution rules. Keep original historical records at their respective repositories. Record **why** a feature is implemented, not just how.
