"use client";

import { DOCS } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import Carousel from "./Carousel";
import DoctorCard from "./DoctorCard";
import SectionHeader from "./ui/SectionHeader";

export default function Doctors() {
  const { t } = useLang();
  return (
    <section id="doctors" className="section-y bg-ivory">
      <div className="wrap">
        <SectionHeader
          align="split"
          kicker={["Meet our doctors", "எங்கள் மருத்துவர்கள்"]}
          title={["Experienced Doctors. Care You Can Trust.", "அனுபவம் மிக்க மருத்துவர்கள். நம்பகமான பராமரிப்பு."]}
          sub={[
            "With a team of 300+ doctors, RJR brings together qualified medical professionals to guide you towards appropriate care.",
            "300+ மருத்துவர்களுடன், உங்கள் உடல்நலப் பிரச்சினைகளுக்குத் தகுந்த மருத்துவ வழிகாட்டுதலை வழங்குகிறோம்.",
          ]}
        />
        <p className="-mt-2 mb-6 text-[1.05rem] font-semibold text-ink min-[860px]:-mt-6">
          {t("Meet some of our doctors:", "எங்கள் மருத்துவக் குழுவிலிருந்து சிலர்:")}
        </p>
        <Carousel cols={3}>
          {DOCS.map((d) => (
            <DoctorCard key={d.ini} doc={d} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
