import CareerClient from "./CareerClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    ru: "Карьера — GrossLINE Pharm",
    en: "Career — GrossLINE Pharm",
    uz: "Martaba — GrossLINE Pharm",
  };
  const descs = {
    ru: "Вакансии в GrossLINE Pharm. Присоединяйтесь к нашей команде — медицинский представитель и другие вакансии.",
    en: "Job vacancies at GrossLINE Pharm. Join our team — Medical Representative and other positions.",
    uz: "GrossLINE Pharm'da bo'sh ish o'rinlari. Bizning jamoamizga qo'shiling — tibbiy vakil va boshqa lavozimlar.",
  };
  return {
    title: titles[lang] || titles.ru,
    description: descs[lang] || descs.ru,
    openGraph: {
      title: titles[lang] || titles.ru,
      description: descs[lang] || descs.ru,
    },
    alternates: { canonical: `https://grossline.uz/${lang}/career` },
  };
}

export default async function CareerPage({ params }) {
  const { lang } = await params;
  return <CareerClient lang={lang} />;
}
