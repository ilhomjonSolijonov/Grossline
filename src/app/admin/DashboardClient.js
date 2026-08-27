"use client";
import Link from "next/link";
import { useAdminLang } from "./AdminLangContext";

export default function DashboardClient({ products, events }) {
  const { tr } = useAdminLang();
  const D = tr.dashboard;

  const stats = [
    { label: D.statProducts, value: products.length, color: "#0066cc", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, href: "/admin/products" },
    { label: D.statEvents, value: events.length, color: "#059669", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, href: "/admin/events" },
    { label: D.statLangs, value: 3, color: "#7c3aed", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, href: null },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#0d1b3e" }}>{D.title}</h1>
        <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>{D.welcome}</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "22px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0d1b3e", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        {[
          { href: "/admin/products", label: D.manageProducts, desc: D.manageProductsDesc, color: "#0066cc", emoji: "💊" },
          { href: "/admin/events", label: D.manageEvents, desc: D.manageEventsDesc, color: "#059669", emoji: "📅" },
        ].map(c => (
          <Link key={c.href} href={c.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${c.color}`, display: "flex", gap: 16, alignItems: "center", transition: "box-shadow 0.2s" }}>
              <span style={{ fontSize: 36 }}>{c.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0d1b3e" }}>{c.label}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{c.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent products */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{D.recentProducts}</h2>
          <Link href="/admin/products" style={{ fontSize: 13, color: "#0066cc", textDecoration: "none", fontWeight: 600 }}>{D.viewAll}</Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                {[D.colProduct, D.colNameEn, D.colSlug].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f8f8f8" }}>
                  <td style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={p.image} alt="" style={{ width: 36, height: 36, objectFit: "contain", background: "#f5f5f5", borderRadius: 6 }} />
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{p.name?.ru}</span>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: "#555" }}>{p.name?.en}</td>
                  <td style={{ padding: "10px 12px" }}><span style={{ background: "#f0f6ff", color: "#0066cc", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>/{p.slug}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
