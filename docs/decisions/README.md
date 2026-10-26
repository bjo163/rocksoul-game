# ROCKSOUL GAME — Decision Register
**Date:** 2026-10-26 · Distinguish OWNER-CHOSEN from PROPOSED.

| ID | Decision | Status | Implication |
|---|---|---|---|
| DEC-001 | `bjo163/rocksoul-game` independent game repo created by owner | **OWNER-CHOSEN** | New game code and adaptation docs here; XV remains broader narrative/reference |
| DEC-002 | Keep currently existing `main`; no extra branch merely for planning | **PROJECT PRACTICE** | Sequential, verified commits; no force push |
| DEC-003 | Preserve MOONWITNESS II eight names/13 functions as source | **SOURCE ANCHOR** | Game arcs may adapt but cannot invent original wording |
| DEC-004 | Product **ROCKSOUL: THE LOST SIGNAL** (working title) | **PROPOSED** | Brand ROCKSOUL GAME can remain if season title changes |
| DEC-005 | Protagonist THE LISTENER and antagonist THE PERFECT RECORD | **PROPOSED** | New fictional role and process, not old original canon |
| DEC-006 | BABY-DOLL's specific reason for forgetting | **UNDECIDED** | Plot twist preserved, exact motivation remains candidate |
| DEC-007 | Game modes story RPG + idle restoration + social later | **PROPOSED GAME DIRECTION** | Stage complexity rather than claiming MMORPG |
| DEC-008 | Online-first, offline-ready; Vercel + Supabase | **OWNER PREFERENCE / PROPOSED TECH** | No service configured yet |
| DEC-009 | Start JavaScript-first, Next.js shell; Phaser later | **PROPOSED TECH** | No engine package before milestone |
| DEC-010 | No public private witness logs or unlicensed lyrics | **FOUNDATION SAFETY GATE** | Source and media manifest required |
| DEC-011 | No religious figure/divine authority as combat or XP model | **FOUNDATION CANON BOUNDARY** | Respect epistemic distinctions |
| DEC-012 | `ARSY` remains a separate XV Hub, not recreated in game | **XV REFERENCE** | Game APIs have their own future DB owner |
| DEC-013 | Initial gameplay: no combat, single station and beacon | **PROPOSED MVP** | Validate story and save/economy before world expansion |
| DEC-014 | Game software and story/music/assets licensing | **OPEN** | Do not assert all-rights-reserved or permissive license by assumption |

## Rules for new decisions
1. Add a new stable DEC row (never reuse ID); include what changes, why, alternatives, owner, date, impact, rollback.
2. An earlier historic repository ADR is evidence of its **own context**, not automatically a game ADR.
3. Do not treat a game-doc commit as approval of all proposed canon.
4. Human explicit sign-off required before promoting `GAME_CANON_CANDIDATE` into `APPROVED_GAME_CANON`.
5. Decisions involving account architecture, monetary economy, media rights, identity or private contents require written risk/reversal paths.
6. Revalidate upstream XV references before integration. No automatic cross-repo write or migration.
