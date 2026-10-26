"use client";
import {useEffect,useMemo,useState} from "react";
import {getGameAuthClient,isGameAuthConfigured} from "@/lib/supabase-browser.mjs";
const USER=/^[a-z][a-z0-9_]{2,23}$/;
export default function GameAccount({m}){
 const [mode,setMode]=useState("login"),[username,setUsername]=useState(""),[password,setPassword]=useState("");
 const [user,setUser]=useState(null),[save,setSave]=useState(null),[profile,setProfile]=useState(null);
 const [busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[saveLoading,setSaveLoading]=useState(false),[status,setStatus]=useState("");
 const client=useMemo(()=>getGameAuthClient(),[]);
 useEffect(()=>{
  if(!client){setLoading(false);return;}
  let active=true;
  client.auth.getUser().then(({data,error})=>{if(active){setUser(error?null:data?.user??null);setLoading(false);}}).catch(()=>{if(active){setStatus(m.error);setLoading(false);}});
  const {data}=client.auth.onAuthStateChange((_evt,session)=>{if(active){setUser(session?.user??null);if(!session){setSave(null);setProfile(null);}}});
  return()=>{active=false;data.subscription.unsubscribe();};
 },[client,m.error]);
 useEffect(()=>{
  if(!client||!user)return;
  let active=true;setSave(null);setProfile(null);setSaveLoading(true);
  Promise.all([client.from("game_saves").select("era_code,revision,beacon_repaired").eq("user_id",user.id).single(),client.from("game_profiles").select("display_name").eq("user_id",user.id).single()])
   .then(([a,b])=>{if(!active)return;if(a.error||b.error)setStatus(m.error);else{setSave(a.data);setProfile(b.data);}setSaveLoading(false);})
   .catch(()=>{if(active){setStatus(m.error);setSaveLoading(false);}});
  return()=>{active=false;};
 },[client,user?.id,m.error]);
 async function submit(e){
  e.preventDefault();const name=username.trim().toLowerCase();
  if(!client||busy||!USER.test(name)||password.length<12||password.length>128)return;
  setBusy(true);setStatus("");
  try{
   const res=await fetch(process.env.NEXT_PUBLIC_SUPABASE_URL+"/functions/v1/game-username-auth",{
    method:"POST",cache:"no-store",headers:{"content-type":"application/json","apikey":process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY},
    body:JSON.stringify({action:mode,username:name,password})
   });
   const json=await res.json();
   if(!res.ok||!json.ok){setStatus(json.error||m.error);return;}
   if(json.session){const {error}=await client.auth.setSession(json.session);if(error)throw error;setPassword("");}
   else{setMode("login");setPassword("");setStatus(m.created);}
  }catch{setStatus(m.error);}finally{setBusy(false);}
 }
 async function signOut(){if(!client||busy)return;setBusy(true);try{const {error}=await client.auth.signOut();if(error)throw error;setUser(null);setSave(null);setProfile(null);}catch{setStatus(m.signoutFailed);}finally{setBusy(false);}}
 if(!isGameAuthConfigured())return <section className="account-card"><p>{m.unavailable}</p></section>;
 if(loading)return <section className="account-card" aria-busy="true">{m.bootstrapping}</section>;
 return <section className="account-card">{user?<div>
   <div className="account-heading"><span className="eyebrow">/// {m.connected}</span><button className="btn btn-ghost" onClick={signOut} disabled={busy}>{m.signout}</button></div>
   <h2>{profile?.display_name||m.profile}</h2><p className="eyebrow">{m.save}</p>
   {save?<div className="account-grid"><span>{m.era}: <strong>{save.era_code}</strong></span><span>{m.revision}: <strong>{save.revision}</strong></span><span>{m.state}: <strong>{save.beacon_repaired?"RESTORED":"NEW"}</strong></span></div>:<p>{saveLoading?m.bootstrapping:m.pending}</p>}
   <p>{m.note}</p>
  </div>:<>
   <div className="account-heading"><button type="button" className={mode==="login"?"btn btn-primary":"btn btn-ghost"} disabled={busy} onClick={()=>{setMode("login");setStatus("");}}>{m.login}</button>
   <button type="button" className={mode==="signup"?"btn btn-primary":"btn btn-ghost"} disabled={busy} onClick={()=>{setMode("signup");setStatus("");}}>{m.register}</button></div>
   <form onSubmit={submit} className="account-form">
    <label htmlFor="game-username">{m.username}</label><input id="game-username" autoComplete="username" required minLength={3} maxLength={24} pattern="[a-z][a-z0-9_]{2,23}" value={username} onChange={e=>setUsername(e.target.value.toLowerCase())} placeholder="the_listener"/>
    <label htmlFor="game-pass">{m.password}</label><input id="game-pass" type="password" autoComplete={mode==="signup"?"new-password":"current-password"} required minLength={12} maxLength={128} value={password} onChange={e=>setPassword(e.target.value)}/>
    <p>{m.passwordHint}</p><button type="submit" className="btn btn-primary" disabled={busy}>{busy?m.sending:mode==="login"?m.login:m.register}</button>
   </form><p>{m.recoveryNotice}</p>
  </>}
  {status&&<p className="account-status" role="status">{status}</p>}
 </section>;
}