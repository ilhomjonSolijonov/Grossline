"use client";
import { useState, useEffect } from "react";
import { useAdminLang } from "../AdminLangContext";

const LANGS = ["ru", "en", "uz"];
const LANG_FLAGS = { ru: "🇷🇺", en: "🇬🇧", uz: "🇺🇿" };
const LANG_NAMES = { ru: "Русский", en: "English", uz: "O'zbekcha" };

const empty = {
  id: "",
  slug: "",
  date: "",
  image: "",
  images: [],
  title: { ru: "", en: "", uz: "" },
  description: { ru: "", en: "", uz: "" },
};

// На сайте дата выводится как есть, в формате ДД.ММ.ГГГГ,
// а <input type="date"> работает только с ГГГГ-ММ-ДД.
function toInputDate(stored) {
  if (!stored) return "";
  const dotted = stored.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (dotted) return `${dotted[3]}-${dotted[2]}-${dotted[1]}`;
  return /^\d{4}-\d{2}-\d{2}$/.test(stored) ? stored : "";
}

function toStoredDate(input) {
  const iso = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return iso ? `${iso[3]}.${iso[2]}.${iso[1]}` : input;
}

function withDefaults(ev) {
  const base = structuredClone(empty);
  const src = structuredClone(ev || {});
  return {
    ...base,
    ...src,
    images: Array.isArray(src.images) && src.images.length ? src.images : (src.image ? [src.image] : []),
    title: { ...base.title, ...(src.title || {}) },
    description: { ...base.description, ...(src.description || {}) },
  };
}

const inp = {
  width: "100%", padding: "9px 12px",
  borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e5e7eb", borderRadius: 8,
  fontSize: 13, outline: "none", boxSizing: "border-box",
  background: "#fafafa", transition: "border-color 0.2s",
  fontFamily: "inherit",
};
const focusInp = { borderColor: "#059669", background: "#fff" };

