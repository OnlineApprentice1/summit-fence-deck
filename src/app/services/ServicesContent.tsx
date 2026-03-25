"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Fence,
  LayoutDashboard,
  Grid3X3,
  TreePine,
  DoorOpen,
  Check,
  ArrowRight,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionFullBleed from "@/components/layouts/SectionFullBleed";

/* ------------------------------------------------------------------ */
/*  Service detail data                                                */
/* ------------------------------------------------------------------ */

const serviceImages: Record<string, string> = {
  "cedar-fencing":
    "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop&q=80",
  "composite-decks":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop&q=80",
  "aluminum-fencing":
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop&q=80",
  pergolas:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=800&h=500&fit=crop&q=80",
  gates:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=500&fit=crop&q=80",
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "cedar-fencing": Fence,
  "composite-decks": LayoutDashboard,
  "aluminum-fencing": Grid3X3,
  pergolas: TreePine,
  gates: DoorOpen,
};

const serviceDetails: Record<
  string,
  { paragraphs: string[]; features: string[]; imageAlt: string }
> = {
  "cedar-fencing": {
    paragraphs: [
      "There is nothing quite like the warmth and character of a Western Red Cedar fence. We source our cedar directly from reputable Canadian mills, selecting boards for tight grain patterns and consistent colour that weathers into a distinguished silver-grey or holds a stain beautifully for years.",
      "Every cedar fence we build starts with a site survey and a conversation about how you use your yard. Privacy heights, semi-privacy lattice tops, horizontal slat designs, or classic dog-ear pickets — we tailor every detail to your property lines and your preferences.",
      "Our posts are set in concrete below the frost line, rails are fastened with stainless steel hardware, and every board is hand-placed. The result is a fence that stands straight through freeze-thaw cycles and looks better with each passing season.",
    ],
    features: [
      "Locally sourced Western Red Cedar from Canadian mills",
      "Custom heights from 4 ft to 8 ft — privacy or semi-privacy",
      "Horizontal, vertical, board-on-board, and lattice-top styles",
      "Stainless steel fasteners for zero rust staining",
      "Posts set below frost line for lasting stability",
      "5-year structural warranty on every installation",
    ],
    imageAlt: "Western Red Cedar privacy fence with clean vertical boards in a Guelph backyard",
  },
  "composite-decks": {
    paragraphs: [
      "Composite decking gives you the look of natural wood without the annual sanding, staining, and sealing. We work exclusively with TimberTech and Trex — two brands that have proven themselves through Canadian winters, with fade and stain warranties that back up their claims.",
      "Whether you are envisioning a single-level entertaining space or a multi-tier deck with built-in seating, our 3D design previews let you see exactly what your finished deck will look like before we break ground. We handle everything from footings and framing to railing systems and lighting.",
      "The hidden fastener systems we use create a smooth, screw-free surface that is comfortable underfoot and easy to maintain. A seasonal wash with soap and water is all it takes to keep your deck looking its best.",
    ],
    features: [
      "TimberTech and Trex composite boards with 25-year fade warranties",
      "3D design previews before construction begins",
      "Multi-level designs with integrated stairs and landings",
      "Hidden fastener systems for a smooth, screw-free surface",
      "LED deck lighting packages available",
      "5-year structural warranty on framing and installation",
    ],
    imageAlt: "Multi-level composite deck with modern railing overlooking a landscaped yard",
  },
  "aluminum-fencing": {
    paragraphs: [
      "Aluminum fencing delivers the elegant look of wrought iron without the rust, the weight, or the maintenance. Our powder-coated aluminum panels are available in black, bronze, and custom colours, and they resist chipping and fading even after years of Ontario weather.",
      "We install aluminum fencing for pool enclosures that meet municipal code requirements, decorative front-yard boundaries, and commercial property perimeters. Every installation includes proper post spacing for structural integrity and self-closing gate hardware where required by code.",
      "The clean lines of ornamental aluminum pair well with gardens and hardscaping. Unlike wood or vinyl, aluminum fencing never warps, rots, or needs repainting — the coating is baked on at the factory and built to last.",
    ],
    features: [
      "Powder-coated finish resists rust, chips, and UV fading",
      "Meets Ontario pool enclosure code requirements",
      "Available in black, bronze, and custom colour options",
      "Self-closing, self-latching gate hardware included",
      "Zero maintenance — no painting, staining, or sealing",
      "Lifetime warranty on powder-coat finish",
    ],
    imageAlt: "Black powder-coated aluminum ornamental fence around a residential pool area",
  },
  pergolas: {
    paragraphs: [
      "A pergola transforms your deck or patio into a true outdoor living room. We build in both Western Red Cedar and powder-coated aluminum, depending on the aesthetic you are after — rustic warmth or clean modern lines.",
      "Our louvred roof systems let you control sunlight and airflow with adjustable slats that open fully for stargazing or close tight when rain rolls in. Privacy walls, curtain tracks, and integrated lighting turn the space into something you will use from spring through autumn.",
      "Every pergola is engineered for local snow loads and wind conditions. We pour concrete footings, use heavy-gauge post anchors, and size beams to span your desired width without sagging — no lightweight garden-centre kits here.",
    ],
    features: [
      "Western Red Cedar or powder-coated aluminum construction",
      "Adjustable louvred roof systems for sun and rain control",
      "Engineered for Ontario snow loads and wind conditions",
      "Integrated LED lighting and privacy wall options",
      "Concrete footings with heavy-gauge post anchors",
      "5-year structural warranty included",
    ],
    imageAlt: "Cedar pergola with louvred roof over a stone patio with comfortable outdoor seating",
  },
  gates: {
    paragraphs: [
      "The gate is the first thing people see and the last thing they pass through — it deserves the same craftsmanship as the fence or deck it belongs to. We design and build custom driveway gates, garden gates, and pedestrian access gates that match your property's style.",
      "For driveways, we offer single-swing, double-swing, and sliding gate configurations in cedar, aluminum, or composite materials. Automated gate openers with keypad, remote, or smartphone control turn your driveway gate into a genuine security feature.",
      "Every gate is built with heavy-duty hinges, adjustable latches, and proper clearance for seasonal ground movement. We also install self-closing hardware for pool gates and child-safe latches where code requires them.",
    ],
    features: [
      "Custom driveway, garden, and pedestrian gate designs",
      "Single-swing, double-swing, and sliding configurations",
      "Automated openers with keypad, remote, or app control",
      "Heavy-duty hinges rated for daily use and wind loads",
      "Self-closing hardware for pool code compliance",
      "Matched to your existing fence style and materials",
    ],
    imageAlt: "Custom cedar driveway gate with black metal hardware on a residential property",
  },
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/* ------------------------------------------------------------------ */
/*  ServiceDetailSection                                               */
/* ------------------------------------------------------------------ */

interface ServiceDetailProps {
  name: string;
  slug: string;
  description: string;
  index: number;
}

function ServiceDetailSection({ name, slug, description, index }: ServiceDetailProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const Icon = serviceIcons[slug] ?? Fence;
  const details = serviceDetails[slug];
  const imageSrc = serviceImages[slug];
  const variants = prefersReducedMotion ? fadeInVariants : fadeUpVariants;

  return (
    <section
      ref={ref}
      id={slug}
      className="scroll-mt-28"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Gold accent divider between sections (not on first) */}
        {index > 0 && (
          <div className="gold-accent-line mb-10 md:mb-14" />
        )}

        {/* Service image */}
        <motion.div variants={variants} className="mb-8">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
            <Image
              src={imageSrc}
              alt={details.imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 65vw"
              className="object-cover"
              style={{ borderRadius: 0 }}
            />
            {/* Stage-lit top highlight */}
            <div
              className="stage-lit-card absolute inset-0 pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Service heading with icon */}
        <motion.div variants={variants} className="flex items-center gap-3 mb-5">
          <span
            className="flex h-10 w-10 items-center justify-center"
            style={{
              backgroundColor: "color-mix(in oklch, var(--clr-accent) 10%, transparent)",
              color: "var(--clr-accent)",
            }}
            aria-hidden="true"
          >
            <Icon className="h-5 w-5" />
          </span>
          <h2 className="type-card" style={{ color: "var(--clr-text-primary)" }}>
            {name}
          </h2>
        </motion.div>

        {/* Paragraphs */}
        {details.paragraphs.map((paragraph, i) => (
          <motion.p
            key={i}
            variants={variants}
            className="type-body mb-4"
            style={{ color: "var(--clr-text-secondary)" }}
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Features list */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-6 mb-8 space-y-3"
        >
          {details.features.map((feature, i) => (
            <motion.li
              key={i}
              variants={variants}
              className="flex items-start gap-3"
            >
              <Check
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: "var(--clr-accent)" }}
                aria-hidden="true"
              />
              <span
                className="type-body"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA button */}
        <motion.div variants={variants}>
          <Link
            href="/contact"
            className="btn-profile inline-flex items-center gap-2"
          >
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SidebarNav                                                         */
/* ------------------------------------------------------------------ */

function SidebarNav({ activeSlug }: { activeSlug: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <nav aria-label="Service navigation" className="space-y-1">
      {siteConfig.services.map((service) => {
        const isActive = service.slug === activeSlug;
        return (
          <a
            key={service.slug}
            href={`#${service.slug}`}
            className="group flex items-center gap-3 py-3 px-4 type-small transition-colors"
            style={{
              color: isActive ? "var(--clr-accent)" : "var(--clr-text-secondary)",
              borderLeft: isActive
                ? "2px solid var(--clr-accent)"
                : "2px solid transparent",
              backgroundColor: isActive
                ? "color-mix(in oklch, var(--clr-accent) 5%, transparent)"
                : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--clr-text-primary)";
                e.currentTarget.style.borderLeftColor = "var(--clr-surface-4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--clr-text-secondary)";
                e.currentTarget.style.borderLeftColor = "transparent";
              }
            }}
          >
            {service.name}
          </a>
        );
      })}

      {/* Phone CTA in sidebar */}
      <div className="gold-accent-line mt-6 mb-4" />
      <a
        href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
        className="flex items-center gap-2 px-4 py-2 type-small transition-colors"
        style={{ color: "var(--clr-accent)" }}
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {siteConfig.phone}
      </a>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile tab bar                                                     */
/* ------------------------------------------------------------------ */

function MobileTabBar({ activeSlug }: { activeSlug: string }) {
  return (
    <nav
      aria-label="Service navigation"
      className="flex gap-2 overflow-x-auto py-3 px-4 scrollbar-none lg:hidden"
      style={{
        backgroundColor: "var(--clr-surface-2)",
        borderBottom: "1px solid var(--clr-surface-3)",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {siteConfig.services.map((service) => {
        const isActive = service.slug === activeSlug;
        return (
          <a
            key={service.slug}
            href={`#${service.slug}`}
            className="shrink-0 type-small px-4 py-2 transition-colors"
            style={{
              color: isActive ? "var(--clr-accent)" : "var(--clr-text-muted)",
              borderBottom: isActive
                ? "2px solid var(--clr-accent)"
                : "2px solid transparent",
              whiteSpace: "nowrap",
            }}
          >
            {service.name}
          </a>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  useActiveSection hook — tracks which service section is in view    */
/* ------------------------------------------------------------------ */

function useActiveSection(slugs: string[]): string {
  const [active, setActive] = useState(slugs[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    slugs.forEach((slug) => {
      const el = document.getElementById(slug);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(slug);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [slugs]);

  return active;
}

/* ------------------------------------------------------------------ */
/*  ServicesContent — main client component                            */
/* ------------------------------------------------------------------ */

export default function ServicesContent() {
  const prefersReducedMotion = useReducedMotion();
  const serviceSlugs = siteConfig.services.map((s) => s.slug);
  const activeSlug = useActiveSection(serviceSlugs);

  return (
    <div className="pt-24">
      {/* ── Hero Banner ── */}
      <SectionFullBleed
        background={
          <div
            className="absolute inset-0 spotlight-section"
            style={{ background: "var(--clr-surface-1)" }}
          />
        }
        contentPosition="center"
        minHeight="min-h-[40vh]"
        className="section-bg-deep"
      >
        <div className="flex flex-col items-center text-center">
          <motion.span
            className="badge-label mb-5"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            What We Build
          </motion.span>
          <motion.h1
            className="type-section mb-4"
            style={{ color: "var(--clr-text-primary)" }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="type-body-lg max-w-2xl"
            style={{ color: "var(--clr-text-secondary)" }}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            From cedar privacy fences to multi-level composite decks, every
            project is backed by our 5-year structural warranty and built by
            a crew that shows up on time, every time.
          </motion.p>
        </div>
      </SectionFullBleed>

      {/* ── Mobile tab bar ── */}
      <div className="sticky top-16 z-30 lg:hidden">
        <MobileTabBar activeSlug={activeSlug} />
      </div>

      {/* ── Two-column layout: sidebar + content ── */}
      <div
        className="section-standard"
        style={{ background: "var(--clr-surface-1)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <SidebarNav activeSlug={activeSlug} />
              </div>
            </aside>

            {/* Service detail sections */}
            <div className="lg:col-span-9 space-y-14 md:space-y-20">
              {siteConfig.services.map((service, index) => (
                <ServiceDetailSection
                  key={service.slug}
                  name={service.name}
                  slug={service.slug}
                  description={service.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA band ── */}
      <section
        className="section-spacious spotlight-section"
        style={{ background: "var(--clr-surface-2)" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="type-section mb-4"
              style={{ color: "var(--clr-text-primary)" }}
            >
              Ready to Start Your Project?
            </h2>
            <p
              className="type-body-lg mb-8 max-w-xl mx-auto"
              style={{ color: "var(--clr-text-secondary)" }}
            >
              Tell us what you are building and we will put together a detailed
              estimate — no obligation, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-profile inline-flex items-center gap-2"
              >
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                className="btn-profile-ghost inline-flex items-center gap-2"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {siteConfig.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
