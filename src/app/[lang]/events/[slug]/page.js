import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventGalleryCarousel from "@/components/EventGalleryCarousel";
import { t } from "@/lib/i18n";
import { getEvents } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const events = await getEvents();
  const ev = events.find((e) => e.slug === slug);
  if (!ev) return {};
  return {
    title: `${ev.title[lang]} | GrossLINE Pharm`,
    description: ev.description[lang],
    openGraph: {
      title: `${ev.title[lang]} | GrossLINE Pharm`,
      description: ev.description[lang],
      images: [ev.image],
    },
  };
}

export default async function EventDetailPage({ params }) {
  const { lang, slug } = await params;
  const tr = t[lang];
  const events = await getEvents();
  const ev = events.find((e) => e.slug === slug);
  if (!ev) notFound();

  // Get 2 other events for "related" section
  const related = events.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <>
      <Header lang={lang} active="events" />
      <main style={{ flex: 1 }}>

        {/* Hero with image */}
        <div style={{ position: "relative", height: "min(420px, 55vw)", minHeight: 220, background: "#1c2f4a", overflow: "hidden" }}>
          <img
            src={ev.image}
            alt={ev.title[lang]}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(28,47,74,0.85) 0%, rgba(28,47,74,0.2) 60%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "32px 24px",
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 10, fontWeight: 600, letterSpacing: "0.5px" }}>
                {ev.date}
              </div>
              <h1 style={{
                margin: 0, color: "#fff",
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                fontWeight: 700, lineHeight: 1.3,
              }}>
                {ev.title[lang]}
              </h1>
            </div>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }}>

              {/* Main content */}
              <div>
                {/* Back link */}
                <Link
                  href={`/${lang}/events`}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    color: "#1a56db", textDecoration: "none", fontSize: 14,
                    fontWeight: 600, marginBottom: 28,
                  }}
                >
                  ← {tr.allEvents}
                </Link>

                {/* Description */}
                <div style={{
                  background: "#fff", borderRadius: 8,
                  padding: 32, border: "1px solid #e8ecf0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  marginBottom: 20,
                }}>
                  <p style={{
                    fontSize: 16, lineHeight: 1.9, color: "#444",
                    margin: 0,
                  }}>
                    {ev.description[lang]}
                  </p>
                </div>

                {/* Gallery — carousel with multiple images */}
                <EventGalleryCarousel images={ev.images || [ev.image]} />
              </div>

              {/* Sidebar */}
              <div>
                {/* Event info card */}
                <div style={{
                  background: "#fff", borderRadius: 8,
                  padding: 24, border: "1px solid #e8ecf0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  marginBottom: 16, position: "sticky", top: 90,
                }}>
                  <h3 style={{ margin: "0 0 16px", fontSize: 11, fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {lang === "ru" ? "Информация" : lang === "en" ? "Event Info" : "Ma'lumot"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>📅</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                          {lang === "ru" ? "Дата" : lang === "en" ? "Date" : "Sana"}
                        </div>
                        <div style={{ fontSize: 14, color: "#1c1c1e" }}>{ev.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>🏢</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                          {lang === "ru" ? "Компания" : lang === "en" ? "Company" : "Kompaniya"}
                        </div>
                        <div style={{ fontSize: 14, color: "#1c1c1e" }}>GrossLINE Pharm</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <Link href={`/${lang}/contacts`} className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block", boxSizing: "border-box" }}>
                      {tr.contacts}
                    </Link>
                  </div>
                </div>

                {/* Related events */}
                {related.length > 0 && (
                  <div style={{ background: "#fff", borderRadius: 8, padding: 20, border: "1px solid #e8ecf0", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "1px" }}>
                      {lang === "ru" ? "Другие события" : lang === "en" ? "Other Events" : "Boshqa tadbirlar"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {related.map((r) => (
                        <Link key={r.id} href={`/${lang}/events/${r.slug}`} style={{ textDecoration: "none", display: "flex", gap: 12, alignItems: "center" }}>
                          <img src={r.image} alt={r.title[lang]} style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1c1e", lineHeight: 1.3 }}>{r.title[lang]}</div>
                            <div style={{ fontSize: 11, color: "#8e8e93", marginTop: 2 }}>{r.date}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
