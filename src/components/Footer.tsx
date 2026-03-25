import Link from "next/link";
import { Phone, Mail, MapPin, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

const serviceAreas = ["Guelph", "Kitchener", "Waterloo", "Cambridge"];

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ backgroundColor: "var(--clr-surface-2)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ── 4-Column Grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <h3
              className="type-card font-heading font-bold"
              style={{ color: "var(--clr-primary)" }}
            >
              {siteConfig.name}
            </h3>
            <p
              className="type-small max-w-xs"
              style={{ color: "var(--clr-text-secondary)" }}
            >
              {siteConfig.tagline}
            </p>

            {/* Service area badges */}
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="badge-label">
                  {area}
                </span>
              ))}
            </div>

            {/* Stamp badge — 5-Year Warranty */}
            <div className="stamp-badge mt-3">
              <Shield className="h-4 w-4 shrink-0" />
              <span>5-Year Warranty</span>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4
              className="type-small font-heading mb-4 font-bold uppercase tracking-wider"
              style={{ color: "var(--clr-text-primary)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="type-small transition-colors hover:opacity-80"
                    style={{ color: "var(--clr-text-secondary)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4
              className="type-small font-heading mb-4 font-bold uppercase tracking-wider"
              style={{ color: "var(--clr-text-primary)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {siteConfig.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="type-small transition-colors hover:opacity-80"
                    style={{ color: "var(--clr-text-secondary)" }}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4
              className="type-small font-heading mb-4 font-bold uppercase tracking-wider"
              style={{ color: "var(--clr-text-primary)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                  className="type-small inline-flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{ color: "var(--clr-text-secondary)" }}
                >
                  <Phone
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--clr-accent)" }}
                  />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="type-small inline-flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{ color: "var(--clr-text-secondary)" }}
                >
                  <Mail
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--clr-accent)" }}
                  />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span
                  className="type-small inline-flex items-center gap-2"
                  style={{ color: "var(--clr-text-secondary)" }}
                >
                  <MapPin
                    className="h-4 w-4 shrink-0"
                    style={{ color: "var(--clr-accent)" }}
                  />
                  {siteConfig.location.city}, {siteConfig.location.province}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Gold Accent Divider ── */}
        <div className="gold-accent-line mt-12 mb-8" aria-hidden="true" />

        {/* ── Legal Row ── */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            className="type-caption"
            style={{ color: "var(--clr-text-muted)" }}
          >
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="type-caption transition-colors hover:opacity-80"
              style={{ color: "var(--clr-text-muted)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="type-caption transition-colors hover:opacity-80"
              style={{ color: "var(--clr-text-muted)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
