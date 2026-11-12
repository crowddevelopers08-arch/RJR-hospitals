"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

const STEPS: { h: [string, string]; p: [string, string] }[] = [
  {
    h: ["Personalised Medical Assessment", "மருத்துவப் பரிசோதனை"],
    p: [
      "Our doctor understand your symptoms, medical history and health concerns before considering the treatment.",
      "உங்கள் அறிகுறிகள் மற்றும் மருத்துவ வரலாற்றை மருத்துவர் கேட்டறிந்து பரிசோதிப்பார்.",
    ],
  },
  {
    h: ["Clear Treatment Guidance", "சிகிச்சை வழிகாட்டுதல்"],
    p: [
      "Based on the examination, our doctor explains the suitable Ayurveda or Siddha treatment and what to expect.",
      "உங்கள் உடல்நிலைக்கு ஏற்ற ஆயுர்வேத அல்லது சித்த மருத்துவ முறைகளை விளக்குவார்.",
    ],
  },
  {
    h: ["Continued Care & Follow-up", "தொடர் மருத்துவப் பராமரிப்பு"],
    p: [
      "Our doctor guides you through recommended medicines, therapies and follow-up visits as needed.",
      "மருந்துகள், சிகிச்சைகள் மற்றும் தொடர் ஆலோசனைகள் மூலம் வழிகாட்டுவார்.",
    ],
  },
];

/* A real sequence, so numbered nodes on a connecting line: vertical on phones, horizontal from 860px */
export default function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="how" className="section-y bg-ivory">
      <div className="wrap">
        <SectionHeader
          align="center"
          kicker={["How your consultation works", "உங்கள் மருத்துவ ஆலோசனைப் பயணம்"]}
          title={["The Right Care Begins with the Right Consultation.", "சரியான பராமரிப்பு, சரியான ஆலோசனையில் தொடங்குகிறது."]}
          sub={["Your health deserves attention, understanding and proper medical guidance.", ""]}
        />
        <ol className="relative m-0 grid list-none gap-0 p-0 min-[860px]:grid-cols-3 min-[860px]:gap-8">
          {/* connecting line */}
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-6 w-px bg-[linear-gradient(180deg,#C22220,#FDCF3B)] min-[860px]:top-6 min-[860px]:right-[16.66%] min-[860px]:bottom-auto min-[860px]:left-[16.66%] min-[860px]:h-px min-[860px]:w-auto min-[860px]:bg-[linear-gradient(90deg,#C22220,#FDCF3B)]"
          />
          {STEPS.map((s, i) => (
            <Reveal
              as="li"
              key={s.h[0]}
              delay={i * 0.12}
              className="relative grid grid-cols-[48px_1fr] gap-4 pb-5 last:pb-0 min-[640px]:gap-5 min-[640px]:pb-10 min-[860px]:grid-cols-1 min-[860px]:grid-rows-[auto_1fr] min-[860px]:justify-items-center min-[860px]:gap-6 min-[860px]:pb-0 min-[860px]:text-center"
            >
              <span className="display relative z-[1] grid h-12 w-12 place-items-center rounded-full bg-crimson text-[1.3rem] text-gold shadow-[0_0_0_6px_#FBF7F1,0_10px_24px_-6px_rgba(194,34,32,.55)]">
                {i + 1}
              </span>
              <div className="rounded-[20px] bg-white p-5 shadow-card min-[640px]:p-6 ring-1 ring-line min-[860px]:h-full min-[860px]:w-full min-[860px]:p-8">
                <h3 className="display mt-0 mb-2 text-[1.3rem] leading-[1.25] text-ink">{t(...s.h)}</h3>
                <p className="m-0 text-[.98rem] leading-[1.7] text-muted">{t(...s.p)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="display mx-auto mt-10 mb-0 text-center min-[860px]:whitespace-nowrap text-[1.15rem] leading-[1.45] text-crimson min-[860px]:mt-14 min-[860px]:text-[1.3rem]">
          {t("Your health. Your concerns. Guided by qualified doctors.", "உங்கள் உடல்நலம். தகுதிபெற்ற மருத்துவர்களின் வழிகாட்டுதல்.")}
        </p>
      </div>
    </section>
  );
}
