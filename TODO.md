# ROCKSOUL GAME — MASTER TODO / EXECUTION LEDGER

**Status:** M0/M1 FOUNDATION UNDER EXECUTION · Plan authored 2026-10-26 · **Unchecked = not verified complete**. This plan is a target, not a declaration that software or services exist. Current game repository is `bjo163/rocksoul-game` (`main` only); XV and historical repos remain read-only sources.

## Priority & ownership
- **P0**: must complete for the first online playable proof; **P1**: offline/RPG growth; **P2**: optional social/expansion/release governance.
- No duplicate branch/repo; do not copy XV Hub or make religious source the fictional game database. READ: [Story](docs/story/MASTER_STORY_BIBLE.md), [Canon](docs/story/CANON_POLICY.md), [Architecture](docs/architecture/TECHNICAL_BLUEPRINT.md), [Decisions](docs/decisions/README.md).
- Every task has a stable ID and concrete result; this is a sequential starting backlog, not an accepted exact cost/time estimate.
- **Task status rule:** `[x]` only after code/content present at specified HEAD, test/review evidence recorded and regressions checked.

## Milestone dependency graph
`M0 → M1 → M2 → M3 → M4 (FIRST ONLINE PLAYABLE) → M5 (OFFLINE) + M6 (PHASER) → M7 (SOCIAL)`; `M8` content expansion after verified M4 and source clearance; `M9` starts rights reviews early and enforces release gate.
Actual dependency changes require updating this register; no claiming future work shipped.


## M0 — SOURCE / STORY FREEZE (P0)

**Current gate:** 8/9 completed documentation tasks; M0-09 requires a full publication-rights/private-source/likeness ledger and cannot be auto-approved. More material may be recovered without overwriting any prior originals.


- [x] **M0-01** Verify main HEAD and document baseline SHA
  - **Acceptance:** Verified remote head, source/release validation in docs/operations/M1_VALIDATION.md; no new branch
  - **Likely file scope:** `README.md`
- [x] **M0-02** Confirm README, canon constitution and story bible links
  - **Acceptance:** README/story/canon/internal doc links resolve in the verified Git tree; incomplete originals and Vercel blocker explicitly labeled
  - **Likely file scope:** `README.md;docs/story/*`
- [x] **M0-03** Pin the source SHA for original MoonWitness II blueprint
  - **Acceptance:** II pinned SHA + §08/§06/source file in SOURCE_SNAPSHOTS.md; no historical source changed
  - **Likely file scope:** `docs/research/SOURCE_ATLAS.md`
- [x] **M0-04** Pin XV narrative, XIV V10 and XII Patch registry source revisions
  - **Acceptance:** XV/XIV/XII pinned SHA/path + retrieval date, rights limitations in SOURCE_SNAPSHOTS.md
  - **Likely file scope:** `docs/research/SOURCE_ATLAS.md`
- [x] **M0-05** Crosswalk 99 chapter headings to original-source availability
  - **Acceptance:** 99 crosswalk rows in docs/research/ARCHIVE_CROSSWALK_99.md; each original remains NEEDS_ORIGINAL until source rights/revision approval
  - **Likely file scope:** `docs/research/ARCHIVE_COVERAGE_99.md`
- [x] **M0-06** Resolve 33 World Patch status inheritance
  - **Acceptance:** Keep #014 unresolved and original status/count per row
  - **Likely file scope:** `docs/research/WORLD_PATCHES_33.md`
- [x] **M0-07** Create detailed THE BATTERIES four-book recovery manifest
  - **Acceptance:** Four slots source status and missing manuscript explicitly stated
  - **Likely file scope:** `docs/research/`
- [x] **M0-08** Prepare editor review of THE LISTENER and PERFECT RECORD
  - **Acceptance:** Candidate IDs and disagreement outcomes documented; no auto-approval
  - **Likely file scope:** `docs/story/`
