import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t } from "@/lib/i18n";
import { getEvents } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  return {
    title: `${tr.events} | GrossLINE Pharm`,
    description: lang === "ru"
      ? "Все события и мероприятия компании GrossLINE Pharm."
      : lang === "en"
      ? "All events and activities of GrossLINE Pharm company."
      : "GrossLINE Pharm kompaniyasining barcha tadbirlari.",
    openGraph: {
      title: `${tr.events} | GrossLINE Pharm`,
      images: ["http://grossline.dst.uz/sites/default/files/logo-header.png"],
    },
  };
}

export default async function EventsPage({ params }) {
  const { lang } = await params;
  const tr = t[lang];
  const events = await getEvents();

  return (
    <>
      <Header lang={lang} active="events" />
      <main style={{ flex: 1 }}>
        <div className="page-hero">
          <h1>{tr.events}</h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {events.map((ev) => (
                <Link key={ev.id} href={`/${lang}/events/${ev.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <img src={ev.image} alt={ev.title[lang]} style={{ width: "100%", height: 210, objectFit: "cover" }} />
                    <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>{ev.date}</div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4, color: "#0d1b3e" }}>{ev.title[lang]}</h3>
                      <p style={{ fontSize: 13, color: "#666", margin: "0 0 14px", lineHeight: 1.6, flex: 1 }}>
                        {ev.description[lang].slice(0, 100)}{ev.description[lang].length > 100 ? "…" : ""}
                      </p>
                      <span style={{ fontSize: 13, color: "#0066cc", fontWeight: 600 }}>{tr.more} →</span>
                    </div>
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
