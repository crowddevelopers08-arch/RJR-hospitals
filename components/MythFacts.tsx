"use client";

import { useLang } from "@/lib/i18n";
import SectionHeader from "./ui/SectionHeader";

const ITEMS: { myth: [string, string]; fact: [string, string] }[] = [
  {
    myth: ["Ayurveda takes too long to show results.", "ஆயுர்வேத சிகிச்சைக்கு அதிக காலம் ஆகும்."],
    fact: [
      "Treatment duration varies depending on the condition, its severity, and individual response.",
      "சிகிச்சைக்கான காலம் நோயின் தன்மை மற்றும் தனிப்பட்ட உடல்நிலையைப் பொறுத்து மாறுபடும்.",
    ],
  },
  {
    myth: ["Ayurvedic medicines have no side effects.", "ஆயுர்வேத மருந்துகளால் பக்கவிளைவுகள் இல்லை."],
    fact: [
      "Natural does not automatically mean risk-free. Ayurvedic medicines should be taken under qualified medical guidance, with proper attention to dosage and suitability.",
      "சரியான அளவு மற்றும் மருத்துவரின் ஆலோசனையுடன் மருந்துகளை எடுத்துக்கொள்வது அவசியம்.",
    ],
  },
  {
    myth: ["Ayurveda is only meant for older people.", "ஆயுர்வேதம் வயதானவர்களுக்கு மட்டுமே."],
    fact: [
      "People across different age groups may seek Ayurvedic consultations. Treatment suitability depends on individual health needs and medical assessment.",
      "பல்வேறு வயதினரும் தங்களின் உடல்நிலைக்கு ஏற்ற மருத்துவ ஆலோசனையைப் பெறலாம்.",
    ],
  },
];

/* Each myth sits beside its answer: the myth is struck through, the fact carries the weight */
export default function MythFacts() {
  const { t } = useLang();
  return (
    <section id="myths" className="section-y bg-ivory">
      <div className="wrap">
        <SectionHeader
          kicker={["Myth vs fact", "தெரிந்துகொள்ள வேண்டிய உண்மைகள்"]}
          title={["Ayurveda: Beyond the Common Misconceptions", "ஆயுர்வேதம்: தவறான புரிதல்களும் உண்மைகளும்"]}
        />
        <ol className="m-0 list-none border-t border-solid border-line p-0">
          {ITEMS.map((it, i) => (
            <li
              key={it.myth[0]}
              className="grid gap-3 border-b border-solid border-line py-5 min-[640px]:gap-4 min-[640px]:py-7 min-[860px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] min-[860px]:gap-14 min-[860px]:py-10"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-8 w-8 flex-none place-items-center rounded-full bg-[#F6E4E1] text-red"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </span>
                <div>
                  <p className="mt-0 mb-1 text-[.82rem] font-semibold text-red">{t(`Myth 0${i + 1}`, `தவறான புரிதல் 0${i + 1}`)}</p>
                  <p className="display m-0 text-[clamp(1.15rem,2vw,1.4rem)] font-medium text-muted line-through decoration-red/60 decoration-[1.5px]">
                    {t(...it.myth)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 pl-12 min-[860px]:pl-0">
                <span
                  aria-hidden="true"
                  className="mt-1 hidden h-8 w-8 flex-none place-items-center rounded-full bg-gold text-forest-deep min-[860px]:grid"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.4l3 3L12.5 5" />
                  </svg>
                </span>
                <div>
                  <p className="mt-0 mb-1 text-[.82rem] font-semibold text-gold-ink">{t("Fact", "உண்மை")}</p>
                  <p className="m-0 text-[1.05rem] leading-[1.7] text-ink min-[860px]:text-[1.1rem]">{t(...it.fact)}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
