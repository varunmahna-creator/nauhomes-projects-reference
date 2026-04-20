export type ProjectStatus = "completed" | "ongoing";
export type ProjectLocation = "delhi" | "bali";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  images: ProjectImage[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  location: ProjectLocation;
  locationLabel: string;
  status: ProjectStatus;
  type: string;
  area: string;
  year: string;
  thumbnail: string;
  gallery: ProjectImage[];
  floorPlans: ProjectImage[];
  tourEmbedUrl: string | null;
  description: string;
  highlights: string[];
  amenities: string[];
  specs: Record<string, string>;
  timeline?: TimelineEntry[];
}

export interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; }[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  profession: string;
  image?: string;
  videoUrl?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  offices: {
    city: string;
    address: string;
    mapUrl: string;
  }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
  linkedin: string;
}

export interface MediaItem {
  id: string;
  name: string;
  logoUrl: string;
  articleUrl?: string;
  date?: string;
}

export interface HomepageImages {
  heroAll: string;
  heroDelhi: string;
  heroBali: string;
  aboutDelhi: string;
  aboutBali: string;
  ctaBackground: string;
}

export interface SiteSettings {
  socialLinks: SocialLinks;
  sectionVisibility: SectionVisibility;
  homepageImages: HomepageImages;
}

export interface SectionVisibility {
  stats: boolean;
  about: boolean;
  services: boolean;
  projects: boolean;
  process: boolean;
  whyUs: boolean;
  testimonials: boolean;
  blog: boolean;
  faq: boolean;
  cta: boolean;
  mediaCoverage: boolean;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;       // "Delhi NCR" or "Bali, Indonesia"
  interest: string;       // "New Construction", "Redevelopment", etc.
  message: string;
  status: LeadStatus;
  source: string;         // page where form was submitted: "homepage", "contact", "project:villa-gk1", etc.
  createdAt: string;      // ISO date string
  notes: string;          // admin notes
}
