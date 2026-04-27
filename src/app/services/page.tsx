import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Building2, ClipboardList, Calculator, ShieldCheck, Scale, Home, Palmtree, Handshake, LandPlot, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Card from "@/components/ui/Card";
import ProcessTimeline from "@/components/sections/home/ProcessTimeline";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our comprehensive construction services - from planning and design to turnkey delivery, across Delhi and Bali.",
  alternates: { canonical: "https://www.nauhomes.com/services" },
  openGraph: {
    title: "Construction Services | Nirvana Group",
    description: "End-to-end luxury construction: planning & design, redevelopment, turnkey projects, project management, cost engineering, and more — across Delhi NCR and Bali.",
    url: "https://www.nauhomes.com/services",
    type: "website",
  },
};

const DETAILED_SERVICES = [
  {
    icon: <Compass className="h-8 w-8" />,
    title: "Planning & Design",
    description: "Our architects work with you from concept to detailed drawings, creating spaces that reflect your lifestyle. We handle everything from site analysis to interior layouts.",
    features: ["Architectural Drawings", "Interior Design", "3D Visualization", "Vastu/Feng Shui Compliance"],
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Redevelopment",
    description: "Transform your existing property into a modern masterpiece. We specialize in redeveloping older homes while maximizing floor area and adding contemporary luxury.",
    features: ["Property Assessment", "FAR Optimization", "Heritage Sensitivity", "Modern Upgrades"],
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Turnkey Projects",
    description: "End-to-end delivery of your dream home. From foundation to furnishing, we handle every aspect so you can simply walk into your completed home.",
    features: ["Complete Construction", "Interior Fit-out", "Landscaping", "Move-in Ready"],
  },
  {
    icon: <ClipboardList className="h-8 w-8" />,
    title: "Project Management",
    description: "Expert oversight ensuring your project stays on track, on budget, and meets the highest quality standards. Regular updates keep you informed at every stage.",
    features: ["Timeline Management", "Budget Control", "Quality Audits", "Progress Reports"],
  },
  {
    icon: <Calculator className="h-8 w-8" />,
    title: "Cost Engineering",
    description: "Precise estimation and value engineering to ensure your investment delivers maximum impact. Transparent breakdowns with no hidden costs.",
    features: ["Detailed Estimation", "Value Engineering", "Material Sourcing", "Cost Optimization"],
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Quality Control",
    description: "Rigorous multi-stage quality checks using premium brands and tested materials. Every Nirvana home exceeds industry standards.",
    features: ["Material Testing", "Stage Inspections", "Premium Brands", "Quality Reports"],
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Statutory & Compliance",
    description: "Complete handling of all regulatory requirements including map sanctions, building permits, and occupancy certificates.",
    features: ["Building Permits", "Map Sanction", "NOC Clearances", "Occupancy Certificate"],
  },
  {
    icon: <Palmtree className="h-8 w-8" />,
    title: "Rental Management (Bali)",
    description: "Comprehensive property management for your Bali investment. We handle guests, maintenance, marketing, and revenue optimization.",
    features: ["Guest Management", "Property Maintenance", "Revenue Optimization", "Marketing & Listings"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-20 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Our <span className="text-gold">Services</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Comprehensive construction and development services from concept to completion
          </p>
        </div>
      </section>

      {/* Collaboration & Outright Purchase - Hero Services */}
      <SectionWrapper className="bg-white">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Collaboration Development */}
          <AnimateOnScroll direction="left">
            <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-cream to-white p-8 h-full">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Handshake className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>
                Collaboration <span className="text-gold">Development</span>
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                We partner with plot owners in Delhi NCR for joint development ventures. You bring the land,
                we bring the expertise, capital, and execution. Together, we create premium residential
                properties that maximize returns for both parties.
              </p>
              <ul className="mt-6 space-y-3">
                {["Joint Venture partnerships on your plot", "We handle all approvals, design & construction", "Transparent profit-sharing model", "Zero construction cost to the landowner", "Premium quality ensures maximum market value"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-dark">
                Discuss Collaboration <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Outright Purchase */}
          <AnimateOnScroll direction="right">
            <div className="rounded-2xl border border-navy/10 bg-gradient-to-br from-navy to-navy-light p-8 h-full text-white">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/20 text-gold">
                <LandPlot className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Outright <span className="text-gold">Plot Purchase</span>
              </h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                Looking to sell your plot in South Delhi? We acquire plots outright at competitive market
                rates with quick closings. Our streamlined process ensures hassle-free transactions
                with complete legal support.
              </p>
              <ul className="mt-6 space-y-3">
                {["Competitive market-rate pricing", "Quick due diligence and closing", "Complete legal & documentation support", "No brokerage or hidden charges", "Immediate payment on agreement"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-dark">
                Sell Your Plot <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </SectionWrapper>

      {/* Services Grid */}
      <SectionWrapper className="bg-white">
        <div className="grid gap-6 sm:grid-cols-2">
          {DETAILED_SERVICES.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 0.08}>
              <Card className="group h-full border border-transparent hover:border-gold/30 transition-all duration-300">
                <div className="flex gap-5">
                  <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{service.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span key={f} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-navy">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </SectionWrapper>

      {/* Process */}
      <ProcessTimeline />

      {/* CTA */}
      <SectionWrapper className="bg-white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <AnimateOnScroll direction="left">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold">Get Started</span>
            <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
              Let&apos;s Discuss Your <span className="text-gold">Project</span>
            </h2>
            <p className="mt-4 text-muted">Tell us about your vision and we&apos;ll create a tailored proposal for you.</p>
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <div className="rounded-2xl bg-cream p-6 sm:p-8 border border-gray-200">
              <ContactForm variant="light" source="services-page" />
            </div>
          </AnimateOnScroll>
        </div>
      </SectionWrapper>
    </>
  );
}
