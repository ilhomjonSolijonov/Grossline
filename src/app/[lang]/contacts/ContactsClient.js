"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t } from "@/lib/i18n";

const labels = {
  ru: {
    title: "КОНТАКТЫ", sectionTitle: "Контактная информация", formTitle: "Напишите нам",
    namePh: "Ваше имя", emailPh: "Ваш email", msgPh: "Сообщение", submit: "Отправить", sending: "Отправка…",
    sent: "Сообщение отправлено! Спасибо.", error: "Не удалось отправить сообщение. Попробуйте ещё раз или позвоните нам.",
    address: "Республика Узбекистан, Ташкентская обл., Зангиатинский район, улица Рамадон дом 40",
  },
  en: {
    title: "CONTACTS", sectionTitle: "Contact Information", formTitle: "Write to us",
    namePh: "Your name", emailPh: "Your email", msgPh: "Message", submit: "Send", sending: "Sending…",
    sent: "Message sent! Thank you.", error: "Failed to send the message. Please try again or call us.",
    address: "Republic of Uzbekistan, Tashkent region, Zangiata district, Ramadon street 40",
  },
  uz: {
    title: "KONTAKTLAR", sectionTitle: "Kontakt ma'lumotlari", formTitle: "Bizga yozing",
    namePh: "Ismingiz", emailPh: "Emailingiz", msgPh: "Xabar", submit: "Yuborish", sending: "Yuborilmoqda…",
    sent: "Xabar yuborildi! Rahmat.", error: "Xabarni yuborib bo'lmadi. Qaytadan urinib ko'ring yoki bizga qo'ng'iroq qiling.",
    address: "O'zbekiston Respublikasi, Toshkent viloyati, Zangiota tumani, Ramadon ko'chasi 40",
  },
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
  const lb = labels[lang] || labels.ru;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const contacts = [
    { icon: "📍", label: tr.address, value: lb.address, href: null },
    { icon: "📞", label: tr.phone, value: "+998 95 177 17 71", href: "tel:+998951771771" },
    { icon: "✉️", label: tr.email, value: "info@grossline.uz", href: "mailto:info@grossline.uz" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

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
                <h2 style={{ fontSize: "1rem", marginBottom: 20, color: "#1c1c1e", fontWeight: 700 }}>{lb.sectionTitle}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {contacts.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "14px 16px", background: "#f7f8fa", border: "1px solid #e8ecf0", borderRadius: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#1a56db", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3 }}>{item.label}</div>
                        {item.href
                          ? <a href={item.href} style={{ fontSize: 14, color: "#1c1c1e", textDecoration: "none", fontWeight: 500 }}>{item.value}</a>
                          : <div style={{ fontSize: 14, color: "#555", lineHeight: 1.5 }}>{item.value}</div>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div style={{ background: "#fff", borderRadius: 10, padding: 28, border: "1px solid #e8ecf0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                <h2 style={{ fontSize: "1rem", marginBottom: 20, color: "#1c1c1e", fontWeight: 700 }}>{lb.formTitle}</h2>
                {status === "sent" ? (
                  <div style={{ background: "#f0f9f0", color: "#2e7d32", borderRadius: 8, padding: 24, textAlign: "center", fontWeight: 600, fontSize: 15 }}>
                    {lb.sent}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                      required style={inp} placeholder={lb.namePh}
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = "#1a56db"} onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                    <input
                      required type="email" style={inp} placeholder={lb.emailPh}
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = "#1a56db"} onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                    <textarea
                      required style={{ ...inp, height: 110, resize: "vertical" }} placeholder={lb.msgPh}
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={e => e.target.style.borderColor = "#1a56db"} onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                    />
                    {status === "error" && (
                      <div style={{ background: "#fff0f0", color: "#c00", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>{lb.error}</div>
                    )}
                    <button type="submit" className="btn-primary" style={{ padding: "12px" }} disabled={status === "sending"}>
                      {status === "sending" ? lb.sending : lb.submit}
                    </button>
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
