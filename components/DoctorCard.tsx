"use client";

import { useState } from "react";
import { img, type Doctor } from "@/lib/data";
import { useLang } from "@/lib/i18n";

/* Portrait card: tall photo on a warm backdrop, name and qualification beneath.
   Without a photo, the initials sit on a crimson panel in the same frame. */
export default function DoctorCard({ doc }: { doc: Doctor }) {
  const { lang } = useLang();
  const [broken, setBroken] = useState(false);
  const [name, qual, role] = doc[lang];
  const hasPhoto = doc.img && !broken;

  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-card ring-1 ring-line">
      <div
        className={`relative aspect-[4/4.4] overflow-hidden ${
          hasPhoto
            ? "bg-[radial-gradient(circle_at_50%_35%,#FFFFFF,#F4ECDF_75%)]"
            : "grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#D8312E,#9E1A18_70%)]"
        }`}
      >
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img(doc.img)} alt={name} loading="lazy" onError={() => setBroken(true)} className="block h-full w-full object-cover object-top" />
        ) : (
          <span aria-hidden="true" className="display text-[3.4rem] text-gold">
            {doc.ini}
          </span>
        )}
        {role && (
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[.78rem] font-semibold text-crimson shadow-card backdrop-blur">
            {role}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-solid border-line p-5">
        <h3 className="display m-0 text-[1.2rem] leading-[1.25] text-ink">{name}</h3>
        <p className="mt-1 mb-0 text-[.88rem] text-muted">{qual}</p>
      </div>
    </article>
  );
}