- [ ] **M0-09** Review private memories, media/music and real-person aliases
  - **Acceptance:** No unauthorized text/lyrics/images in public Git; rights ledger
  - **Likely file scope:** `docs/story/CANON_POLICY.md`


## M1 — WEB FOUNDATION / VERCEL PREVIEW (P0)

**Current gate:** 5/9 tasks met by verified source and [CI run 40323816638](https://github.com/bjo163/rocksoul-game/actions/runs/40323816638). Responsive/reduced-motion styles are implemented but browser-device E2E is not yet verified (M1-02). CI exists but a committed dependency lockfile is missing (M1-07). Owner has since imported the Vercel project: provider lists **READY** production deployment from `main`; M1-08 remains open until public route/browser smoke is verified. Security headers and loading/error UI exist; full CSP/negative-browser checks (M1-09) remain open.


- [x] **M1-01** Initialize Next.js JavaScript ESM and minimal package scripts
  - **Acceptance:** Node 22 npm install + structure/JS tests + Next.js production build PASS at a cited CI run (npm chosen for standalone preview; no lockfile yet)
  - **Likely file scope:** `package.json;src/`
- [ ] **M1-02** Create layout tokens and responsive root shell
  - **Acceptance:** Mobile+desktop, keyboard and reduced motion work
  - **Likely file scope:** `src/app/;src/styles/`
- [x] **M1-03** Implement Indonesian/English locale switcher and dictionaries
  - **Acceptance:** /id and /en stable pages; no translated source claims
  - **Likely file scope:** `src/`
- [x] **M1-04** Implement landing / story premise with proposed-canon badges
  - **Acceptance:** No inaccurate 'live MMO' or shipped gameplay status
  - **Likely file scope:** `src/app/`
- [x] **M1-05** Build game scene interface placeholder with no bogus 3D claims
  - **Acceptance:** Story intro, enter-station link, accessible fallback
  - **Likely file scope:** `src/`
- [x] **M1-06** Add unit-test runner and smoke test for navigation/story labels
  - **Acceptance:** Tests pass locally; CI job run verified at commit
  - **Likely file scope:** `tests/;.github/workflows/`
- [ ] **M1-07** Add GitHub Actions install/lint/test/build checks
  - **Acceptance:** Failures block success claims; lockfile committed
  - **Likely file scope:** `.github/workflows/`
- [ ] **M1-08** Prepare Vercel preview configuration/README steps
  - **Acceptance:** Preview URL verified before declaring deployed; no secrets committed
  - **Likely file scope:** `README.md;docs/architecture/`
- [ ] **M1-09** Add error/empty/load states and basic CSP/security headers
  - **Acceptance:** Negative cases tested and no secrets in public build
  - **Likely file scope:** `src/`


## M2 — ACCOUNT & SECURE SAVE / SUPABASE (P0)

**Integration status:** `main` commit `648626bd` passed [CI](https://github.com/bjo163/rocksoul-game/actions/runs/40325699040), and the corresponding Vercel production deployment was reported **READY**. Account onboarding requires owner's Supabase project and executable RLS verification; provider-ready does not equal live database readiness.

**Execution note (26 Oct 2026):** `/id/account` and `/en/account`, optional browser-only email login, guarded starter-profile/save migration and pgTAP assertions have been **authored in this repo**. These are **not yet connected to a Supabase project**. Actual migration execution, JWT/RLS negative tests, signup, save and E2E acceptance are open. See [Supabase M2 setup](docs/architecture/SUPABASE_M2_SETUP.md).


- [ ] **M2-01** Document Supabase ownership, project connection and credentials
  - **Acceptance:** Owner configuration not guessed; env example only
  - **Likely file scope:** `docs/architecture/`
- [ ] **M2-02** Create versioned SQL schema for profiles/player saves
  - **Acceptance:** Migrations repeatable; no broad public read/write
  - **Likely file scope:** `supabase/migrations/`
- [ ] **M2-03** Enable RLS and deny-by-default policies
  - **Acceptance:** Cross-account reads/writes denied in automated tests
  - **Likely file scope:** `supabase/;tests/`
- [ ] **M2-04** Wire Supabase Auth login/logout/session expiry
  - **Acceptance:** Anonymous/expired/invalid token cases visibly handled
  - **Likely file scope:** `src/`
- [ ] **M2-05** Implement save creation and optimistic revision update
  - **Acceptance:** One user ID/one save; concurrency conflict tested
  - **Likely file scope:** `src/;supabase/`
- [ ] **M2-06** Add story progress record and content version gate
  - **Acceptance:** Quests store version; rollback/replay defined
  - **Likely file scope:** `supabase/;src/`
- [ ] **M2-07** Add audit events and minimal restore/runbook
  - **Acceptance:** Restore rehearsal logged; credentials stay out of repo
  - **Likely file scope:** `docs/;supabase/`
- [ ] **M2-08** Create auth/data isolation E2E suite
  - **Acceptance:** Two users plus anonymous cases pass against test environment
  - **Likely file scope:** `tests/`


## M3 — IDLE RESTORATION / FAIR ECONOMY (P0)

- [ ] **M3-01** Define Signal Charge, Repair Parts and generator balance sheet
  - **Acceptance:** Rates, caps, sinks, units and game-only nature documented
  - **Likely file scope:** `docs/game/`
- [ ] **M3-02** Implement deterministic pure JS elapsed-time estimator
  - **Acceptance:** Unit/property tests include zero, negative and capped delta
  - **Likely file scope:** `src/game/rules/;tests/`
- [ ] **M3-03** Create transaction-safe server settlement
  - **Acceptance:** Server time authoritative and atomic updates
  - **Likely file scope:** `src/;supabase/`
- [ ] **M3-04** Implement idempotency key and ledger uniqueness
  - **Acceptance:** Retry/two-tabs cannot double reward
  - **Likely file scope:** `supabase/;tests/`
- [ ] **M3-05** Implement the first generator and upgrade UI
  - **Acceptance:** Useful accessible controls, same result on reload
  - **Likely file scope:** `src/`
- [ ] **M3-06** Make settlement/error/offline-preview status explicit
  - **Acceptance:** UI never claims tentative offline reward final
  - **Likely file scope:** `src/`
- [ ] **M3-07** Balance economy with time-skew and abuse tests
  - **Acceptance:** No negative resources/overflow/rapid duplicate claims
  - **Likely file scope:** `tests/`


## M4 — PLAYABLE FIRST SIGNAL / STORY (P0)

- [ ] **M4-01** Freeze proposed Episode 00/01 and classify every authored line
  - **Acceptance:** Source quote vs invented dialogue clearly marked
  - **Likely file scope:** `docs/story/`
- [ ] **M4-02** Implement battery NPC dialogues with choices
  - **Acceptance:** Can progress without private identity disclosure
  - **Likely file scope:** `src/game/content/;src/`
- [ ] **M4-03** Create single Signal Station room/map
  - **Acceptance:** One exit, beacon and workshop; mobile supported
  - **Likely file scope:** `src/game/`
- [ ] **M4-04** Add marker UNKNOWN/VERIFY_FIRST choices
  - **Acceptance:** Distinct narrative results with no false evidence promotion
  - **Likely file scope:** `src/game/content/`
- [ ] **M4-05** Save quest objective, completion and alternate branch
  - **Acceptance:** Server save reload reproduces state
  - **Likely file scope:** `src/;supabase/`
- [ ] **M4-06** Verify first playable vertical slice end-to-end
  - **Acceptance:** New user→quest→restore→reload passes
  - **Likely file scope:** `tests/e2e/`
- [ ] **M4-07** Add caption/transcript alternatives to sound cues
  - **Acceptance:** Audio optional for complete playability
  - **Likely file scope:** `src/`


## M5 — OFFLINE PLAY / PWA (P1)

- [ ] **M5-01** Define offline allowed/prohibited action matrix
  - **Acceptance:** Client cannot claim trade, currencies or multiplayer offline
  - **Likely file scope:** `docs/architecture/`
- [ ] **M5-02** Implement PWA manifest and safe service worker caching
  - **Acceptance:** Install/update offline assets work after online preload
  - **Likely file scope:** `public/;src/`
- [ ] **M5-03** Add versioned IndexedDB local chapter store
  - **Acceptance:** Migration and quota error paths covered
  - **Likely file scope:** `src/offline/`
- [ ] **M5-04** Queue local story-only actions with unique IDs
  - **Acceptance:** No duplicate or private content leak during reconnect
  - **Likely file scope:** `src/offline/`
- [ ] **M5-05** Implement authoritative reconciliation endpoint
  - **Acceptance:** Server rejects forged reward/event; conflict explained in UI
  - **Likely file scope:** `src/;supabase/`
- [ ] **M5-06** Test stale cache/app update, two tabs and clock rollback
  - **Acceptance:** No lost save and documented recovery behavior
  - **Likely file scope:** `tests/`


## M6 — PHASER RPG EXPLORATION (P1)

- [ ] **M6-01** Integrate browser-only Phaser with route code-splitting
  - **Acceptance:** SSR safe; initial landing JS cost measured
  - **Likely file scope:** `src/game/`
- [ ] **M6-02** Implement 2D movement and collision in one region
  - **Acceptance:** Keyboard+touch works and no movement privilege issue
  - **Likely file scope:** `src/game/`
- [ ] **M6-03** Import safe licensed sprite atlas and tilemap
  - **Acceptance:** Each asset has owner/license/provenance
  - **Likely file scope:** `public/;docs/`
- [ ] **M6-04** Add NPC talk/interaction triggers
  - **Acceptance:** No broken quest transition after map movement
  - **Likely file scope:** `src/game/`
- [ ] **M6-05** Add scene/quest bridge to pure JS save domain
  - **Acceptance:** UI and canvas cannot double-write rewards
  - **Likely file scope:** `src/game/;src/`
- [ ] **M6-06** Measure mobile FPS/perf and fallback for low-end devices
  - **Acceptance:** Budget/report recorded, accessible no-canvas flow
  - **Likely file scope:** `tests/;docs/`


## M7 — SOCIAL MULTIPLAYER / SAFETY (P2)

- [ ] **M7-01** Specify opt-in presence, anonymity and privacy defaults
  - **Acceptance:** Consent, scope, expiry and block semantics tested
  - **Likely file scope:** `docs/game/;docs/architecture/`
- [ ] **M7-02** Add authenticated lobby with RLS-safe presence
  - **Acceptance:** Other users see display names only, no private saves
  - **Likely file scope:** `src/`
- [ ] **M7-03** Add moderated chat with report/block tools
  - **Acceptance:** Rate limiting, harassment and removal paths tested
  - **Likely file scope:** `src/;supabase/`
- [ ] **M7-04** Create simple co-op restoration room
  - **Acceptance:** Server validates group contributions, reconnects
  - **Likely file scope:** `src/`
- [ ] **M7-05** Add non-sensitive leaderboard and abuse protections
  - **Acceptance:** No spirituality/faith or personal ranking
  - **Likely file scope:** `src/;supabase/`
- [ ] **M7-06** Decide future authority for real-time action only after load test
  - **Acceptance:** Recorded evidence and conditional ADR; no fake MMO
  - **Likely file scope:** `docs/decisions/`


## M8 — STORY EXPANSION / AETHERION (P2)

- [ ] **M8-01** Expand Era 02 Tick-Tock/MoonRidley puzzles with source rights
  - **Acceptance:** Original vs new text classified; morning correction respected
  - **Likely file scope:** `docs/story/;src/`
- [ ] **M8-02** Expand Runaways and Blue Witch/DOGS routes
  - **Acceptance:** Alias scopes and changing perspectives shown
  - **Likely file scope:** `docs/story/;src/`
- [ ] **M8-03** Build BABY-DOLL/Chaos Medic episode with open motivations
  - **Acceptance:** No invented motive passed off as original author canon
  - **Likely file scope:** `docs/story/;src/`
- [ ] **M8-04** Build two distinct ZILL and HAVEN mission chains
  - **Acceptance:** No merge of Tasawuf/Shadow; community/consent tests
  - **Likely file scope:** `docs/story/;src/`
- [ ] **M8-05** Propose AETHERION 10-realm/100-level source recovery
  - **Acceptance:** Missing historical names explicitly UNKNOWN
  - **Likely file scope:** `docs/world/`
- [ ] **M8-06** Adapt approved 33 themes into separately-IDed game quests
  - **Acceptance:** #014 remains conflicted; no divine approval label
  - **Likely file scope:** `docs/research/;docs/story/`
- [ ] **M8-07** Add branching finale and consequence map
  - **Acceptance:** Unknown/private outcomes valid; no forced universal answer
  - **Likely file scope:** `docs/story/;src/`


## M9 — CONTENT RIGHTS / RELEASE / OPERATIONS (P2)

- [ ] **M9-01** Choose explicit code/art/story/music license policy
  - **Acceptance:** Human-approved rights matrix published; no implied licenses
  - **Likely file scope:** `LICENSE*;docs/`
- [ ] **M9-02** Create signed/publication-reviewed art and audio manifest
  - **Acceptance:** Each binary has rights owner, license and attribution
  - **Likely file scope:** `public/;docs/`
- [ ] **M9-03** Publish privacy, community/reporting and safety terms
  - **Acceptance:** Legal jurisdiction and data retention reviewed
  - **Likely file scope:** `docs/`
- [ ] **M9-04** Add backup/restore and incident rollback rehearsal
  - **Acceptance:** Recorded steps with tested data recovery
  - **Likely file scope:** `docs/`
- [ ] **M9-05** Build deployment health smoke tests and screenshots
  - **Acceptance:** Environment, HEAD SHA and actual release URL verified
  - **Likely file scope:** `tests/;docs/`
- [ ] **M9-06** Publish changelog/version and release evidence gate
  - **Acceptance:** Tag/release only after passing explicit checks
  - **Likely file scope:** `CHANGELOG.md;docs/`
- [ ] **M9-07** Carry forward XV source references without duplicating owners
  - **Acceptance:** Source SHA/rights crosswalk updated and rechecked
  - **Likely file scope:** `docs/research/`

## First-playable Definition of Done

1. `M0` narrative source integrity and rights gates respected, with candidate content never upgraded to author-approved originals by AI.
2. `M1–M4` exist in running game code: a real tested Vercel preview, valid secure Supabase save, one beacon generator, one NPC and one story quest that survives reload.
3. Negative tests: anonymous and cross-account save access denied, invalid/conflicting rewards rejected, two-tab double reward prevented.
4. Failure states, mobile, keyboard, language and source classification checked. No copyrighted commercial music or private diaries committed.
5. Exact Git commit SHA, test output, production/preview URL and known limitations recorded. **Documentation alone never satisfies runtime Definition of Done.**

## Per-task handoff contract

For a coding assistant: inspect latest HEAD, find first uncompleted unblocked task, implement smallest safe scope, run meaningful tests, update this exact TODO task, commit to existing `main` (never force), verify remote SHA, report evidence and continue to next ready task. Inability to run test or absent external credentials is **BLOCKED**, not PASS. Do not request routine owner approvals when autonomous coding suffices; however never fabricate owner sign-off for canon, third-party license, privacy publication, production credentials or financial transactions.

## Future items not automatically approved

Direct integration with XV ARSY/100CENTER/DOCK, reuse of Moonframe or Rocksoul Rust runtime, crypto tokenization, public user-generated-content marketplace, distributed realtime MMO, monetization/payments, third-party radio playback, real-person/prophet playable representations, real sacred site combat maps, automated authorship of original missing manuscripts, and 10 AETHERION realms naming. These require separate scoped decisions/evidence.
