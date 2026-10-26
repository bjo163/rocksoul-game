import "../../styles/globals.css";
import { notFound } from "next/navigation";
import { isLocale, locales, getMessages } from "@/lib/i18n.mjs";
import SiteHeader from "@/components/SiteHeader.jsx";
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "ROCKSOUL" };
  const m = getMessages(locale);
  return {
    title: "ROCKSOUL — THE LOST SIGNAL",
    description: m.home.intro,
    robots: { index: true, follow: true },
    alternates: { languages: { id: "/id", en: "/en" } }
  };
}
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const m = getMessages(locale);
  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main">{m.a11y.skip}</a>
        <SiteHeader locale={locale} m={m} />
        {children}
        <footer className="site-footer">
          <span>© 2026 ROCKSOUL · MOONWITNESS XV</span>
          <span>{m.footer}</span>
        </footer>
      </body>
    </html>
  );
}
