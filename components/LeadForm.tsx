"use client";

import { useEffect, useRef, useState } from "react";
import { useBooking } from "@/lib/booking";
import { BR, CONCERNS, CONFIG, UI, bname } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { btn } from "./ui/button";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

const inputCls =
  "w-full min-h-[50px] rounded-xl border border-solid border-[#DDD2C2] bg-ivory px-4 py-3 text-[16px] leading-normal text-ink transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-[#9AA3B2] hover:border-[#CBBBA4] focus:border-crimson focus:bg-white focus:shadow-[0_0_0_4px_rgba(194,34,32,.12)] focus:outline-none aria-[invalid=true]:border-red aria-[invalid=true]:bg-white";
const labelCls = "mt-3 mb-1.5 min-[640px]:mt-4 block text-[.86rem] leading-[1.4] font-semibold text-ink";
const errCls = "mt-1.5 flex items-center gap-1.5 text-[.8rem] font-medium text-red-hover";

/* Reads ?branch= and ?c= / ?concern= so ads can pre-fill the form */
function branchFromUrl(qs: URLSearchParams) {
  const wanted = (qs.get("branch") || "").toLowerCase();
  let found = "";
  BR.forEach((b) => {
    const n = b.n.toLowerCase();
    if (n === wanted || (n.split(" - ")[0] === wanted && !found)) found = b.n;
  });
  return found;
}

type Errors = { name?: boolean; phone?: boolean; consent?: boolean };

