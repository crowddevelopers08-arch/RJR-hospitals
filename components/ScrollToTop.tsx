"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./ui/Icons";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 bottom-24 z-[65] grid h-12 w-12 cursor-pointer place-items-center rounded-full border-0 bg-white text-forest shadow-card-lg ring-1 ring-line transition-[opacity,translate,background-color,color] duration-300 hover:bg-forest hover:text-white min-[860px]:right-6 min-[860px]:bottom-[100px] ${
        show ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-[22px] w-[22px]" />
    </button>
  );
}
