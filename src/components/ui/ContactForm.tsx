"use client";

import React, { useState, useMemo, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  variant?: "light" | "dark";
  compact?: boolean;
  source?: string;  // e.g., "homepage", "contact", "project:villa-gk1"
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  interest: string;
  message: string;
}

const LOCATIONS = ["Delhi NCR", "Bali, Indonesia"];

// Service options change based on the selected market.
const INTERESTS_BY_LOCATION: Record<string, string[]> = {
  "Delhi NCR": [
    "New Construction",
    "Redevelopment",
    "Turnkey Project",
    "Collaboration / Joint Venture",
    "Other",
  ],
  "Bali, Indonesia": [
    "Villa Purchase",
    "Turnkey Project",
    "Rental Management",
    "Other",
  ],
};

// Fallback list before a location is picked.
const INTERESTS_DEFAULT: string[] = [
  "New Construction",
  "Redevelopment",
  "Turnkey Project",
  "Villa Purchase",
  "Rental Management",
  "Collaboration / Joint Venture",
  "Other",
];

export default function ContactForm({ variant = "light", compact = false, source }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", email: "", location: "", interest: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const isDark = variant === "dark";

  const interestOptions = useMemo<string[]>(() => {
    if (!formData.location) return INTERESTS_DEFAULT;
    return INTERESTS_BY_LOCATION[formData.location] ?? INTERESTS_DEFAULT;
  }, [formData.location]);

  const inputBaseStyles = cn(
    "w-full rounded-lg border px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2",
    isDark
      ? "border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-gold focus:ring-gold/30"
      : "border-gray-200 bg-white text-navy placeholder-muted focus:border-gold focus:ring-gold/30"
  );

  const labelStyles = cn("mb-1.5 block text-sm font-medium", isDark ? "text-white/90" : "text-navy");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      // If the user changes location and the previously selected interest is no
      // longer valid for the new location, clear it so they're forced to re-pick.
      if (name === "location") {
        const valid = INTERESTS_BY_LOCATION[value] ?? INTERESTS_DEFAULT;
        if (prev.interest && !valid.includes(prev.interest)) {
          next.interest = "";
        }
      }
      return next;
    });
    if (error) setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      // Save lead to internal API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: source || "unknown" }),
      });
      if (!response.ok) throw new Error("Failed to submit form. Please try again.");

      // Also try third-party endpoint if configured
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, source }),
        }).catch(() => {}); // Don't fail if third-party endpoint is down
      }

      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", location: "", interest: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4 rounded-xl p-8 text-center", isDark ? "bg-white/5" : "bg-green-50")}>
        <CheckCircle className={cn("h-12 w-12", isDark ? "text-gold" : "text-green-500")} />
        <h3 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-navy")}>Thank You!</h3>
        <p className={cn("text-sm", isDark ? "text-white/70" : "text-muted")}>We have received your enquiry. Our team will get back to you within 24 hours.</p>
        <button type="button" onClick={() => setIsSuccess(false)} className={cn("mt-2 text-sm font-medium underline underline-offset-4 transition-colors cursor-pointer", isDark ? "text-gold hover:text-gold-light" : "text-gold-dark hover:text-gold")}>
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor="contact-name" className={labelStyles}>Full Name <span className="text-red-400">*</span></label>
          <input id="contact-name" type="text" name="name" required placeholder="Enter your full name" value={formData.name} onChange={handleChange} className={inputBaseStyles} />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelStyles}>Phone Number <span className="text-red-400">*</span></label>
          <input id="contact-phone" type="tel" name="phone" required placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} className={inputBaseStyles} />
        </div>
      </div>

      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor="contact-email" className={labelStyles}>Email Address</label>
          <input id="contact-email" type="email" name="email" placeholder="Enter your email (optional)" value={formData.email} onChange={handleChange} className={inputBaseStyles} />
        </div>
        <div>
          <label htmlFor="contact-location" className={labelStyles}>Interested Location <span className="text-red-400">*</span></label>
          <select id="contact-location" name="location" required value={formData.location} onChange={handleChange} className={cn(inputBaseStyles, !formData.location && (isDark ? "text-white/50" : "text-muted"))}>
            <option value="" disabled>Select location</option>
            {LOCATIONS.map((loc) => (<option key={loc} value={loc} className="text-navy">{loc}</option>))}
          </select>
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <label htmlFor="contact-interest" className={labelStyles}>Interested In</label>
            <select
              id="contact-interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              disabled={!formData.location}
              className={cn(
                inputBaseStyles,
                !formData.interest && (isDark ? "text-white/50" : "text-muted"),
                !formData.location && "opacity-60 cursor-not-allowed"
              )}
            >
              <option value="" disabled>
                {formData.location ? "Select service type" : "Select location first"}
              </option>
              {interestOptions.map((int) => (<option key={int} value={int} className="text-navy">{int}</option>))}
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" className={labelStyles}>Message</label>
            <textarea id="contact-message" name="message" rows={3} placeholder="Tell us about your project (optional)" value={formData.message} onChange={handleChange} className={cn(inputBaseStyles, "resize-none")} />
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-base font-semibold text-navy transition-all duration-200 hover:bg-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none cursor-pointer">
        {isSubmitting ? (<><Loader2 className="h-5 w-5 animate-spin" />Submitting...</>) : (<><Send className="h-5 w-5" />Get Free Consultation</>)}
      </button>
    </form>
  );
}
