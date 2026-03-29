import Link from "next/link";
import { t } from "@/lib/i18n";

export default function Footer({ lang }) {
  const tr = t[lang];

  const nav = [
    { href: `/${lang}`, label: tr.home },
    { href: `/${lang}/o-kompanii`, label: tr.about },
    { href: `/${lang}/all-products`, label: tr.products },
    { href: `/${lang}/career`, label: tr.career },
    { href: `/${lang}/events`, label: tr.events },
    { href: `/${lang}/contacts`, label: tr.contacts },
  ];

  return (
    <footer style={{ background: "#0a1525", color: "#8896b3" }}>
      {/* Main footer */}
      <div className="container footer-grid" style={{
        display: "grid", gridTemplateColumns: "1.6fr 1fr 1.4fr",
        gap: 48, padding: "56px 32px 48px",
      }}>

        {/* Brand column */}
        <div>
          <img
            src="/images/logo-header.png"
            alt="GrossLINE Pharm"
            style={{ height: 36, filter: "brightness(0) invert(1)", marginBottom: 18, opacity: 0.9 }}
          />
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6b7a99", marginBottom: 24, maxWidth: 280 }}>
            {lang === "ru" && "Фармацевтическая компания, основанная в 2015 году. Качественные препараты из натуральных растений для здоровья людей."}
            {lang === "en" && "Pharmaceutical company founded in 2015. Quality medicines from natural plants for people's health."}
            {lang === "uz" && "2015 yilda tashkil etilgan farmatsevtika kompaniyasi. Odamlar salomatligi uchun tabiiy o'simliklardan sifatli dori vositalari."}
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Facebook", letter: "f", color: "#1877f2" },
              { label: "Instagram", letter: "in", color: "#e1306c" },
              { label: "Telegram", letter: "tg", color: "#0088cc" },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#8896b3", fontSize: 11, fontWeight: 800,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = s.color; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#8896b3"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                {s.letter}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>
            {lang === "ru" ? "Навигация" : lang === "en" ? "Navigation" : "Navigatsiya"}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {nav.map(item => (
              <Link key={item.href} href={item.href} style={{ fontSize: 14, color: "#6b7a99", transition: "color 0.2s", display: "flex", alignItems: "center", gap: 6 }}
                onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.color = "#6b7a99"}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h4 style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>
            {tr.contacts}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(13,110,253,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span style={{ fontSize: 13, color: "#6b7a99", lineHeight: 1.65 }}>
                {lang === "ru" && "Ташкентская обл., Зангиатинский р-н, ул. Рамадон 40"}
                {lang === "en" && "Tashkent region, Zangiata district, Ramadon str. 40"}
                {lang === "uz" && "Toshkent viloyati, Zangiota tumani, Ramadon ko'chasi 40"}
              </span>
            </div>
            {[
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, text: "+998 71 200 07 71", href: "tel:+998712000771" },
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, text: "+998 95 177 17 71", href: "tel:+998951771771" },
              { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, text: "info@grossline.uz", href: "mailto:info@grossline.uz" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(13,110,253,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {c.icon}
                </div>
                <a href={c.href} style={{ fontSize: 13, color: "#6b7a99", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#6b7a99"}
                >
                  {c.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 12, color: "#4a5573" }}>
          <span>{tr.copyright}</span>
          <span style={{ color: "#3a4563" }}>GrossLINE Pharm © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
