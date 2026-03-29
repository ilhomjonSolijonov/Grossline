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
    description: lang === "ru" ? "Все события и мероприятия компании GrossLINE Pharm." : lang === "en" ? "All events and activities of GrossLINE Pharm company." : "GrossLINE Pharm kompaniyasining barcha tadbirlari.",
    openGraph: { title: `${tr.events} | GrossLINE Pharm`, images: ["/images/logo-header.png"] },
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
          <p style={{ marginTop: 12 }}>
            {lang === "ru" && "Корпоративные мероприятия и события компании"}
            {lang === "en" && "Corporate events and company news"}
            {lang === "uz" && "Korporativ tadbirlar va kompaniya yangiliklari"}
          </p>
        </div>
        <section className="section" style={{ background: "#f8faff" }}>
          <div className="container">
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {events.map((ev) => (
                <Link key={ev.id} href={`/${lang}/events/${ev.slug}`} style={{ textDecoration: "none", display: "flex" }}>
                  <div className="event-card" style={{ width: "100%" }}>
                    <div className="img-zoom-wrap" style={{ position: "relative" }}>
                      <img src={ev.image} alt={ev.title[lang]} style={{ width: "100%", height: 210, objectFit: "cover" }} />
                      <div style={{ position: "absolute", top: 14, left: 14, background: "#0d6efd", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
                        {ev.date}
                      </div>
                    </div>
                    <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0a1f5c", marginBottom: 10, lineHeight: 1.45 }}>{ev.title[lang]}</h3>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, flex: 1, marginBottom: 18 }}>
                        {ev.description[lang].slice(0, 110)}{ev.description[lang].length > 110 ? "…" : ""}
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
      </main>
      <Footer lang={lang} />
    </>
  );
}
