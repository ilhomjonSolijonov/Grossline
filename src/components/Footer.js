import Link from "next/link";
import { t } from "@/lib/i18n";

export default function Footer({ lang }) {
  const tr = t[lang];
  return (
    <footer style={{ background: "#0d1b3e", color: "#ccc", marginTop: "auto" }}>
      <div
        className="footer-grid"
        style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "48px 24px 24px",
          display: "grid", gridTemplateColumns: "1.2fr 1fr 1.2fr",
          gap: 40,
        }}
      >
        {/* Brand */}
        <div>
          <img
            src="/images/logo-header.png"
            alt="GrossLINE"
            style={{ height: 38, filter: "brightness(0) invert(1)", marginBottom: 14 }}
          />
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8ab0d8", margin: "0 0 16px" }}>
            {lang === "ru" && "Grossline Pharm — фармацевтическая компания, основанная в 2015 году. Более 210 сотрудников."}
            {lang === "en" && "Grossline Pharm — pharmaceutical company founded in 2015. Over 210 employees."}
            {lang === "uz" && "Grossline Pharm — 2015 yilda tashkil etilgan farmatsevtika kompaniyasi. 210 dan ortiq xodim."}
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Facebook", icon: "f" },
              { label: "Instagram", icon: "in" },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} style={{
                width: 34, height: 34, borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#8ab0d8", textDecoration: "none", fontSize: 12, fontWeight: 700,
                transition: "background 0.2s",
              }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div>
          <h4 style={{ color: "#fff", marginBottom: 16, fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
            {lang === "ru" ? "Навигация" : lang === "en" ? "Navigation" : "Navigatsiya"}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              { href: `/${lang}`, label: tr.home },
              { href: `/${lang}/o-kompanii`, label: tr.about },
              { href: `/${lang}/all-products`, label: tr.products },
              { href: `/${lang}/career`, label: tr.career },
              { href: `/${lang}/events`, label: tr.events },
              { href: `/${lang}/contacts`, label: tr.contacts },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ color: "#8ab0d8", textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h4 style={{ color: "#fff", marginBottom: 16, fontSize: 12, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>
            {tr.contacts}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 13 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#8ab0d8" }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}>📍</span>
              <span>Республика Узбекистан, Ташкентская обл., Зангиатинский район, ул. Рамадон 40</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span>📞</span>
              <a href="tel:+998712000771" style={{ color: "#8ab0d8", textDecoration: "none" }}>+998 71 200 07 71</a>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span>📞</span>
              <a href="tel:+998951771771" style={{ color: "#8ab0d8", textDecoration: "none" }}>+998 95 177 17 71</a>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span>✉️</span>
              <a href="mailto:info@grossline.uz" style={{ color: "#8ab0d8", textDecoration: "none" }}>info@grossline.uz</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#4a6a9a" }}>
        <span>{tr.copyright}</span>
        <span>GrossLINE Pharm</span>
      </div>
    </footer>
  );
}
