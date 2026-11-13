"use client";

import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import { BR, MAP_LABELS, TN, TN_BOUNDS, UI, bname } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const PIN_HTML =
  '<div class="w-[30px] h-[38px] drop-shadow-[0_3px_4px_rgba(0,0,0,.35)] transition-transform duration-200 [.act_&]:scale-[1.35]">' +
  '<svg class="block w-[30px] h-[38px]" viewBox="0 0 30 38"><path d="M15 1C7.3 1 1 7.2 1 14.8 1 25 15 37 15 37s14-12 14-22.2C29 7.2 22.7 1 15 1z" fill="#B3262A" stroke="#fff" stroke-width="2"/><circle cx="15" cy="14.5" r="5.2" fill="#E8C877"/></svg>' +
  "</div>";

const LABEL_CLS =
  "font-[Poppins,sans-serif] text-[10px] leading-[14px] font-semibold tracking-[.18em] uppercase text-[rgba(232,200,119,.62)] text-center whitespace-nowrap pointer-events-none";

/* Illustrated Tamil Nadu map (outline polygon, no internet tiles) with a pin per branch */
export default function BranchMap({ active, onSelect }: { active: number; onSelect: (i: number, fromMap: boolean) => void }) {
  const { lang } = useLang();
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markersRef = useRef<Leaflet.Marker[]>([]);
  const userMoved = useRef(false);
  const onSelectRef = useRef(onSelect);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // create the map once
  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | null = null;
    const timers: ReturnType<typeof setTimeout>[] = [];

    import("leaflet")
      .then((mod) => {
        const L = (mod.default ?? mod) as typeof Leaflet;
        if (cancelled || !boxRef.current) return;

        const map = L.map(boxRef.current, {
          zoomControl: true,
          scrollWheelZoom: false,
          minZoom: 6,
          maxZoom: 11,
          zoomSnap: 0.25,
          attributionControl: false,
          maxBounds: [
            [6.6, 74.8],
            [14.8, 81.8],
          ],
          maxBoundsViscosity: 1,
        });
        mapRef.current = map;

        L.polygon(TN, { color: "#C9962E", weight: 2.4, fillColor: "#FBF7EE", fillOpacity: 1, smoothFactor: 1.1, interactive: false }).addTo(map);

        MAP_LABELS.forEach(([text, la, lo]) => {
          L.marker([la, lo], {
            interactive: false,
            keyboard: false,
            icon: L.divIcon({ className: LABEL_CLS, html: text, iconSize: [130, 14], iconAnchor: [65, 7] }),
          }).addTo(map);
        });

        const icon = L.divIcon({ className: "", html: PIN_HTML, iconSize: [30, 38], iconAnchor: [15, 37] });
        markersRef.current = BR.map((b, i) => {
          const m = L.marker([b.la, b.lo], { icon, keyboard: true, riseOnHover: true, alt: b.n }).addTo(map);
          m.bindTooltip(b.n, { direction: "top", offset: [0, -34] });
          m.on("click", () => onSelectRef.current(i, true));
          return m;
        });

        map.on("click", () => map.scrollWheelZoom.enable());
        map.on("dragstart", () => (userMoved.current = true));

        const fit = () => {
          if (userMoved.current || !mapRef.current) return;
          map.invalidateSize();
          map.fitBounds(TN_BOUNDS, { padding: [14, 14], animate: false });
        };
        fit();
        // refit whenever the box gets its real size, until the visitor touches the map
        if ("ResizeObserver" in window) {
          ro = new ResizeObserver(fit);
          ro.observe(boxRef.current);
        }
        timers.push(setTimeout(fit, 400));
        setReady(true);
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
      ro?.disconnect();
      timers.forEach(clearTimeout);
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  // pin tooltips follow the language
  useEffect(() => {
    markersRef.current.forEach((m, i) => m.setTooltipContent(bname(BR[i], lang)));
  }, [lang, ready]);

  // highlight the active pin and fly to it
  useEffect(() => {
    const map = mapRef.current;
    markersRef.current.forEach((m, k) => m.getElement()?.classList.toggle("act", k === active));
    if (map && active >= 0) {
      userMoved.current = true;
      map.flyTo([BR[active].la, BR[active].lo], Math.max(map.getZoom(), 8.5), { duration: 0.7 });
    }
  }, [active, ready]);

  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[24px] bg-[#173D2E] shadow-card-lg ring-1 ring-[rgba(232,200,119,.4)] min-[860px]:min-h-[560px]">
      <div ref={boxRef} role="application" aria-label="Map of RJR branches in Tamil Nadu" className="z-[1] h-[460px] w-full min-[860px]:h-[560px]" />
      {failed && <div className="absolute inset-0 grid place-items-center p-6 text-center text-[.95rem] text-gold">{UI[lang].nomap}</div>}
    </div>
  );
}
