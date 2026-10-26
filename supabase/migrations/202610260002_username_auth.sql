-- ROCKSOUL username/password alpha: private username->random Auth email mapping.
-- Password hashing and sessions remain entirely within Supabase Auth.
-- This migration is additive to game_accounts_foundation, not a replacement.
BEGIN;
CREATE TABLE IF NOT EXISTS game_private.game_login_emails (
  username text PRIMARY KEY CHECK (username ~ '^[a-z][a-z0-9_]{2,23}$'),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  login_email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS game_private.game_auth_rate_limits (
  bucket text PRIMARY KEY CHECK (length(bucket) BETWEEN 4 AND 128),
  window_start timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0)
);
REVOKE ALL ON TABLE game_private.game_login_emails, game_private.game_auth_rate_limits FROM PUBLIC,anon,authenticated;
GRANT USAGE ON SCHEMA game_private TO service_role;
GRANT SELECT,INSERT ON game_private.game_login_emails TO service_role;
GRANT SELECT,INSERT,UPDATE ON game_private.game_auth_rate_limits TO service_role;

CREATE OR REPLACE FUNCTION public.rocksoul_auth_email(p_username text)
RETURNS text LANGUAGE sql STABLE SECURITY INVOKER SET search_path = ''
AS $fn$
  SELECT login_email FROM game_private.game_login_emails WHERE username = p_username;
$fn$;
REVOKE ALL ON FUNCTION public.rocksoul_auth_email(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.rocksoul_auth_email(text) TO service_role;

CREATE OR REPLACE FUNCTION public.rocksoul_auth_throttle(
  p_bucket text, p_max_attempts integer, p_window_seconds integer
)
RETURNS boolean LANGUAGE plpgsql VOLATILE SECURITY INVOKER SET search_path = ''
AS $fn$
DECLARE v_attempts integer;
BEGIN
  IF length(p_bucket) NOT BETWEEN 4 AND 128
     OR p_max_attempts NOT BETWEEN 1 AND 2000
     OR p_window_seconds NOT BETWEEN 30 AND 86400
  THEN
     RAISE EXCEPTION 'Invalid throttle inputs' USING ERRCODE = '22023';
  END IF;
  INSERT INTO game_private.game_auth_rate_limits AS r(bucket,window_start,attempts)
    VALUES (p_bucket,now(),1)
  ON CONFLICT(bucket) DO UPDATE
    SET window_start = CASE WHEN r.window_start < now() - make_interval(secs=>p_window_seconds)
                       THEN now() ELSE r.window_start END,
        attempts = CASE WHEN r.window_start < now() - make_interval(secs=>p_window_seconds)
                       THEN 1 ELSE r.attempts+1 END
  RETURNING attempts INTO v_attempts;
  RETURN v_attempts <= p_max_attempts;
END;
$fn$;
REVOKE ALL ON FUNCTION public.rocksoul_auth_throttle(text,integer,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.rocksoul_auth_throttle(text,integer,integer) TO service_role;

-- Display-name only; never use user_metadata or username for RLS authorization.
-- The game always uses auth.uid() and auth.users primary keys for ownership.
CREATE OR REPLACE FUNCTION game_private.create_player_on_signup()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''
AS $fn$
DECLARE nickname text;
BEGIN
  nickname := NEW.raw_user_meta_data ->> 'game_username';
  IF nickname IS NULL OR nickname !~ '^[a-z][a-z0-9_]{2,23}$' THEN
    nickname := 'THE LISTENER';
  END IF;
  INSERT INTO public.game_profiles(user_id,display_name)
  VALUES (NEW.id,nickname)
  ON CONFLICT(user_id) DO NOTHING;
  INSERT INTO public.game_saves(user_id)
  VALUES (NEW.id)
  ON CONFLICT(user_id) DO NOTHING;
  RETURN NEW;
END;
$fn$;
REVOKE ALL ON FUNCTION game_private.create_player_on_signup()
  FROM PUBLIC,anon,authenticated;
COMMIT;
