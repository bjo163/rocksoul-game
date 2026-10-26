# M0–M1 Verification Ledger
**Repository:** bjo163/rocksoul-game
**As of:** 2026-10-26
**Scope:** story and source foundations + interactive bilingual web demo, not production MMO.

| Gate | Evidence | Status |
|---|---|---|
| Existing repo / branch | GitHub `main`; work was committed sequentially without additional branch | VERIFIED |
| Source snapshots | [SOURCE_SNAPSHOTS](../research/SOURCE_SNAPSHOTS.md): XV, II, XIV, XII and additional repo pins | VERIFIED SNAPSHOT ONLY |
| Story completeness | [Master Bible](../story/MASTER_STORY_BIBLE.md), 99 heading crosswalk, 33 patch status, BATTERIES missing-book manifest | DOCUMENTED; original texts and approvals missing |
| Game web scaffold | Next.js 16.4.3 / React 19.3.1 JS ESM, Node 22, pages localized id/en | PUSHED |
| Browser demo | Source `src/components/StationDemo.jsx`; localStorage, one beacon, unknown/verify choice | CODE PRESENT, browser E2E pending |
| Automated validation | [GitHub Actions 40323160770](https://github.com/bjo163/rocksoul-game/actions/runs/40323160770), commit `973cd1429643c60a79921048d3c4ce6a488aaa65` | **PASS** install, structure/test/build |
| Vercel deployment | Git-project creation call returned `403 Forbidden` | **BLOCKED** – no verified URL |
| Supabase Auth/DB | Not provisioned and deliberately not pretended active | NOT STARTED (M2) |
| Server economy, true online saves, Phaser | Later milestones | NOT STARTED |

## Build/test evidence limitations
The GitHub CI runner executed real `npm install`, Node tests and `next build`. No Playwright browser E2E, Lighthouse, manual screen reader audit, infrastructure preview smoke or release-rights approval was performed. Public document pushes and green CI do not make new GAME_CANON_CANDIDATE story content approved original lore.

## Next validation
Verify the latest HEAD through GitHub Actions before declaring build green; after project import, test the actual deployment URL and capture screenshots/video, browser console/errors and responsive regressions at the same SHA.
