"use client";
import { useState, useEffect } from "react";

const LANGS = ["ru", "en", "uz"];
const LANG_FLAGS = { ru: "🇷🇺", en: "🇬🇧", uz: "🇺🇿" };
const LANG_NAMES = { ru: "Русский", en: "English", uz: "O'zbekcha" };

const ml = (val = "") => ({ ru: val, en: val, uz: val });

const empty = {
  id: "",
  slug: "",
  image: "",
  name: ml(),
  subtitle: ml(),
  action: ml(),
  composition: { ru: [], en: [], uz: [] },
  indications: ml(),
  contraindications: ml(),
  dosing: ml(),
  storage: ml(),
};

// Поля описания препарата (состав редактируется отдельно — списком)
const TEXT_FIELDS = [
  { key: "name", label: "Название", multiline: false, placeholder: "ВЕРСТАНОРМ" },
  { key: "subtitle", label: "Краткое описание", multiline: false, placeholder: "Гепатопротекторный растительный сироп, 150 мл" },
  { key: "action", label: "Действие", multiline: true, placeholder: "Как действует препарат…" },
  { key: "indications", label: "Показания", multiline: true, placeholder: "При каких состояниях применяется…" },
  { key: "contraindications", label: "Противопоказания", multiline: true, placeholder: "Повышенная чувствительность к компонентам." },
  { key: "dosing", label: "Способ применения и дозы", multiline: true, placeholder: "Дети 1–12 лет: 1–2 ч. ложки в день…" },
  { key: "storage", label: "Хранение", multiline: true, placeholder: "2–25°C, срок годности 2 года." },
];

function withDefaults(p) {
  const base = structuredClone(empty);
  const src = structuredClone(p || {});
  const out = { ...base, ...src };
  for (const key of Object.keys(base)) {
    if (base[key] && typeof base[key] === "object") {
      out[key] = { ...base[key], ...(src[key] || {}) };
    }
  }
  return out;
}

const inp = {
  width: "100%", padding: "9px 12px",
  borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e5e7eb", borderRadius: 8,
  fontSize: 13, outline: "none", boxSizing: "border-box",
  background: "#fafafa", transition: "border-color 0.2s",
  fontFamily: "inherit",
};
const focusInp = { borderColor: "#0066cc", background: "#fff" };

