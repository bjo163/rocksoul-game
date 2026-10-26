import test from "node:test";
import assert from "node:assert/strict";
import {locales,isLocale,getMessages,localizedHref} from "../src/lib/i18n.mjs";
test("locale whitelist and routes",()=>{
 assert.deepEqual(locales,["id","en"]);assert.equal(isLocale("id"),true);assert.equal(isLocale("ID"),false);assert.equal(isLocale("xx"),false);
 assert.equal(localizedHref("id","play"),"/id/play");assert.equal(localizedHref("en"),"/en");assert.throws(()=>getMessages("xx"),RangeError);
});
test("both dictionaries supply complete core navigation and meaningful story",()=>{
 for(const locale of locales){const m=getMessages(locale);
  for(const key of ["home","play","world","archive","nav","a11y","footer"])assert.ok(m[key],key);
  for(const value of Object.values(m.nav))assert.ok(typeof value==="string"&&value.length);
  assert.equal(m.world.labels.length,4);assert.equal(m.archive.items.length,3);
  assert.ok(m.home.intro.length>20);assert.ok(m.play.data.includes(locale==="id"?"Supabase":"Supabase"));
 }
});
test("translation shape stays symmetric",()=>{
 function shape(v){return typeof v==="object"&&v&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,shape(v[k])])):Array.isArray(v)?v.map(shape):typeof v;}
 assert.deepEqual(shape(getMessages("id")),shape(getMessages("en")));
});
