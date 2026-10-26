import Link from "next/link";
import { notFound } from "next/navigation";
import {getMessages,isLocale,localizedHref} from "@/lib/i18n.mjs";
export default async function World({params}) {
  const {locale}=await params; if(!isLocale(locale))notFound();
  const m=getMessages(locale).world;
  return <main id="main" className="page-wrap content-page"><p className="eyebrow">/// {m.kicker}</p><h1>{m.title}</h1><p className="page-intro">{m.intro}</p>
    <div className="world-field" aria-hidden="true"><span className="world-orbit orbit-outer"/><span className="world-orbit orbit-inner"/><span className="world-node node-1">01</span><span className="world-node node-2">02</span><span className="world-node node-3">03</span><span className="world-node node-4">04</span><div className="map-watermark">WORLD / 001</div></div>
    <div className="region-grid">{m.labels.map((title,i)=><article className="region-card" key={title}><small>{String(i+1).padStart(2,"0")} / {i===0?m.open:m.locked}</small><h2>{title}</h2><p>{m.bodies[i]}</p>{i===0&&<Link className="text-link" href={localizedHref(locale,"play")}>ENTER ↗</Link>}</article>)}</div>
  </main>;
}
