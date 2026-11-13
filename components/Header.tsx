"use client";

import { useEffect, useState } from "react";
import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import LanguageToggle from "./LanguageToggle";
import { btn } from "./ui/button";

const Small = () => <small className="block text-[.7rem] font-medium tracking-[.02em] text-muted">Ayurveda &amp; Siddha</small>;

export default function Header() {
  const { t } = useLang();
  const { openModal } = useBooking();
  const [noLogo, setNoLogo] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // the bar firms up (more opaque, soft shadow) once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-solid backdrop-blur-[14px] backdrop-saturate-[1.6] transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-line/80 bg-ivory/90 shadow-[0_8px_30px_-12px_rgba(18,48,31,.18)]"
          : "border-transparent bg-ivory/75"
      }`}
    >
      <div className="wrap flex min-h-[72px] items-center justify-between gap-3">
        <a href="/" aria-label="RJR Herbal Hospitals - home" className="flex items-center gap-3 font-bold text-forest no-underline">
          {!noLogo ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="RJR Herbal Hospitals"
                width={48}
                height={48}
                onError={() => setNoLogo(true)}
                className="block h-11 w-11 rounded-full ring-1 ring-line min-[640px]:h-12 min-[640px]:w-12"
              />
              <span className="leading-[1.2] font-bold text-forest max-[560px]:hidden">
                RJR Herbal Hospitals
                <Small />
              </span>
            </>
          ) : (
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-[.95rem] font-bold text-gold">
                RJR
              </span>
              <span className="leading-[1.2]">
                RJR Herbal Hospitals
                <Small />
              </span>
            </span>
          )}
        </a>

        <div className="flex items-center gap-2 min-[640px]:gap-3">
          <LanguageToggle />
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              track("nav_book");
              openModal();
            }}
            className={btn("primary", "nav")}
          >
            {t("Book now", "முன்பதிவு")}
          </a>
        </div>
      </div>
    </header>
  );
}
