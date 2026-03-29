import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t } from "@/lib/i18n";
import { getProducts } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang, product: slug } = await params;
  const products = await getProducts();
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name[lang]} | GrossLINE Pharm`,
    description: p.action[lang],
    openGraph: {
      title: `${p.name[lang]} | GrossLINE Pharm`,
      description: p.subtitle[lang],
      images: [p.image],
    },
  };
}

export default async function ProductPage({ params }) {
  const { lang, product: slug } = await params;
  const tr = t[lang];
  const products = await getProducts();
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();

  const others = products.filter((x) => x.slug !== slug).slice(0, 4);

  return (
    <>
      <Header lang={lang} active="products" />
      <main style={{ flex: 1 }}>
        <div className="page-hero" style={{ padding: "40px 24px" }}>
          <h1 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>{p.name[lang]}</h1>
          <p>{p.subtitle[lang]}</p>
        </div>

        <section className="section">
          <div className="container">
            <div className="product-detail-grid" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 40, alignItems: "start" }}>

              {/* Sidebar: image + back */}
              <div style={{ textAlign: "center" }}>
                <div style={{ background: "#f7f8fa", border: "1px solid #e8ecf0", borderRadius: 8, padding: 24, marginBottom: 16 }}>
                  <img src={p.image} alt={p.name[lang]} style={{ maxHeight: 260, objectFit: "contain", width: "100%" }} />
                </div>
                <Link href={`/${lang}/all-products`} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1a56db", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
                  ← {tr.allProducts}
                </Link>

                {/* Other products */}
                {others.length > 0 && (
                  <div style={{ marginTop: 28, textAlign: "left" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
                      {lang === "ru" ? "Другие продукты" : lang === "en" ? "Other products" : "Boshqa mahsulotlar"}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {others.map((op) => (
                        <Link key={op.id} href={`/${lang}/${op.slug}`} style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none", padding: "8px 10px", borderRadius: 8, background: "#f7f8fa", border: "1px solid #e8ecf0" }}>
                          <img src={op.image} alt={op.name[lang]} style={{ width: 38, height: 38, objectFit: "contain" }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#1c1c1e" }}>{op.name[lang]}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div style={{ background: "#fff", borderRadius: 10, padding: "28px 32px", border: "1px solid #e8ecf0", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
                <Section title={tr.action} content={p.action[lang]} />
                <Section title={tr.composition}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {p.composition[lang].map((c, i) => (
                      <li key={i} style={{ marginBottom: 7, fontSize: 14, lineHeight: 1.65, color: "#555" }}>{c}</li>
                    ))}
                  </ul>
                </Section>
                <Section title={tr.indications} content={p.indications[lang]} />
                <Section title={tr.contraindications} content={p.contraindications[lang]} />
                <Section title={tr.dosing} content={p.dosing[lang]} />
                <Section title={tr.storage} content={p.storage[lang]} last />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

function Section({ title, content, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 22, borderBottom: last ? "none" : "1px solid #e8ecf0", paddingBottom: last ? 0 : 18 }}>
      <h3 style={{ fontSize: 11, fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>
        {title}
      </h3>
      {content && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#555" }}>{content}</p>}
      {children}
    </div>
  );
}
