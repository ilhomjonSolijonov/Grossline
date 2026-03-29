import { getProducts, getEvents } from "@/lib/data";

const BASE = "https://grossline.uz";
const LANGS = ["ru", "en", "uz"];

export default async function sitemap() {
  const products = await getProducts();
  const events = await getEvents();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/o-kompanii", priority: 0.8, changeFrequency: "monthly" },
    { path: "/all-products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/career", priority: 0.7, changeFrequency: "monthly" },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contacts", priority: 0.7, changeFrequency: "monthly" },
  ];

  const staticEntries = LANGS.flatMap((lang) =>
    staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );

  const productEntries = LANGS.flatMap((lang) =>
    products.map((p) => ({
      url: `${BASE}/${lang}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }))
  );

  const eventEntries = LANGS.flatMap((lang) =>
    events.map((ev) => ({
      url: `${BASE}/${lang}/events/${ev.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  return [...staticEntries, ...productEntries, ...eventEntries];
}
