"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

const langOptions = [
  { value: "ru", label: "RU" },
  { value: "en", label: "EN" },
  { value: "uz", label: "UZ" },
];

export default function Header({ lang, active }) {
  const tr = t[lang];
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { key: "home",     href: `/${lang}`,             label: tr.home },
    { key: "about",    href: `/${lang}/o-kompanii`,   label: tr.about },
    { key: "products", href: `/${lang}/all-products`, label: tr.products },
    { key: "career",   href: `/${lang}/career`,       label: tr.career },
    { key: "events",   href: `/${lang}/events`,       label: tr.events },
    { key: "contacts", href: `/${lang}/contacts`,     label: tr.contacts },
  ];

  return (
    <header style={{ background: "#fff", position: "sticky", top: 0, zIndex: 300, borderBottom: "1px solid #e8ecf0" }}>
      {/* Top bar */}
      <div style={{ background: "#1c2f4a" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 32px", gap: 16 }}>
          <div className="top-bar-phone" style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            <a href="tel:+998951771771" style={{ color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +998 95 177 17 71
            </a>
            <a href="mailto:info@grossline.uz" style={{ color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@grossline.uz
            </a>
          </div>
          <select
            className="lang-select"
            value={lang}
            onChange={e => router.push(`/${e.target.value}`)}
            aria-label="Select language"
          >
            {langOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main nav */}
      <div className="container" style={{ display: "flex", alignItems: "center", height: 64, padding: "0 32px" }}>
        <Link href={`/${lang}`} style={{ flexShrink: 0, marginRight: "auto" }}>
          <img src="/images/logo-header.png" alt="GrossLINE Pharm" style={{ height: 38 }} />
        </Link>

        <nav className="desktop-nav" style={{ display: "flex", gap: 0 }}>
          {nav.map(item => (
            <Link
              key={item.key}
              href={item.href}
              style={{
                padding: "8px 14px",
                fontSize: 14,
                fontWeight: 500,
                color: active === item.key ? "#1a56db" : "#3a3a3c",
                borderBottom: active === item.key ? "2px solid #1a56db" : "2px solid transparent",
                transition: "color 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile nav */}
      <nav className={`mobile-nav${menuOpen ? " open" : ""}`}>
        {nav.map(item => (
          <Link
            key={item.key}
            href={item.href}
            className={active === item.key ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
