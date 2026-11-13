"use client";

import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { ClockIcon, PhoneIcon } from "./ui/Icons";

export default function TopBar() {
  const { t } = useLang();
  return (
    <div className="bg-forest-deep text-[.8rem] text-white/85">
      <div className="wrap flex min-h-9 items-center justify-between gap-3 py-1.5">
        <span className="inline-flex items-center gap-2">
          <ClockIcon className="h-3.5 w-3.5 text-gold" />
          {t("Mon - Sun, 9:00 AM - 7:00 PM", "திங்கள் - ஞாயிறு 9:00 AM - 7:00 PM")}
        </span>
        <a
          href="tel:+917871111115"
          onClick={() => track("call_topbar")}
          className="inline-flex items-center gap-2 font-semibold text-white no-underline transition-colors hover:text-gold"
        >
          <PhoneIcon className="h-3.5 w-3.5 text-gold" />
          {t("Call: 78711 11115", "அழைக்க: 78711 11115")}
        </a>
      </div>
    </div>
  );
}
