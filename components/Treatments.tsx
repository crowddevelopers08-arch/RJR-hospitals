"use client";

import { useBooking } from "@/lib/booking";
import { TREAT } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import Carousel from "./Carousel";
import TreatmentCard from "./TreatmentCard";
import SectionHeader from "./ui/SectionHeader";
import { btn } from "./ui/button";

export default function Treatments() {
  const { t } = useLang();
  const { openModal } = useBooking();

  return (
    <section id="conditions" className="section-y bg-white">
      <div className="wrap">
        <SectionHeader
          kicker={["Our areas of care", "எங்களின் மருத்துவப் பராமரிப்புப் பிரிவுகள்"]}
          title={["Comprehensive Care for Your Health Concerns", "உங்கள் உடல்நலப் பிரச்சினைகளுக்கு ஏற்ற மருத்துவ ஆலோசனை."]}
        />
        <Carousel>
          {TREAT.map((x) => (
            <TreatmentCard key={x.en[0]} item={x} />
          ))}
        </Carousel>
        <div className="mx-auto mt-10 flex max-w-[620px] flex-col min-[860px]:max-w-none items-center text-center min-[860px]:mt-14">
          <h3 className="display mt-0 mb-2 text-[clamp(1.35rem,2.6vw,1.75rem)] text-ink">
            {t("Not seeing your health concern listed?", "உங்கள் பிரச்சினை பட்டியலில் இல்லையா?")}
          </h3>
          <p className="mt-0 mb-6 text-[1.02rem] leading-[1.7] text-muted min-[860px]:whitespace-nowrap">
            {t(
              "Your health concerns deserve individual attention. Speak with our qualified doctor to find out.",
              "எங்கள் மருத்துவர்களை அணுகி ஆலோசனை பெறுங்கள்."
            )}
          </p>
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              track("treat_book");
              openModal();
            }}
            className={btn("red", "lg")}
          >
            {t("Book Your Consultation", "மருத்துவ ஆலோசனையைப் பதிவு செய்யுங்கள்")}
          </a>
        </div>
      </div>
    </section>
  );
}
