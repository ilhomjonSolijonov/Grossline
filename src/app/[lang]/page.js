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
    uz: "GrossLINE Pharm — 2015 yilda tashkil etilgan farmatsevtika kompaniyasi. 210 dan ortiq xodim. Tabiiy o'simliklardan sifatli dori vositalari.",
  };
  return {
    title: titles[lang] || titles.ru,
    description: descs[lang] || descs.ru,
    openGraph: {
      title: titles[lang] || titles.ru,
      description: descs[lang] || descs.ru,
      images: ["/images/for_gros2.jpg"],
    },
    alternates: {
      canonical: `https://grossline.uz/${lang}`,
      languages: { ru: "/ru", en: "/en", uz: "/uz" },
    },
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  const products = await getProducts();
  const events = await getEvents();

  const aboutText = {
    ru: "Grossline Pharm основана в 2015 году. Сегодня в компании работает более 210 сотрудников. Предприятие последовательно проводит политику, направленную на создание эффективного и безопасного производства, поддерживая высокие стандарты качества лекарственных препаратов из натуральных растений.",
    en: "Grossline Pharm was founded in 2015. Today the company employs more than 210 people. We consistently pursue policies aimed at creating efficient, safe production while maintaining high standards of quality for medicines derived from natural plants.",
    uz: "Grossline Pharm 2015 yilda tashkil etilgan. Bugun kompaniyada 210 dan ortiq xodim ishlaydi. Korxona tabiiy o'simliklardan sifatli dori vositalarini ishlab chiqarishga qaratilgan siyosatni izchil olib boradi.",
  };

  const features = [
    { icon: "🌿", title: { ru: "Натуральный состав", en: "Natural Composition", uz: "Tabiiy tarkib" }, desc: { ru: "Только растительные компоненты из экологически чистых регионов", en: "Only plant-based components from ecologically clean regions", uz: "Faqat ekologik toza hududlardan olingan o'simlik komponentlari" } },
    { icon: "🔬", title: { ru: "Научный подход", en: "Scientific Approach", uz: "Ilmiy yondashuv" }, desc: { ru: "Разработки в сотрудничестве с ведущими учёными отрасли", en: "Developed in collaboration with leading industry scientists", uz: "Soha yetakchi olimlari bilan hamkorlikda ishlab chiqilgan" } },
    { icon: "✅", title: { ru: "Контроль качества", en: "Quality Control", uz: "Sifat nazorati" }, desc: { ru: "Строгий контроль на каждом этапе производства", en: "Strict control at every stage of production", uz: "Ishlab chiqarishning har bosqichida qat'iy nazorat" } },
    { icon: "🌍", title: { ru: "Международные стандарты", en: "International Standards", uz: "Xalqaro standartlar" }, desc: { ru: "Соответствие GMP и международным требованиям", en: "Compliance with GMP and international requirements", uz: "GMP va xalqaro talablarga muvofiqlik" } },
  ];

  const stats = [
    { num: "2015", label: { ru: "Год основания", en: "Founded", uz: "Tashkil etilgan" } },
    { num: "210+", label: { ru: "Сотрудников", en: "Employees", uz: "Xodimlar" } },
    { num: "5", label: { ru: "Продуктов", en: "Products", uz: "Mahsulotlar" } },
    { num: "4+", label: { ru: "Страны сбыта", en: "Markets", uz: "Bozorlar" } },
  ];

  return (
    <>
      <Header lang={lang} active="home" />
      <main style={{ flex: 1 }}>

        {/* ── HERO ── */}
        <section style={{ position: "relative", minHeight: "min(580px, 80vw)", display: "flex", alignItems: "center", background: "#0a1f5c", overflow: "hidden" }}>
          <img
            src="/images/for_gros2.jpg"
            alt="GrossLINE Pharm"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }}
          />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #0a1f5c 40%, rgba(13,110,253,0.7) 100%)" }} />

          <div className="container" style={{ position: "relative", zIndex: 2, padding: "80px 32px" }}>
            <div style={{ maxWidth: 620 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,168,120,0.15)", border: "1px solid rgba(0,168,120,0.35)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00a878", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#00e0a1", letterSpacing: "1px", textTransform: "uppercase" }}>
                  {lang === "ru" ? "Фармацевтика нового поколения" : lang === "en" ? "Next Generation Pharmaceutics" : "Yangi avlod farmatsevtikasi"}
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-1px" }}>
                GrossLINE<br />
                <span style={{ color: "#60a5fa" }}>Pharm</span>
              </h1>
              <p style={{ fontSize: "clamp(15px, 2.5vw, 17px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
                {lang === "ru" && "Качественные фармацевтические препараты из натуральных растений. Здоровье — наш приоритет."}
                {lang === "en" && "Quality pharmaceutical products from natural plants. Your health is our priority."}
                {lang === "uz" && "Tabiiy o'simliklardan sifatli farmatsevtik preparatlar. Sog'liq — bizning ustuvorligimiz."}
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href={`/${lang}/all-products`} className="btn-white">
                  {tr.allProducts}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href={`/${lang}/o-kompanii`} className="btn-ghost">
                  {tr.about}
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative circle */}
          <div style={{ position: "absolute", right: "-80px", top: "50%", transform: "translateY(-50%)", width: 520, height: 520, borderRadius: "50%", background: "rgba(13,110,253,0.12)", border: "1px solid rgba(96,165,250,0.15)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", width: 360, height: 360, borderRadius: "50%", background: "rgba(13,110,253,0.08)", border: "1px solid rgba(96,165,250,0.1)", pointerEvents: "none" }} />
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background: "#0d6efd" }}>
          <div className="container grid-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 600, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="section" style={{ background: "#f8faff" }}>
          <div className="container">
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
              <div>
                <div className="section-label">{lang === "ru" ? "О нас" : lang === "en" ? "About us" : "Biz haqimizda"}</div>
                <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: "#0a1f5c", marginBottom: 20, letterSpacing: "-0.5px", lineHeight: 1.25 }}>
                  {lang === "ru" && "Качество. Наука. Забота о здоровье."}
                  {lang === "en" && "Quality. Science. Care for health."}
                  {lang === "uz" && "Sifat. Fan. Sog'liqqa g'amxo'rlik."}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.85, color: "#4a5176", marginBottom: 28 }}>{aboutText[lang]}</p>
                <Link href={`/${lang}/o-kompanii`} className="btn-primary">{tr.more}</Link>
              </div>
              <div style={{ position: "relative" }}>
                <img
                  src="/images/for_gros1.jpg"
                  alt="About GrossLINE"
                  style={{ borderRadius: 20, width: "100%", height: 380, objectFit: "cover", display: "block" }}
                />
                {/* Accent box */}
                <div style={{ position: "absolute", bottom: -20, left: -20, background: "#0d6efd", color: "#fff", borderRadius: 16, padding: "18px 24px", boxShadow: "0 8px 32px rgba(13,110,253,0.35)" }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, lineHeight: 1 }}>210+</div>
                  <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4, fontWeight: 600 }}>
                    {lang === "ru" ? "Сотрудников" : lang === "en" ? "Employees" : "Xodimlar"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>
                {lang === "ru" ? "Наши преимущества" : lang === "en" ? "Our advantages" : "Bizning ustunliklarimiz"}
              </div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#0a1f5c", letterSpacing: "-0.5px" }}>
                {lang === "ru" && "Почему выбирают GrossLINE?"}
                {lang === "en" && "Why choose GrossLINE?"}
                {lang === "uz" && "Nima uchun GrossLINE?"}
              </h2>
            </div>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0a1f5c", marginBottom: 6 }}>{f.title[lang]}</h3>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="section" style={{ background: "#f8faff" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="section-label">{lang === "ru" ? "Продукция" : lang === "en" ? "Products" : "Mahsulotlar"}</div>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#0a1f5c", letterSpacing: "-0.5px" }}>{tr.products}</h2>
              </div>
              <Link href={`/${lang}/all-products`} className="btn-outline">{tr.allProducts}</Link>
            </div>
            <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
              {products.map(p => (
                <Link key={p.id} href={`/${lang}/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="product-card">
                    <div className="product-card-img-wrap">
                      <img src={p.image} alt={p.name[lang]} style={{ height: 100, objectFit: "contain" }} />
                    </div>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: "#0a1f5c", marginBottom: 6, letterSpacing: "0.3px" }}>{p.name[lang]}</h3>
                    <p style={{ fontSize: 11, color: "#8896b3", lineHeight: 1.5, marginBottom: 14, flex: 1 }}>{p.subtitle[lang]}</p>
                    <span style={{ fontSize: 12, color: "#0d6efd", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      {tr.more}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── EVENTS ── */}
        <section className="section">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="section-label">{lang === "ru" ? "Новости" : lang === "en" ? "News" : "Yangiliklar"}</div>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#0a1f5c", letterSpacing: "-0.5px" }}>{tr.events}</h2>
              </div>
              <Link href={`/${lang}/events`} className="btn-outline">{tr.allEvents}</Link>
            </div>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {events.slice(0, 3).map(ev => (
                <Link key={ev.id} href={`/${lang}/events/${ev.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}>
                  <div className="event-card">
                    <div className="img-zoom-wrap" style={{ position: "relative" }}>
                      <img src={ev.image} alt={ev.title[lang]} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                      <div style={{ position: "absolute", top: 14, left: 14, background: "#0d6efd", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
                        {ev.date}
                      </div>
                    </div>
                    <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0a1f5c", marginBottom: 10, lineHeight: 1.45 }}>{ev.title[lang]}</h3>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, flex: 1, marginBottom: 16 }}>
                        {ev.description[lang].slice(0, 90)}{ev.description[lang].length > 90 ? "…" : ""}
                      </p>
                      <span style={{ fontSize: 13, color: "#0d6efd", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                        {tr.more}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ background: "linear-gradient(135deg, #0a1f5c 0%, #0d6efd 100%)", padding: "64px 32px" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>
              {lang === "ru" && "Есть вопросы? Свяжитесь с нами"}
              {lang === "en" && "Have questions? Contact us"}
              {lang === "uz" && "Savollaringiz bormi? Biz bilan bog'laning"}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              {lang === "ru" && "Наши специалисты готовы ответить на все ваши вопросы о продукции."}
              {lang === "en" && "Our specialists are ready to answer all your questions about our products."}
              {lang === "uz" && "Bizning mutaxassislarimiz mahsulotlarimiz haqidagi barcha savollaringizga javob berishga tayyor."}
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
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
