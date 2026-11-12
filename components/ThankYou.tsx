"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BR, bname, fmtPhone } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./ui/Icons";

const MAIN_PHONE = "+917871111115";

/* Shown after a successful booking (/thank-you?branch=<branch name>).
   Gives the visitor the branch they picked, with one-tap Call, WhatsApp and Directions. */
export default function ThankYou() {
  const { t, lang } = useLang();
  const qs = useSearchParams();
  const b = BR.find((x) => x.n === qs.get("branch"));

  useEffect(() => {
    track("thankyou_view", { branch: b?.n || "" });
  }, [b]);

  const phone = b?.p[0] || MAIN_PHONE;
  const branchLabel = b ? bname(b, lang) : "RJR";
  const wa = `https://wa.me/917871111115?text=${encodeURIComponent(
    `Hello, I just booked a consultation${b ? ` at RJR ${b.n}` : ""}. Please confirm.`
  )}`;
  const dirQuery = b ? (b.x ? encodeURIComponent(`RJR Herbal Hospital ${b.n} ${b.a}`) : `${b.la},${b.lo}`) : "";

  const btnBase =
    "inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-full px-5 text-[.95rem] font-semibold no-underline transition-[background-color,transform] duration-200 active:scale-[.97]";

  return (
    <main id="top" className="bg-crimson-dk text-white">
      <section className="wrap grid min-h-[calc(100dvh-260px)] place-items-center py-14 min-[860px]:py-20">
        <div className="w-full max-w-[600px] text-center motion-safe:animate-rise">
          <span aria-hidden="true" className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gold text-kumkum shadow-[0_0_0_10px_rgba(253,207,59,.18)]">
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h1 className="display m-0 text-[clamp(2.1rem,5vw,3rem)] text-white">{t("Thank you!", "நன்றி!")}</h1>
          <p className="mx-auto mt-4 mb-8 max-w-[46ch] text-[1.06rem] leading-[1.7] text-white/85">
            {t(
              `Your request is received. Our team at ${branchLabel} will call you shortly. Want to speak right now?`,
              `உங்கள் கோரிக்கை பெறப்பட்டது. ${branchLabel} கிளை குழு விரைவில் உங்களை அழைக்கும். உடனே பேச வேண்டுமா?`
            )}
          </p>

          <div className="relative overflow-hidden rounded-[24px] bg-white p-6 text-left text-ink shadow-float min-[480px]:p-7">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#C22220,#FDCF3B)]" />
            {b ? (
              <>
                <h2 className="display m-0 text-[1.3rem] leading-[1.25] text-crimson">RJR Herbal Hospital, {bname(b, lang)}</h2>
                <p className="mt-2 mb-1 flex items-start gap-2.5 text-[.94rem] leading-[1.6] text-muted">
                  <PinIcon className="mt-[3px] h-4 w-4 flex-none text-crimson" />
                  {b.a}
                </p>
                <p className="mt-0 mb-5 flex items-center gap-2.5 text-[.94rem] text-muted">
                  <PhoneIcon className="h-4 w-4 flex-none text-crimson" />
                  {b.p.map(fmtPhone).join(" · ")}
                </p>
              </>
            ) : (
              <h2 className="display mt-0 mb-5 text-[1.3rem] text-crimson">RJR Herbal Hospitals</h2>
            )}

            <div className={`grid gap-2.5 ${b ? "min-[560px]:grid-cols-3" : "min-[560px]:grid-cols-2"}`}>
              <a href={`tel:${phone}`} onClick={() => track("call_thankyou", { branch: b?.n || "" })} className={`${btnBase} bg-crimson text-white hover:bg-crimson-dk`}>
                <PhoneIcon className="h-5 w-5" />
                {t("Call", "அழைக்க")}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_thankyou", { branch: b?.n || "" })}
                className={`${btnBase} bg-[#1FAF55] text-white hover:bg-[#1A9A4A]`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
              {b && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${dirQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("directions_thankyou", { branch: b.n })}
                  className={`${btnBase} border-[1.5px] border-solid border-crimson bg-white text-crimson hover:bg-[#FDF3F2]`}
                >
                  <PinIcon className="h-5 w-5" />
                  {t("Directions", "வழி காட்டு")}
                </a>
              )}
            </div>
          </div>

          <a href="/" className="mt-7 inline-block text-[.95rem] font-semibold text-gold underline underline-offset-4 hover:text-white">
            {t("Back to home page", "முகப்புப் பக்கத்துக்குத் திரும்பு")}
          </a>
        </div>
      </section>
    </main>
  );
}