function Input({ value, onChange, placeholder, type, style }) {
  const [focused, setFocused] = useState(false);
  return <input type={type || "text"} value={value} onChange={onChange} placeholder={placeholder} style={{ ...inp, ...(focused ? focusInp : {}), ...style }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  return <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} style={{ ...inp, resize: "vertical", lineHeight: 1.5, ...(focused ? focusInp : {}) }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
}

function Label({ children, hint }) {
  return (
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
      {children}
      {hint && <span style={{ textTransform: "none", letterSpacing: 0, color: "#aaa", fontWeight: 500, marginLeft: 6 }}>{hint}</span>}
    </label>
  );
}

const btn = (bg, text = "#fff") => ({
  padding: "8px 16px", background: bg, color: text, border: "none",
  borderRadius: 7, cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6,
});

export default function AdminEvents() {
  const { tr } = useAdminLang();
  const E = tr.events;

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("ru");

  const load = async () => {
    const res = await fetch("/api/admin/events");
    if (res.ok) setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  const set = (path, val) => setForm(prev => {
    const next = structuredClone(prev);
    path.split(".").reduce((o, k, i, a) => i === a.length - 1 ? (o[k] = val) : o[k], next);
    return next;
  });

  const save = async () => {
    setError("");
    if (!form.slug.trim()) return setError(E.errSlug);
    if (!form.title.ru.trim()) return setError(E.errTitle);

    setSaving(true);
    const payload = withDefaults(form);
    payload.images = payload.images.map(s => s.trim()).filter(Boolean);
    // Главное изображение всегда первое в галерее
    if (!payload.image && payload.images.length) payload.image = payload.images[0];
    if (payload.image && !payload.images.includes(payload.image)) payload.images.unshift(payload.image);

    const body = editing ? payload : { ...payload, id: payload.slug.trim() || String(Date.now()) };
    const res = await fetch("/api/admin/events", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) return setError(E.errSave);
    setForm(empty); setEditing(false); setTab("ru"); load();
  };

  const del = async (id) => {
    if (!confirm(E.confirmDelete)) return;
    await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (form.id === id) { setForm(empty); setEditing(false); }
    load();
  };

  const edit = (ev) => { setForm(withDefaults(ev)); setEditing(true); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cancel = () => { setForm(empty); setEditing(false); setError(""); };

  const galleryText = (form.images || []).join("\n");

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#0d1b3e" }}>{E.title}</h1>
        <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>{E.total(items.length)}</p>
      </div>

      {/* Форма */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: editing ? "#fff3e0" : "#e6f9f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {editing
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            }
          </div>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{editing ? E.formEdit : E.formNew}</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <Label hint={E.slugHint}>{E.slug}</Label>
            <Input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder={E.slugPlaceholder} />
          </div>
          <div>
            <Label>{E.date}</Label>
            <Input type="date" value={toInputDate(form.date)} onChange={e => set("date", toStoredDate(e.target.value))} />
          </div>
          <div>
            <Label hint={E.imageHint}>{E.image}</Label>
            <Input value={form.image} onChange={e => set("image", e.target.value)} placeholder={E.imagePlaceholder} />
          </div>
        </div>

        {form.image && (
          <div style={{ marginBottom: 16, padding: 12, background: "#f0fdf8", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <img src={form.image} alt="" style={{ width: 80, height: 52, objectFit: "cover", borderRadius: 8 }} />
            <span style={{ fontSize: 12, color: "#888" }}>{E.imagePreview}</span>
          </div>
        )}

        {/* Галерея */}
        <div style={{ marginBottom: 16 }}>
          <Label hint={E.galleryHint}>{E.gallery}</Label>
          <Textarea
            rows={4}
            value={galleryText}
            onChange={e => set("images", e.target.value.split("\n"))}
            placeholder={E.galleryPh}
          />
          {form.images?.filter(Boolean).length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              {form.images.filter(Boolean).map((src, i) => (
                <img key={`${src}-${i}`} src={src} alt="" style={{ width: 72, height: 48, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }} />
              ))}
            </div>
          )}
        </div>

        {/* Языковые вкладки контента (RU/EN/UZ события — не путать с языком интерфейса) */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setTab(l)} style={{ padding: "8px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === l ? 700 : 500, color: tab === l ? "#059669" : "#888", borderBottom: tab === l ? "2px solid #059669" : "2px solid transparent", marginBottom: -1 }}>
              {LANG_FLAGS[l]} {LANG_NAMES[l]}
            </button>
          ))}
        </div>

        {LANGS.map(l => (
          <div key={l} style={{ display: tab === l ? "flex" : "none", flexDirection: "column", gap: 12 }}>
            <div>
              <Label>{E.fieldTitle}</Label>
              <Input value={form.title[l]} onChange={e => set(`title.${l}`, e.target.value)} placeholder={E.fieldTitlePh} />
            </div>
            <div>
              <Label>{E.fieldDescription}</Label>
              <Textarea rows={4} value={form.description[l]} onChange={e => set(`description.${l}`, e.target.value)} placeholder={E.fieldDescriptionPh} />
            </div>
          </div>
        ))}

        {error && (
          <div style={{ marginTop: 16, background: "#fff0f0", border: "1px solid #fcc", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#c00" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button style={{ ...btn(editing ? "#f59e0b" : "#059669"), padding: "10px 22px", boxShadow: `0 4px 12px ${editing ? "rgba(245,158,11,0.3)" : "rgba(5,150,105,0.3)"}` }} onClick={save} disabled={saving}>
            {saving ? E.saving : editing ? E.saveEdit : E.saveNew}
          </button>
          {editing && <button style={btn("#f1f3f5", "#555")} onClick={cancel}>{E.cancel}</button>}
        </div>
      </div>

      {/* Список */}
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{E.listTitle}</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {[E.colEvent, E.colDate, E.colPhotos, E.colActions].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 20px", fontSize: 11, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(ev => (
                <tr key={ev.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "12px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src={ev.image} alt="" style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 8 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "#0d1b3e" }}>{ev.title?.ru}</div>
                        <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{ev.title?.en}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{ background: "#f0fdf8", color: "#059669", fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 5, whiteSpace: "nowrap" }}>{ev.date}</span>
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: "#666", whiteSpace: "nowrap" }}>
                    {E.photosCount(ev.images?.length || (ev.image ? 1 : 0))}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={`/ru/events/${ev.slug}`} target="_blank" rel="noreferrer" style={{ ...btn("#f0fdf8", "#059669"), padding: "6px 12px", textDecoration: "none" }}>{E.open}</a>
                      <button style={{ ...btn("#fff8e1", "#d97706"), padding: "6px 12px" }} onClick={() => edit(ev)}>{E.edit}</button>
                      <button style={{ ...btn("#fff0f0", "#dc2626"), padding: "6px 12px" }} onClick={() => del(ev.id)}>{E.delete}</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#bbb", fontSize: 14 }}>{E.empty}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
