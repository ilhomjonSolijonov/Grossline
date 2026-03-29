import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t } from "@/lib/i18n";
import { getProducts, getEvents } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    ru: "GrossLINE Pharm — Фармацевтическая компания Узбекистана",
    en: "GrossLINE Pharm — Pharmaceutical Company of Uzbekistan",
    uz: "GrossLINE Pharm — O'zbekiston farmatsevtika kompaniyasi",
  };
  const descs = {
    ru: "GrossLINE Pharm — фармацевтическая компания, основанная в 2015 году. Более 210 сотрудников. Качественные препараты из натуральных растений.",
    en: "GrossLINE Pharm — pharmaceutical company founded in 2015. Over 210 employees. Quality medicines from natural plants.",
    uz: "GrossLINE Pharm — 2015 yilda tashkil etilgan farmatsevtika kompaniyasi. 210 dan ortiq xodim.",
  };
  return {
    title: titles[lang] || titles.ru,
    description: descs[lang] || descs.ru,
    openGraph: { title: titles[lang] || titles.ru, description: descs[lang] || descs.ru, images: ["/images/for_gros2.jpg"] },
    alternates: { canonical: `https://grossline.uz/${lang}`, languages: { ru: "/ru", en: "/en", uz: "/uz" } },
  };
}

const stats = [
  { num: "2015", label: { ru: "Год основания", en: "Founded", uz: "Tashkil etilgan" } },
  { num: "210+", label: { ru: "Сотрудников", en: "Employees", uz: "Xodimlar" } },
  { num: "5",    label: { ru: "Продуктов", en: "Products", uz: "Mahsulotlar" } },
  { num: "4+",   label: { ru: "Рынков сбыта", en: "Markets", uz: "Bozorlar" } },
];

