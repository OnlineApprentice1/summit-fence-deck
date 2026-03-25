"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-base-100/80 border-b border-base-300/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="type-card text-primary">
          {siteConfig.name}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="type-small text-base-content/70 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary btn-sm">Get a Free Estimate</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-base-100/95 backdrop-blur-md border-b border-base-300/50 overflow-hidden">
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                  className="type-body text-base-content/70 hover:text-primary transition-colors py-2">{link.label}</Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary btn-sm w-fit">Get a Free Estimate</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
