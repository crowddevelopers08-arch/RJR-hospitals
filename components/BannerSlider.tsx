"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_IMAGES, img } from "@/lib/data";

/* RJR's own homepage banners, shown full width at their native 1920x700 ratio
   so the lettering in the artwork is never cropped.
   Swipe on phones, arrows on larger screens, auto-advance that pauses on hover/touch. */
const ALTS = [
  "RJR Herbal Hospitals - Siddha hospital in Tamil Nadu",
  "RJR Herbal Hospitals - herbal hospital",
  "RJR Herbal Hospitals - Ayurveda and Siddha doctors",
  "RJR Herbal Hospitals - herbal treatment in Tamil Nadu",
  "RJR Herbal Hospitals - Ayurveda therapy",
  "RJR Herbal Hospitals - Ayurvedic hospital in Tamil Nadu",
];

export default function BannerSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const n = HERO_IMAGES.length;

  const go = useCallback((dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const w = t.clientWidth;
    const i = Math.round(t.scrollLeft / w);
    const next = (i + dir + n) % n;
    t.scrollTo({ left: next * w, behavior: "smooth" });
  }, [n]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) go(1);
    }, 5000);
    return () => clearInterval(id);
  }, [go]);

  const arrow =
    "absolute top-1/2 z-[2] grid h-8 w-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-white/85 text-crimson shadow-card-lg backdrop-blur transition-[background-color,color,transform] duration-200 hover:bg-crimson hover:text-white active:scale-95 min-[640px]:h-11 min-[640px]:w-11";

  return (
    <section
      aria-label="RJR Herbal Hospitals"
      className="relative bg-kumkum"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {HERO_IMAGES.map((src, i) => (
          <div key={src} className="relative aspect-[1920/700] flex-[0_0_100%] snap-start bg-kumkum">
            {!broken[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img(src)}
                alt={ALTS[i] ?? "RJR Herbal Hospitals"}
                width={1920}
                height={700}
                decoding="async"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                onError={() => setBroken((b) => ({ ...b, [i]: true }))}
                className="absolute inset-0 block h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <button type="button" aria-label="Previous banner" onClick={() => go(-1)} className={`${arrow} left-2 min-[640px]:left-4 min-[1024px]:left-8`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 min-[640px]:h-5 min-[640px]:w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button type="button" aria-label="Next banner" onClick={() => go(1)} className={`${arrow} right-2 min-[640px]:right-4 min-[1024px]:right-8`}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 min-[640px]:h-5 min-[640px]:w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </section>
  );
}
