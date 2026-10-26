import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const sql = fs.readFileSync("supabase/migrations/202610260001_game_accounts.sql","utf8");
const pgTap = fs.readFileSync("supabase/tests/0001_game_accounts.test.sql","utf8");
test("both personal tables have RLS and only self-read policies", () => {
  for (const tbl of ["game_profiles","game_saves"]) {
    assert.match(sql, new RegExp("ALTER TABLE public\\."+tbl+" ENABLE ROW LEVEL SECURITY;"));
    assert.match(sql, new RegExp("REVOKE ALL ON TABLE public\\.game_profiles, public\\.game_saves FROM PUBLIC, anon, authenticated"));
  }
  assert.match(sql,/USING \(user_id = \(SELECT auth\.uid\(\)\)\)/);
  assert.doesNotMatch(sql,/GRANT\s+(INSERT|UPDATE|DELETE|ALL)\s+ON TABLE.*\sTO authenticated/i);
});
test("narrow bootstrap validates identity and denies anonymous access", () => {
  assert.match(sql,/SECURITY DEFINER/);
  assert.match(sql,/SET search_path = ''/);
  assert.match(sql,/player_id uuid := auth\.uid\(\)/);
  assert.match(sql,/IF player_id IS NULL/);
  assert.match(sql,/REVOKE ALL ON FUNCTION public\.game_bootstrap\(\) FROM PUBLIC, anon, authenticated/);
  assert.match(sql,/GRANT EXECUTE ON FUNCTION public\.game_bootstrap\(\) TO authenticated/);
  assert.match(pgTap,/SELECT plan\(12\)/);
});
test("browser connection uses public variables only", () => {
  const auth=fs.readFileSync("src/lib/supabase-browser.mjs","utf8");
  assert.match(auth,/NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(auth,/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.doesNotMatch(auth,/SERVICE_ROLE|SUPABASE_SECRET|DATABASE_URL/i);
});
