import { LANGS } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!LANGS.includes(lang)) notFound();
  return <>{children}</>;
}
