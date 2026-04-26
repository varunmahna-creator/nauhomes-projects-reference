"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useContactInfo } from "@/lib/useContactInfo";

export default function Header() {
  const CONTACT_INFO = useContactInfo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-gold">Nirvana</span>
            <span className="text-white"> Group</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === link.href ? "text-gold" : "text-white/80 hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-gold transition-colors">
            <Phone className="h-4 w-4" />
            {CONTACT_INFO.phone}
          </a>
          <Link href="/contact" className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold-dark">
            Get in Touch
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="rounded-lg p-2 text-white lg:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={cn(
        "lg:hidden transition-all duration-300 overflow-hidden",
        isMobileOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
      )}>
        <nav className="flex flex-col gap-1 bg-navy/95 backdrop-blur-md px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                pathname === link.href ? "bg-gold/10 text-gold" : "text-white/80 hover:bg-white/5 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="mt-2 rounded-lg bg-gold px-4 py-3 text-center text-sm font-semibold text-navy">
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
