"use client";

import { useEffect, useMemo, useState } from "react";
import { getGameAuthClient, isGameAuthConfigured } from "@/lib/supabase-browser.mjs";
import { localizedHref } from "@/lib/i18n.mjs";

export default function GameAccount({ m, locale }) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [save, setSave] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const client = useMemo(() => getGameAuthClient(), []);
  const configured = isGameAuthConfigured();

  useEffect(() => {
    if (!client) { setLoading(false); return; }
    let valid = true;
    client.auth.getUser().then(({ data, error }) => {
      if (!valid) return;
      setUser(error ? null : data?.user ?? null);
      setLoading(false);
    }).catch(() => { if (valid) { setLoading(false); setStatus(m.error); } });
    const { data } = client.auth.onAuthStateChange((_event, session) => {
      if (!valid) return;
      setUser(session?.user ?? null);
      if (!session) setSave(null);
    });
    return () => { valid = false; data.subscription.unsubscribe(); };
  }, [client, m.error]);

  useEffect(() => {
    if (!client || !user) return;
    let valid = true;
    setSave(null);
    (async () => {
      try {
        // Database function checks auth.uid() and creates ONLY this user's rows.
        // No currency, repaired beacon or client-supplied user_id is writable here.
        const { error } = await client.rpc("game_bootstrap");
        if (error) throw error;
        const result = await client.from("game_saves")
          .select("era_code, revision, beacon_repaired, story_choice")
          .eq("user_id", user.id).single();
        if (result.error) throw result.error;
        if (valid) setSave(result.data);
      } catch {
        if (valid) setStatus(m.error);
      }
    })();
    return () => { valid = false; };
  }, [client, user?.id, m.error]);

  async function requestLink(e) {
    e.preventDefault();
    if (!client || !email.trim() || busy) return;
    setBusy(true); setStatus("");
    try {
      const { error } = await client.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: window.location.origin + localizedHref(locale, "account") },
      });
      setStatus(error ? m.error : m.sent);
    } catch { setStatus(m.error); }
    finally { setBusy(false); }
  }

  async function signOut() {
    if (!client || busy) return;
    setBusy(true); setStatus("");
    try {
      const { error } = await client.auth.signOut();
      if (error) setStatus(m.signoutFailed);
      else { setUser(null); setSave(null); }
    } catch { setStatus(m.signoutFailed); }
    finally { setBusy(false); }
  }

  if (!configured) return <section className="account-card">
    <span className="demo-pill">{m.unavailableShort}</span>
    <p>{m.unavailable}</p>
  </section>;

  if (loading) return <section className="account-card" aria-busy="true"><p>{m.bootstrapping}</p></section>;

  return <section className="account-card">
    {user ? <>
      <div className="account-heading"><span className="eyebrow">/// {m.connected}</span><button className="btn btn-ghost" onClick={signOut} disabled={busy}>{m.signout}</button></div>
      <h2>{m.profile}</h2>
      <p className="account-email">{user.email ?? user.id}</p>
      <div className="account-save">
        <p className="eyebrow">{m.save}</p>
        {save ? <div className="account-grid">
          <span>{m.era}: <strong>{save.era_code}</strong></span>
          <span>{m.revision}: <strong>{save.revision}</strong></span>
          <span>{m.state}: <strong>{save.beacon_repaired ? "RESTORED" : "NEW"}</strong></span>
        </div> : <p>{m.bootstrapping}</p>}
      </div>
      <p>{m.note}</p>
    </> : <>
      <span className="eyebrow">/// {m.signIn}</span>
      <form onSubmit={requestLink} className="account-form">
        <label htmlFor="account-email">{m.email}</label>
        <input id="account-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" maxLength={254}/>
        <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? m.sending : m.submit}</button>
      </form>
    </>}
    {status && <p role="status" className="account-status">{status}</p>}
  </section>;
}