export default async function HomePage({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  const products = await getProducts();
  const events = await getEvents();

  const aboutText = {
    ru: "Grossline Pharm основана в 2015 году. Сегодня в компании работает более 210 сотрудников. Все препараты изготовлены из натуральных лекарственных растений с применением современных технологий и строгого контроля качества.",
    en: "Grossline Pharm was founded in 2015. Today the company employs more than 210 people. All medicines are made from natural medicinal plants using modern technologies and strict quality control.",
    uz: "Grossline Pharm 2015 yilda tashkil etilgan. Bugun kompaniyada 210 dan ortiq xodim ishlaydi. Barcha dori vositalari zamonaviy texnologiyalar va qat'iy sifat nazorati yordamida tabiiy dorivor o'simliklardan tayyorlanadi.",
  };

  return (
    <>
      <Header lang={lang} active="home" />
      <main style={{ flex: 1 }}>

        {/* HERO — full photo */}
        <section style={{ position: "relative", height: "min(560px, 70vw)", minHeight: 320, overflow: "hidden" }}>
          <img
            src="/images/for_gros2.jpg"
            alt="GrossLINE Pharm"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,47,74,0.85) 0%, rgba(28,47,74,0.4) 60%, transparent 100%)" }} />
          <div className="container" style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: 560, color: "#fff" }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 14 }}>
                GrossLINE Pharm
              </p>
              <h1 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 18, letterSpacing: "-0.5px" }}>
                {lang === "ru" && <>Препараты из<br />натуральных растений</>}
                {lang === "en" && <>Medicines from<br />natural plants</>}
                {lang === "uz" && <>Tabiiy o'simliklardan<br />dori vositalari</>}
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                {lang === "ru" && "Качество и безопасность — основа каждого нашего препарата с 2015 года."}
                {lang === "en" && "Quality and safety are the foundation of every medicine we make since 2015."}
                {lang === "uz" && "Sifat va xavfsizlik — 2015 yildan beri har bir dori vositamizning asosi."}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`/${lang}/all-products`} className="btn-white">{tr.allProducts}</Link>
                <Link href={`/${lang}/o-kompanii`} className="btn-ghost">{tr.about}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ background: "#1c2f4a", borderBottom: "1px solid #243650" }}>
          <div className="container grid-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "24px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 5, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="section">
          <div className="container">
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#1a56db", marginBottom: 12 }}>
                  {lang === "ru" ? "О компании" : lang === "en" ? "About us" : "Kompaniya haqida"}
                </p>
                <h2 style={{ fontSize: "clamp(1.5rem, 2.8vw, 1.9rem)", fontWeight: 700, color: "#1c1c1e", marginBottom: 16, lineHeight: 1.3, letterSpacing: "-0.3px" }}>
                  {lang === "ru" && "Здоровье — наш главный приоритет"}
                  {lang === "en" && "Health is our main priority"}
                  {lang === "uz" && "Sog'liq — bizning asosiy ustuvorligimiz"}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 28 }}>{aboutText[lang]}</p>
                <Link href={`/${lang}/o-kompanii`} className="btn-primary">{tr.more}</Link>
              </div>
              <img
                src="/images/for_gros1.jpg"
                alt="About GrossLINE"
                style={{ borderRadius: 8, width: "100%", height: 340, objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section" style={{ background: "#f7f8fa" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#1a56db", marginBottom: 6 }}>
                  {lang === "ru" ? "Продукция" : lang === "en" ? "Products" : "Mahsulotlar"}
                </p>
                <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "#1c1c1e", letterSpacing: "-0.3px" }}>{tr.products}</h2>
              </div>
              <Link href={`/${lang}/all-products`} className="btn-outline">{tr.allProducts}</Link>
            </div>
            <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 18 }}>
              {products.map(p => (
                <Link key={p.id} href={`/${lang}/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="product-card">
                    <div className="product-card-img-wrap">
                      <img src={p.image} alt={p.name[lang]} style={{ height: 90, objectFit: "contain" }} />
                    </div>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1c1c1e", marginBottom: 5 }}>{p.name[lang]}</h3>
                    <p style={{ fontSize: 11, color: "#8e8e93", lineHeight: 1.5, marginBottom: 14, flex: 1 }}>{p.subtitle[lang]}</p>
                    <span style={{ fontSize: 12, color: "#1a56db", fontWeight: 600 }}>{tr.more} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section className="section">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#1a56db", marginBottom: 6 }}>
                  {lang === "ru" ? "События" : lang === "en" ? "Events" : "Tadbirlar"}
                </p>
                <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "#1c1c1e", letterSpacing: "-0.3px" }}>{tr.events}</h2>
              </div>
              <Link href={`/${lang}/events`} className="btn-outline">{tr.allEvents}</Link>
            </div>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
              {events.slice(0, 3).map(ev => (
                <Link key={ev.id} href={`/${lang}/events/${ev.slug}`} style={{ textDecoration: "none", display: "flex" }}>
                  <div className="event-card" style={{ width: "100%" }}>
                    <div className="img-zoom-wrap">
                      <img src={ev.image} alt={ev.title[lang]} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: 11, color: "#8e8e93", fontWeight: 600, marginBottom: 8 }}>{ev.date}</span>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1c1c1e", marginBottom: 8, lineHeight: 1.4 }}>{ev.title[lang]}</h3>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, flex: 1, marginBottom: 14 }}>
                        {ev.description[lang].slice(0, 90)}{ev.description[lang].length > 90 ? "…" : ""}
                      </p>
                      <span style={{ fontSize: 13, color: "#1a56db", fontWeight: 600 }}>{tr.more} →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#1c2f4a", padding: "56px 32px" }}>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {lang === "ru" && "Остались вопросы?"}
                {lang === "en" && "Any questions?"}
                {lang === "uz" && "Savollaringiz bormi?"}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>
                {lang === "ru" && "Свяжитесь с нами — ответим на все вопросы."}
                {lang === "en" && "Contact us — we'll answer all your questions."}
                {lang === "uz" && "Biz bilan bog'laning — barcha savollaringizga javob beramiz."}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={`/${lang}/contacts`} className="btn-white">{tr.contacts}</Link>
              <a href="tel:+998712000771" className="btn-ghost">+998 71 200 07 71</a>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </>
  );
}
