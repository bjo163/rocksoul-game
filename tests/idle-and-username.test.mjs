import test from "node:test";import assert from "node:assert/strict";import {readFileSync} from "node:fs";
import {estimateIdleCharge,CHARGE_CAP,MAX_IDLE_SECONDS} from "../src/game/rules/idle-charge.mjs";
test("deterministic idle estimator is bounded and has no remote side effects",()=>{
 assert.deepEqual(estimateIdleCharge({charge:0,elapsedSeconds:0}),{charge:0,gained:0,consumedSeconds:0,capped:false});
 assert.equal(estimateIdleCharge({charge:2,elapsedSeconds:119}).gained,0);
 assert.equal(estimateIdleCharge({charge:2,elapsedSeconds:120}).gained,1);
 assert.equal(estimateIdleCharge({charge:11,elapsedSeconds:999999}).charge,CHARGE_CAP);
 assert.equal(estimateIdleCharge({charge:-10,elapsedSeconds:-6}).charge,0);
 assert.equal(estimateIdleCharge({charge:8000,elapsedSeconds:MAX_IDLE_SECONDS}).gained,0);
 assert.equal(estimateIdleCharge({charge:2,elapsedSeconds:Infinity}).gained,0);
 assert.equal(estimateIdleCharge({charge:2,elapsedSeconds:MAX_IDLE_SECONDS+1}).capped,true);
 assert.deepEqual(estimateIdleCharge({charge:4,elapsedSeconds:243}),estimateIdleCharge({charge:4,elapsedSeconds:243}));
});
test("username auth is server managed and does not use magic links",()=>{
 const fs=requireFile();
 const ui=fs("src/components/GameAccount.jsx");
 const edge=fs("supabase/functions/game-username-auth/index.js");
 assert.match(ui,/client\.auth\.setSession/);
 assert.doesNotMatch(ui,/signInWithOtp|requestLink|service_role/i);
 assert.match(edge,/auth\.admin\.createUser/);
 assert.match(edge,/auth\.signInWithPassword/);
 assert.match(edge,/rocksoul_auth_throttle/);
 assert.match(edge,/email_confirm:true/);
});
function requireFile(){return (path)=>readFileSync(path,"utf8");}
