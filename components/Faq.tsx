"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import SectionHeader from "./ui/SectionHeader";

const FAQS: { q: [string, string]; a: [string, string] }[] = [
  {
    q: ["Is Ayurveda scientifically proven?", "ஆயுர்வேதம் அறிவியல் ரீதியாக நிரூபிக்கப்பட்டதா?"],
    a: [
      "Ayurveda is a government-regulated medical system in India, practised by degree-qualified doctors, and research on it is growing. Your doctor will explain what is known for your condition and what to expect, and will not promise outcomes.",
      "ஆயுர்வேதம் இந்தியாவில் அரசால் முறைப்படுத்தப்பட்ட மருத்துவ முறை; பட்டம் பெற்ற மருத்துவர்கள் இதைப் பயிற்சி செய்கிறார்கள்; இதன் மீதான ஆராய்ச்சியும் வளர்ந்து வருகிறது. உங்கள் நிலைக்கு என்ன அறியப்பட்டுள்ளது, என்ன எதிர்பார்க்கலாம் என்பதை மருத்துவர் விளக்குவார்; முடிவுகளுக்கு உறுதி அளிக்க மாட்டார்.",
    ],
  },
  {
    q: ["Can I continue my current medicines?", "நான் தற்போது எடுக்கும் மருந்துகளைத் தொடரலாமா?"],
    a: [
      "Tell the doctor about every medicine you take. Do not stop any prescribed medicine on your own; the doctor will advise you at the consultation.",
      "நீங்கள் எடுக்கும் எல்லா மருந்துகளையும் மருத்துவரிடம் தெரிவியுங்கள். பரிந்துரைக்கப்பட்ட எந்த மருந்தையும் நீங்களாக நிறுத்த வேண்டாம்; ஆலோசனையின்போது மருத்துவர் வழிகாட்டுவார்.",
    ],
  },
  {
    q: ["What should I bring to the first visit?", "முதல் வருகைக்கு என்ன கொண்டு வர வேண்டும்?"],
    a: [
      "Any X-ray, MRI, scan or blood reports, your current prescriptions, and a family member if you like. The doctor reads them with you.",
      "உங்களிடம் உள்ள X-ray, MRI, ஸ்கேன் அல்லது இரத்தப் பரிசோதனை ரிப்போர்ட்கள், தற்போதைய மருந்துச் சீட்டுகள்; விரும்பினால் குடும்ப உறுப்பினர் ஒருவரையும் அழைத்து வரலாம். மருத்துவர் அவற்றை உங்களுடன் சேர்ந்து பார்ப்பார்.",
    ],
  },
  {
    q: ["How long does a plan take?", "சிகிச்சைத் திட்டம் எவ்வளவு காலம் ஆகும்?"],
    a: [
      "It depends on your condition and how long you have had it. The doctor explains the expected duration and the follow-up schedule after examining you.",
      "இது உங்கள் நிலையையும், அது எவ்வளவு காலமாக உள்ளது என்பதையும் பொறுத்தது. பரிசோதனைக்குப் பிறகு எதிர்பார்க்கப்படும் காலத்தையும் தொடர் ஆலோசனை அட்டவணையையும் மருத்துவர் விளக்குவார்.",
    ],
  },
  {
    q: ["Do I have to be admitted?", "நான் உள்நோயாளியாகச் சேர வேண்டுமா?"],
    a: [
      "Not for the first consultation. Whether you need therapies or in-patient care is decided by the doctor after the examination.",
      "முதல் ஆலோசனைக்கு தேவையில்லை. சிகிச்சைகள் அல்லது உள்நோயாளி பராமரிப்பு தேவையா என்பதை பரிசோதனைக்குப் பிறகு மருத்துவரே முடிவு செய்வார்.",
    ],
  },
];

/* One answer open at a time; the panel's height animates so the change is easy to follow */
function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-solid border-line">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex min-h-[56px] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-4 min-[640px]:min-h-[64px] min-[640px]:gap-6 min-[640px]:py-5 text-left text-[1.05rem] font-semibold leading-[1.45] text-ink transition-colors hover:text-forest min-[860px]:text-[1.1rem]"
        >
          <span>{q}</span>
          <span
            aria-hidden="true"
            className={`relative grid h-9 w-9 flex-none place-items-center rounded-full transition-[background-color,color,transform] duration-300 ${
              open ? "rotate-45 bg-forest text-white" : "bg-ivory text-forest ring-1 ring-line"
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M8 3v10M3 8h10" />
            </svg>
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="a"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="mt-0 mb-5 max-w-[62ch] pr-2 min-[640px]:mb-6 min-[640px]:pr-14 text-[1rem] leading-[1.75] text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-y bg-ivory">
      <div className="wrap grid gap-2 min-[960px]:grid-cols-[.8fr_1.2fr] min-[960px]:gap-16">
        <div className="min-[960px]:sticky min-[960px]:top-28 min-[960px]:self-start">
          <SectionHeader title={["Common questions", "அடிக்கடி கேட்கப்படும் கேள்விகள்"]} />
        </div>
        <div className="border-t border-solid border-line">
          {FAQS.map((f, i) => (
            <Item key={f.q[0]} q={t(...f.q)} a={t(...f.a)} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
