"use client";
import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { INITIAL_DEMO, DEMO_KEY, reducer, normalizeDemo } from "@/lib/demo-state.mjs";
export default function StationDemo({m,locale}) {
  const [state,dispatch] = useReducer(reducer, INITIAL_DEMO);
  const [loaded,setLoaded] = useState(false);
  useEffect(() => {
    try { const raw = window.localStorage.getItem(DEMO_KEY);
      if (raw) dispatch({ type:"hydrate", value: normalizeDemo(JSON.parse(raw)) });
    } catch { /* private browsing or corrupt save uses fresh demo */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { window.localStorage.setItem(DEMO_KEY,JSON.stringify(state)); } catch { /* best-effort guest demo only */ }
  },[state,loaded]);
  const act = (type) => dispatch(type);
  const disabled = !loaded;
  return <section className="station-shell" aria-label={m.title}>
    <div className="station-stage">
      <div className="station-topline"><span>ST-0001 / BEACON A</span><span className="stage-indicator" data-active={state.repaired}>{state.repaired?"ONLINE":"OFFLINE"}</span></div>
      <div className="station-graphics" role="img" aria-label="Abstract station transmitter: dark tower, electric signal and moon">
        <span className="station-moon" aria-hidden="true"/>
        <span className="radio-wave radio-wave-1" data-on={state.repaired} aria-hidden="true"/>
        <span className="radio-wave radio-wave-2" data-on={state.repaired} aria-hidden="true"/>
        <span className="station-tower" aria-hidden="true"><i/><b/></span>
        <div className="station-floor" aria-hidden="true"/>
      </div>
      <div className="station-console">
        <div className="console-item"><span>{m.energy}</span><strong aria-live="polite">{state.charge.toString().padStart(2,"0")} <small>/ 12</small></strong></div>
        <div className="console-actions">
          <button disabled={disabled || state.charge >= 12} className="btn btn-primary" onClick={()=>act("charge")}>{m.collect} +1</button>
          <button disabled={disabled || state.repaired || state.charge < 3} className="btn btn-ghost" onClick={()=>act("repair")}>{state.repaired?m.repaired:m.repair}</button>
        </div>
      </div>
      <p className="console-hint" role="status">{state.repaired?m.repaired:m.chargeHint}</p>
    </div>
    <div className="mission-panel">
      <span className="eyebrow">/// LIVE CHARACTER LOG</span>
      <h2>{m.battery}</h2>
      <p className="dialogue">“{m.batteryLine}”</p>
      <div className="divider-line"/>
      <h3>{m.inspect}</h3>
      <p>{m.inspectText}</p>
      <button className="btn btn-ghost btn-full" disabled={disabled || !state.repaired || state.inspected} onClick={()=>act("inspect")}>{state.inspected?"✓ "+m.inspect:m.inspect}</button>
      <div className="choice-stack" aria-label={m.decision}>
        <button disabled={disabled || !state.inspected} className={"choice-button"+(state.decision==="unknown"?" choice-selected":"")} onClick={()=>act("unknown")}>{m.unknown}</button>
        <button disabled={disabled || !state.inspected} className={"choice-button"+(state.decision==="verify"?" choice-selected":"")} onClick={()=>act("verify")}>{m.verify}</button>
      </div>
      <div className="choice-result" role="status" aria-live="polite">
        <small>{m.decision}</small>
        <p>{state.decision==="unknown"?m.outcomeUnknown:state.decision==="verify"?m.outcomeVerify:m.none}</p>
      </div>
      <div className="mission-bottom"><button className="text-button" disabled={disabled} onClick={()=>act("reset")}>{m.reset}</button><Link href={"/"+locale+"/world"} className="text-link">{m.goWorld} ↗</Link></div>
      <p className="local-badge">{m.saved} · {m.offline}</p>
    </div>
  </section>;
}
