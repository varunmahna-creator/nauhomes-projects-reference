import type { SiteSettings, ContactInfo } from "@/types";

// Default settings
const defaultSettings: SiteSettings = {
  contactInfo: {
    phone: "+91-9876543210",
    email: "info@nauhomes.com",
    whatsapp: "919876543210",
    offices: [
      {
        city: "New Delhi",
        address: "Plot No. 20, Okhla Phase 3, New Delhi 110020, India",
        mapUrl: "https://maps.google.com/?q=Okhla+Phase+3+New+Delhi",
      },
      {
        city: "Bali",
        address: "Floor 3, Block A6, Jl. Teuku Umar No.8, Denpasar, Bali 80113, Indonesia",
        mapUrl: "https://maps.google.com/?q=Denpasar+Bali",
      },
    ],
  },
  socialLinks: {
    facebook: "https://facebook.com/nirvanahomes",
    instagram: "https://instagram.com/nirvanahomes", 
    youtube: "https://youtube.com/@nirvanahomes",
    twitter: "https://twitter.com/nirvanahomes",
    linkedin: "https://linkedin.com/company/nirvanahomes"
  },
  sectionVisibility: {
    stats: true,
    about: true, 
    services: true,
    projects: true,
    process: true,
    whyUs: true,
    testimonials: true,
    blog: true,
    faq: true,
    cta: true,
    mediaCoverage: true
  },
  homepageImages: {
    heroAll: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    heroDelhi: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80", 
    heroBali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    aboutDelhi: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    aboutBali: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1920&q=80",
    ctaBackground: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=1920&q=80"
  }
};

// In-memory storage
let settingsStorage: SiteSettings = { ...defaultSettings };

export function getSettings(): SiteSettings {
  return settingsStorage;
}

export function saveSettings(settings: SiteSettings): void {
  settingsStorage = { ...settings };
}

/**
 * Returns the current contact info, falling back to defaults if not set.
 * Safe to call from any server component / route handler.
 */
export function getContactInfo(): ContactInfo {
  const ci = settingsStorage.contactInfo;
  if (!ci) return defaultSettings.contactInfo as ContactInfo;
  return {
    phone: ci.phone || (defaultSettings.contactInfo as ContactInfo).phone,
    email: ci.email || (defaultSettings.contactInfo as ContactInfo).email,
    whatsapp: ci.whatsapp || (defaultSettings.contactInfo as ContactInfo).whatsapp,
    offices: (ci.offices && ci.offices.length > 0)
      ? ci.offices
      : (defaultSettings.contactInfo as ContactInfo).offices,
  };
}