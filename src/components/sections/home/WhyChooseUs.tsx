import React from "react";
import { Award, Clock, Gem, Users, Globe, Wrench, TrendingUp, Leaf, Shield, MapPin, Handshake, Building2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const REASONS_ALL = [
  { icon: <Award className="h-7 w-7" />, title: "20+ Years Excellence", description: "Two decades of premium construction experience in Delhi\u2019s most prestigious neighborhoods." },
  { icon: <Clock className="h-7 w-7" />, title: "Timely Delivery", description: "Proven track record of completing projects on schedule with transparent progress updates." },
  { icon: <Gem className="h-7 w-7" />, title: "Premium Quality", description: "Only the finest materials and finishes from internationally acclaimed brands." },
  { icon: <Users className="h-7 w-7" />, title: "Personalized Design", description: "Every home is uniquely designed around the owner\u2019s lifestyle and preferences." },
  { icon: <Globe className="h-7 w-7" />, title: "International Presence", description: "Operations in both India and Indonesia, bringing global design perspectives." },
  { icon: <Wrench className="h-7 w-7" />, title: "End-to-End Service", description: "From concept to completion, we handle every aspect of your project." },
];

const REASONS_DELHI = [
  { icon: <MapPin className="h-7 w-7" />, title: "South Delhi Specialists", description: "Deep expertise in GK, Defence Colony, Vasant Vihar, Saket \u2014 we know every colony\u2019s regulations and potential." },
  { icon: <Building2 className="h-7 w-7" />, title: "Redevelopment Experts", description: "Maximizing FAR and value from your existing plot through smart design and construction." },
  { icon: <Handshake className="h-7 w-7" />, title: "Collaboration Model", description: "Zero-cost construction for landowners through our transparent joint venture partnerships." },
  { icon: <Shield className="h-7 w-7" />, title: "Complete Legal Support", description: "All approvals, sanctions, and documentation handled \u2014 including complex redevelopment cases." },
  { icon: <Gem className="h-7 w-7" />, title: "Luxury Finishes", description: "Italian marble, premium fittings, and smart home automation as standard in every project." },
  { icon: <Clock className="h-7 w-7" />, title: "On-Time Delivery", description: "Transparent timelines with regular progress updates. No delays, no surprises." },
];

const REASONS_BALI = [
  { icon: <Leaf className="h-7 w-7" />, title: "Eco-Friendly Design", description: "Sustainable materials, passive cooling, and solar-ready designs that harmonize with Bali\u2019s nature." },
  { icon: <TrendingUp className="h-7 w-7" />, title: "12-15% ROI", description: "Strong rental returns through Bali\u2019s booming tourism. Professional management maximizes your income." },
  { icon: <Globe className="h-7 w-7" />, title: "Foreign Buyer Friendly", description: "Complete support for international investors \u2014 leasehold structuring, legal compliance, and remote management." },
  { icon: <Gem className="h-7 w-7" />, title: "Premium Locations", description: "Seminyak, Canggu, Ubud, Uluwatu \u2014 we build only in Bali\u2019s most sought-after destinations." },
  { icon: <Wrench className="h-7 w-7" />, title: "Turnkey + Management", description: "From land to furnished villa to rental income \u2014 we handle the entire lifecycle of your property." },
  { icon: <Clock className="h-7 w-7" />, title: "Transparent Pricing", description: "Clear cost breakdowns, no hidden fees, and a fixed development timeline you can count on." },
];

interface WhyChooseUsProps {
  vertical?: "all" | "delhi" | "bali";
}

export default function WhyChooseUs({ vertical = "all" }: WhyChooseUsProps) {
  const reasons = vertical === "delhi" ? REASONS_DELHI : vertical === "bali" ? REASONS_BALI : REASONS_ALL;
  const label = vertical === "delhi" ? "Why Nirvana Delhi" : vertical === "bali" ? "Why Nirvana Bali" : "Why Nirvana Group";

  return (
    <SectionWrapper id="why-us">
      <div className="mb-12 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gold">{label}</span>
        <h2 className="mt-4 text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
          Why Choose Us
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gold" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <AnimateOnScroll key={`${vertical}-${reason.title}`} delay={index * 0.1}>
            <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-md">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>{reason.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{reason.description}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
