"use client";

import { useLang } from "@/lib/i18n";
import { MailIcon, PhoneIcon, PinIcon } from "./ui/Icons";

export default function Footer() {
  const { t } = useLang();
  const linkCls = "font-semibold text-white no-underline transition-colors hover:text-gold";
  return (
    <footer className="bg-[#1B1414] pt-10 pb-8 min-[640px]:pt-14 min-[640px]:pb-10 text-[.92rem] text-white/70">
      <div className="wrap">
        <div className="grid gap-6 border-b border-solid border-white/10 pb-7 min-[640px]:gap-10 min-[640px]:pb-10 min-[860px]:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="RJR Herbal Hospitals logo"
              width={64}
              height={64}
              loading="lazy"
              className="block h-14 w-14 flex-none rounded-full bg-white ring-2 ring-gold/60 min-[640px]:h-16 min-[640px]:w-16"
            />
            <div>
              <p className="display m-0 text-[1.5rem] leading-tight text-white">RJR Herbal Hospitals</p>
              <p className="mt-1 mb-0 text-[.85rem] text-gold">Ayurveda &amp; Siddha</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PinIcon className="mt-1 h-[18px] w-[18px] flex-none text-gold" />
            <p className="m-0 leading-[1.7]">No. 150, Habibulla Road, Near Devar Kalyana Mandabam, T. Nagar, Chennai 600017</p>
          </div>
          <div className="grid gap-3">
            <p className="m-0 flex items-start gap-3">
              <PhoneIcon className="mt-1 h-[18px] w-[18px] flex-none text-gold" />
              <span>
                <span className="sr-only">{t("Phone:", "தொலைபேசி:")} </span>
                <a href="tel:+914440064006" className={linkCls}>
                  044 4006 4006
                </a>
                <br />
                <a href="tel:+917871111115" className={linkCls}>
                  +91 78711 11115
                </a>
              </span>
            </p>
            <p className="m-0 flex items-start gap-3">
              <MailIcon className="mt-1 h-[18px] w-[18px] flex-none text-gold" />
              <span>care@rjrherbalhospitals.com</span>
            </p>
          </div>
        </div>
        <p className="mt-6 mb-3 max-w-[90ch] min-[640px]:mt-8 text-[.8rem] leading-[1.7] text-white/55">
          {t(
            "Information on this page is general and is not a substitute for a doctor's advice. Treatment is advised only after examination by a registered practitioner. Individual results vary. Patient stories are shared with consent.",
            "இந்தப் பக்கத்தில் உள்ள தகவல்கள் பொதுவானவை; மருத்துவரின் ஆலோசனைக்கு மாற்றல்ல. பதிவு பெற்ற மருத்துவர் பரிசோதித்த பிறகே சிகிச்சை பரிந்துரைக்கப்படும். முடிவுகள் நபருக்கு நபர் மாறுபடும். நோயாளிகளின் அனுபவங்கள் ஒப்புதலுடன் பகிரப்படுகின்றன."
          )}
        </p>
        <nav aria-label="Footer" className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-[.86rem]">
          <a href="/" className="text-white/80 no-underline transition-colors hover:text-gold">
            {t("Home", "முகப்பு")}
          </a>
          <a href="/privacy-policy" className="text-white/80 no-underline transition-colors hover:text-gold">
            {t("Privacy Policy", "தனியுரிமைக் கொள்கை")}
          </a>
        </nav>
        <p className="m-0 text-[.74rem] text-white/40">
          © {new Date().getFullYear()} RJR Herbal Hospitals. Treatment illustrations: Scientific Animations,{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-white/60 underline">
            CC BY-SA 4.0
          </a>
          ; Blausen Medical,{" "}
          <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer" className="text-white/60 underline">
            CC BY 3.0
          </a>
          ; via Wikimedia Commons.
        </p>
      </div>
    </footer>
  );
}
