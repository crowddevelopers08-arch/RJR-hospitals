import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Thank you | RJR Herbal Hospitals",
  description: "Your consultation request has been received. Your RJR branch will call you shortly.",
  // conversion page: keep it out of search results
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    // useSearchParams (branch from the URL) needs a Suspense boundary
    <Suspense fallback={<main id="top" className="min-h-[60vh] bg-forest-dk" />}>
      <ThankYou />
    </Suspense>
  );
}
