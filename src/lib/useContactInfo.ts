"use client";

import { useEffect, useState } from "react";
import type { ContactInfo } from "@/types";
import { CONTACT_INFO } from "@/lib/constants";

/**
 * Client-side hook to read contact info from /api/settings.
 * Falls back to constant defaults until the fetch resolves.
 */
export function useContactInfo(): ContactInfo {
  const [info, setInfo] = useState<ContactInfo>(CONTACT_INFO);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings", { cache: "no-store" })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled || !data?.contactInfo) return;
        const ci = data.contactInfo;
        setInfo({
          phone: ci.phone || CONTACT_INFO.phone,
          email: ci.email || CONTACT_INFO.email,
          whatsapp: ci.whatsapp || CONTACT_INFO.whatsapp,
          offices: (ci.offices && ci.offices.length > 0) ? ci.offices : CONTACT_INFO.offices,
        });
      })
      .catch(() => { /* keep fallback */ });
    return () => { cancelled = true; };
  }, []);

  return info;
}
