-- ROCKSOUL GAME M2 FOUNDATION (draft until applied on an owner-controlled project)
-- Only account identity & starter SAVE; DOES NOT implement server rewards.
-- The migration is designed to be idempotent in a fresh Supabase project.
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
    CHECK (era_code IN ('ERA_00','ERA_01','ERA_02','ERA_03','ERA_04','ERA_05','ERA_06','ERA_07')),
  revision integer NOT NULL DEFAULT 0 CHECK (revision >= 0),
  beacon_repaired boolean NOT NULL DEFAULT false,
  signal_charge bigint NOT NULL DEFAULT 0 CHECK (signal_charge BETWEEN 0 AND 9223372036854775807),
  story_choice text CHECK (story_choice IS NULL OR story_choice IN ('unknown','verify')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.game_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_saves ENABLE ROW LEVEL SECURITY;
-- Make existing grants explicit. A row policy alone does not revoke grants.
REVOKE ALL ON TABLE public.game_profiles, public.game_saves FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.game_profiles, public.game_saves TO authenticated;

DROP POLICY IF EXISTS "players_read_own_profile" ON public.game_profiles;
CREATE POLICY "players_read_own_profile"
  ON public.game_profiles FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "players_read_own_save" ON public.game_saves;
CREATE POLICY "players_read_own_save"
  ON public.game_saves FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- No INSERT/UPDATE/DELETE grants or RLS policies for browser users.
-- Only this narrow RPC may create a starter profile+save.
CREATE OR REPLACE FUNCTION public.game_bootstrap()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  player_id uuid := auth.uid();
BEGIN
  IF player_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.game_profiles(user_id)
  VALUES (player_id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.game_saves(user_id)
  VALUES (player_id)
  ON CONFLICT (user_id) DO NOTHING;
END;
$function$;

REVOKE ALL ON FUNCTION public.game_bootstrap() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.game_bootstrap() TO authenticated;

COMMIT;