export default function LeadForm({ variant }: { variant: "hero" | "modal" }) {
  const { t, lang } = useLang();
  const { openCount, presetBranch } = useBooking();
  const isModal = variant === "modal";
  const sfx = isModal ? "_m" : "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [concern, setConcern] = useState("");
  const [consent, setConsent] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const branchRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const b = branchFromUrl(qs);
    if (b) setBranch(b);
    const c = qs.get("c") || qs.get("concern");
    if (c) setConcern(c);
    const u: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
      const v = qs.get(k);
      if (v) u[k] = v;
    });
    setUtm(u);
  }, []);

  // pop-up copy: reset to the form view each time it opens, and take the branch it was opened for
  useEffect(() => {
    if (!isModal || openCount === 0) return;
    setSubmitted(false);
    setErrors({});
    if (presetBranch) setBranch(presetBranch);
    const id = setTimeout(() => nameRef.current?.focus(), 60);
    return () => clearTimeout(id);
  }, [isModal, openCount, presetBranch]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nm = name.trim();
    const ph = phone.replace(/\D/g, "");
    const errs: Errors = {
      name: nm.length < 2,
      phone: !/^[6-9]\d{9}$/.test(ph),
      consent: !consent,
    };
    setErrors(errs);
    let ok = !errs.name && !errs.phone && !errs.consent;
    if (!branch) {
      branchRef.current?.focus();
      ok = false;
    }
    if (!ok) return;

    const data: Record<string, string> = {
      name: nm,
      phone: ph,
      branch,
      concern,
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      gclid: "",
      fbclid: "",
      ...utm,
      lang,
      page_url: location.href,
      submitted_at: new Date().toISOString(),
    };
    const done = () => {
      track("generate_lead", { branch: data.branch, concern: data.concern, lang });
      setSubmitted(true);
    };
    if (CONFIG.WEBHOOK_URL) {
      fetch(CONFIG.WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(done)
        .catch(done);
    } else {
      console.warn("WEBHOOK_URL not set; lead not sent", data);
      done();
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] bg-white p-5 text-ink min-[480px]:p-8 ${
        isModal ? "pt-9 shadow-[0_30px_80px_rgba(0,0,0,.45)]" : "shadow-float ring-1 ring-white/20"
      }`}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#C22220,#FDCF3B)]" />
      {!submitted ? (
        <form noValidate onSubmit={onSubmit}>
          <h2 id={isModal ? "mTitle" : undefined} className="display mt-0 mb-1.5 pr-10 text-[1.6rem] text-crimson">
            {t("Book a consultation", "ஆலோசனைக்கு முன்பதிவு செய்யுங்கள்")}
          </h2>
          <p className="m-0 text-[.92rem] text-muted">
            {t("Your nearest branch will call you back shortly.", "உங்கள் அருகிலுள்ள கிளை விரைவில் உங்களை அழைக்கும்.")}
          </p>

          {/* hero: 2 x 2 grid from 480px to keep the card short; pop-up: single column */}
          <div className={isModal ? "" : "grid gap-x-3 min-[480px]:grid-cols-2 min-[480px]:items-end"}>
            <div>
            <label htmlFor={`f_name${sfx}`} className={labelCls}>
              {t("Name", "பெயர்")}
            </label>
            <input ref={nameRef} id={`f_name${sfx}`} name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} aria-invalid={errors.name || undefined} className={inputCls} />
            {errors.name && <div className={errCls}>{t("Please enter your name", "பெயரை உள்ளிடவும்")}</div>}
            </div>
            <div>
            <label htmlFor={`f_phone${sfx}`} className={labelCls}>
              {t("Mobile number", "மொபைல் எண்")}
            </label>
            <input
              id={`f_phone${sfx}`}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder={t("10-digit number", "10 இலக்க எண்")}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={errors.phone || undefined}
              className={inputCls}
            />
            {errors.phone && <div className={errCls}>{t("Enter a valid 10-digit mobile number", "சரியான 10 இலக்க எண்ணை உள்ளிடவும்")}</div>}
            </div>
            <div>
            <label htmlFor={`f_branch${sfx}`} className={labelCls}>
              {t("Branch", "கிளை")}
            </label>
            <select ref={branchRef} id={`f_branch${sfx}`} name="branch" required value={branch} onChange={(e) => setBranch(e.target.value)} className={inputCls}>
              <option value="">{UI[lang].sel}</option>
              {BR.map((b) => (
                <option key={b.n} value={b.n}>
                  {bname(b, lang)}
                </option>
              ))}
            </select>
            </div>
            <div>
            <label htmlFor={`f_cond${sfx}`} className={labelCls}>
              {t("What would you like to consult about?", "எதைப் பற்றி ஆலோசிக்க விரும்புகிறீர்கள்?")}
            </label>
            <select id={`f_cond${sfx}`} name="concern" value={concern} onChange={(e) => setConcern(e.target.value)} className={inputCls}>
              {CONCERNS.map((c) => (
                <option key={c.v} value={c.v}>
                  {t(c.en, c.ta)}
                </option>
              ))}
            </select>
            </div>
          </div>

          <label className="mt-5 mb-1 flex cursor-pointer items-start gap-3 text-[.84rem] leading-[1.55] font-normal text-muted">
            <input
              id={`f_consent${sfx}`}
              name="consent"
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-[2px] h-[18px] w-[18px] shrink-0 cursor-pointer accent-crimson"
            />
            <span>
              {t(
                "I agree to be contacted by call or WhatsApp about my consultation.",
                "என்னை அழைக்க அல்லது WhatsApp மூலம் தொடர்பு கொள்ள ஒப்புக்கொள்கிறேன்."
              )}
            </span>
          </label>
          {errors.consent && <div className={errCls}>{t("Please tick to continue", "தொடர ஒப்புதல் அவசியம்")}</div>}

          <button
            type="submit"
            onClick={() => track("form_submit_click", { branch })}
            className={btn("red", "md", "mt-5 w-full")}
          >
            {t("Book my consultation", "என் ஆலோசனையை பதிவு செய்")}
          </button>
          <p className="mt-3 mb-0 text-center text-[.78rem] leading-[1.5] text-muted">
            {t(
              "Treatment is advised only after a doctor's examination. Individual results vary.",
              "சிகிச்சை, மருத்துவர் பரிசோதனைக்குப் பிறகே பரிந்துரைக்கப்படும். முடிவுகள் நபருக்கு நபர் மாறுபடும்."
            )}
          </p>
        </form>
      ) : (
        <div role="status" className="py-4 text-center">
          <span aria-hidden="true" className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#FBE9E8] text-crimson">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h3 className="display mt-0 mb-2 text-[1.6rem] text-crimson">{t("Thank you!", "நன்றி!")}</h3>
          <p className="mt-0 mb-5 text-muted">
            {t("Your branch will call you shortly. Want to speak right now?", "உங்கள் கிளை விரைவில் உங்களை அழைக்கும். உடனே பேச வேண்டுமா?")}
          </p>
          <a href="tel:+917871111115" onClick={() => track("call_thankyou")} className={btn("gold", "md", "w-full")}>
            {t("Call now", "இப்போதே அழையுங்கள்")}
          </a>
        </div>
      )}
    </div>
  );
}
