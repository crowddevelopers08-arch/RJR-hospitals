"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";

const STEPS: { h: [string, string]; p: [string, string] }[] = [
  {
    h: ["Examination and report review", "பரிசோதனை மற்றும் ரிப்போர்ட் ஆய்வு"],
    p: [
      "Bring any X-ray, MRI or blood reports you have; the doctor reads them with you.",
      "உங்கள் X-ray, MRI, இரத்தப் பரிசோதனை ரிப்போர்ட்கள் இருந்தால் கொண்டு வாருங்கள்.",
    ],
  },
  {
    h: ["Your personal plan", "உங்களுக்கான திட்டம்"],
    p: [
      "The doctor explains which Ayurveda or Siddha approach suits you, and what to expect.",
      "உங்களுக்கு எந்த ஆயுர்வேத அல்லது சித்த அணுகுமுறை பொருந்தும் என்பதை மருத்துவர் விளக்குவார்.",
    ],
  },
  {
    h: ["Therapy and follow-up", "சிகிச்சை மற்றும் தொடர் கவனிப்பு"],
    p: [
      "Medicines, therapies and follow-up visits, at the branch nearest to you.",
      "மருந்துகள், சிகிச்சைகள் மற்றும் தொடர் ஆலோசனை உங்கள் அருகிலுள்ள கிளையிலேயே.",
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
          kicker={["Simple process", "எளிய செயல்முறை"]}
          title={["How your consultation works", "ஆலோசனை எப்படி நடக்கிறது"]}
          sub={[
            "Three simple steps. At your first visit the doctor listens, examines, and explains.",
            "மூன்று எளிய படிகள். முதல் சந்திப்பில் நீங்கள் பேசுவீர்கள், மருத்துவர் கேட்பார், பார்ப்பார், விளக்குவார்.",
          ]}
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
      </div>
    </section>
  );
}
