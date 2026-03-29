"use client";
import { useState, useEffect } from "react";

const empty = { id: "", slug: "", image: "", name: { ru: "", en: "", uz: "" }, subtitle: { ru: "", en: "", uz: "" } };

const inp = {
  width: "100%", padding: "9px 12px",
  borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e5e7eb", borderRadius: 8,
  fontSize: 13, outline: "none", boxSizing: "border-box",
  background: "#fafafa", transition: "border-color 0.2s",
};
const focusInp = { borderColor: "#0066cc", background: "#fff" };

function Input({ value, onChange, placeholder, style }) {
  const [focused, setFocused] = useState(false);
  return <input value={value} onChange={onChange} placeholder={placeholder} style={{ ...inp, ...(focused ? focusInp : {}), ...style }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
}

const btn = (bg, text = "#fff") => ({
  padding: "8px 16px", background: bg, color: text, border: "none",
  borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6,
});

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("ru");

  const load = async () => setItems(await (await fetch("/api/admin/products")).json());
  useEffect(() => { load(); }, []);

  const set = (path, val) => setForm(prev => {
    const next = structuredClone(prev);
    path.split(".").reduce((o, k, i, a) => i === a.length - 1 ? (o[k] = val) : o[k], next);
    return next;
  });

  const save = async () => {
    setSaving(true);
    const body = editing ? form : { ...form, id: form.slug || String(Date.now()) };
    await fetch("/api/admin/products", { method: editing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm(empty); setEditing(false); setSaving(false); load();
  };

  const del = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const edit = (p) => { setForm(structuredClone(p)); setEditing(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cancel = () => { setForm(empty); setEditing(false); };

  const langs = ["ru", "en", "uz"];
  const langFlags = { ru: "🇷🇺", en: "🇬🇧", uz: "🇺🇿" };

  return (
    <div>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#0d1b3e" }}>Products</h1>
          <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>{items.length} products total</p>
        </div>
      </div>

      {/* Form card */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: editing ? "#fff3e0" : "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {editing
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            }
          </div>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{editing ? "Edit Product" : "Add New Product"}</h2>
        </div>

        {/* Slug & Image */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>Slug (URL)</label>
            <Input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="e.g. my-product" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>Image URL</label>
            <Input value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..." />
          </div>
        </div>

        {/* Image preview */}
        {form.image && (
          <div style={{ marginBottom: 16, padding: 12, background: "#f8f9ff", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <img src={form.image} alt="" style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 8, background: "#fff", border: "1px solid #eee" }} />
            <span style={{ fontSize: 12, color: "#888" }}>Image preview</span>
          </div>
        )}

        {/* Language tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid #f0f0f0", paddingBottom: 0 }}>
          {langs.map(l => (
            <button key={l} onClick={() => setTab(l)} style={{ padding: "8px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === l ? 700 : 500, color: tab === l ? "#0066cc" : "#888", borderBottom: tab === l ? "2px solid #0066cc" : "2px solid transparent", marginBottom: -1 }}>
              {langFlags[l]} {l.toUpperCase()}
            </button>
          ))}
        </div>

        {langs.map(l => (
          <div key={l} style={{ display: tab === l ? "block" : "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>Name ({l.toUpperCase()})</label>
                <Input value={form.name[l]} onChange={e => set(`name.${l}`, e.target.value)} placeholder={`Product name in ${l}`} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>Subtitle ({l.toUpperCase()})</label>
                <Input value={form.subtitle?.[l] || ""} onChange={e => set(`subtitle.${l}`, e.target.value)} placeholder={`Subtitle in ${l}`} />
              </div>
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button style={{ ...btn(editing ? "#f59e0b" : "#0066cc"), padding: "10px 22px", boxShadow: `0 4px 12px ${editing ? "rgba(245,158,11,0.3)" : "rgba(0,102,204,0.3)"}` }} onClick={save} disabled={saving}>
            {saving
              ? <><Spinner /> Saving…</>
              : editing
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Update Product</>
                : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Product</>
            }
          </button>
          {editing && <button style={btn("#f1f3f5", "#555")} onClick={cancel}>Cancel</button>}
        </div>
      </div>

      {/* List */}
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>All Products</h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              {["Product", "Names (EN / UZ)", "Slug", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 20px", fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={p.image} alt="" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, background: "#f5f5f5", border: "1px solid #eee", padding: 4 }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#0d1b3e" }}>{p.name?.ru}</div>
                      <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{p.subtitle?.ru?.slice(0, 40)}…</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 20px", fontSize: 12, color: "#666" }}>
                  <div>{p.name?.en}</div>
                  <div style={{ color: "#aaa" }}>{p.name?.uz}</div>
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <span style={{ background: "#f0f6ff", color: "#0066cc", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 5 }}>/{p.slug}</span>
                </td>
                <td style={{ padding: "12px 20px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={`/ru/${p.slug}`} target="_blank" style={{ ...btn("#f0f6ff", "#0066cc"), padding: "6px 12px", textDecoration: "none" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      View
                    </a>
                    <button style={{ ...btn("#fff8e1", "#d97706"), padding: "6px 12px" }} onClick={() => edit(p)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </button>
                    <button style={{ ...btn("#fff0f0", "#dc2626"), padding: "6px 12px" }} onClick={() => del(p.id)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#bbb", fontSize: 14 }}>No products yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Spinner() {
  return <div style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />;
}
