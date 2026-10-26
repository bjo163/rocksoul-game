import Link from "next/link";
import { localizedHref } from "@/lib/i18n.mjs";
import LocaleSwitch from "@/components/LocaleSwitch.jsx";
export default function SiteHeader({ locale, m }) {
  const links = [
    ["", m.nav.home], ["play", m.nav.play], ["world", m.nav.world], ["archive", m.nav.archive]
  ];
  return (
    <header className="site-header">
      <Link className="brand" href={localizedHref(locale)} aria-label="ROCKSOUL home">
        <span className="brand-symbol" aria-hidden="true">R<span className="brand-dot">◌</span></span>
        <span className="brand-name">ROCKSOUL<small>THE LOST SIGNAL</small></span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {links.map(([path,label]) => <Link key={path} href={localizedHref(locale,path)}>{label}</Link>)}
      </nav>
      <LocaleSwitch locale={locale} label={m.nav.language} />
    </header>
  );
}
