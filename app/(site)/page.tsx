import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import MythFacts from "@/components/MythFacts";
import HowItWorks from "@/components/HowItWorks";
import Treatments from "@/components/Treatments";
import Doctors from "@/components/Doctors";
import PatientStories from "@/components/PatientStories";
import BranchLocator from "@/components/BranchLocator";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

/* Header, footer, sticky bar and the booking pop-up live in app/layout.tsx so every page shares them */
export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Stats />
      <MythFacts />
      <HowItWorks />
      <Treatments />
      <Doctors />
      <PatientStories />
      <BranchLocator />
      <Faq />
      <FinalCta />
    </main>
  );
}
