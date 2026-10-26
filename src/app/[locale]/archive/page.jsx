import Link from "next/link";
import { notFound } from "next/navigation";
import {getMessages,isLocale,localizedHref} from "@/lib/i18n.mjs";
export default async function Archive({params}) {
  const {locale}=await params; if(!isLocale(locale))notFound();
  const m=getMessages(locale).archive;
  return <main id="main" className="page-wrap content-page"><p className="eyebrow">/// {m.kicker}</p><h1>{m.title}</h1><p className="page-intro">{m.intro}</p>
  <div className="file-grid">
    {m.items.map((title,i)=><article key={title} className="file-card">
      <span className="file-serial">FILE / {String(i+1).padStart(3,"0")}</span>
      <div className={"file-visual file-visual-"+i} aria-hidden="true"><span/></div>
      <span className="file-status">{m.statuses[i]}</span><h2>{title}</h2><p>{m.notes[i]}</p>
    </article>)}
  </div><div className="route-footnote"><span>{m.source}: MOONWITNESS II / XV · GAME ADAPTATION</span><Link href={localizedHref(locale,"world")} className="text-link">{m.visit} ↗</Link></div></main>;
}
