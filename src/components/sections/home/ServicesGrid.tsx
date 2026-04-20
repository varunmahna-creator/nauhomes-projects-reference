import React from "react";
import { Compass, Building2, ClipboardList, Calculator, ShieldCheck, Scale, Handshake, LandPlot, Palmtree, Home, Key, TrendingUp } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Card from "@/components/ui/Card";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="h-8 w-8" />,
  Building2: <Building2 className="h-8 w-8" />,
  ClipboardList: <ClipboardList className="h-8 w-8" />,
  Calculator: <Calculator className="h-8 w-8" />,
  ShieldCheck: <ShieldCheck className="h-8 w-8" />,
  Scale: <Scale className="h-8 w-8" />,
  Handshake: <Handshake className="h-8 w-8" />,
  LandPlot: <LandPlot className="h-8 w-8" />,
  Palmtree: <Palmtree className="h-8 w-8" />,
  Home: <Home className="h-8 w-8" />,
  Key: <Key className="h-8 w-8" />,
  TrendingUp: <TrendingUp className="h-8 w-8" />,
};

const SERVICES_ALL = [
  { icon: "Compass", title: "Planning & Design", description: "Comprehensive architectural planning and interior design solutions tailored to your lifestyle." },
  { icon: "Building2", title: "Redevelopment", description: "Transform aging properties into modern luxury residences with our expert redevelopment services." },
  { icon: "ClipboardList", title: "Project Management", description: "End-to-end project management ensuring timely delivery, quality control, and budget adherence." },
  { icon: "Calculator", title: "Cost Engineering", description: "Precise cost estimation and value engineering to maximize your investment without compromising quality." },
  { icon: "ShieldCheck", title: "Quality Control", description: "Rigorous quality assurance at every stage using premium materials and best practices." },
  { icon: "Scale", title: "Statutory & Compliance", description: "Complete handling of regulatory approvals, permits, and compliance requirements." },
];

const SERVICES_DELHI = [
  { icon: "Building2", title: "Luxury Residences", description: "Premium apartments, kothis, and builder floors in South Delhi\u2019s most elite colonies \u2014 GK, Defence Colony, Vasant Vihar." },
  { icon: "Handshake", title: "Collaboration Development", description: "Joint venture partnerships with plot owners. You bring the land, we bring expertise and capital." },
  { icon: "LandPlot", title: "Outright Plot Purchase", description: "We acquire plots at competitive market rates with quick closings and complete legal support." },
  { icon: "Home", title: "Turnkey Construction", description: "End-to-end delivery from foundation to furnishing. Walk into your completed luxury home." },
  { icon: "Compass", title: "Architecture & Design", description: "In-house architects crafting bespoke designs with Vastu compliance and modern luxury aesthetics." },
  { icon: "Calculator", title: "Project Consultancy", description: "Construction supervision, cost engineering, and project management for independent builders." },
];

const SERVICES_BALI = [
  { icon: "Palmtree", title: "Villa Development", description: "Contemporary eco-friendly villas in Seminyak, Canggu, Ubud, and Uluwatu with sustainable design." },
  { icon: "TrendingUp", title: "Investment Properties", description: "High-yield villa investments with 12-15% estimated ROI. Transparent pricing and clear timelines." },
  { icon: "Key", title: "Rental Management", description: "Full-service property management \u2014 guest bookings, staff, maintenance, and revenue optimization." },
  { icon: "Home", title: "Turnkey Villas", description: "Move-in ready villas with private pools, tropical gardens, and premium furnishing included." },
  { icon: "Compass", title: "Custom Villa Design", description: "Bespoke designs blending Balinese architecture with contemporary luxury for your dream retreat." },
  { icon: "Scale", title: "Legal & Compliance", description: "Complete handling of leasehold agreements, permits, and Indonesian property regulations for foreign buyers." },
];

interface ServicesGridProps {
  vertical?: "all" | "delhi" | "bali";
}

export default function ServicesGrid({ vertical = "all" }: ServicesGridProps) {
  const services = vertical === "delhi" ? SERVICES_DELHI : vertical === "bali" ? SERVICES_BALI : SERVICES_ALL;
  const subtitle = vertical === "delhi"
    ? "Our Delhi NCR Services"
    : vertical === "bali"
    ? "Our Bali Services"
    : "What We Do";

  return (
    <SectionWrapper id="services">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">{subtitle}</span>
        <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
          Our Services
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <AnimateOnScroll key={`${vertical}-${service.title}`} delay={index * 0.1}>
            <Card className="group h-full text-center hover:border-gold/30 border border-transparent transition-all duration-300">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{service.description}</p>
            </Card>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
