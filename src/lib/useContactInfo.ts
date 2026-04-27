"use client";

import { useEffect, useState } from "react";
import type { ContactInfo } from "@/types";
import { CONTACT_INFO } from "@/lib/constants";

/**
 * Client-side hook to read contact info.
 *
 * Pass `initial` from the server (the layout already calls getContactInfo())
 * so the very first render matches what's saved in Postgres — avoids a flash
 * of stale defaults before the API call resolves.
 *
 * Falls back to the static CONTACT_INFO constant only when no initial value
 * is supplied AND the API call hasn't returned yet.
 */
export function useContactInfo(initial?: ContactInfo): ContactInfo {
  const [info, setInfo] = useState<ContactInfo>(initial ?? CONTACT_INFO);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.contactInfo) return;
        const ci = data.contactInfo;
        const fallback = initial ?? CONTACT_INFO;
        setInfo({
          phone: ci.phone || fallback.phone,
          email: ci.email || fallback.email,
          whatsapp: ci.whatsapp || fallback.whatsapp,
          offices: ci.offices && ci.offices.length > 0 ? ci.offices : fallback.offices,
        });
      })
      .catch(() => {
        /* keep initial/fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [initial]);

  return info;
}
