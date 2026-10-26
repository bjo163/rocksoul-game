# ROCKSOUL GAME — Game Design Document (GDD)
**Edition:** Preproduction candidate v1.0 · No playable build or verified economy exists.

## 0 — Product thesis
ROCKSOUL: THE LOST SIGNAL is a 2D story adventure and restoration game in the MOONWITNESS XV universe. **Discover, evaluate, choose, restore, move forward.** Distinguish history/attributed sources from invented game fiction. Emotional resolution beats mechanical exploitation.

**Primary audience:** players attracted to mystery, narrative RPG, cozy/idle restoration, comic/grunge aesthetics and voluntary community activities. Public content is accessible regardless of religious identification. Initial interface Indonesian + English, with separate source-language and translation attribution.

## 1 — Gameplay pillars
1. **WITNESS / DISCOVER:** inspect records, source cards, scenes, music/signal artifacts and dialogue; compare perspectives.
2. **ROCKSOUL / CHOOSE:** INPUT → DIRECTION → INTENTION → OUTPUT; optional OBSERVATION → CORRECTION → RETURN. Neither gameplay quality nor player rating measures religious righteousness.
3. **RESTORE / IDLE:** improve workbench, beacon and Haven. Increment resources only from valid elapsed time/verified server rules.
4. **STORY / CONSEQUENCES:** branch choices and relationships; reversible actions when possible; avoid rewards for violating fictional witness consent.
5. **CONNECT / SOCIAL (LATER):** guild, co-op, shared goals, presence and non-exploitative event participation. No requirement to socialize for completion.

## 2 — First vertical slice (M1)
- Player sees one responsive safe station room with a 2D art placeholder.
- Player can activate exactly **one** broken signal beacon and generate `Signal Charge`.
- Player talks to **THE BATTERY** (non-divine, fictional) and inspects an abstract signal fragment.
- Player completes `TICK / STATIC / HELLO?`, selecting a response: `MARK_UNKNOWN` or `VERIFY_FIRST`; narrative outcome is shown, no fake religious evidence.
- Save data persists for authenticated online player; basic guest demo may run without writing server rewards.
- One restart test proves state retains; a second independent account never sees the first account's save.

## 3 — Progression registers
| System | Scope | Rules |
|---|---|---|
| **Era** | Story phases 00–07 | Fixed source-era names; quest gate state, not spiritual level |
| **Character Level / XP** | Fictional play competence | Fair cap and curve, not salvation/moral rank |
| **Signal Charge (SC)** | Primary non-purchasable soft progression | Rate-limited; server authority when online |
| **Archive Fragments** | Found narrative clues | An unverified clue remains unverified even when collected |
| **Repair Parts** | Fabrication, upgrades | Not real-world technology recipes |
| **Trust / relations** | Local NPC friendship/dialogue flags | Fictional within-story, never inference about real people |
| **AETHERION** | Future 10-realm/100-level proposal | Distinct from eight eras; no phase-1 dependency |
| **33 World Patches** | Historical themed registry | Not 33 granted miracles or 33 guaranteed quest ships |

Avoid `Faith Score`, `Holiness Rank`, `Divine Energy`, `Miracle Currency`. No real-money items or blockchain tokens in MVP.

## 4 — Idle restoration model
- Server writes last checkpoint `last_settled_at` and owned producers; time source is trusted server.
- `delta_seconds = min(now - last_settled_at, offline_cap_seconds)`; reward deterministically computed from versioned producer rules; apply in **single DB transaction** with idempotency key and audited reward ledger.
- Offline-client local progression can preview growth but is not the authority for economy, inventory or leaderboard; synchronize or discard invalid projections on reconnect with clear user messaging.
- Never accumulate duplicate rewards due to clock skew, reloads, retry or two tabs. Player state must have version checks to resolve concurrent writes.
- Player caps/progression, anti-inflation sinks and idle upper limits are balance decisions, not invented existing constants.

## 5 — Quest/action data contracts
```json
{
  "quest_id": "q-arrival-0001",
  "era_id": "ERA_01",
  "mission_type": "STORY",
  "prerequisites": [],
  "rewards_version": 1,
  "localizable_script_id": "arrival-first-signal",
  "privacy_class": "PUBLIC_FICTION",
  "review_state": "candidate"
}
```
For story quest: success must not depend on disclosing private personal identity. `mark_unknown` is valid. `fail` can open an alternative branch, not erase a human's dignity.

## 6 — RPG and combat discipline
First playable: **no combat**. First action: interact/inspect/restore and meaningful dialogue. When combat arrives it can be turn-based or 2D map combat, fighting abstract broken automata/anomalies. Avoid depicting sacred figures or real people as enemies. Skill tree can emphasize observe/research/repair/communication/exploration instead of a pure damage ladder.

## 7 — Multiplayer staged
- **Phase social 1:** player name/avatar, opt-in presence, chat with moderation, one co-op repair mission and leaderboard for harmless play metrics.
- **Phase social 2:** guild/clan, party quests, non-financial trades with server-verified item ledger and fraud controls.
- **Phase action multiplayer (conditional):** evaluate dedicated authoritative room server; do not push full movement/combat state through Supabase Presence.
- Presence data is ephemeral; do not persist online status as proof of real human identity or location.
- Anti-harassment, reporting, blocks and privacy defaults before public chat.

## 8 — Mobile/offline
Online-first at launch; static assets cached only after initial visit. PWA install later; offline works only for cached paths and preloaded chapters. IndexedDB storage with explicit migrations, corruption recovery and storage-quota warnings. Local offline scenes/choices do not certify online rewards; provide an outbox protocol with safe event IDs, sync status and conflict resolution. No offline multiplayer.

## 9 — Art & sound
No faces for primary persona references as author preference. Brutal type, ink/manga speed lines, manga/comic panels, aged photocopy textures and modest chromatic accents. UI controls accessible; support reduced motion/contrast; responsive to mobile. Radio and third-party track names are historical allusions, not permission to use copyright songs. Prefer custom/lawfully licensed loops and Howler/Web Audio.

## 10 — Game quality acceptance
- P0: story canon labels accurate, source and privacy gates implemented, no automatic private disclosure, account isolation, RLS verified.
- P1: story comprehension and meaningful choices tested with actual users, accessible keyboard/touch interaction, id/en parity.
- P1: idle arithmetic property tests, clock manipulation and duplicate settlement tests, reward transaction rollback.
- P2: graphics performance, memory load, offline PWA tests, realtime load/abuse tests.
- Never claim deploy, multiplayer, physics or payment complete based solely on documentation.
