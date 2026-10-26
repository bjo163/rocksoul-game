import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const sql = fs.readFileSync("supabase/migrations/202610260001_game_accounts.sql","utf8");
const pgTap = fs.readFileSync("supabase/tests/0001_game_accounts.test.sql","utf8");
const account = fs.readFileSync("src/components/GameAccount.jsx","utf8");
test("game tables have self-only select and no browser write grants", () => {
  for (const name of ["game_profiles","game_saves"]) {
    assert.ok(sql.includes("ALTER TABLE public." + name + " ENABLE ROW LEVEL SECURITY"));
  }
  assert.match(sql,/REVOKE ALL ON TABLE public\.game_profiles, public\.game_saves FROM PUBLIC, anon, authenticated/);
  assert.match(sql,/GRANT SELECT ON TABLE public\.game_profiles, public\.game_saves TO authenticated/);
  assert.match(sql,/USING \(user_id = \(SELECT auth\.uid\(\)\)\)/);
  assert.doesNotMatch(sql,/GRANT\s+(INSERT|UPDATE|DELETE|ALL)\s+ON TABLE.*\sTO authenticated/i);
});
test("bootstrap is a private signup trigger, not a public privileged RPC", () => {
  assert.match(sql,/CREATE SCHEMA IF NOT EXISTS game_private/);
  assert.match(sql,/SECURITY DEFINER/);
  assert.match(sql,/SET search_path = ''/);
  assert.match(sql,/REVOKE ALL ON SCHEMA game_private FROM PUBLIC, anon, authenticated/);
  assert.match(sql,/REVOKE ALL ON FUNCTION game_private\.create_player_on_signup\(\)/);
  assert.match(sql,/AFTER INSERT ON auth\.users/);
  assert.match(sql,/CREATE TRIGGER rocksoul_create_player_on_signup/);
  assert.doesNotMatch(sql,/CREATE OR REPLACE FUNCTION public\.game_bootstrap/);
  assert.doesNotMatch(account,/\.rpc\(["']game_bootstrap/);
  assert.match(pgTap,/SELECT plan\(14\)/);
});
test("browser uses only public config keys", () => {
  const auth=fs.readFileSync("src/lib/supabase-browser.mjs","utf8");
  assert.match(auth,/NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(auth,/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(auth,/SERVICE_ROLE|SUPABASE_SECRET|DATABASE_URL/i);
});
