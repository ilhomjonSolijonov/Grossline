import AdminLayoutClient from "./AdminLayoutClient";
import { AdminLangProvider } from "./AdminLangContext";

export const metadata = { title: "Grossline Pharm — Панель управления", robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return (
    <AdminLangProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </AdminLangProvider>
  );
}
