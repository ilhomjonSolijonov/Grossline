"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const careerContent = {
  ru: {
    title: "КАРЬЕРА",
    jobTitle: "ТРЕБУЕТСЯ МЕДИЦИНСКИЙ ПРЕДСТАВИТЕЛЬ",
    intro: 'Национальная фармацевтическая компания "Grossline pharma" объявляет конкурс на вакансию медицинского представителя в связи с расширением бизнеса.',
    sections: [
      { heading: "Требования", items: ["Медицинское/фармацевтическое образование", "Опыт успешной работы медицинским представителем с практикующими врачами и медицинскими учреждениями"] },
      { heading: "Деловые и личностные качества", items: ["Нацеленность на результат, самомотивация", "Высокие коммуникативные навыки, умение убеждать", "Высокая личная ответственность, эмоциональная стабильность", "Инициативность и решительность"] },
      { heading: "Обязанности", items: ["Ежедневные визиты в медицинские учреждения (10) и розничные точки (2)", "Консультирование врачей по продукции компании", "Организация научно-маркетинговых мероприятий", "Реализация маркетинговых активностей", "Ведение отчётности"] },
      { heading: "Условия работы", items: ["Конкурентная заработная плата + квартальные бонусы", "Компенсация питания, мобильной связи и интернета", "ДМС, страхование жизни", "Корпоративное обучение", "Возможность карьерного роста"] },
    ],
    form: { title: "Отправить заявку", name: "Имя", lastName: "Фамилия", edu: "Образование", exp: "Опыт работы", phone: "Телефон", email: "Email", submit: "Отправить", sent: "Заявка отправлена! Мы свяжемся с вами." },
  },
  en: {
    title: "CAREER",
    jobTitle: "MEDICAL REPRESENTATIVE REQUIRED",
    intro: 'National pharmaceutical company "Grossline pharma" announces vacancy for Medical Representative due to business expansion.',
    sections: [
      { heading: "Requirements", items: ["Medical/pharmaceutical education", "Successful experience as Medical Representative with practicing doctors and medical institutions"] },
      { heading: "Business & personal qualities", items: ["Self-motivated, results-oriented", "High communication skills, persuasion ability", "High personal responsibility, emotional stability", "Initiative and determination"] },
      { heading: "Job duties", items: ["Daily visits to medical institutions (10) and retail points (2)", "Doctor consultations on company products", "Organization of scientific and marketing events", "Marketing activities implementation", "Report keeping"] },
      { heading: "Work conditions", items: ["Competitive salary + quarterly bonuses", "Food, mobile and internet compensation", "Health insurance, life insurance", "Corporate training", "Career development opportunity"] },
    ],
    form: { title: "Send application", name: "Name", lastName: "Last Name", edu: "Education", exp: "Work experience", phone: "Phone", email: "Email", submit: "Send", sent: "Application sent! We will contact you." },
  },
  uz: {
    title: "MARTABA",
    jobTitle: "TIBBIY VAKIL TALAB QILINADI",
    intro: '"Grossline pharma" milliy farmatsevtika kompaniyasi biznesni kengaytirish munosabati bilan tibbiy vakil lavozimiga tanlov e\'lon qiladi.',
    sections: [
      { heading: "Talablar", items: ["Tibbiy/farmatsevtik ta'lim", "Amaliyotchi shifokorlar bilan tibbiy vakil sifatida muvaffaqiyatli ish tajribasi"] },
      { heading: "Biznes va shaxsiy fazilatlar", items: ["Natijaga yo'naltirilganlik, o'z-o'zini motivatsiya qilish", "Yuqori kommunikatsiya ko'nikmalari", "Yuqori shaxsiy mas'uliyat, hissiy barqarorlik", "Tashabbuskorlik va qat'iyatlilik"] },
      { heading: "Vazifalar", items: ["Tibbiy muassasalarga (10) va chakana savdo nuqtalariga (2) kundalik tashriflar", "Shifokorlarni kompaniya mahsulotlari bo'yicha maslahat berish", "Ilmiy-marketing tadbirlarini tashkil etish", "Marketing faoliyatlarini amalga oshirish", "Hisobot yuritish"] },
      { heading: "Ish sharoitlari", items: ["Raqobatbardosh ish haqi + choraklik bonuslar", "Ovqat, mobil va internet uchun kompensatsiya", "Sog'liqni saqlash sug'urtasi", "Korporativ o'qitish", "Karera o'sishi imkoniyati"] },
    ],
    form: { title: "Ariza yuborish", name: "Ism", lastName: "Familiya", edu: "Ta'lim", exp: "Ish tajribasi", phone: "Telefon", email: "Email", submit: "Yuborish", sent: "Ariza yuborildi! Biz siz bilan bog'lanamiz." },
  },
};

const inp = {
  width: "100%", padding: "11px 14px",
  borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e5e7eb", borderRadius: 8,
  fontSize: 14, outline: "none", boxSizing: "border-box",
  background: "#fafafa", transition: "border-color 0.2s",
  fontFamily: "inherit",
};

export default function CareerClient({ lang }) {
  const c = careerContent[lang] || careerContent.ru;
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header lang={lang} active="career" />
      <main style={{ flex: 1 }}>
        <div className="page-hero"><h1>{c.title}</h1></div>
        <section className="section">
          <div className="container">
            <div className="career-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 40, alignItems: "start" }}>

              {/* Job info */}
              <div>
                <h2 style={{ color: "#1a56db", fontSize: "1rem", marginBottom: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>{c.jobTitle}</h2>
                <p style={{ color: "#555", lineHeight: 1.75, marginBottom: 28, fontSize: 15 }}>{c.intro}</p>
                {c.sections.map((s) => (
                  <div key={s.heading} style={{ marginBottom: 22 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1c1c1e", borderLeft: "3px solid #1a56db", paddingLeft: 10, margin: "0 0 10px" }}>{s.heading}</h3>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {s.items.map((item, i) => (
                        <li key={i} style={{ marginBottom: 7, fontSize: 14, color: "#555", lineHeight: 1.65 }}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Application form */}
              <div
                className="career-sticky"
                style={{ background: "#fff", borderRadius: 10, padding: 28, border: "1px solid #e8ecf0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", position: "sticky", top: 88 }}
              >
                <h3 style={{ margin: "0 0 20px", color: "#1c1c1e", fontSize: "1rem", fontWeight: 700 }}>{c.form.title}</h3>
                {sent ? (
                  <div style={{ background: "#f0f9f0", color: "#2e7d32", borderRadius: 8, padding: 20, textAlign: "center", fontWeight: 600, fontSize: 15 }}>
                    {c.form.sent}
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    <input required style={inp} placeholder={c.form.name} onFocus={e => e.target.style.borderColor="#1a56db"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <input required style={inp} placeholder={c.form.lastName} onFocus={e => e.target.style.borderColor="#1a56db"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <input required style={inp} placeholder={c.form.edu} onFocus={e => e.target.style.borderColor="#1a56db"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <textarea required style={{ ...inp, height: 78, resize: "vertical" }} placeholder={c.form.exp} onFocus={e => e.target.style.borderColor="#1a56db"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <input required style={inp} placeholder={c.form.phone} onFocus={e => e.target.style.borderColor="#1a56db"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <input required type="email" style={inp} placeholder={c.form.email} onFocus={e => e.target.style.borderColor="#1a56db"} onBlur={e => e.target.style.borderColor="#e5e7eb"} />
                    <button type="submit" className="btn-primary" style={{ marginTop: 4, padding: "12px" }}>{c.form.submit}</button>
                  </form>
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
