"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Scroll-snap carousel, one card per step.
   Phones: one full-width card at a time, prev/next buttons centred below.
   From 640px: 2 cards; from 860px: 3; from 1100px: `cols` (4 by default), buttons on the sides.
   Buttons wrap around at either end; they hide when every card already fits.
   Auto-advance (optional) pauses on hover, focus and touch. */
export default function Carousel({
  children,
  cols = 4,
  autoplay = true,
}: {
  children: React.ReactNode;
  cols?: 3 | 4;
  autoplay?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [canScroll, setCanScroll] = useState(true);

  const step = useCallback(() => {
    const t = trackRef.current;
    const c = t?.children[0] as HTMLElement | undefined;
    if (!t || !c) return 300;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    return c.getBoundingClientRect().width + gap;
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const t = trackRef.current;
      if (!t) return;
      const max = t.scrollWidth - t.clientWidth;
      if (dir === 1 && t.scrollLeft >= max - 4) t.scrollTo({ left: 0, behavior: "smooth" });
      else if (dir === -1 && t.scrollLeft <= 4) t.scrollTo({ left: max, behavior: "smooth" });
      else t.scrollBy({ left: dir * step(), behavior: "smooth" });
    },
    [step]
  );

  // show the buttons only when there is something off-screen
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    const check = () => setCanScroll(t.scrollWidth - t.clientWidth > 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(t);
    return () => ro.disconnect();
  }, [children]);

  useEffect(() => {
    if (!autoplay || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden && canScroll) go(1);
    }, 4200);
    return () => clearInterval(id);
  }, [autoplay, canScroll, go]);

  const arrow =
    "grid h-12 w-12 cursor-pointer place-items-center rounded-full border-0 bg-white text-crimson shadow-card-lg ring-1 ring-line transition-[background-color,color,transform] duration-200 hover:bg-crimson hover:text-white active:scale-95 " +
    "min-[860px]:absolute min-[860px]:top-[22%] min-[860px]:z-[4]";
  const chevron = (d: string) => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
  const lg = cols === 4 ? "min-[1100px]:[&>*]:basis-[calc(25%-15px)]" : "";

  return (
    <div
      className="relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
    >
      <div
        ref={trackRef}
        className={`flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pt-1 pb-3 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [&>*]:flex-[0_0_calc(100%-2px)] [&>*]:snap-start min-[640px]:[&>*]:basis-[calc(50%-10px)] min-[860px]:[&>*]:basis-[calc(33.333%-14px)] ${lg}`}
      >
        {children}
      </div>

      {canScroll && (
        // phones: a centred row under the cards; from 860px the wrapper disappears and the buttons sit on the sides
        <div className="mt-3 flex justify-center gap-3 min-[860px]:contents">
          <button type="button" aria-label="Previous" onClick={() => go(-1)} className={`${arrow} min-[860px]:-left-5 min-[1340px]:-left-16`}>
            {chevron("M15 18l-6-6 6-6")}
          </button>
          <button type="button" aria-label="Next" onClick={() => go(1)} className={`${arrow} min-[860px]:-right-5 min-[1340px]:-right-16`}>
            {chevron("M9 18l6-6-6-6")}
          </button>
        </div>
      )}
    </div>
  );
}
