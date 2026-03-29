export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://grossline.uz/sitemap.xml",
    host: "https://grossline.uz",
  };
}
