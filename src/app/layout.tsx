import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import MobileCTABar from "@/components/layout/MobileCTABar";
import { getSettings } from "@/lib/settings";
import "./globals.css";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nirvana Group | Luxury Construction in Delhi & Bali",
    template: "%s | Nirvana Group",
  },
  description: "Crafting luxury living spaces in Delhi NCR and Bali. Over 20 years of excellence in residential construction, redevelopment, and villa projects.",
  keywords: ["luxury homes", "Delhi construction", "Bali villas", "real estate", "luxury villa", "redevelopment", "Nirvana Group"],
  openGraph: {
    title: "Nirvana Group | Luxury Construction in Delhi & Bali",
    description: "Crafting luxury living spaces in Delhi NCR and Bali.",
    url: "https://www.nauhomes.com",
    siteName: "Nirvana Group",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer socialLinks={settings.socialLinks} />
        <WhatsAppFAB />
        <MobileCTABar />
      </body>
    </html>
  );
}
