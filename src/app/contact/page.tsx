import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ContactForm from "@/components/ui/ContactForm";
import { getContactInfo } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Nirvana Group. Schedule a consultation for your luxury construction project in Delhi or Bali.",
};

export default function ContactPage() {
  const CONTACT_INFO = getContactInfo();
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-light pt-32 pb-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/2 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-heading)" }}>
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Ready to start your project? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <SectionWrapper className="bg-white">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimateOnScroll direction="left">
              <h2 className="text-2xl font-bold text-navy mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                Send Us a Message
              </h2>
              <ContactForm variant="light" source="contact-page" />
            </AnimateOnScroll>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <AnimateOnScroll direction="right">
              <div className="rounded-2xl bg-navy p-8 text-white h-full">
                <h3 className="text-xl font-bold text-gold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Contact Information</h3>

                <div className="space-y-6">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-start gap-4 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Phone</p>
                      <p className="text-sm font-medium text-white group-hover:text-gold transition-colors">{CONTACT_INFO.phone}</p>
                    </div>
                  </a>

                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-start gap-4 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Email</p>
                      <p className="text-sm font-medium text-white group-hover:text-gold transition-colors">{CONTACT_INFO.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Clock className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Working Hours</p>
                      <p className="text-sm font-medium text-white">Mon - Sat: 10AM - 7PM</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    {CONTACT_INFO.offices.map((office) => (
                      <div key={office.city} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                          <MapPin className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gold">{office.city}</p>
                          <p className="text-xs text-white/50 mt-1 leading-relaxed">{office.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </SectionWrapper>

      {/* Map placeholders */}
      <SectionWrapper>
        <h2 className="text-2xl font-bold text-navy mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>Our Offices</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {CONTACT_INFO.offices.map((office) => (
            <div key={office.city} className="rounded-xl overflow-hidden border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-navy/5 to-gold/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-muted/30 mx-auto mb-2" />
                  <p className="text-sm text-muted">{office.city} Office</p>
                  <p className="text-xs text-muted/50 mt-1">Map embed placeholder</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-bold text-navy" style={{ fontFamily: "var(--font-heading)" }}>{office.city}</h3>
                <p className="text-xs text-muted mt-1">{office.address}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
