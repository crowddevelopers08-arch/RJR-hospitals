"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "./data";
import { track } from "./track";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick the English or Tamil string for the current language */
  t: <T>(en: T, ta: T) => T;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const apply = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.body.classList.toggle("ta", l === "ta");
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      apply(l);
      try {
        localStorage.setItem("rjr_lang", l);
      } catch {}
      track("language_toggle", { lang: l });
    },
    [apply]
  );

  // ?lang=ta or the saved choice switches to Tamil on load
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("rjr_lang");
    } catch {}
    const want = new URLSearchParams(location.search).get("lang") || saved;
    if (want === "ta") apply("ta");
  }, [apply]);

  const t = useCallback(<T,>(en: T, ta: T) => (lang === "ta" ? ta : en), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be used inside LanguageProvider");
  return c;
}
