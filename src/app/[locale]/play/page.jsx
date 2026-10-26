import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n.mjs";
import StationDemo from "@/components/StationDemo.jsx";
export default async function Play({params}) {
  const {locale}=await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale).play;
  return <main id="main" className="page-wrap game-page">
    <div className="eyebrow">/// {m.kicker}</div>
    <div className="page-title-row"><h1>{m.title}</h1><span className="demo-pill">{m.demo}</span></div>
    <p className="page-intro">{m.intro}</p>
    <StationDemo m={m} locale={locale}/>
    <p className="disclaimer-box">{m.data}</p>
  </main>;
}
