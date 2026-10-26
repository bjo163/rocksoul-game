import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read=(path)=>fs.readFileSync(path,"utf8");
test("all bilingual routes exist with accessible content",()=>{
 for(const p of ["src/app/[locale]/page.jsx","src/app/[locale]/play/page.jsx","src/app/[locale]/archive/page.jsx","src/app/[locale]/world/page.jsx"]) {
  assert.ok(fs.existsSync(p),p);
  assert.match(read(p),/id="main"/);
 }
 const root=read("src/app/[locale]/layout.jsx");
 assert.match(root,/<html lang=\{locale\}>/);
 assert.match(root,/generateStaticParams/);
 assert.match(root,/className="skip-link"/);
});
test("demo is accurately disclosed as local-only and has no API credentials",()=>{
 const demo=read("src/components/StationDemo.jsx");
 assert.match(demo,/localStorage/);
 assert.doesNotMatch(demo,/SUPABASE_SERVICE_ROLE|SECRET_KEY|DATABASE_URL/);
 const id=read("src/lib/i18n.mjs");
 assert.match(id,/bukan di server atau Supabase/);
 assert.match(id,/not a server or Supabase/);
});
test("error/loading and safe browser controls exist",()=>{
 for(const n of ["error","loading"])assert.ok(fs.existsSync("src/app/[locale]/"+n+".jsx"));
 const cfg=read("next.config.mjs");
 assert.match(cfg,/X-Content-Type-Options/);
 assert.match(cfg,/X-Frame-Options/);
 const css=read("src/styles/globals.css");
 assert.match(css,/:focus-visible/);
 assert.match(css,/prefers-reduced-motion/);
});
