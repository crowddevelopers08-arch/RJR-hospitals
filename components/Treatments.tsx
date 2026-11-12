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
          align="split"
          kicker={["Our care areas", "சிகிச்சைப் பிரிவுகள்"]}
          title={["What we treat", "நாங்கள் சிகிச்சை அளிப்பவை"]}
          sub={["Not listed? Ask the doctor at your consultation.", "உங்கள் பிரச்சனை பட்டியலில் இல்லையா? ஆலோசனையின்போது மருத்துவரிடம் கேளுங்கள்."]}
        />
        <Carousel>
          {TREAT.map((x) => (
            <TreatmentCard key={x.en[0]} item={x} />
          ))}
        </Carousel>
        <div className="mt-6 flex flex-col items-center gap-3 min-[640px]:mt-10 text-center">
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              track("treat_book");
              openModal();
            }}
            className={btn("red", "lg")}
          >
            {t("Book a consultation", "ஆலோசனைக்கு முன்பதிவு செய்யுங்கள்")}
          </a>
          <small className="block max-w-[46ch] text-[.86rem] text-muted">
            {t("The doctor examines you and explains at your first consultation.", "முதல் ஆலோசனையில் மருத்துவர் உங்களைப் பரிசோதித்து விளக்குவார்.")}
          </small>
        </div>
      </div>
    </section>
  );
}
