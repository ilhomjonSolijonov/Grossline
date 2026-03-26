import "./globals.css";

export const metadata = {
  title: "Grossline",
  description: "Local copy of grossline.dst.uz/ru"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
