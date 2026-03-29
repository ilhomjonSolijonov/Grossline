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
      images: ["http://grossline.dst.uz/sites/default/files/logo-header.png"],
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
        </div>
        <section className="section">
          <div className="container">
            <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {products.map((p) => (
                <Link key={p.id} href={`/${lang}/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ textAlign: "center", padding: "28px 16px" }}>
                    <img src={p.image} alt={p.name[lang]} style={{ height: 150, objectFit: "contain", marginBottom: 14 }} />
                    <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "#222" }}>{p.name[lang]}</h3>
                    <p style={{ fontSize: 12, color: "#888", margin: "0 0 14px", lineHeight: 1.4 }}>{p.subtitle[lang]}</p>
                    <span className="btn-primary" style={{ fontSize: 13 }}>{tr.more}</span>
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
