"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/data";

const OPTIONS: [Lang, string][] = [
  ["en", "EN"],
  ["ta", "தமிழ்"],
];

/* Segmented control: the forest thumb slides to the chosen language */
export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="relative inline-flex rounded-full bg-ivory p-1 ring-1 ring-line">
      {OPTIONS.map(([code, label]) => {
        const on = lang === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={on}
            onClick={() => setLang(code)}
            className={`relative min-h-9 cursor-pointer rounded-full border-0 bg-transparent px-3 text-[.82rem] font-semibold transition-colors duration-200 ${
              on ? "text-gold" : "text-forest hover:text-forest-dk"
            }`}
          >
            {on && (
              <motion.span
                layoutId="lang-thumb"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-forest shadow-[0_4px_10px_-2px_rgba(18,48,31,.5)]"
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
