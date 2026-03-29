import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://grossline.uz"),
  title: {
    default: "GrossLINE Pharm — Фармацевтическая компания",
    template: "%s | GrossLINE Pharm",
  },
  description: "GrossLINE Pharm — фармацевтическая компания, основанная в 2015 году. Более 210 сотрудников. Качественные препараты из натуральных растений.",
  keywords: ["GrossLINE", "Grossline Pharm", "фармацевтика", "лекарства", "Узбекистан", "pharmaceutical", "medicine", "Uzbekistan"],
  authors: [{ name: "GrossLINE Pharm" }],
  creator: "GrossLINE Pharm",
  publisher: "GrossLINE Pharm",
  openGraph: {
    type: "website",
    locale: "ru_UZ",
    alternateLocale: ["en_US", "uz_UZ"],
    siteName: "GrossLINE Pharm",
    title: "GrossLINE Pharm — Фармацевтическая компания",
    description: "GrossLINE Pharm — фармацевтическая компания, основанная в 2015 году. Более 210 сотрудников.",
    images: [
      {
        url: "/images/logo-header.png",
        width: 400,
        height: 120,
        alt: "GrossLINE Pharm Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GrossLINE Pharm",
    description: "Фармацевтическая компания из Узбекистана",
    images: ["/images/logo-header.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-header.png",
    shortcut: "/images/logo-header.png",
    apple: "/images/logo-header.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
