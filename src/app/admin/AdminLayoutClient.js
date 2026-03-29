"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    exact: true,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  },
];

export default function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't render sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(item) {
    return item.exact ? pathname === item.href : pathname.startsWith(item.href);
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f2f8", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Sidebar */}
      <aside style={{
        width: 240, background: "linear-gradient(180deg, #0d1b3e 0%, #0a1228 100%)",
        display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh",
        boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
      }}>
        {/* Brand */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #0066cc, #0047a8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,102,204,0.4)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>Grossline</div>
              <div style={{ color: "#7a9fd4", fontSize: 11, fontWeight: 500 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#4a6a9a", textTransform: "uppercase", letterSpacing: "1px", padding: "0 8px 8px" }}>
            Menu
          </div>
          {navItems.map(item => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10, marginBottom: 4,
                  textDecoration: "none",
                  background: active ? "rgba(0,102,204,0.25)" : "transparent",
                  color: active ? "#5db0ff" : "#8ab0d8",
                  fontWeight: active ? 700 : 500,
                  fontSize: 14,
                  borderLeft: active ? "3px solid #0066cc" : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <a
            href="/ru"
            target="_blank"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 10, marginBottom: 4,
              textDecoration: "none", color: "#8ab0d8", fontSize: 13, fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Site
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "9px 12px", borderRadius: 10,
              background: "none", border: "none", color: "#e57373",
              fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          background: "#fff", height: 60,
          display: "flex", alignItems: "center", padding: "0 28px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          justifyContent: "space-between",
        }}>
          <div style={{ fontSize: 14, color: "#888" }}>
            {navItems.find(i => isActive(i))?.label || "Admin"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #0066cc, #0047a8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 14,
            }}>A</div>
            <div style={{ fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: "#222" }}>Admin</div>
              <div style={{ color: "#999", fontSize: 11 }}>admin@grossline.uz</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 28px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
