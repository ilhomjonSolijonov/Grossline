import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = { ru: "О компании — GrossLINE Pharm", en: "About Company — GrossLINE Pharm", uz: "Kompaniya haqida — GrossLINE Pharm" };
  const descs = {
    ru: "Grossline Pharm — фармацевтическая компания, основанная в 2015 году. Более 210 сотрудников. Производство из натуральных растений.",
    en: "Grossline Pharm was founded in 2015. Today employs more than 210 employees. Medicines made from medicinal plants.",
    uz: "Grossline Pharm 2015 yilda tashkil etilgan. 210 dan ortiq xodim. Dorivor o'simliklardan tayyorlangan dori vositalari.",
  };
  return {
    title: titles[lang] || titles.ru,
    description: descs[lang] || descs.ru,
    openGraph: { title: titles[lang] || titles.ru, description: descs[lang] || descs.ru, images: ["/images/for_gros1.jpg"] },
    alternates: { canonical: `https://grossline.uz/${lang}/o-kompanii` },
  };
}

const content = {
  ru: {
    title: "О КОМПАНИИ",
    subtitle: "Фармацевтика с заботой о здоровье с 2015 года",
    body: [
      "Grossline Pharm была основана в 2015 году. Сегодня в компании работает более 210 сотрудников.",
      "Предприятие последовательно проводит политику, направленную на создание эффективного и безопасного производства, поддержание высоких стандартов качества производимых лекарств, используя возможности современных технологий и потенциал отечественной науки.",
      "Все лекарственные препараты изготовлены из различных лекарственных растений. Компоненты биологически активных добавок поставляются из Таджикистана, Казахстана, Афганистана и России.",
      "Grossline Pharm работает на благо здоровья людей рука об руку со специалистами из разных стран. Мы строим продвижение нашей продукции на максимальной осведомлённости врачей, фармацевтов и потребителей.",
    ],
  },
  en: {
    title: "ABOUT COMPANY",
    subtitle: "Pharmaceutical care for health since 2015",
    body: [
      "Grossline Pharm was founded in 2015. Today the company employs more than 210 employees.",
      "The enterprise consistently pursues a policy aimed at creating efficient and safe production, maintaining high standards of quality of produced medicines, using the capabilities of modern technologies and the potential of domestic science.",
      "All medicines are made from various medicinal plants. The components of dietary supplements are supplied from Tajikistan, Kazakhstan, Afghanistan and Russia.",
      "Grossline Pharm works for the benefit of people's health hand in hand with specialists from different countries.",
    ],
  },
  uz: {
    title: "KOMPANIYA HAQIDA",
    subtitle: "2015 yildan beri sog'liqqa g'amxo'rlik farmatsevtikasi",
    body: [
      "Grossline Pharm 2015 yilda tashkil etilgan. Bugun kompaniyada 210 dan ortiq xodim ishlaydi.",
      "Korxona samarali va xavfsiz ishlab chiqarishni yaratishga, zamonaviy texnologiyalar imkoniyatlaridan foydalangan holda ishlab chiqarilayotgan dori vositalarining yuqori sifat standartlarini saqlab turishga qaratilgan siyosatni izchil olib boradi.",
      "Barcha dori vositalari turli dorivor o'simliklardan tayyorlanadi. Biologik faol qo'shimchalar komponentlari Tojikiston, Qozog'iston, Afg'oniston va Rossiyadan yetkazib beriladi.",
      "Grossline Pharm turli mamlakatlardan kelgan mutaxassislar bilan birgalikda insonlar sog'lig'i uchun ishlaydi.",
    ],
  },
};

const stats = [
  { num: "2015", label: { ru: "Год основания", en: "Year founded", uz: "Tashkil etilgan" } },
  { num: "210+", label: { ru: "Сотрудников", en: "Employees", uz: "Xodimlar" } },
  { num: "5",    label: { ru: "Продуктов", en: "Products", uz: "Mahsulotlar" } },
  { num: "4",    label: { ru: "Страны-партнёры", en: "Partner countries", uz: "Hamkor mamlakatlar" } },
];

const values = [
  { icon: "🌿", ru: "Натуральность", en: "Natural Origin", uz: "Tabiiylik" },
  { icon: "🔬", ru: "Инновации", en: "Innovation", uz: "Innovatsiya" },
  { icon: "🤝", ru: "Доверие", en: "Trust", uz: "Ishonch" },
  { icon: "❤️", ru: "Забота", en: "Care", uz: "G'amxo'rlik" },
];

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const c = content[lang] || content.ru;

  return (
    <>
      <Header lang={lang} active="about" />
      <main style={{ flex: 1 }}>
        <div className="page-hero">
          <h1>{c.title}</h1>
          <p style={{ marginTop: 12 }}>{c.subtitle}</p>
        </div>

        {/* Stats bar */}
        <section style={{ background: "#0d6efd" }}>
          <div className="container grid-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((s, i) => (
              <div key={s.num} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-1px" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 600, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Main content */}
        <section className="section">
          <div className="container">
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
              <div>
                <div className="section-label">{lang === "ru" ? "Наша история" : lang === "en" ? "Our story" : "Bizning tariximiz"}</div>
                <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "#0a1f5c", marginBottom: 24, letterSpacing: "-0.5px" }}>
                  {lang === "ru" && "Здоровье людей — наша главная цель"}
                  {lang === "en" && "People's health is our main goal"}
                  {lang === "uz" && "Odamlar salomatligi — bizning asosiy maqsadimiz"}
                </h2>
                {c.body.map((para, i) => (
                  <p key={i} style={{ fontSize: 15, lineHeight: 1.85, color: "#4a5176", marginBottom: 16 }}>{para}</p>
                ))}
              </div>

              <div>
                <img
                  src="/images/for_gros1.jpg"
                  alt="About GrossLINE"
                  style={{ borderRadius: 20, width: "100%", objectFit: "cover", height: 320, marginBottom: 24 }}
                />
                {/* Values */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {values.map(v => (
                    <div key={v.en} style={{ background: "#f8faff", border: "1px solid #eef0f8", borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 22 }}>{v.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0a1f5c" }}>{v[lang] || v.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission banner */}
        <section style={{ background: "linear-gradient(135deg, #0a1f5c 0%, #0d6efd 100%)", padding: "56px 32px" }}>
          <div className="container" style={{ textAlign: "center", maxWidth: 640 }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🏥</div>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.3px" }}>
              {lang === "ru" && "Наша миссия"}
              {lang === "en" && "Our mission"}
              {lang === "uz" && "Bizning missiyamiz"}
            </h3>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              {lang === "ru" && "Обеспечение населения высококачественными, доступными и безопасными лекарственными препаратами на растительной основе для улучшения качества жизни каждого человека."}
              {lang === "en" && "Providing the population with high-quality, affordable and safe plant-based medicines to improve the quality of life of every person."}
              {lang === "uz" && "Aholini har bir insonning hayot sifatini yaxshilash uchun yuqori sifatli, arzon va xavfsiz o'simlik asosidagi dori vositalarini taqdim etish."}
            </p>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
