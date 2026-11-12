"use client";

import { useLang } from "@/lib/i18n";

type Bi = [string, string];

/* Kicker is a quiet sentence-case label with a short gold rule; the heading carries the weight.
   align="split" puts the subtitle beside the heading on wide screens. */
export default function SectionHeader({
  kicker,
  title,
  sub,
  tone = "light",
  align = "left",
}: {
  kicker?: Bi;
  title: Bi;
  sub?: Bi;
  tone?: "light" | "dark";
  align?: "left" | "center" | "split";
}) {
  const { t } = useLang();
  const dark = tone === "dark";
  const center = align === "center";
  const subText = sub ? t(...sub) : "";

  return (
    <header
      className={`mb-6 min-[640px]:mb-10 min-[860px]:mb-14 ${center ? "mx-auto max-w-[720px] text-center min-[860px]:max-w-none" : ""} ${
        align === "split" ? "grid gap-3 min-[640px]:gap-4 min-[960px]:grid-cols-[1.1fr_.9fr] min-[960px]:items-end min-[960px]:gap-12" : ""
      }`}
    >
      <div>
        {kicker && (
          <p
            className={`mt-0 mb-2 flex items-center gap-3 min-[640px]:mb-4 text-[1rem] font-semibold min-[860px]:text-[1.08rem] ${center ? "justify-center" : ""} ${
              dark ? "text-gold" : "text-crimson"
            }`}
          >
            {t(...kicker)}
          </p>
        )}
        <h2
          className={`display m-0 max-w-[22ch] text-[clamp(1.8rem,3.8vw,2.75rem)] ${center ? "mx-auto" : ""} ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          {t(...title)}
        </h2>
      </div>
      {subText && (
        <p
          className={`m-0 max-w-[600px] text-[1.1rem] leading-[1.7] min-[860px]:text-[1.2rem] ${center ? "mx-auto mt-3 min-[640px]:mt-4 min-[860px]:max-w-none min-[860px]:whitespace-nowrap" : align === "split" ? "" : "mt-3 min-[640px]:mt-4"} ${
            dark ? "text-white/80" : "text-muted"
          }`}
        >
          {subText}
        </p>
      )}
    </header>
  );
}
