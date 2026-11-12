"use client";

import { useCallback, useRef, useState } from "react";
import { BR } from "@/lib/data";
import { track } from "@/lib/track";
import BranchMap from "./BranchMap";
import BranchPanel from "./BranchPanel";
import SectionHeader from "./ui/SectionHeader";

export default function BranchLocator() {
  const [active, setActive] = useState(-1);
  const panelRef = useRef<HTMLElement>(null);

  const select = useCallback((i: number, fromMap = false) => {
    setActive(i);
    if (i < 0) return;
    track("branch_select", { branch: BR[i].n });
    if (fromMap && window.innerWidth < 860) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  const nearest = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let best = -1;
        let bd = 1e9;
        BR.forEach((b, i) => {
          const dy = b.la - pos.coords.latitude;
          const dx = (b.lo - pos.coords.longitude) * Math.cos((pos.coords.latitude * Math.PI) / 180);
          const d = dy * dy + dx * dx;
          if (d < bd) {
            bd = d;
            best = i;
          }
        });
        if (best >= 0) {
          select(best, true);
          track("nearest_branch", { branch: BR[best].n });
        }
      },
      () => {},
      { timeout: 8000 }
    );
  }, [select]);

  return (
    <section id="branches" className="section-y bg-ivory">
      <div className="wrap">
        <SectionHeader
          align="split"
          kicker={["37 branches", "37 கிளைகள்"]}
          title={["Find your nearest branch", "உங்கள் அருகிலுள்ள கிளையைக் கண்டறியுங்கள்"]}
          sub={[
            "Tap a pin on the map and the branch details appear on the right.",
            "வரைபடத்தில் உள்ள குறியைத் தொட்டால், வலப்புறம் அந்தக் கிளையின் விவரங்கள் தெரியும்.",
          ]}
        />
        <div className="grid gap-5 min-[860px]:grid-cols-[1.6fr_1fr] min-[860px]:items-stretch">
          <BranchMap active={active} onSelect={select} />
          <BranchPanel ref={panelRef} active={active} onSelect={(i) => select(i, false)} onNearest={nearest} />
        </div>
      </div>
    </section>
  );
}
