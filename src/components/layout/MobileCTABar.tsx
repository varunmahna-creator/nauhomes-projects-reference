"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useContactInfo } from "@/lib/useContactInfo";
import type { ContactInfo } from "@/types";

export default function MobileCTABar({ initialContact }: { initialContact?: ContactInfo }) {
  const CONTACT_INFO = useContactInfo(initialContact);
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in Nirvana Group projects.")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t border-white/10 bg-navy/95 backdrop-blur-md" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
      >
        <MessageCircle className="h-5 w-5 text-[#25D366]" />
        WhatsApp
      </a>
      <div className="w-px bg-white/10" />
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
      >
        <Phone className="h-5 w-5 text-gold" />
        Call Now
      </a>
    </div>
  );
}
