"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

const langOptions = [
  { value: "ru", label: "🇷🇺 RU" },
  { value: "en", label: "🇬🇧 EN" },
  { value: "uz", label: "🇺🇿 UZ" },
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
    <header style={{ background: "#fff", position: "sticky", top: 0, zIndex: 300, borderBottom: "1px solid #eef0f8" }}>
      {/* Top info bar */}
      <div style={{ background: "#0a1f5c", color: "#fff" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 32px", fontSize: 12 }}>
          <div className="top-bar-phone" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="tel:+998712000771" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#fff"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.8)"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              +998 71 200 07 71
            </a>
            <a href="mailto:info@grossline.uz" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#fff"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.8)"}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@grossline.uz
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
            <select
              className="lang-select"
              value={lang}
              onChange={e => router.push(`/${e.target.value}`)}
              aria-label="Select language"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#fff", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%23fff' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", padding: "4px 26px 4px 8px" }}
            >
              {langOptions.map(o => (
                <option key={o.value} value={o.value} style={{ background: "#0a1f5c", color: "#fff" }}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="container" style={{ display: "flex", alignItems: "center", height: 72, padding: "0 32px", gap: 32 }}>
        <Link href={`/${lang}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <img src="/images/logo-header.png" alt="GrossLINE Pharm" style={{ height: 42 }} />
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ marginLeft: "auto", display: "flex", gap: 0 }}>
          {nav.map(item => (
            <Link
              key={item.key}
              href={item.href}
              style={{
                padding: "8px 15px",
                fontSize: 14,
                fontWeight: 600,
                color: active === item.key ? "#0d6efd" : "#3d4460",
                borderBottom: active === item.key ? "2px solid #0d6efd" : "2px solid transparent",
                transition: "color 0.18s, border-color 0.18s",
                whiteSpace: "nowrap",
                letterSpacing: "0.1px",
              }}
              onMouseEnter={e => { if (active !== item.key) e.currentTarget.style.color = "#0d6efd"; }}
              onMouseLeave={e => { if (active !== item.key) e.currentTarget.style.color = "#3d4460"; }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={`/${lang}/contacts`} className="btn-primary desktop-nav" style={{ marginLeft: 16, padding: "9px 20px", fontSize: 13, boxShadow: "none" }}>
          {tr.contacts}
        </Link>

        {/* Mobile hamburger */}
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
