"use client";

import { useLang } from "@/lib/i18n";
import Carousel from "./Carousel";
import SectionHeader from "./ui/SectionHeader";

/* Consented patient videos hosted on Cloudinary. `id` is the version/public-id (no extension):
   Cloudinary transcodes every source (.mp4 or .mov) to a browser-safe MP4, and makes the poster from the first second. */
const CLD = "https://res.cloudinary.com/t7p14nps/video/upload";
const STORIES: { id: string; b: [string, string]; s: [string, string] }[] = [
  {
    id: "v1794573346/01_JEYAMMAL_RA_EXTEND_1_1_1",
    b: ["Jeyammal", "ஜெயம்மாள்"],
    s: ["Rheumatoid arthritis", "முடக்கு வாதம்"],
  },
  {
    id: "v1794573228/02_%E0%AE%A8%E0%AE%B2%E0%AF%8D%E0%AE%B2%E0%AF%81%E0%AE%9A%E0%AE%BE%E0%AE%AE%E0%AE%BF_%E0%AE%95%E0%AF%87%E0%AE%B3%E0%AE%AE%E0%AF%8D%E0%AE%AA%E0%AE%BE%E0%AE%95%E0%AF%8D%E0%AE%95%E0%AE%AE%E0%AF%8D_%E0%AE%9A%E0%AF%8A%E0%AE%B0%E0%AE%BF%E0%AE%AF%E0%AE%BE%E0%AE%B8%E0%AE%BF%E0%AE%B8%E0%AF%8D_1_1",
    b: ["Nallusamy, Kelambakkam", "நல்லுசாமி, கேளம்பாக்கம்"],
    s: ["Psoriasis", "சொரியாசிஸ்"],
  },
  {
    id: "v1794572563/01_HEMALATHA_-_ASTHUMA_1_1",
    b: ["Hemalatha", "ஹேமலதா"],
    s: ["Asthma", "ஆஸ்துமா"],
  },
  {
    id: "v1794572561/%E0%AE%86%E0%AE%95%E0%AE%BE%E0%AE%B7%E0%AF%8D_%E0%AE%95%E0%AF%81%E0%AE%AE%E0%AF%8D%E0%AE%AE%E0%AE%BF%E0%AE%9F%E0%AE%BF%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AF%82%E0%AE%A3%E0%AF%8D%E0%AE%9F%E0%AE%BF_%E0%AE%9A%E0%AF%88%E0%AE%A9%E0%AE%B8%E0%AF%8D_1",
    b: ["Akash, Gummidipoondi", "ஆகாஷ், கும்மிடிப்பூண்டி"],
    s: ["Sinus", "சைனஸ்"],
  },
  {
    id: "v1794572559/1%E0%AE%AE%E0%AF%81%E0%AE%B0%E0%AF%81%E0%AE%95%E0%AE%A9%E0%AF%8D_%E0%AE%AE%E0%AF%82%E0%AE%A3%E0%AE%BE%E0%AE%B1%E0%AF%81_%E0%AE%95%E0%AE%BE%E0%AE%B2%E0%AF%8D_%E0%AE%B5%E0%AE%B2%E0%AE%BF_1",
    b: ["Murugan, Munnar", "முருகன், மூணாறு"],
    s: ["Leg pain", "கால் வலி"],
  },
];

/* Only one story plays at a time: starting a video pauses any other one on the page */
function pauseOthers(e: React.SyntheticEvent<HTMLVideoElement>) {
  document.querySelectorAll<HTMLVideoElement>("#stories video").forEach((v) => {
    if (v !== e.currentTarget && !v.paused) v.pause();
  });
}

export default function PatientStories() {
  const { t } = useLang();
  return (
    <section id="stories" className="section-y bg-sand">
      <div className="wrap">
        <SectionHeader
          align="split"
          kicker={["Patient experiences", "நோயாளிகளின் அனுபவங்கள்"]}
          title={["Patient stories", "RJR உடனான மருத்துவப் பயணங்கள்."]}
          sub={[
            "These are personal experiences shared with consent. Individual results vary.",
            "எங்கள் நோயாளிகள் தங்களின் அனுபவங்களைப் பகிர்ந்துகொள்கிறார்கள். தனிப்பட்ட அனுபவங்கள்; முடிவுகள் மாறுபடலாம்.",
          ]}
        />
        {/* no auto-advance here, so the carousel never slides away while a video is playing */}
        <Carousel cols={3} autoplay={false}>
          {STORIES.map((s) => (
            <figure key={s.id} className="m-0 overflow-hidden rounded-[22px] bg-white shadow-card ring-1 ring-line">
              <video
                className="block aspect-video w-full bg-forest object-cover"
                src={`${CLD}/q_auto/${s.id}.mp4`}
                poster={`${CLD}/so_1,q_auto,w_720/${s.id}.jpg`}
                controls
                playsInline
                preload="none"
                onPlay={pauseOthers}
                aria-label={`${t(...s.b)}: ${t(...s.s)}`}
              />
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
