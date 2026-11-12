"use client";

import { useLang } from "@/lib/i18n";
import SectionHeader from "./ui/SectionHeader";

const ITEMS: { myth: [string, string]; fact: [string, string] }[] = [
  {
    myth: ["Ayurveda is a last resort.", "ஆயுர்வேதம் கடைசி வழி."],
    fact: [
      "It is a complete medical system with its own way of examining you. It works best when you start early.",
      "இது தனக்கென்று பரிசோதனை முறை கொண்ட முழுமையான மருத்துவ முறை. சீக்கிரமே தொடங்கினால் சிறந்தது.",
    ],
  },
  {
    myth: ["There is no science behind it.", "இதற்கு அறிவியல் ஆதாரம் இல்லை."],
    fact: [
      "Ayurveda is regulated by the Government of India and practised by degree-qualified doctors, and research on it is growing.",
      "ஆயுர்வேதம் இந்திய அரசால் முறைப்படுத்தப்பட்டது; பட்டம் பெற்ற மருத்துவர்கள் பயிற்சி செய்கிறார்கள்; இதன் மீதான ஆராய்ச்சியும் வளர்ந்து வருகிறது.",
    ],
  },
  {
    myth: ["Everyone gets the same medicine.", "எல்லோருக்கும் ஒரே மருந்து."],
    fact: [
      "Your doctor examines you first, then explains your plan and what to expect.",
      "மருத்துவர் முதலில் பரிசோதித்து, உங்கள் திட்டத்தையும் எதிர்பார்க்க வேண்டியவற்றையும் விளக்குவார்.",
    ],
  },
];

/* Each myth sits beside its answer: the myth is struck through, the fact carries the weight */
export default function MythFacts() {
  const { t } = useLang();
  return (
    <section id="myths" className="section-y bg-white pt-[60px] min-[640px]:pt-[88px] min-[860px]:pt-[128px]">
      <div className="wrap">
        <SectionHeader
          align="split"
          kicker={["Know the facts", "உண்மை அறிவோம்"]}
          title={["Three myths, three facts", "மூன்று கட்டுக்கதைகள், மூன்று உண்மைகள்"]}
          sub={["What people often say about Ayurveda, answered plainly.", "ஆயுர்வேதம் பற்றி மக்கள் அடிக்கடி கேட்பவை, எளிய பதில்களுடன்."]}
        />
        <ol className="m-0 list-none border-t border-solid border-line p-0">
          {ITEMS.map((it) => (
            <li
              key={it.myth[0]}
              className="grid gap-3 border-b border-solid border-line py-5 min-[640px]:gap-4 min-[640px]:py-7 min-[860px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] min-[860px]:gap-14 min-[860px]:py-10"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 grid h-8 w-8 flex-none place-items-center rounded-full bg-[#FBE9E8] text-crimson"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </span>
                <div>
                  <p className="mt-0 mb-1 text-[.82rem] font-semibold text-crimson">{t("Myth", "கட்டுக்கதை")}</p>
                  <p className="display m-0 text-[clamp(1.15rem,2vw,1.4rem)] font-medium text-muted line-through decoration-crimson/40 decoration-[1.5px]">
                    {t(...it.myth)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 pl-12 min-[860px]:pl-0">
                <span
                  aria-hidden="true"
                  className="mt-1 hidden h-8 w-8 flex-none place-items-center rounded-full bg-gold text-kumkum min-[860px]:grid"
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
