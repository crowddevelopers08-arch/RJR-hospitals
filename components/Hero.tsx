"use client";

import { useLang } from "@/lib/i18n";
import LeadForm from "./LeadForm";

const POINTS: [string, string][] = [
  ["37 branches across Tamil Nadu.", "தமிழ்நாடு முழுவதும் 37 கிளைகள்."],
  ["Consultations with qualified Ayurveda and Siddha doctors.", "தகுதிபெற்ற ஆயுர்வேத மற்றும் சித்த மருத்துவர்கள்."],
  ["Individual-based customised treatment and medication plan.", "உங்கள் உடல்நிலைக்கு ஏற்ற தனிப்பட்ட சிகிச்சைத் திட்டம்."],
];

/* The page's one orchestrated moment: the hero message settles in line by line, then the form.
   Pure CSS (motion-safe only), so nothing waits on JavaScript. */
const rise = (ms: number) => ({ style: { animationDelay: `${ms}ms` } });

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="book" className="relative isolate overflow-hidden bg-forest-dk pt-6 pb-10 text-white min-[640px]:pt-9 min-[640px]:pb-14 min-[860px]:pt-12 min-[860px]:pb-20">
      {/* fine gold line along the foot of the hero */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[1] h-px bg-[linear-gradient(90deg,transparent,rgba(201,150,46,.55),transparent)]" />

      <div className="wrap relative z-[2] grid items-center gap-7 min-[640px]:gap-10 min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,520px)] min-[960px]:gap-14">
        {/* min-w-0 keeps the wide marquee row from stretching this column past the screen */}
        <div className="min-w-0">
          <p
            className="motion-safe:animate-rise mt-0 mb-4 min-[640px]:mb-6 inline-flex items-center gap-3 rounded-full border border-solid border-gold/40 bg-white/[.06] py-1.5 pr-4 pl-1.5 text-[.85rem] font-medium text-gold backdrop-blur-sm"
          >
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-gold text-[.8rem] font-bold text-forest-deep">
              5
            </span>
            {t("5 generations · 150+ years of practice", "5 தலைமுறைகள் | 150+ ஆண்டுகால மருத்துவப் பாரம்பரியம்")}
          </p>

          <h1 style={{ animationDelay: "80ms" }}
            className="motion-safe:animate-rise display m-0 max-w-[18ch] text-[clamp(2.1rem,5vw,3.6rem)] font-bold text-white">
            {t(
              "Treat Your Health with Ayurveda Before You Run Out of Options.",
              "கடைசி முயற்சியாக அல்ல, முதல் தேர்வாக ஆயுர்வேதத்தை அணுகுங்கள்."
            )}
          </h1>

          {/* key points scroll past in one row like a marquee; the list is rendered twice so the loop is seamless.
              Pauses on hover; with reduced motion it becomes a static wrapped row. */}
          <div
            style={{ animationDelay: "260ms" }}
            className="group motion-safe:animate-rise mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] min-[640px]:mt-8"
          >
            <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                  className={`m-0 flex list-none gap-8 p-0 pr-8 text-[.98rem] font-medium ${copy === 1 ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:gap-y-2.5"}`}
                >
                  {POINTS.map(([en, ta]) => (
                    <li key={en} className="flex flex-none items-center gap-2.5 whitespace-nowrap">
                      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 flex-none text-gold">
                        <circle cx="10" cy="10" r="9.25" fill="none" stroke="currentColor" strokeOpacity=".5" />
                        <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-white/95">{t(en, ta)}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div {...rise(380)} className="w-full motion-safe:animate-rise min-[960px]:max-w-[520px] min-[960px]:justify-self-end">
          <LeadForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
