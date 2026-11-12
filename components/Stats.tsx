"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const STATS: { n: number; suffix: string; en: string; ta: string }[] = [
  { n: 6, suffix: "M+", en: "Patients treated across South India", ta: "சிகிச்சை பெற்ற நோயாளிகள் (தென்னிந்தியா முழுவதும்)" },
  { n: 37, suffix: "", en: "Branches in Tamil Nadu", ta: "தமிழ்நாட்டில் கிளைகள்" },
  { n: 300, suffix: "+", en: "Doctors", ta: "மருத்துவர்கள்" },
  { n: 150, suffix: "+", en: "Years · 5 generations", ta: "ஆண்டுகள் · 5 தலைமுறைகள்" },
  { n: 1500, suffix: "+", en: "Care staff", ta: "பணியாளர்கள்" },
];

/* Counts every number up from 0 the first time the band is 40% visible */
function useCountUp(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (e) => {
        if (!e[0].isIntersecting) return;
        io.disconnect();
        let t0: number | null = null;
        const dur = 1400;
        const step = (ts: number) => {
          if (t0 === null) t0 = ts;
          const k = Math.min((ts - t0) / dur, 1);
          setP(1 - Math.pow(1 - k, 3));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

export default function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const p = useCountUp(ref);

  return (
    <section aria-label="RJR in numbers" className="relative z-[5] -mt-[76px] min-[640px]:-mt-[88px] min-[860px]:-mt-[104px]">
      <div className="wrap">
        <div
          ref={ref}
          className="grid grid-cols-2 overflow-hidden rounded-[24px] bg-white shadow-card-lg ring-1 ring-line min-[720px]:grid-cols-5"
        >
          {STATS.map((s, i) => (
            <div
              key={s.en}
              className={`relative px-3 py-4 text-center min-[640px]:px-4 min-[640px]:py-6 min-[860px]:px-5 min-[860px]:py-9 last:col-span-full min-[720px]:last:col-auto
                ${i % 2 === 1 ? "border-l border-solid border-line" : ""} ${i < 4 ? "border-b border-solid border-line" : ""}
                min-[720px]:border-b-0 ${i > 0 ? "min-[720px]:border-l min-[720px]:border-solid min-[720px]:border-line" : "min-[720px]:border-l-0"}`}
            >
              <b className="display block text-[clamp(2rem,3.8vw,2.9rem)] leading-none text-crimson tabular-nums">
                <span>{Math.round(s.n * p)}</span>
                {s.suffix && <span className="text-gold-ink">{s.suffix}</span>}
              </b>
              <span className="mx-auto mt-2 block max-w-[18ch] min-[640px]:mt-3 text-[.86rem] font-medium leading-[1.4] text-muted">{t(s.en, s.ta)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
