import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    ru: "О компании — GrossLINE Pharm",
    en: "About Company — GrossLINE Pharm",
    uz: "Kompaniya haqida — GrossLINE Pharm",
  };
  const descs = {
    ru: "Grossline Pharm — фармацевтическая компания, основанная в 2015 году. Более 210 сотрудников. Производство из натуральных растений.",
    en: "Grossline Pharm was founded in 2015. Today employs more than 210 employees. Medicines made from medicinal plants.",
    uz: "Grossline Pharm 2015 yilda tashkil etilgan. 210 dan ortiq xodim. Dorivor o'simliklardan tayyorlangan dori vositalari.",
  };
  return {
    title: titles[lang] || titles.ru,
    description: descs[lang] || descs.ru,
    openGraph: {
      title: titles[lang] || titles.ru,
      description: descs[lang] || descs.ru,
      images: ["http://grossline.dst.uz/sites/default/files/styles/bannerstyle/public/for_gros1.jpg?itok=w-ld4A20"],
    },
    alternates: { canonical: `https://grossline.uz/${lang}/o-kompanii` },
  };
}

const content = {
  ru: { title: "О КОМПАНИИ", body: ["Grossline Pharm была основана в 2015 году. Сегодня в компании работает более 210 сотрудников.", "Предприятие последовательно проводит политику, направленную на создание эффективного и безопасного производства, поддержание высоких стандартов качества производимых лекарств, используя возможности современных технологий и потенциал отечественной науки.", "Все лекарственные препараты изготовлены из различных лекарственных растений. Компоненты биологически активных добавок поставляются из Таджикистана, Казахстана, Афганистана и России.", "Grossline Pharm работает на благо здоровья людей рука об руку со специалистами из разных стран. Мы строим продвижение нашей продукции на максимальной осведомлённости врачей, фармацевтов и потребителей."] },
  en: { title: "ABOUT COMPANY", body: ["Grossline Pharm was founded in 2015. Today the company employs more than 210 employees.", "The enterprise consistently pursues a policy aimed at creating efficient and safe production, maintaining high standards of quality of produced medicines, using the capabilities of modern technologies and the potential of domestic science.", "All medicines are made from various medicinal plants. The components of dietary supplements are supplied from Tajikistan, Kazakhstan, Afghanistan and Russia.", "Grossline Pharm works for the benefit of people's health hand in hand with specialists from different countries."] },
  uz: { title: "KOMPANIYA HAQIDA", body: ["Grossline Pharm 2015 yilda tashkil etilgan. Bugun kompaniyada 210 dan ortiq xodim ishlaydi.", "Korxona samarali va xavfsiz ishlab chiqarishni yaratishga, zamonaviy texnologiyalar imkoniyatlaridan foydalangan holda ishlab chiqarilayotgan dori vositalarining yuqori sifat standartlarini saqlab turishga qaratilgan siyosatni izchil olib boradi.", "Barcha dori vositalari turli dorivor o'simliklardan tayyorlanadi. Biologik faol qo'shimchalar komponentlari Tojikiston, Qozog'iston, Afg'oniston va Rossiyadan yetkazib beriladi.", "Grossline Pharm turli mamlakatlardan kelgan mutaxassislar bilan birgalikda insonlar sog'lig'i uchun ishlaydi."] },
};

const stats = [
  { num: "2015", label: { ru: "Год основания", en: "Founded", uz: "Tashkil etilgan" } },
  { num: "210+", label: { ru: "Сотрудников", en: "Employees", uz: "Xodimlar" } },
  { num: "5",    label: { ru: "Продуктов", en: "Products", uz: "Mahsulotlar" } },
  { num: "4",    label: { ru: "Страны-поставщики", en: "Supply countries", uz: "Ta'minot mamlakatlari" } },
];

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const c = content[lang];

  return (
    <>
      <Header lang={lang} active="about" />
      <main style={{ flex: 1 }}>
        <div className="page-hero"><h1>{c.title}</h1></div>

        <div style={{ background: "#0066cc", color: "#fff" }}>
          <div className="container grid-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center", padding: "28px 24px", gap: 16 }}>
            {stats.map(s => (
              <div key={s.num} style={{ padding: "8px 0" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 800 }}>{s.num}</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>{s.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              <div>
                {c.body.map((para, i) => (
                  <p key={i} style={{ lineHeight: 1.8, color: "#555", fontSize: 15, marginBottom: 16 }}>{para}</p>
                ))}
              </div>
              <img
                src="http://grossline.dst.uz/sites/default/files/styles/bannerstyle/public/for_gros1.jpg?itok=w-ld4A20"
                alt="About Grossline"
                style={{ borderRadius: 12, width: "100%", objectFit: "cover", height: 340 }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
