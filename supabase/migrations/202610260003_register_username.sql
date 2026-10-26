BEGIN;
CREATE OR REPLACE FUNCTION public.rocksoul_auth_register(p_username text,p_user_id uuid,p_email text)
RETURNS boolean LANGUAGE plpgsql SECURITY INVOKER SET search_path=''
AS $fn$
BEGIN
  IF p_username !~ '^[a-z][a-z0-9_]{2,23}$'
    OR p_user_id IS NULL OR length(p_email) > 254
  THEN RETURN false; END IF;
  INSERT INTO game_private.game_login_emails(username,user_id,login_email)
    VALUES(p_username,p_user_id,p_email);
  RETURN true;
EXCEPTION WHEN unique_violation THEN RETURN false;
END;
$fn$;
REVOKE ALL ON FUNCTION public.rocksoul_auth_register(text,uuid,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.rocksoul_auth_register(text,uuid,text) TO service_role;
COMMIT;