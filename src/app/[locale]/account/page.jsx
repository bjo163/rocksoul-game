import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n.mjs";
import GameAccount from "@/components/GameAccount.jsx";

export default async function AccountPage({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale).account;
  return <main id="main" className="page-wrap content-page">
    <p className="eyebrow">/// {m.kicker}</p>
    <h1>{m.title}</h1>
    <p className="page-intro">{m.intro}</p>
    <GameAccount m={m} locale={locale}/>
  </main>;
}
