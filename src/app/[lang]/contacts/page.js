import ContactsClient from "./ContactsClient";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    ru: "Контакты — GrossLINE Pharm",
    en: "Contacts — GrossLINE Pharm",
    uz: "Kontaktlar — GrossLINE Pharm",
  };
  const descs = {
    ru: "Свяжитесь с GrossLINE Pharm. Адрес: Ташкентская обл., Зангиатинский район, ул. Рамадон 40. Тел: +998 71 200 07 71.",
    en: "Contact GrossLINE Pharm. Address: Tashkent region, Zangiata district, Ramadon str. 40. Phone: +998 71 200 07 71.",
    uz: "GrossLINE Pharm bilan bog'laning. Manzil: Toshkent viloyati, Zangiota tumani, Ramadon ko'chasi 40. Tel: +998 71 200 07 71.",
  };
  return {
    title: titles[lang] || titles.ru,
    description: descs[lang] || descs.ru,
    openGraph: {
      title: titles[lang] || titles.ru,
      description: descs[lang] || descs.ru,
    },
    alternates: { canonical: `https://grossline.uz/${lang}/contacts` },
  };
}

export default async function ContactsPage({ params }) {
  const { lang } = await params;
  return <ContactsClient lang={lang} />;
}
