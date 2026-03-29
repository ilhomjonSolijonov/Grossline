"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

const langOptions = [
  { value: "ru", label: "🇷🇺 Русский" },
  { value: "en", label: "🇬🇧 English" },
  { value: "uz", label: "🇺🇿 O'zbek" },
];

export default function Header({ lang, active }) {
  const tr = t[lang];
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { key: "home",     href: `/${lang}`,              label: tr.home },
    { key: "about",    href: `/${lang}/o-kompanii`,    label: tr.about },
    { key: "products", href: `/${lang}/all-products`,  label: tr.products },
    { key: "career",   href: `/${lang}/career`,        label: tr.career },
    { key: "events",   href: `/${lang}/events`,        label: tr.events },
    { key: "contacts", href: `/${lang}/contacts`,      label: tr.contacts },
  ];

  function handleLangChange(e) {
    router.push(`/${e.target.value}`);
  }

  return (
    <header style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 200 }}>
      {/* Top bar */}
      <div style={{ background: "#f0f6ff", borderBottom: "1px solid #dde8f8" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 24px" }}>
          <div className="top-bar-phone" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <span style={{ color: "#555", fontWeight: 500 }}>{tr.hotline}</span>
            <a href="tel:+998951771771" style={{ color: "#0066cc", fontWeight: 700, textDecoration: "none" }}>(+998 95) 177-17-71</a>
          </div>

          {/* Language select */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <select
              className="lang-select"
              value={lang}
              onChange={handleLangChange}
              aria-label="Select language"
            >
              {langOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Logo + Desktop Nav */}
      <div className="container" style={{ display: "flex", alignItems: "center", height: 68, padding: "0 24px" }}>
        <Link href={`/${lang}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <img
            src="/images/logo-header.png"
            alt="GrossLINE pharm"
            style={{ height: 44 }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          {nav.map(item => (
            <Link
              key={item.key}
              href={item.href}
              style={{
                padding: "8px 13px",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                color: active === item.key ? "#0066cc" : "#444",
                borderBottom: active === item.key ? "2px solid #0066cc" : "2px solid transparent",
                transition: "color 0.15s, border-color 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          style={{ marginLeft: "auto" }}
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
