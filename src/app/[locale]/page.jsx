import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getMessages, localizedHref } from "@/lib/i18n.mjs";
import MoonScene from "@/components/MoonScene.jsx";
export default async function Home({ params }) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale).home;
  const a = getMessages(locale).a11y;
  const cards = [[m.first,m.firstBody,"01"],[m.second,m.secondBody,"02"],[m.third,m.thirdBody,"03"]];
  return <main id="main" className="home">
    <section className="hero section-wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse-dot" aria-hidden="true" />{m.eyebrow}</div>
        <p className="glitch-kicker">TRANSMISSION NO. 0001 / 2026</p>
        <h1><span className="rock-word">ROCKSOUL</span><span className="hero-title">{m.title}</span></h1>
        <p className="hero-lead">{m.intro}</p>
        <p className="hero-summary">{m.body}</p>
        <div className="action-row">
          <Link className="btn btn-primary" href={localizedHref(locale,"play")}>{m.primary}<span aria-hidden="true">↗</span></Link>
          <Link className="btn btn-ghost" href={localizedHref(locale,"archive")}>{m.secondary}</Link>
        </div>
        <div className="demo-disclosure"><span className="mini-star" aria-hidden="true">✳</span>{m.state}</div>
      </div>
      <div className="hero-visual">
        <MoonScene label={a.earth} />
        <div className="signal-tag">
          <span className="signal-tag-heading">{m.system}</span>
          <strong>{m.active}</strong>
          <span className="tiny-progress" aria-hidden="true"><i /></span>
          <small>{m.chapter}</small>
        </div>
      </div>
    </section>
    <section className="story-section section-wrap" aria-labelledby="story-heading">
      <div className="section-heading"><p className="eyebrow">/// WORLD LOG // 3 CHARACTERS</p><h2 id="story-heading">{m.featured}</h2></div>
      <div className="story-grid">{cards.map(([title,body,id])=><article className="story-card" key={id}>
        <span className="card-counter">{id} / ARCHIVE</span><span className={"card-art card-art-"+id} aria-hidden="true"><i/><b/></span>
        <h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>
    <section className="manifesto section-wrap">
      <span className="manifesto-number" aria-hidden="true">163.</span>
      <div><p className="eyebrow">/// THE MOON WATCHES</p><h2>{m.philosophy}</h2><p>{m.philosophyBody}</p>
      <Link className="text-link" href={localizedHref(locale,"archive")}>{m.learn} ↗</Link></div>
    </section>
  </main>;
}
