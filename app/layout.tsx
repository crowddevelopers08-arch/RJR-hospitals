import type { Metadata, Viewport } from "next";
import { Noto_Sans_Tamil, Poppins, Rubik } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

/* Same pairing as rjrherbalhospitals.com: Poppins for headings, Rubik for body text.
   Neither has Tamil glyphs, so Noto Sans Tamil fills in for Tamil text. */
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const rubik = Rubik({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-rubik" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "500", "600", "700"], variable: "--font-tamil" });

export const metadata: Metadata = {
  title: "RJR Herbal Hospitals",
  description:
    "Ayurveda is also science. Book a consultation with qualified Ayurveda and Siddha doctors at RJR Herbal Hospitals, five generations and 150+ years of practice, 37 branches in Tamil Nadu.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#9E1A18",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${rubik.variable} ${tamil.variable}`}>
      <body>{children}</body>
    </html>
  );
}
