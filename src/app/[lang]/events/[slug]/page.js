import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        <div style={{ position: "relative", height: "min(420px, 55vw)", minHeight: 220, background: "#001a40", overflow: "hidden" }}>
          <img
            src={ev.image}
            alt={ev.title[lang]}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "32px 24px",
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 8, fontWeight: 500 }}>
                📅 {ev.date}
              </div>
              <h1 style={{
                margin: 0, color: "#fff",
                fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                fontWeight: 800, textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                lineHeight: 1.3,
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
                    color: "#0066cc", textDecoration: "none", fontSize: 14,
                    fontWeight: 600, marginBottom: 28,
                  }}
                >
                  ← {tr.allEvents}
                </Link>

                {/* Description */}
                <div style={{
                  background: "#fff", borderRadius: 12,
                  padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  marginBottom: 24,
                }}>
                  <p style={{
                    fontSize: 16, lineHeight: 1.9, color: "#444",
                    margin: 0,
                  }}>
                    {ev.description[lang]}
                  </p>
                </div>

                {/* Gallery — show main image large */}
                <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
                  <img
                    src={ev.image}
                    alt={ev.title[lang]}
                    style={{ width: "100%", display: "block", maxHeight: 400, objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Event info card */}
                <div style={{
                  background: "#fff", borderRadius: 12,
                  padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  marginBottom: 24, position: "sticky", top: 90,
                }}>
                  <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#0066cc", textTransform: "uppercase", letterSpacing: 1 }}>
                    {lang === "ru" ? "Информация" : lang === "en" ? "Event Info" : "Ma'lumot"}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>📅</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                          {lang === "ru" ? "Дата" : lang === "en" ? "Date" : "Sana"}
                        </div>
                        <div style={{ fontSize: 14, color: "#333" }}>{ev.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>🏢</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                          {lang === "ru" ? "Компания" : lang === "en" ? "Company" : "Kompaniya"}
                        </div>
                        <div style={{ fontSize: 14, color: "#333" }}>GrossLINE Pharm</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <Link href={`/${lang}/contacts`} className="btn-primary" style={{ width: "100%", textAlign: "center", display: "block", boxSizing: "border-box" }}>
                      {tr.contacts}
                    </Link>
                  </div>
                </div>

                {/* Related events */}
                {related.length > 0 && (
                  <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#0066cc", textTransform: "uppercase", letterSpacing: 1 }}>
                      {lang === "ru" ? "Другие события" : lang === "en" ? "Other Events" : "Boshqa tadbirlar"}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {related.map((r) => (
                        <Link key={r.id} href={`/${lang}/events/${r.slug}`} style={{ textDecoration: "none", display: "flex", gap: 12, alignItems: "center" }}>
                          <img src={r.image} alt={r.title[lang]} style={{ width: 60, height: 44, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#0d1b3e", lineHeight: 1.3 }}>{r.title[lang]}</div>
                            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{r.date}</div>
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
