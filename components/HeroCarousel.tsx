"use client";

import { useEffect, useState } from "react";
import { HERO_IMAGES, LEAF_PATTERN, SLIDE_BG, img } from "@/lib/data";

/* Images that slide behind the hero message and form */
export default function HeroCarousel() {
  const n = HERO_IMAGES.length;
  const [cur, setCur] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  // advance every 4.5s; stays on the first image when reduced motion is requested
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const id = setInterval(() => setCur((c) => (c + 1) % n), 4500);
    return () => clearInterval(id);
  }, [n]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div
          className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(.65,0,.25,1)] will-change-transform"
          style={{ transform: `translateX(-${cur * 100}%)` }}
        >
          {HERO_IMAGES.map((src, i) => (
            <div key={src} className="relative h-full flex-[0_0_100%]" style={{ background: SLIDE_BG[i % SLIDE_BG.length] }}>
              <div className="absolute inset-0 bg-[length:120px_120px] opacity-10" style={{ backgroundImage: LEAF_PATTERN }} />
              {!broken[i] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img(src)}
                  alt=""
                  decoding="async"
                  loading={i > 0 ? "lazy" : undefined}
                  onError={() => setBroken((b) => ({ ...b, [i]: true }))}
                  className="absolute inset-0 block h-full w-full scale-[1.04] object-cover opacity-60 blur-[1.5px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
