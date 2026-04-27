import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { getContactInfo } from "@/lib/settings";

const SERVICES_LIST = [
  "Planning & Design",
  "Redevelopment",
  "Turnkey Projects",
  "Project Management",
  "Cost Engineering",
  "Rental Management",
];

function SocialIcon({ name }: { name: string }) {
  return (
    <span className="text-xs font-bold uppercase">{name.slice(0, 2)}</span>
  );
}

export default async function Footer({ socialLinks }: { socialLinks?: { facebook: string; instagram: string; youtube: string; twitter: string; linkedin: string } }) {
  const CONTACT_INFO = await getContactInfo();
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-gold">Nirvana</span> Group
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Crafting luxury living spaces in Delhi and Bali. With over 20 years of excellence, we transform your vision into architectural masterpieces. A Nirvana Group company.
            </p>
            <div className="mt-6 flex gap-3">
              {Object.entries(socialLinks || {}).filter(([, url]) => url).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold hover:text-navy"
                  aria-label={name}
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Services</h4>
            <ul className="space-y-3">
              {SERVICES_LIST.map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-sm text-white/60 transition-colors hover:text-gold">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Contact Us</h4>
            <div className="space-y-4">
              {CONTACT_INFO.offices.map((office) => (
                <div key={office.city} className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-white">{office.city}</p>
                    <p className="text-xs text-white/50">{office.address}</p>
                  </div>
                </div>
              ))}
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-gold" />
                {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-sm text-white/60 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 text-gold" />
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Nirvana Group. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-white/40 hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
