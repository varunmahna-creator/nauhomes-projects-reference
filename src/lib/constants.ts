import type {
  NavLink,
  Stat,
  Service,
  ProcessStep,
  FAQ,
  ContactInfo,
  BlogPost,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Years of Excellence" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: " Lac+ Sq Ft", label: "Construction Experience" },
  { value: 2, suffix: "", label: "Countries" },
];

export const SERVICES: Service[] = [
  {
    icon: "Compass",
    title: "Planning & Design",
    description:
      "Comprehensive architectural planning and interior design solutions tailored to your lifestyle and preferences.",
  },
  {
    icon: "Building2",
    title: "Redevelopment",
    description:
      "Transform aging properties into modern luxury residences with our expert redevelopment services.",
  },
  {
    icon: "ClipboardList",
    title: "Project Management",
    description:
      "End-to-end project management ensuring timely delivery, quality control, and budget adherence.",
  },
  {
    icon: "Calculator",
    title: "Cost Engineering",
    description:
      "Precise cost estimation and value engineering to maximize your investment without compromising quality.",
  },
  {
    icon: "ShieldCheck",
    title: "Quality Control",
    description:
      "Rigorous quality assurance at every stage of construction using premium materials and best practices.",
  },
  {
    icon: "Scale",
    title: "Statutory & Compliance",
    description:
      "Complete handling of regulatory approvals, permits, and compliance requirements.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    icon: "Lightbulb",
    title: "Concept Design",
    description:
      "Understanding your vision and translating it into architectural concepts and preliminary layouts.",
  },
  {
    step: 2,
    icon: "FileCheck",
    title: "Map Sanction",
    description:
      "Obtaining necessary approvals and sanctions from local authorities for construction.",
  },
  {
    step: 3,
    icon: "Palette",
    title: "Front Elevation Design",
    description:
      "Creating stunning exterior designs that reflect your style and blend with the surroundings.",
  },
  {
    step: 4,
    icon: "HardHat",
    title: "Structure Completion",
    description:
      "Building the structural framework with premium materials and expert craftsmanship.",
  },
  {
    step: 5,
    icon: "Sofa",
    title: "Interior Work",
    description:
      "Crafting luxurious interiors with attention to detail in every finish and fixture.",
  },
  {
    step: 6,
    icon: "Home",
    title: "Final Product",
    description:
      "Delivering your dream home, ready to move in with all quality checks completed.",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "What services does Nirvana Group offer?",
    answer:
      "We provide end-to-end construction services including architectural planning, redevelopment, turnkey projects, project management, interior design, and property management across Delhi NCR and Bali, Indonesia.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope. A standard villa construction takes 12-18 months, while redevelopment projects typically take 10-14 months. We provide detailed timelines during the planning phase.",
  },
  {
    question: "Do you build in both India and Bali?",
    answer:
      "Yes, we operate in both Delhi NCR (India) and Bali (Indonesia). Our Delhi office handles projects across South Delhi, and our Bali office manages villa construction and property management in Bali.",
  },
  {
    question: "What is your approach to quality control?",
    answer:
      "We follow a rigorous multi-stage quality assurance process. Every material is tested, every stage is inspected, and we use only premium brands. Our clients receive regular quality reports throughout construction.",
  },
  {
    question: "Can I customize my home design?",
    answer:
      "Absolutely. Every project begins with understanding your vision. Our architects work closely with you to create a design that reflects your lifestyle, preferences, and budget. No two Nirvana Group homes are alike.",
  },
  {
    question: "What are the costs involved?",
    answer:
      "Costs vary based on location, area, specifications, and design complexity. We provide transparent, detailed cost breakdowns during the planning phase with no hidden charges. Contact us for a personalized estimate.",
  },
  {
    question: "Do you offer rental management for Bali properties?",
    answer:
      "Yes, we provide comprehensive rental management services for our Bali properties, including guest management, maintenance, marketing, and revenue optimization for property owners.",
  },
  {
    question: "How do I get started with Nirvana Group?",
    answer:
      "Simply reach out through our contact form, WhatsApp, or phone. We'll schedule a consultation to understand your requirements, visit the site if applicable, and present a preliminary design and cost proposal.",
  },
];

export const CONTACT_INFO: ContactInfo = {
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
      address:
        "Floor 3, Block A6, Jl. Teuku Umar No.8, Denpasar, Bali 80113, Indonesia",
      mapUrl: "https://maps.google.com/?q=Denpasar+Bali",
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "luxury-villa-trends-2025",
    title: "Luxury Villa Design Trends to Watch in 2025",
    excerpt:
      "Explore the latest architectural trends shaping luxury residential design, from biophilic elements to smart home integration.",
    image: "/images/placeholders/blog-1.jpg",
    date: "2025-03-15",
    category: "Design",
  },
  {
    slug: "investing-bali-property",
    title: "Why Investing in Bali Property is a Smart Move",
    excerpt:
      "Discover the advantages of investing in Bali's booming real estate market and what makes it attractive for international buyers.",
    image: "/images/placeholders/blog-2.jpg",
    date: "2025-02-28",
    category: "Investment",
  },
  {
    slug: "south-delhi-redevelopment",
    title: "The Complete Guide to South Delhi Redevelopment",
    excerpt:
      "Everything you need to know about redeveloping your property in South Delhi, from regulations to design possibilities.",
    image: "/images/placeholders/blog-3.jpg",
    date: "2025-01-20",
    category: "Guide",
  },
];
