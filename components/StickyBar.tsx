"use client";

import { useBooking } from "@/lib/booking";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { PhoneIcon, WhatsAppIcon } from "./ui/Icons";

const linkCls =
  "inline-flex min-h-12 items-center justify-center gap-[.35em] whitespace-nowrap rounded-full px-[10px] text-[.88rem] font-semibold no-underline transition-[background-color,transform,box-shadow] duration-200 active:scale-[.97] active:duration-75 min-[860px]:px-6 min-[860px]:text-[.92rem]";
const iconCls = "h-[18px] w-[18px] flex-none";

/* Call / WhatsApp / Book bar fixed to the bottom on every screen size */
export default function StickyBar() {
  const { t } = useLang();
  const { openModal } = useBooking();

  return (
    <nav
      aria-label="Book an appointment"
      className="fixed right-0 bottom-0 left-0 z-[70] border-t border-solid border-line/80 bg-white/90 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] shadow-[0_-12px_32px_-12px_rgba(31,37,50,.18)] backdrop-blur-[14px] backdrop-saturate-[1.6]"
    >
      <div className="wrap flex items-center justify-between gap-3">
        <div className="hidden leading-[1.35] font-semibold text-ink min-[860px]:block">
          <span>{t("Book an appointment", "மருத்துவ சந்திப்பிற்கு முன்பதிவு செய்யுங்கள்")}</span>
          <small className="block text-[.78rem] font-normal text-muted">
            {t("Call, WhatsApp, or fill the form", "அழையுங்கள், WhatsApp செய்யுங்கள் அல்லது படிவத்தை நிரப்புங்கள்")}
          </small>
        </div>

        <div className="grid w-full grid-cols-[1fr_1fr_1.3fr] gap-2 min-[860px]:w-auto min-[860px]:grid-cols-[auto_auto_auto]">
          <a href="tel:+917871111115" onClick={() => track("call_sticky")} className={`${linkCls} border-[1.5px] border-solid border-crimson bg-white text-crimson hover:bg-[#FDF3F2]`}>
            <PhoneIcon className={iconCls} />
            <span>{t("Call", "அழைக்க")}</span>
          </a>
          <a
            href="https://wa.me/917871111115?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation"
            rel="noopener"
            onClick={() => track("whatsapp_sticky")}
            className={`${linkCls} bg-[#1FAF55] text-white hover:bg-[#1A9A4A]`}
          >
            <WhatsAppIcon className={iconCls} />
            <span>WhatsApp</span>
          </a>
          <a
            href="#book"
            onClick={(e) => {
              e.preventDefault();
              track("book_sticky");
              openModal();
            }}
            className={`${linkCls} bg-red text-white shadow-[0_10px_24px_-8px_rgba(224,48,52,.7)] hover:bg-red-hover`}
          >
            <span>{t("Book", "முன்பதிவு")}</span>
            <span className="hidden min-[420px]:inline">{t("appointment", "செய்யுங்கள்")}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
