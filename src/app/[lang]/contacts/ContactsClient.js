"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t } from "@/lib/i18n";

const labels = {
  ru: { title: "КОНТАКТЫ", sectionTitle: "Контактная информация", formTitle: "Напишите нам", namePh: "Ваше имя", emailPh: "Ваш email", msgPh: "Сообщение", submit: "Отправить", sent: "Сообщение отправлено! Спасибо." },
  en: { title: "CONTACTS", sectionTitle: "Contact Information", formTitle: "Write to us", namePh: "Your name", emailPh: "Your email", msgPh: "Message", submit: "Send", sent: "Message sent! Thank you." },
  uz: { title: "KONTAKTLAR", sectionTitle: "Kontakt ma'lumotlari", formTitle: "Bizga yozing", namePh: "Ismingiz", emailPh: "Emailingiz", msgPh: "Xabar", submit: "Yuborish", sent: "Xabar yuborildi! Rahmat." },
};

const inp = {
  width: "100%", padding: "11px 14px",
  borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e5e7eb", borderRadius: 8,
  fontSize: 14, outline: "none", boxSizing: "border-box",
  background: "#fafafa", transition: "border-color 0.2s",
  fontFamily: "inherit",
};

export default function ContactsClient({ lang }) {
  const tr = t[lang];
  const lb = labels[lang];
  const [sent, setSent] = useState(false);

  const contacts = [
    { icon: "📍", label: tr.address, value: "Республика Узбекистан, Ташкентская обл., Зангиатинский район, улица Рамадон дом 40", href: null },
    { icon: "📞", label: tr.phone, value: "+998 71 200 07 71", href: "tel:+998712000771" },
    { icon: "📞", label: tr.phone, value: "+998 95 177 17 71", href: "tel:+998951771771" },
    { icon: "✉️", label: tr.email, value: "info@grossline.uz", href: "mailto:info@grossline.uz" },
  ];

  return (
    <>
      <Header lang={lang} active="contacts" />
      <main style={{ flex: 1 }}>
        <div className="page-hero"><h1>{lb.title}</h1></div>
        <section className="section">
          <div className="container">
            <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 40 }}>

              {/* Contact info */}
              <div>
                <h2 style={{ fontSize: "1.2rem", marginBottom: 20, color: "#0066cc", fontWeight: 700 }}>{lb.sectionTitle}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {contacts.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, padding: "16px 18px", background: "#f8f9ff", borderRadius: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#0066cc", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3 }}>{item.label}</div>
                        {item.href
                          ? <a href={item.href} style={{ fontSize: 14, color: "#333", textDecoration: "none", fontWeight: 500 }}>{item.value}</a>
                          : <div style={{ fontSize: 14, color: "#333" }}>{item.value}</div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 2px 16px rgba(0,0,0,0.09)" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: 20, color: "#0066cc", fontWeight: 700 }}>{lb.formTitle}</h2>
                {sent ? (
                  <div style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: 10, padding: 24, textAlign: "center", fontWeight: 600, fontSize: 15 }}>
                    ✅ {lb.sent}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input required style={inp} placeholder={lb.namePh} onFocus={e => e.target.style.borderColor="#0066cc"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <input required type="email" style={inp} placeholder={lb.emailPh} onFocus={e => e.target.style.borderColor="#0066cc"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <textarea required style={{ ...inp, height: 110, resize: "vertical" }} placeholder={lb.msgPh} onFocus={e => e.target.style.borderColor="#0066cc"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <button type="submit" className="btn-primary" style={{ padding: "12px" }}>{lb.submit}</button>
                  </form>
                )}
              </div>
            </div>

            {/* Map */}
            <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.1!2d69.2!3d41.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzAwLjAiTiA2OcKwMTInMDAuMCJF!5e0!3m2!1sen!2s!4v1"
                width="100%" height="360"
                style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
