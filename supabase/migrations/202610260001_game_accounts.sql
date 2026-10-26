-- ROCKSOUL GAME M2 account foundation. Apply only to an owner-approved dedicated project.
-- There are NO balance/reward mutation endpoints in this migration.
BEGIN;
CREATE TABLE IF NOT EXISTS public.game_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'THE LISTENER'
    CHECK (char_length(display_name) BETWEEN 1 AND 40),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.game_saves (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  era_code text NOT NULL DEFAULT 'ERA_01'
    CHECK (era_code IN ('ERA_00', 'ERA_01', 'ERA_02', 'ERA_03', 'ERA_04', 'ERA_05', 'ERA_06', 'ERA_07')),
  revision integer NOT NULL DEFAULT 0 CHECK (revision >= 0),
  beacon_repaired boolean NOT NULL DEFAULT false,
  signal_charge bigint NOT NULL DEFAULT 0 CHECK (signal_charge >= 0),
  story_choice text CHECK (story_choice IS NULL OR story_choice IN ('unknown','verify')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.game_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_saves ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.game_profiles, public.game_saves FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.game_profiles, public.game_saves TO authenticated;
DROP POLICY IF EXISTS "players_read_own_profile" ON public.game_profiles;
CREATE POLICY "players_read_own_profile" ON public.game_profiles
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "players_read_own_save" ON public.game_saves;
CREATE POLICY "players_read_own_save" ON public.game_saves
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));

-- Avoid placing a SECURITY DEFINER bootstrap RPC in the public Data API.
-- Private Auth INSERT trigger creates only the account being signed up.
CREATE SCHEMA IF NOT EXISTS game_private;
REVOKE ALL ON SCHEMA game_private FROM PUBLIC, anon, authenticated;
CREATE OR REPLACE FUNCTION game_private.create_player_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $game$
BEGIN
  INSERT INTO public.game_profiles(user_id) VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  INSERT INTO public.game_saves(user_id) VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$game$;
REVOKE ALL ON FUNCTION game_private.create_player_on_signup()
  FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS rocksoul_create_player_on_signup ON auth.users;
CREATE TRIGGER rocksoul_create_player_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION game_private.create_player_on_signup();
-- No user backfill; only future signups create a starter save.
COMMIT;
