"use client";

import { useLang } from "@/lib/i18n";
import LeadForm from "./LeadForm";

const POINTS: [string, string][] = [
  ["37 branches across Tamil Nadu", "37 கிளைகள், தமிழ்நாடு முழுவதும்"],
  ["Examination by degree-qualified doctors", "பட்டம் பெற்ற மருத்துவர்களின் பரிசோதனை"],
  ["No admission needed for the first consultation", "முதல் ஆலோசனையில் சேர வேண்டிய அவசியமில்லை"],
];

/* The page's one orchestrated moment: the hero message settles in line by line, then the form.
   Pure CSS (motion-safe only), so nothing waits on JavaScript. */
const rise = (ms: number) => ({ style: { animationDelay: `${ms}ms` } });

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="book" className="relative isolate overflow-hidden bg-crimson-dk pt-8 pb-[100px] text-white min-[640px]:pt-12 min-[640px]:pb-[132px] min-[860px]:pt-20 min-[860px]:pb-[168px]">
      {/* fine gold line along the foot of the hero */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[1] h-px bg-[linear-gradient(90deg,transparent,rgba(253,207,59,.55),transparent)]" />

      <div className="wrap relative z-[2] grid items-center gap-7 min-[640px]:gap-10 min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,520px)] min-[960px]:gap-14">
        <div>
          <p
            className="motion-safe:animate-rise mt-0 mb-4 min-[640px]:mb-6 inline-flex items-center gap-3 rounded-full border border-solid border-gold/40 bg-white/[.06] py-1.5 pr-4 pl-1.5 text-[.85rem] font-medium text-gold backdrop-blur-sm"
          >
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-gold text-[.8rem] font-bold text-kumkum">
              5
            </span>
            {t("5 generations · 150+ years of practice", "5 தலைமுறைகள் · 150+ ஆண்டு அனுபவம்")}
          </p>

          <h1 style={{ animationDelay: "80ms" }}
            className="motion-safe:animate-rise display m-0 max-w-[18ch] text-[clamp(2.1rem,5vw,3.6rem)] font-bold text-white">
            {t(
              "Ayurveda is also science. Start with a doctor, not as a last resort.",
              "ஆயுர்வேதமும் அறிவியலே. கடைசி வழியாக அல்ல, முதலிலேயே மருத்துவரை அணுகுங்கள்."
            )}
          </h1>

          <p style={{ animationDelay: "160ms" }}
            className="motion-safe:animate-rise mt-4 mb-0 max-w-[52ch] min-[640px]:mt-6 text-[1.06rem] leading-[1.75] text-white/85 min-[860px]:text-[1.12rem]">
            {t(
              "Qualified Ayurveda and Siddha doctors examine you, read your reports, and explain your plan in simple words.",
              "தகுதி பெற்ற ஆயுர்வேத, சித்த மருத்துவர்கள் உங்களைப் பரிசோதித்து, உங்கள் ரிப்போர்ட்களைப் பார்த்து, உங்களுக்கான திட்டத்தை எளிய தமிழில் விளக்குவார்கள்."
            )}
          </p>

          <ul style={{ animationDelay: "260ms" }}
            className="motion-safe:animate-rise mt-5 mb-0 grid list-none gap-2.5 p-0 min-[640px]:mt-8 min-[640px]:gap-3 text-[.98rem] font-medium">
            {POINTS.map(([en, ta]) => (
              <li key={en} className="flex items-start gap-3">
                <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-[3px] h-5 w-5 flex-none text-gold">
                  <circle cx="10" cy="10" r="9.25" fill="none" stroke="currentColor" strokeOpacity=".5" />
                  <path d="M6 10.4l2.6 2.6L14 7.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-white/95">{t(en, ta)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div {...rise(380)} className="w-full motion-safe:animate-rise min-[960px]:max-w-[520px] min-[960px]:justify-self-end">
          <LeadForm variant="hero" />
        </div>
      </div>
    </section>
  );
}
