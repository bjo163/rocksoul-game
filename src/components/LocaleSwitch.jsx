"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function LocaleSwitch({locale,label}) {
  const pathname=usePathname();
  const suffix=pathname?.replace(/^\/(id|en)(?=\/|$)/,"")||"";
  return <div className="language-switch" aria-label={label}>
    <Link href={"/id"+suffix} hrefLang="id" lang="id" aria-current={locale==="id"?"page":undefined}>ID</Link>
    <span aria-hidden="true">/</span>
    <Link href={"/en"+suffix} hrefLang="en" lang="en" aria-current={locale==="en"?"page":undefined}>EN</Link>
  </div>;
}
