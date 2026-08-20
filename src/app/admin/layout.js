import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = { title: "Grossline Pharm — Панель управления", robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
