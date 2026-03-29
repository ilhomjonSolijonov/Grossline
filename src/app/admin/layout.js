import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = { title: "Grossline Admin" };

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
