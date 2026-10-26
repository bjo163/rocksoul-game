-- ROCKSOUL M2/M3: server-authoritative chapter 00, no tradable goods or real money.
-- Browser users may SELECT their own game_saves only; all mutations go through
-- an authenticated Edge function using this service-role-only invoker RPC.
BEGIN;

ALTER TABLE public.game_saves
  ADD COLUMN IF NOT EXISTS fragment_inspected boolean NOT NULL DEFAULT false;
ALTER TABLE public.game_saves
  ADD COLUMN IF NOT EXISTS last_charge_at timestamptz;

CREATE TABLE IF NOT EXISTS game_private.game_action_receipts (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('charge','repair','inspect','unknown','verify')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id,request_id)
);
REVOKE ALL ON TABLE game_private.game_action_receipts FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON game_private.game_action_receipts TO service_role;
GRANT SELECT, UPDATE ON TABLE public.game_saves TO service_role;

CREATE OR REPLACE FUNCTION public.rocksoul_game_action(
  p_user_id uuid, p_request_id uuid, p_action text
) RETURNS jsonb
LANGUAGE plpgsql VOLATILE SECURITY INVOKER
SET search_path = ''
AS $fn$
DECLARE
  v_charge bigint;
  v_repaired boolean;
  v_inspected boolean;
  v_choice text;
  v_last_charge timestamptz;
  v_revision integer;
  v_inserted integer;
  v_state jsonb;
BEGIN
  IF p_user_id IS NULL OR p_request_id IS NULL
     OR p_action NOT IN ('charge','repair','inspect','unknown','verify')
  THEN
    RAISE EXCEPTION 'Invalid game action' USING ERRCODE = '22023';
  END IF;

  -- Lock first: two tabs and repeated requests must serialize per user.
  SELECT signal_charge, beacon_repaired, fragment_inspected,
         story_choice, last_charge_at, revision
    INTO v_charge, v_repaired, v_inspected, v_choice, v_last_charge, v_revision
    FROM public.game_saves WHERE user_id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Game save not found' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO game_private.game_action_receipts(user_id,request_id,action)
    VALUES(p_user_id,p_request_id,p_action)
    ON CONFLICT DO NOTHING;
  GET DIAGNOSTICS v_inserted = ROW_COUNT;

  IF v_inserted = 1 THEN
    IF p_action = 'charge' THEN
      IF v_charge >= 12 THEN
        RAISE EXCEPTION 'Charge is full' USING ERRCODE = '22023';
      END IF;
      IF v_last_charge IS NOT NULL AND v_last_charge > now() - interval '10 seconds' THEN
        RAISE EXCEPTION 'Recharge cooldown' USING ERRCODE = '22023';
      END IF;
      UPDATE public.game_saves
         SET signal_charge=signal_charge+1,
             last_charge_at=now(),revision=revision+1,updated_at=now()
         WHERE user_id=p_user_id;
    ELSIF p_action = 'repair' THEN
      IF v_repaired OR v_charge < 3 THEN
        RAISE EXCEPTION 'Repair requires three charges' USING ERRCODE = '22023';
      END IF;
      UPDATE public.game_saves
         SET signal_charge=signal_charge-3,
             beacon_repaired=true,revision=revision+1,updated_at=now()
         WHERE user_id=p_user_id;
    ELSIF p_action = 'inspect' THEN
      IF NOT v_repaired OR v_inspected THEN
        RAISE EXCEPTION 'Repair the beacon before inspecting' USING ERRCODE = '22023';
      END IF;
      UPDATE public.game_saves
         SET fragment_inspected=true,revision=revision+1,updated_at=now()
         WHERE user_id=p_user_id;
    ELSE
      IF NOT v_inspected OR v_choice IS NOT NULL THEN
        RAISE EXCEPTION 'The fragment must be inspected; a choice is final' USING ERRCODE = '22023';
      END IF;
      UPDATE public.game_saves
         SET story_choice=p_action,revision=revision+1,updated_at=now()
         WHERE user_id=p_user_id;
    END IF;
  END IF;

  SELECT jsonb_build_object(
    'charge',signal_charge,'repaired',beacon_repaired,
    'inspected',fragment_inspected,'decision',story_choice,
    'revision',revision,
    'nextChargeAt',CASE WHEN last_charge_at IS NULL THEN NULL
                       ELSE to_char(last_charge_at + interval '10 seconds',
                                    'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') END
  ) INTO v_state FROM public.game_saves WHERE user_id=p_user_id;

  RETURN jsonb_build_object('applied',v_inserted=1,'state',v_state);
END;
$fn$;

REVOKE ALL ON FUNCTION public.rocksoul_game_action(uuid,uuid,text)
  FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.rocksoul_game_action(uuid,uuid,text) TO service_role;
COMMIT;
