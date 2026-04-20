import type { SiteSettings } from "@/types";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "settings.json");

const DEFAULT_SETTINGS: SiteSettings = {
  socialLinks: { facebook: "", instagram: "", youtube: "", twitter: "", linkedin: "" },
  sectionVisibility: {
    stats: true, about: true, services: true, projects: true, process: true,
    whyUs: true, testimonials: true, blog: true, faq: true, cta: true, mediaCoverage: false,
  },
  homepageImages: {
    heroAll: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    heroDelhi: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    heroBali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    aboutDelhi: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    aboutBali: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1920&q=80",
    ctaBackground: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=1920&q=80",
  },
};

export function getSettings(): SiteSettings {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as SiteSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(settings, null, 2), "utf-8");
}
