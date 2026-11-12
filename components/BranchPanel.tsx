"use client";

import { forwardRef } from "react";
import { useBooking } from "@/lib/booking";
import { BR, UI, bname, fmtPhone } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { track } from "@/lib/track";
import { ClockIcon, PhoneIcon, PinIcon } from "./ui/Icons";
import { btn } from "./ui/button";

type Props = { active: number; onSelect: (i: number) => void; onNearest: () => void };

/* Right-hand panel: branch picker, address / phone / hours and actions for the selected branch */
const BranchPanel = forwardRef<HTMLElement, Props>(function BranchPanel({ active, onSelect, onNearest }, ref) {
  const { lang } = useLang();
  const { openModal } = useBooking();
  const u = UI[lang];
  const b = active >= 0 ? BR[active] : null;
  const iconCls = "mt-[2px] h-[18px] w-[18px] text-crimson";
  const rowCls = "grid grid-cols-[22px_1fr] items-start gap-3";

  return (
    <aside
      ref={ref}
      aria-live="polite"
      className="flex min-h-[200px] flex-col gap-4 rounded-[24px] bg-white p-5 min-[640px]:gap-5 min-[640px]:p-6 shadow-card ring-1 ring-line min-[860px]:p-7"
    >
      <select
        aria-label={u.pick}
        value={active < 0 ? "" : String(active)}
        onChange={(e) => onSelect(e.target.value === "" ? -1 : +e.target.value)}
        className="min-h-[50px] w-full cursor-pointer rounded-xl border border-solid border-[#DDD2C2] bg-ivory px-4 py-3 text-[16px] leading-normal text-ink transition-[border-color,box-shadow] duration-200 hover:border-[#CBBBA4] focus:border-crimson focus:bg-white focus:shadow-[0_0_0_4px_rgba(194,34,32,.12)] focus:outline-none"
      >
        <option value="">{u.pick}</option>
        {BR.map((br, i) => (
          <option key={br.n} value={i}>
            {bname(br, lang)}
          </option>
        ))}
      </select>

      {!b ? (
        <p className="m-0 flex-1 text-[.95rem] leading-[1.7] text-muted">{u.empty}</p>
      ) : (
        <>
          <h3 className="display m-0 text-[1.45rem] leading-[1.2] text-crimson">RJR Herbal Hospital, {bname(b, lang)}</h3>
          <div className="grid gap-4 border-y border-solid border-line py-5 text-[.94rem] leading-[1.6]">
            <div className={rowCls}>
              <PinIcon className={iconCls} />
              <span>
                <b className="text-ink">{u.addr}</b>
                <br />
                {b.a}
              </span>
            </div>
            <div className={rowCls}>
              <PhoneIcon className={iconCls} />
              <span>
                <b className="text-ink">{u.ph}</b>
                <br />
                {b.p.map((x, i) => (
                  <span key={x}>
                    {i > 0 && " · "}
                    <a href={`tel:${x}`} className="font-semibold text-ink no-underline hover:text-crimson">
                      {fmtPhone(x)}
                    </a>
                  </span>
                ))}
              </span>
            </div>
            <div className={rowCls}>
              <ClockIcon className={iconCls} />
              <span>
                <b className="text-ink">{u.hrs}</b>
                <br />
                {u.hrsv}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${b.p[0]}`} onClick={() => track("call_branch", { branch: b.n })} className={btn("red", "panel")}>
              {u.call}
            </a>
            <a
              target="_blank"
              rel="noopener"
              href={`https://www.google.com/maps/dir/?api=1&destination=${b.x ? encodeURIComponent(`RJR Herbal Hospital ${b.n} ${b.a}`) : `${b.la},${b.lo}`}`}
              className={btn("line", "panel")}
            >
              {u.dir}
            </a>
            <a
              href="#book"
              onClick={(e) => {
                e.preventDefault();
                track("book_at_branch", { branch: b.n });
                openModal(b.n);
              }}
              className={btn("gold", "panel")}
            >
              {u.book}
            </a>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={onNearest}
        className="mt-auto inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-crimson/60 bg-[#FDF3F2] px-4 py-3 text-[.92rem] font-semibold text-crimson transition-[background-color,border-color] duration-200 hover:border-crimson hover:bg-[#FBE9E8] active:scale-[.98]"
      >
        <PinIcon className="h-4 w-4" />
        {u.near}
      </button>
    </aside>
  );
});

export default BranchPanel;
