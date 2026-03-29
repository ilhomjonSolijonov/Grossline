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
      images: ["http://grossline.dst.uz/sites/default/files/styles/bannerstyle/public/for_gros2.jpg?itok=-g-Em8w2"],
    },
    alternates: {
      canonical: `https://grossline.uz/${lang}`,
      languages: { ru: "/ru", en: "/en", uz: "/uz" },
    },
  };
}

const banners = [
  "http://grossline.dst.uz/sites/default/files/styles/bannerstyle/public/for_gros2.jpg?itok=-g-Em8w2",
  "http://grossline.dst.uz/sites/default/files/styles/bannerstyle/public/for_gros1.jpg?itok=w-ld4A20",
];

export default async function HomePage({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  const products = await getProducts();
  const events = await getEvents();

  const aboutText = {
    ru: "Grossline Pharm была основана в 2015 году. Сегодня в компании работает более 210 сотрудников. Предприятие последовательно проводит политику, направленную на создание эффективного и безопасного производства, поддержание высоких стандартов качества производимых лекарств.",
    en: "Grossline Pharm was founded in 2015. Today the company employs more than 210 employees. The enterprise consistently pursues a policy aimed at creating efficient and safe production, maintaining high standards of quality of produced medicines.",
    uz: "Grossline Pharm 2015 yilda tashkil etilgan. Bugun kompaniyada 210 dan ortiq xodim ishlaydi. Korxona samarali va xavfsiz ishlab chiqarishni yaratishga qaratilgan siyosatni izchil olib boradi.",
  };

  return (
    <>
      <Header lang={lang} active="home" />
      <main style={{ flex: 1 }}>

        {/* Hero */}
        <div style={{ position: "relative", overflow: "hidden", height: "min(480px, 60vw)", minHeight: 280, background: "#001a40" }}>
          <img src={banners[0]} alt="GrossLINE Pharm" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center", padding: "16px 24px" }}>
            <h1 style={{ fontSize: "clamp(1.6rem, 5vw, 2.8rem)", fontWeight: 800, margin: "0 0 16px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>GrossLINE Pharm</h1>
            <p style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", marginBottom: 28, maxWidth: 560, textShadow: "0 1px 4px rgba(0,0,0,0.5)", lineHeight: 1.5 }}>
              {lang === "ru" && "Качественные фармацевтические препараты из натуральных растений"}
              {lang === "en" && "Quality pharmaceutical products from natural plants"}
              {lang === "uz" && "Tabiiy o'simliklardan sifatli farmatsevtik preparatlar"}
            </p>
            <Link href={`/${lang}/all-products`} className="btn-primary" style={{ fontSize: 15, padding: "12px 28px" }}>{tr.allProducts}</Link>
          </div>
        </div>

        {/* About */}
        <section className="section" style={{ background: "#f8f9ff" }}>
          <div className="container">
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.7rem", color: "#0066cc", marginBottom: 16 }}>{tr.about}</h2>
                <p style={{ lineHeight: 1.8, color: "#555", fontSize: 15 }}>{aboutText[lang]}</p>
                <Link href={`/${lang}/o-kompanii`} className="btn-primary" style={{ marginTop: 24, display: "inline-block" }}>{tr.more}</Link>
              </div>
              <img src={banners[1]} alt="About" style={{ borderRadius: 12, objectFit: "cover", width: "100%", height: 300 }} />
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="section">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: "1.7rem", margin: 0 }}>{tr.products}</h2>
              <Link href={`/${lang}/all-products`} className="btn-outline">{tr.allProducts}</Link>
            </div>
            <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18 }}>
              {products.map(p => (
                <Link key={p.id} href={`/${lang}/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ textAlign: "center", padding: "20px 14px" }}>
                    <img src={p.image} alt={p.name[lang]} style={{ height: 120, objectFit: "contain", marginBottom: 10 }} />
                    <h3 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 6px", color: "#222" }}>{p.name[lang]}</h3>
                    <span style={{ fontSize: 12, color: "#0066cc", fontWeight: 600 }}>{tr.more} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="section" style={{ background: "#f8f9ff" }}>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: "1.7rem", margin: 0 }}>{tr.events}</h2>
              <Link href={`/${lang}/events`} className="btn-outline">{tr.allEvents}</Link>
            </div>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {events.slice(0, 3).map(ev => (
                <div key={ev.id} className="card">
                  <img src={ev.image} alt={ev.title[lang]} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                  <div style={{ padding: 18 }}>
                    <div style={{ fontSize: 12, color: "#999", marginBottom: 6 }}>{ev.date}</div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.4 }}>{ev.title[lang]}</h3>
                    <p style={{ fontSize: 13, color: "#666", margin: "0 0 10px", lineHeight: 1.5 }}>{ev.description[lang].slice(0, 90)}…</p>
                    <Link href={`/${lang}/events/${ev.slug}`} style={{ fontSize: 13, color: "#0066cc", fontWeight: 600, textDecoration: "none" }}>{tr.more} →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </>
  );
}
