import { BookingProvider } from "@/lib/booking";
import { LanguageProvider } from "@/lib/i18n";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import BannerSlider from "@/components/BannerSlider";
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
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import BookingModal from "@/components/BookingModal";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <TopBar />
        <Header />
        <main id="top">
          <BannerSlider />
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
        <Footer />
        <StickyBar />
        <BookingModal />
        <ScrollToTop />
      </BookingProvider>
    </LanguageProvider>
  );
}
