import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t } from "@/lib/i18n";
import { getProducts } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  return {
    title: `${tr.allProducts} | GrossLINE Pharm`,
    description: lang === "ru"
      ? "Все фармацевтические продукты GrossLINE Pharm — натуральные растительные сиропы для здоровья."
      : lang === "en"
      ? "All GrossLINE Pharm pharmaceutical products — natural herbal syrups for health."
      : "GrossLINE Pharm barcha farmatsevtik mahsulotlari — salomatlik uchun tabiiy o'simlik siroplaari.",
    openGraph: {
      title: `${tr.allProducts} | GrossLINE Pharm`,
      images: ["/images/logo-header.png"],
    },
  };
}

export default async function AllProductsPage({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  const products = await getProducts();

  return (
    <>
      <Header lang={lang} active="products" />
      <main style={{ flex: 1 }}>
        <div className="page-hero">
          <h1>{tr.allProducts}</h1>
          <p style={{ marginTop: 12 }}>
            {lang === "ru" && "Натуральные растительные препараты для вашего здоровья"}
            {lang === "en" && "Natural herbal medicines for your health"}
            {lang === "uz" && "Sog'ligingiz uchun tabiiy o'simlik dori vositalari"}
          </p>
        </div>
        <section className="section" style={{ background: "#f7f8fa" }}>
          <div className="container">
            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {products.map((p) => (
                <Link key={p.id} href={`/${lang}/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="product-card" style={{ height: "100%" }}>
                    <div className="product-card-img-wrap">
                      <img src={p.image} alt={p.name[lang]} style={{ height: 100, objectFit: "contain" }} />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1c1c1e", marginBottom: 6 }}>{p.name[lang]}</h3>
                    <p style={{ fontSize: 12, color: "#8e8e93", lineHeight: 1.55, marginBottom: 16, flex: 1 }}>{p.subtitle[lang]}</p>
                    <span style={{ fontSize: 12, color: "#1a56db", fontWeight: 600 }}>{tr.more} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
