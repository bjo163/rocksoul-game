-- Run in a disposable test DB with pgTAP; this is not a live JWT isolation test.
BEGIN;
SELECT plan(14);
SELECT ok(to_regclass('public.game_profiles') IS NOT NULL, 'profile table');
SELECT ok(to_regclass('public.game_saves') IS NOT NULL, 'save table');
SELECT ok((SELECT relrowsecurity FROM pg_class WHERE oid='public.game_profiles'::regclass), 'profile RLS');
SELECT ok((SELECT relrowsecurity FROM pg_class WHERE oid='public.game_saves'::regclass), 'save RLS');
SELECT ok(NOT has_table_privilege('anon','public.game_profiles','SELECT'), 'anon blocked profiles');
SELECT ok(NOT has_table_privilege('anon','public.game_saves','SELECT'), 'anon blocked saves');
SELECT ok(has_table_privilege('authenticated','public.game_profiles','SELECT'), 'profile RLS read grant');
SELECT ok(has_table_privilege('authenticated','public.game_saves','SELECT'), 'save RLS read grant');
SELECT ok(NOT has_table_privilege('authenticated','public.game_saves','INSERT'), 'no browser mint');
SELECT ok(NOT has_table_privilege('authenticated','public.game_saves','UPDATE'), 'no browser updates');
SELECT ok(NOT has_schema_privilege('authenticated','game_private','USAGE'), 'private schema inaccessible');
SELECT ok(NOT has_function_privilege('authenticated','game_private.create_player_on_signup()','EXECUTE'), 'private function inaccessible');
SELECT ok(to_regprocedure('public.game_bootstrap()') IS NULL, 'no public privileged bootstrap');
SELECT ok(EXISTS(SELECT 1 FROM pg_trigger WHERE tgname='rocksoul_create_player_on_signup' AND tgrelid='auth.users'::regclass AND NOT tgisinternal),'signup trigger');
SELECT * FROM finish();
ROLLBACK;