function Input({ value, onChange, placeholder, style }) {
  const [focused, setFocused] = useState(false);
  return <input value={value} onChange={onChange} placeholder={placeholder} style={{ ...inp, ...(focused ? focusInp : {}), ...style }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />;
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

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("ru");

  const load = async () => {
    const res = await fetch("/api/admin/products");
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
    if (!form.slug.trim()) return setError("Укажите ссылку (slug) — она используется в адресе страницы.");
    if (!form.name.ru.trim()) return setError("Укажите название препарата хотя бы на русском языке.");

    setSaving(true);
    const payload = withDefaults(form);
    // Пустые строки состава не сохраняем
    for (const l of LANGS) {
      payload.composition[l] = (payload.composition[l] || []).map(s => s.trim()).filter(Boolean);
    }
    const body = editing ? payload : { ...payload, id: payload.slug.trim() || String(Date.now()) };
    const res = await fetch("/api/admin/products", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (!res.ok) return setError("Не удалось сохранить. Попробуйте ещё раз.");
    setForm(empty); setEditing(false); setTab("ru"); load();
  };

  const del = async (id) => {
    if (!confirm("Удалить этот препарат?")) return;
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (form.id === id) { setForm(empty); setEditing(false); }
    load();
  };

  const edit = (p) => { setForm(withDefaults(p)); setEditing(true); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const cancel = () => { setForm(empty); setEditing(false); setError(""); };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "#0d1b3e" }}>Продукция</h1>
        <p style={{ margin: "4px 0 0", color: "#888", fontSize: 13 }}>Всего препаратов: {items.length}</p>
      </div>

      {/* Форма */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: editing ? "#fff3e0" : "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {editing
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            }
          </div>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>{editing ? "Редактирование препарата" : "Новый препарат"}</h2>
        </div>

        {/* Ссылка и изображение */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <Label hint="адрес страницы">Ссылка (slug)</Label>
            <Input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="например: verstanorm" />
          </div>
          <div>
            <Label hint="файл из папки public">Изображение</Label>
            <Input value={form.image} onChange={e => set("image", e.target.value)} placeholder="/images/3_4.png" />
          </div>
        </div>

        {form.image && (
          <div style={{ marginBottom: 16, padding: 12, background: "#f8f9ff", borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <img src={form.image} alt="" style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 8, background: "#fff", border: "1px solid #eee" }} />
            <span style={{ fontSize: 12, color: "#888" }}>Предпросмотр изображения</span>
          </div>
        )}

        {/* Языковые вкладки */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
          {LANGS.map(l => (
            <button key={l} onClick={() => setTab(l)} style={{ padding: "8px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === l ? 700 : 500, color: tab === l ? "#0066cc" : "#888", borderBottom: tab === l ? "2px solid #0066cc" : "2px solid transparent", marginBottom: -1 }}>
              {LANG_FLAGS[l]} {LANG_NAMES[l]}
            </button>
          ))}
        </div>

        {LANGS.map(l => (
          <div key={l} style={{ display: tab === l ? "flex" : "none", flexDirection: "column", gap: 14 }}>
            {TEXT_FIELDS.map(f => (
              <div key={f.key}>
                <Label>{f.label}</Label>
                {f.multiline
                  ? <Textarea value={form[f.key]?.[l] || ""} onChange={e => set(`${f.key}.${l}`, e.target.value)} placeholder={f.placeholder} />
                  : <Input value={form[f.key]?.[l] || ""} onChange={e => set(`${f.key}.${l}`, e.target.value)} placeholder={f.placeholder} />}
              </div>
            ))}
            <div>
              <Label hint="каждый компонент с новой строки">Состав</Label>
              <Textarea
                rows={6}
                value={(form.composition?.[l] || []).join("\n")}
                onChange={e => set(`composition.${l}`, e.target.value.split("\n"))}
                placeholder={"Красный корень — антиоксидантное действие\nБессмертник — улучшает функцию печени"}
              />
            </div>
          </div>
        ))}

        {error && (
          <div style={{ marginTop: 16, background: "#fff0f0", border: "1px solid #fcc", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#c00" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button style={{ ...btn(editing ? "#f59e0b" : "#0066cc"), padding: "10px 22px", boxShadow: `0 4px 12px ${editing ? "rgba(245,158,11,0.3)" : "rgba(0,102,204,0.3)"}` }} onClick={save} disabled={saving}>
            {saving
              ? <><Spinner /> Сохранение…</>
              : editing
                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Сохранить изменения</>
                : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Добавить препарат</>
            }
          </button>
          {editing && <button style={btn("#f1f3f5", "#555")} onClick={cancel}>Отмена</button>}
        </div>
      </div>

      {/* Список */}
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0d1b3e" }}>Все препараты</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                {["Препарат", "Названия (EN / UZ)", "Ссылка", "Действия"].map(h => (
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
                        <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{truncate(p.subtitle?.ru, 40)}</div>
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
                      <a href={`/ru/${p.slug}`} target="_blank" rel="noreferrer" style={{ ...btn("#f0f6ff", "#0066cc"), padding: "6px 12px", textDecoration: "none" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Открыть
                      </a>
                      <button style={{ ...btn("#fff8e1", "#d97706"), padding: "6px 12px" }} onClick={() => edit(p)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Изменить
                      </button>
                      <button style={{ ...btn("#fff0f0", "#dc2626"), padding: "6px 12px" }} onClick={() => del(p.id)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#bbb", fontSize: 14 }}>Препаратов пока нет. Добавьте первый в форме выше.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function truncate(text, n) {
  if (!text) return "";
  return text.length > n ? `${text.slice(0, n)}…` : text;
}

function Spinner() {
  return <div style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.4)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />;
}
