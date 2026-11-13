"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";

const STATS: { n: number; suffix: string; en: string; ta: string }[] = [
  { n: 6, suffix: "M+", en: "Patients treated across South India", ta: "சிகிச்சை பெற்றவர்கள்" },
  { n: 37, suffix: "", en: "Branches in Tamil Nadu", ta: "கிளைகள்" },
  { n: 300, suffix: "+", en: "Doctors", ta: "மருத்துவர்கள்" },
  { n: 150, suffix: "+", en: "Years · 5 generations", ta: "ஆண்டுகால பாரம்பரியம்" },
  { n: 1500, suffix: "+", en: "Care staff", ta: "பராமரிப்புப் பணியாளர்கள்" },
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
    <section
      aria-label="RJR in numbers"
      className="relative z-[5] border-y-2 border-solid border-gold-hover bg-white shadow-[0_12px_30px_-14px_rgba(18,48,31,.25)]"
    >
      {/* Full-width strip under the hero. Infinite marquee: the row is rendered twice and slides by -50%
          so the loop is seamless. Pauses on hover; with reduced motion it becomes a static wrapped row. */}
      <div>
        <div
          ref={ref}
          className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
        >
          <div className="flex w-max motion-safe:animate-marquee motion-safe:[animation-duration:28s] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className={`m-0 flex list-none p-0 ${copy === 1 ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center"}`}
              >
                {STATS.map((s) => (
                  <li
                    key={s.en}
                    className="flex flex-none flex-col items-center justify-center border-r border-solid border-line px-7 py-3 text-center min-[640px]:px-10 min-[640px]:py-4 min-[860px]:px-14"
                  >
                    <b className="display block text-[clamp(1.6rem,3vw,2.2rem)] leading-none text-forest tabular-nums">
                      <span>{Math.round(s.n * p)}</span>
                      {s.suffix && <span className="text-gold-ink">{s.suffix}</span>}
                    </b>
                    <span className="mt-1.5 block whitespace-nowrap text-[.82rem] font-medium leading-[1.3] text-muted">{t(s.en, s.ta)}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
