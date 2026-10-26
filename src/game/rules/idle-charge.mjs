/** Pure deterministic preview rule. This does not award online or tradable resources. */
export const CHARGE_CAP = 12;
export const TICK_SECONDS = 120;
export const MAX_IDLE_SECONDS = 8 * 3600;
export function estimateIdleCharge({charge=0,elapsedSeconds=0}={}){
 const current=Number.isInteger(charge)?Math.min(CHARGE_CAP,Math.max(0,charge)):0;
 const seconds=Number.isFinite(elapsedSeconds)?Math.min(MAX_IDLE_SECONDS,Math.max(0,elapsedSeconds)):0;
 const gained=Math.min(CHARGE_CAP-current,Math.floor(seconds/TICK_SECONDS));
 return Object.freeze({charge:current+gained,gained,consumedSeconds:gained*TICK_SECONDS,capped:elapsedSeconds>MAX_IDLE_SECONDS});
}
