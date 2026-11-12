"use client";

import { useState } from "react";
import { img, type Treatment } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { LeafIcon } from "./ui/Icons";

/* SSR'd images can fail before hydration, so onError never fires.
   Check on mount whether the image already finished loading broken. */
const failedOnMount = (onFail: () => void) => (el: HTMLImageElement | null) => {
  if (el && el.complete && el.naturalWidth === 0) onFail();
};

/* Card media falls back in order: illustration -> RJR site icon -> leaf mark.
   Cards are not links, so they get no hover lift (no fake affordance). */
export default function TreatmentCard({ item }: { item: Treatment }) {
  const { lang } = useLang();
  const [photoBroken, setPhotoBroken] = useState(false);
  const [iconBroken, setIconBroken] = useState(false);
  const [title, text] = item[lang];
  const showPhoto = item.photo && !photoBroken;

  return (
    <article className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-card ring-1 ring-line">
      <div className="relative grid aspect-[16/11] place-items-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#fff,#FBF7F1_70%)]">
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.photo}
            alt={title}
            loading="lazy"
            ref={failedOnMount(() => setPhotoBroken(true))}
            onError={() => setPhotoBroken(true)}
            className="absolute inset-0 block h-full w-full object-cover"
          />
        ) : item.img && !iconBroken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img(item.img)}
            alt=""
            loading="lazy"
            ref={failedOnMount(() => setIconBroken(true))}
            onError={() => setIconBroken(true)}
            className="max-h-[130px] max-w-[70%] object-contain"
          />
        ) : (
          <LeafIcon className="h-20 w-20 text-crimson" />
        )}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.18))]" />
      </div>
      <div className="flex flex-1 flex-col p-5 min-[640px]:p-6">
        <h3 className="display mt-0 mb-2 text-[1.25rem] leading-[1.25] text-crimson">{title}</h3>
        <p className="m-0 text-[.95rem] leading-[1.65] text-muted">{text}</p>
      </div>
    </article>
  );
}
