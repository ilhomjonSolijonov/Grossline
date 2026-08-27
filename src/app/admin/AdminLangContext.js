"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ADMIN_LANGS, ADMIN_LANG_NAMES, adminT } from "@/lib/adminI18n";

const STORAGE_KEY = "gl_admin_lang";

const AdminLangContext = createContext({
  lang: "ru",
  setLang: () => {},
  tr: adminT.ru,
});

export function AdminLangProvider({ children }) {
  const [lang, setLangState] = useState("ru");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && ADMIN_LANGS.includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l) => {
    if (!ADMIN_LANGS.includes(l)) return;
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <AdminLangContext.Provider value={{ lang, setLang, tr: adminT[lang] }}>
      {children}
    </AdminLangContext.Provider>
  );
}

export function useAdminLang() {
  return useContext(AdminLangContext);
}

export function AdminLangSwitcher({ style }) {
  const { lang, setLang } = useAdminLang();
  return (
    <div style={{ display: "flex", gap: 3, padding: 3, background: "rgba(255,255,255,0.08)", borderRadius: 8, ...style }}>
      {ADMIN_LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "5px 10px", borderRadius: 6, border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 700,
            background: lang === l ? "#0066cc" : "transparent",
            color: lang === l ? "#fff" : "#8ab0d8",
            transition: "all 0.15s",
          }}
        >
          {ADMIN_LANG_NAMES[l]}
        </button>
      ))}
    </div>
  );
}
