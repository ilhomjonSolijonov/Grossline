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

  const contacts = [
    { icon: "📞", text: "+998 71 200 07 71", href: "tel:+998712000771" },
    { icon: "📞", text: "+998 95 177 17 71", href: "tel:+998951771771" },
    { icon: "✉️", text: "info@grossline.uz", href: "mailto:info@grossline.uz" },
  ];

  return (
    <footer style={{ background: "#0a1525", color: "#8896b3" }}>
      <style>{`
        .footer-nav-link { color: #6b7a99; font-size: 14px; display: flex; align-items: center; gap: 6px; transition: color 0.2s; }
        .footer-nav-link:hover { color: #60a5fa; }
        .footer-contact-link { color: #6b7a99; font-size: 13px; text-decoration: none; transition: color 0.2s; }
        .footer-contact-link:hover { color: #60a5fa; }
        .footer-social { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #8896b3; font-size: 11px; font-weight: 800; transition: all 0.2s; text-decoration: none; }
        .footer-social:hover { background: #0d6efd; color: #fff; border-color: #0d6efd; }
      `}</style>

      {/* Main footer */}
      <div className="container footer-grid" style={{
        display: "grid", gridTemplateColumns: "1.6fr 1fr 1.4fr",
        gap: 48, padding: "56px 32px 48px",
      }}>

        {/* Brand */}
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
            <a href="#" aria-label="Facebook" className="footer-social">f</a>
            <a href="#" aria-label="Instagram" className="footer-social">in</a>
            <a href="#" aria-label="Telegram" className="footer-social">tg</a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>
            {lang === "ru" ? "Навигация" : lang === "en" ? "Navigation" : "Navigatsiya"}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {nav.map(item => (
              <Link key={item.href} href={item.href} className="footer-nav-link">
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
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(13,110,253,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, fontSize: 13 }}>
                📍
              </div>
              <span style={{ fontSize: 13, color: "#6b7a99", lineHeight: 1.65 }}>
                {lang === "ru" && "Ташкентская обл., Зангиатинский р-н, ул. Рамадон 40"}
                {lang === "en" && "Tashkent region, Zangiata district, Ramadon str. 40"}
                {lang === "uz" && "Toshkent viloyati, Zangiota tumani, Ramadon ko'chasi 40"}
              </span>
            </div>
            {contacts.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(13,110,253,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>
                  {c.icon}
                </div>
                <a href={c.href} className="footer-contact-link">{c.text}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container" style={{ padding: "18px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, fontSize: 12, color: "#4a5573" }}>
          <span>{tr.copyright}</span>
          <span>GrossLINE Pharm © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
