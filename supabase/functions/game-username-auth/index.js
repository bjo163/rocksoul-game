import { createClient } from "npm:@supabase/supabase-js@2.118.0";

const url = Deno.env.get("SUPABASE_URL");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
const userRe = /^[a-z][a-z0-9_]{2,23}$/;
const localOrigins = new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);
function allowedOrigin(value) {
  if (!value) return false;
  try {
    const u = new URL(value);
    return localOrigins.has(u.origin) || (u.protocol === "https:" && (/^rocksoul-game(?:-[a-z0-9-]+)?-bjo163s-projects\.vercel\.app$/.test(u.hostname) || u.hostname === "rocksoul-game.vercel.app"));
  } catch { return false; }
}
function respond(origin, status, payload) {
  return new Response(JSON.stringify(payload), {
    status, headers: {"content-type":"application/json","cache-control":"no-store","vary":"Origin",
      ...(origin && allowedOrigin(origin) ? {"access-control-allow-origin":origin,"access-control-allow-methods":"POST, OPTIONS","access-control-allow-headers":"content-type, apikey, authorization"} : {})}
  });
}
async function sha256(str) {
  const bytes = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest("SHA-256",bytes);
  return Array.from(new Uint8Array(digest), x=>x.toString(16).padStart(2,"0")).join("");
}
Deno.serve(async req => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return allowedOrigin(origin) ? respond(origin,200,{ok:true}) : respond(null,403,{error:"Origin not allowed"});
  if(req.method !== "POST" || !allowedOrigin(origin)) return respond(null,403,{error:"Not allowed"});
  if (!url || !serviceKey || !anonKey) return respond(origin,503,{error:"Service unavailable"});
  const len = Number(req.headers.get("content-length")||0);
  if (len > 4096) return respond(origin,413,{error:"Request too large"});
  let body;
  try {body=await req.json();}catch{return respond(origin,400,{error:"Invalid request"});}
  const username=typeof body?.username==="string"?body.username.trim().toLowerCase():"";
  const password=typeof body?.password==="string"?body.password:"";
  const action=body?.action;
  if(!["login","signup"].includes(action)||!userRe.test(username)||password.length<12||password.length>128)
    return respond(origin,400,{error:"Use a username (3–24 lowercase characters) and password (12+ characters)"});
  const admin=createClient(url,serviceKey,{auth:{autoRefreshToken:false,persistSession:false}});
  const client=createClient(url,anonKey,{auth:{autoRefreshToken:false,persistSession:false}});
  const clientIp = req.headers.get("x-real-ip") || req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipBucket="i:"+await sha256(clientIp);
  const nameBucket="u:"+await sha256(username);
  try {
    const {data:ipAllowed,error:ipError}=await admin.rpc("rocksoul_auth_throttle",{p_bucket:ipBucket,p_max_attempts:24,p_window_seconds:900});
    if(ipError||ipAllowed!==true) return respond(origin,429,{error:"Too many attempts. Please try later."});
    const {data:userAllowed,error:userError}=await admin.rpc("rocksoul_auth_throttle",{p_bucket:nameBucket,p_max_attempts:8,p_window_seconds:900});
    if(userError||userAllowed!==true) return respond(origin,429,{error:"Too many attempts. Please try later."});
    if(action==="signup"){
      const {data:existing,error:lookupError}=await admin.rpc("rocksoul_auth_email",{p_username:username});
      if(lookupError)return respond(origin,503,{error:"Account service unavailable"});
      if(existing)return respond(origin,409,{error:"Username unavailable"});
      const email=crypto.randomUUID().replaceAll("-","")+"@example.com";
      const {data:created,error:createError}=await admin.auth.admin.createUser({
        email,password,email_confirm:true,user_metadata:{game_username:username}
      });
      if(createError||!created?.user) return respond(origin,400,{error:"Unable to create account"});
      const {data:saved,error:insertError}=await admin.rpc("rocksoul_auth_register",{p_username:username,p_user_id:created.user.id,p_email:email});
      if(insertError||saved!==true){
        await admin.auth.admin.deleteUser(created.user.id);
        return respond(origin,409,{error:"Username unavailable"});
      }
      // Sign in immediately. Auth is managed by Supabase, never stored in app tables.
      const {data:login,error:loginError}=await client.auth.signInWithPassword({email,password});
      if(loginError||!login.session) return respond(origin,201,{ok:true,created:true,requiresLogin:true});
      return respond(origin,200,{ok:true,created:true,session:{access_token:login.session.access_token,refresh_token:login.session.refresh_token}});
    }
    const {data:email,error:lookupError}=await admin.rpc("rocksoul_auth_email",{p_username:username});
    if(lookupError)return respond(origin,503,{error:"Account service unavailable"});
    if(!email)return respond(origin,401,{error:"Invalid username or password"});
    const {data:login,error:loginError}=await client.auth.signInWithPassword({email,password});
    if(loginError||!login.session)return respond(origin,401,{error:"Invalid username or password"});
    return respond(origin,200,{ok:true,session:{access_token:login.session.access_token,refresh_token:login.session.refresh_token}});
  }catch{return respond(origin,503,{error:"Account service temporarily unavailable"});}
});