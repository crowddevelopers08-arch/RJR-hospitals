"use client";

import { useLang } from "@/lib/i18n";
import Carousel from "./Carousel";
import SectionHeader from "./ui/SectionHeader";

/* TODO: replace each placeholder with a consented patient video (no outcome promises in captions). */
const STORIES: { b: [string, string]; s: [string, string] }[] = [
  { b: ["Patient story 1", "நோயாளி அனுபவம் 1"], s: ["Add consented video here", "ஒப்புதல் பெற்ற வீடியோவை இங்கே சேர்க்கவும்"] },
  { b: ["Patient story 2", "நோயாளி அனுபவம் 2"], s: ["Add consented video here", "ஒப்புதல் பெற்ற வீடியோவை இங்கே சேர்க்கவும்"] },
  { b: ["Doctor explains", "மருத்துவர் விளக்கம்"], s: ["Add 30-second doctor video here", "30 வினாடி மருத்துவர் வீடியோவை இங்கே சேர்க்கவும்"] },
];

/* Video slots. Until consented videos exist they read clearly as placeholders, never as playable media. */
export default function PatientStories() {
  const { t } = useLang();
  return (
    <section id="stories" className="section-y bg-white">
      <div className="wrap">
        <SectionHeader
          align="split"
          title={["Patient stories", "நோயாளிகள் அனுபவங்கள்"]}
          sub={[
            "These are personal experiences shared with consent. Individual results vary.",
            "இவை ஒப்புதலுடன் பகிரப்பட்ட தனிநபர் அனுபவங்கள்; முடிவுகள் நபருக்கு நபர் மாறுபடும்.",
          ]}
        />
        <Carousel cols={3}>
          {STORIES.map((s) => (
            <div
              key={s.b[0]}
              className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,#FBF7F1,#F3EADB)] p-6 text-center ring-1 ring-line"
            >
              <span aria-hidden="true" className="absolute inset-3 rounded-[16px] border border-dashed border-[#D9C9AF]" />
              <div className="relative">
                <span aria-hidden="true" className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-white text-crimson shadow-card">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="13" height="12" rx="2.5" />
                    <path d="M16 10.5l5-3v9l-5-3" />
                  </svg>
                </span>
                <b className="display mb-1 block text-[1.15rem] text-crimson">{t(...s.b)}</b>
                <span className="text-[.88rem] text-muted">{t(...s.s)}</span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
