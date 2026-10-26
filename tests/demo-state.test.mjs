import test from "node:test";
import assert from "node:assert/strict";
import {normalizeDemo,reducer,INITIAL_DEMO} from "../src/lib/demo-state.mjs";
test("demo is local and rejects corrupted state",()=>{
 assert.deepEqual(normalizeDemo(null),INITIAL_DEMO);
 assert.deepEqual(normalizeDemo({charge:999,repaired:"true",inspected:1,decision:"admin"}),{charge:12,repaired:false,inspected:false,decision:null});
});
test("cannot repair beacon before earning 3 demo charges",()=>{
 let x={...INITIAL_DEMO};
 x=reducer(x,"repair");assert.equal(x.repaired,false);
 x=reducer(reducer(reducer(x,"charge"),"charge"),"charge");
 x=reducer(x,"repair");assert.equal(x.repaired,true);assert.equal(x.charge,0);
});
test("clue and choices gated by repair; reset returns fresh demo",()=>{
 let x=reducer(INITIAL_DEMO,"unknown");assert.equal(x.decision,null);
 x=reducer(x,"inspect");assert.equal(x.inspected,false);
 x={charge:0,repaired:true,inspected:false,decision:null};
 x=reducer(x,"inspect");x=reducer(x,"unknown");assert.equal(x.decision,"unknown");
 assert.deepEqual(reducer(x,"reset"),INITIAL_DEMO);
});
