"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const menuVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
      };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ background: "var(--clr-surface-1)" }}
      >
        {/* Business name — Playfair Display */}
        <Link
          href="/"
          className="type-card font-heading"
          style={{ color: "var(--clr-accent)" }}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav — visible at lg (1024px) and above */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-small transition-colors"
              style={{ color: "var(--clr-text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--clr-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--clr-text-secondary)")
              }
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-profile">
            Free Estimate
          </Link>
        </div>

        {/* Mobile controls — phone icon + hamburger, below lg */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
            className="p-2 transition-colors"
            style={{ color: "var(--clr-accent)" }}
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 transition-colors"
            style={{ color: "var(--clr-text-primary)" }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Gold accent line beneath nav */}
      <div className="gold-accent-line" />

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={menuVariants.initial}
            animate={menuVariants.animate}
            exit={menuVariants.exit}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "var(--clr-surface-1)",
              borderBottom: "1px solid var(--clr-surface-3)",
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="type-body py-3 transition-colors"
                  style={{
                    color: "var(--clr-text-secondary)",
                    borderBottom: "1px solid var(--clr-surface-3)",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Phone link in mobile menu */}
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                className="type-body py-3 flex items-center gap-2 transition-colors"
                style={{ color: "var(--clr-accent)" }}
              >
                <Phone className="w-4 h-4" />
                {siteConfig.phone}
              </a>

              {/* CTA in mobile menu */}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-profile mt-3 text-center"
              >
                Free Estimate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
