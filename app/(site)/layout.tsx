import { BookingProvider } from "@/lib/booking";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import BookingModal from "@/components/BookingModal";
import ScrollToTop from "@/components/ScrollToTop";

/* Chrome for the landing page and its inner pages. The branch review pages (app/(review)) render without it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingProvider>
      {/* bottom padding keeps the fixed sticky bar from covering the footer */}
      <div className="pb-[84px]">
        <TopBar />
        <Header />
        {children}
        <Footer />
      </div>
      <StickyBar />
      <BookingModal />
      <ScrollToTop />
    </BookingProvider>
  );
}
