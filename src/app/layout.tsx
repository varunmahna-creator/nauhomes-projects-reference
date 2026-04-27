import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import MobileCTABar from "@/components/layout/MobileCTABar";
import { getSettings, getContactInfo } from "@/lib/settings";
import Script from "next/script";
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Note: maximumScale removed for a11y — users must be able to zoom.
  themeColor: '#0A1F44',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nauhomes.com'),
  title: {
    default: "Nirvana Group | Luxury Construction in Delhi & Bali",
    template: "%s | Nirvana Group",
  },
  description: "Crafting luxury living spaces in Delhi NCR and Bali. Over 20 years of excellence in residential construction, redevelopment, and villa projects. Premium builder floors, kothis, and sustainable luxury villas.",
  keywords: [
    "luxury homes Delhi",
    "premium construction South Delhi", 
    "Bali luxury villas",
    "Delhi NCR builder",
    "redevelopment South Delhi",
    "luxury real estate Bali",
    "premium residential construction",
    "builder floors Delhi",
    "kothis South Delhi",
    "sustainable villas Bali",
    "Nirvana Group construction",
    "luxury apartments Delhi NCR"
  ],
  authors: [{ name: "Nirvana Group" }],
  creator: "Nirvana Group",
  publisher: "Nirvana Group",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Nirvana Group | Luxury Construction in Delhi & Bali",
    description: "Crafting luxury living spaces in Delhi NCR and Bali. Over 20 years of excellence in residential construction, redevelopment, and villa projects.",
    url: "https://www.nauhomes.com",
    siteName: "Nirvana Group",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nirvana Group - Luxury Construction in Delhi & Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvana Group | Luxury Construction in Delhi & Bali",
    description: "Crafting luxury living spaces in Delhi NCR and Bali. Over 20 years of excellence in residential construction.",
    images: ["/og-image.jpg"],
    creator: "@nirvanahomes",
    site: "@nirvanahomes",
  },
  alternates: {
    canonical: "https://www.nauhomes.com",
  },
  // Verification codes are set via env so we don't ship placeholders.
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / _BING_VERIFICATION in Vercel.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
  category: "Real Estate & Construction",
  classification: "Business",
  referrer: "origin-when-cross-origin",
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nirvana Group",
  "alternateName": "Nirvana Homes",
  "url": "https://www.nauhomes.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.nauhomes.com/logo.png"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/nirvanahomes",
    "https://www.instagram.com/nirvanahomes",
    "https://www.linkedin.com/company/nirvanahomes"
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress", 
      "addressLocality": "Bali",
      "addressCountry": "ID"
    }
  ],
  "description": "Luxury construction company specializing in premium residential projects in Delhi NCR and Bali, Indonesia."
};

const localBusinessSchemaDelhi = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nirvana Group Delhi",
  "image": "https://www.nauhomes.com/logo.png",
  "description": "Premium construction company specializing in luxury residential projects, builder floors, and redevelopment in South Delhi and NCR.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New Delhi",
    "addressRegion": "Delhi", 
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.6139",
    "longitude": "77.2090"
  },
  "areaServed": {
    "@type": "State",
    "name": "Delhi NCR"
  },
  "priceRange": "Premium",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "28.6139",
      "longitude": "77.2090"
    }
  }
};

// WebSite schema enables Sitelinks search box in Google SERPs.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nirvana Group",
  "alternateName": "Nirvana Homes",
  "url": "https://www.nauhomes.com",
  "publisher": {
    "@type": "Organization",
    "name": "Nirvana Group",
    "url": "https://www.nauhomes.com",
  },
  "inLanguage": "en",
};

// RealEstateAgent — more specific than LocalBusiness for property listings.
const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Nirvana Group",
  "url": "https://www.nauhomes.com",
  "logo": "https://www.nauhomes.com/logo.png",
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Delhi NCR" },
    { "@type": "AdministrativeArea", "name": "Bali, Indonesia" },
  ],
  "knowsAbout": [
    "Luxury Residential Construction",
    "Builder Floors",
    "Kothis",
    "Redevelopment",
    "Sustainable Villas",
    "Turnkey Projects",
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, contact] = await Promise.all([getSettings(), getContactInfo()]);

  // Inject live phone/email/addresses from /admin into the JSON-LD so SEO
  // reflects whatever Varun has configured (instead of the static placeholder).
  const liveOrganizationSchema = {
    ...organizationSchema,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: contact.phone,
        email: contact.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    address: contact.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.address,
      addressLocality: o.city,
      addressCountry: /bali|indonesia/i.test(o.city) ? "ID" : "IN",
    })),
    email: contact.email,
    telephone: contact.phone,
  };

  const delhiOffice = contact.offices.find((o) => /delhi|ncr/i.test(o.city)) ?? contact.offices[0];
  const liveLocalBusinessSchemaDelhi = {
    ...localBusinessSchemaDelhi,
    telephone: contact.phone,
    email: contact.email,
    address: delhiOffice
      ? {
          "@type": "PostalAddress",
          streetAddress: delhiOffice.address,
          addressLocality: "New Delhi",
          addressRegion: "Delhi",
          addressCountry: "IN",
        }
      : localBusinessSchemaDelhi.address,
  };

  const liveRealEstateAgentSchema = {
    ...realEstateAgentSchema,
    telephone: contact.phone,
    email: contact.email,
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(liveOrganizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(liveLocalBusinessSchemaDelhi),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(liveRealEstateAgentSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen" role="main">
          {children}
        </main>
        <Footer socialLinks={settings.socialLinks} />
        <WhatsAppFAB />
        <MobileCTABar />
        
        {/* Analytics — only emit when a real GA4 measurement ID is configured.
            Set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX in Vercel to enable. */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}// Force deploy Thu Apr 23 07:47:59 UTC 2026
