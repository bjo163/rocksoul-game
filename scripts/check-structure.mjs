import fs from "node:fs";
const required=[
 "README.md","BLUEPRINT.md","TODO.md","AGENTS.md",
 "docs/story/CANON_POLICY.md","docs/story/MASTER_STORY_BIBLE.md","docs/research/SOURCE_SNAPSHOTS.md",
 "src/app/(redirect)/page.jsx","src/app/[locale]/layout.jsx","src/app/[locale]/page.jsx",
 "src/app/[locale]/play/page.jsx","src/app/[locale]/archive/page.jsx","src/app/[locale]/world/page.jsx",
 "src/lib/i18n.mjs","src/lib/demo-state.mjs","src/styles/globals.css"
];
const missing=required.filter(path=>!fs.existsSync(path));
if(missing.length){console.error("Missing required:",missing);process.exit(1);}
const raw=fs.readFileSync("src/lib/demo-state.mjs","utf8");
if(/supabase|reward_ledger|service_role/.test(raw)) {console.error("Guest demo must not define shared game economy");process.exit(1);}
console.log("PASS: "+required.length+" required foundation files and demo isolation");
