"use client";

import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { PhoneIcon } from "./ui/Icons";
import { btn } from "./ui/button";

export default function FinalCta() {
  const { t } = useLang();
  const { openModal } = useBooking();
  return (
    <section className="bg-white px-4 pb-10 min-[640px]:px-6 min-[640px]:pb-16 min-[860px]:pb-24">
      <div className="mx-auto max-w-[1200px] rounded-[28px] bg-crimson px-5 py-10 text-center min-[640px]:px-6 min-[640px]:py-16 text-white shadow-float min-[860px]:rounded-[36px] min-[860px]:px-16 min-[860px]:py-24">
        <h2 className="display mx-auto mt-0 mb-4 text-[clamp(1.9rem,4.4vw,3.1rem)] text-white min-[860px]:whitespace-nowrap">
          {t("Don't wait for the last resort", "கடைசி வழி வரை காத்திருக்க வேண்டாம்")}
        </h2>
        <p className="mx-auto mt-0 mb-6 max-w-[46ch] min-[640px]:mb-9 text-[1.06rem] leading-[1.7] text-white/85">
          {t("Book a consultation at your nearest RJR branch today.", "இன்றே உங்கள் அருகிலுள்ள RJR கிளையில் ஆலோசனைக்கு முன்பதிவு செய்யுங்கள்.")}
        </p>
        <div className="flex flex-col items-stretch justify-center gap-3 min-[480px]:flex-row min-[480px]:items-center">
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              track("final_book");
              openModal();
            }}
            className={btn("gold", "lg")}
          >
            {t("Book a consultation", "ஆலோசனைக்கு முன்பதிவு")}
          </a>
          <a href="tel:+917871111115" onClick={() => track("call_final")} className={btn("lineLight", "lg")}>
            <PhoneIcon className="h-[18px] w-[18px]" />
            {t("Call us", "அழையுங்கள்")}
          </a>
        </div>
      </div>
    </section>
  );
}
