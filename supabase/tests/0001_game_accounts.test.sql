-- Run with Supabase CLI: supabase test db
-- Uses pgTAP: checks roles/grants + RLS, not an end-to-end user-session test.
BEGIN;
SELECT plan(12);

SELECT ok(to_regclass('public.game_profiles') IS NOT NULL, 'profiles table exists');
SELECT ok(to_regclass('public.game_saves') IS NOT NULL, 'saves table exists');
SELECT ok((SELECT relrowsecurity FROM pg_class WHERE oid = 'public.game_profiles'::regclass), 'profiles RLS enabled');
SELECT ok((SELECT relrowsecurity FROM pg_class WHERE oid = 'public.game_saves'::regclass), 'saves RLS enabled');
SELECT ok(NOT has_table_privilege('anon','public.game_profiles','SELECT'), 'anon cannot read profiles');
SELECT ok(NOT has_table_privilege('anon','public.game_saves','SELECT'), 'anon cannot read saves');
SELECT ok(has_table_privilege('authenticated','public.game_profiles','SELECT'), 'signed-in user may read profile through RLS');
SELECT ok(has_table_privilege('authenticated','public.game_saves','SELECT'), 'signed-in user may read save through RLS');
SELECT ok(NOT has_table_privilege('authenticated','public.game_saves','UPDATE'), 'signed-in user cannot directly mutate save');
SELECT ok(NOT has_table_privilege('authenticated','public.game_saves','INSERT'), 'signed-in user cannot directly mint save');
SELECT ok(NOT has_function_privilege('anon','public.game_bootstrap()','EXECUTE'), 'anon cannot bootstrap account');
SELECT ok(has_function_privilege('authenticated','public.game_bootstrap()','EXECUTE'), 'signed-in user can bootstrap own account');

SELECT * FROM finish();
ROLLBACK;
