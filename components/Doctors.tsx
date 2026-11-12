"use client";

import { DOCS } from "@/lib/data";
import Carousel from "./Carousel";
import DoctorCard from "./DoctorCard";
import SectionHeader from "./ui/SectionHeader";

export default function Doctors() {
  return (
    <section id="doctors" className="section-y bg-ivory">
      <div className="wrap">
        <SectionHeader
          align="split"
          kicker={["Our team", "எங்கள் குழு"]}
          title={["Your doctors", "உங்கள் மருத்துவர்கள்"]}
          sub={["Over 300 qualified doctors are part of the RJR team. A few of them:", "300+ பட்டம் பெற்ற மருத்துவர்கள் RJR குழுவில் உள்ளனர். அவர்களில் சிலர்:"]}
        />
        <Carousel>
          {DOCS.map((d) => (
            <DoctorCard key={d.ini} doc={d} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
