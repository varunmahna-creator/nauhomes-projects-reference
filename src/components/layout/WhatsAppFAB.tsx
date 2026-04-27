"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useContactInfo } from "@/lib/useContactInfo";
import type { ContactInfo } from "@/types";

export default function WhatsAppFAB({ initialContact }: { initialContact?: ContactInfo }) {
  const CONTACT_INFO = useContactInfo(initialContact);
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in Nirvana Group projects. Could you share more details?")}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
