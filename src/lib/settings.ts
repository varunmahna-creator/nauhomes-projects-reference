import type { SiteSettings } from "@/types";

// Default settings
const defaultSettings: SiteSettings = {
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