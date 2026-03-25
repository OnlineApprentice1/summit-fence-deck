"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Fence,
  LayoutDashboard,
  Grid3X3,
  TreePine,
  DoorOpen,
} from "lucide-react";
import SectionBentoGrid from "@/components/layouts/SectionBentoGrid";

/* ------------------------------------------------------------------ */
/*  Service data                                                       */
/* ------------------------------------------------------------------ */

const services = [
  {
    name: "Cedar Fencing",
    slug: "cedar-fencing",
    description:
      "Western Red Cedar privacy fences built to your exact specifications — custom heights, styles, and finishes that weather beautifully.",
    icon: Fence,
    featured: true,
  },
  {
    name: "Composite Decks",
    slug: "composite-decks",
    description:
      "Low-maintenance TimberTech and Trex composite decking in multi-level designs that stand up to Canadian winters.",
    icon: LayoutDashboard,
    featured: false,
  },
  {
    name: "Aluminum & Ornamental Fencing",
    slug: "aluminum-ornamental-fencing",
    description:
      "Powder-coated aluminum for pool enclosures and decorative boundaries — zero rust, zero upkeep.",
    icon: Grid3X3,
    featured: false,
  },
  {
    name: "Pergolas & Shade Structures",
    slug: "pergolas-shade-structures",
    description:
      "Cedar and aluminum pergolas, louvred roofs, and privacy walls that extend your living space outdoors.",
    icon: TreePine,
    featured: false,
  },
  {
    name: "Gates & Access",
    slug: "gates-access",
    description:
      "Custom driveway gates, garden gates, and automated gate systems — designed for security and curb appeal.",
    icon: DoorOpen,
    featured: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/* ------------------------------------------------------------------ */
/*  ServiceCard                                                        */
/* ------------------------------------------------------------------ */

interface ServiceCardProps {
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  featured: boolean;
  index: number;
}

function ServiceCard({
  name,
  slug,
  description,
  icon: Icon,
  featured,
  index,
}: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  /* slide-left on index 0, 2, 4 — slide-right on index 1, 3 */
  const directionVariants = index % 2 === 0 ? slideLeftVariants : slideRightVariants;
  const variants = prefersReducedMotion ? reducedMotionVariants : directionVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay: index * 0.06 }}
      className={featured ? "col-span-1 md:col-span-2" : ""}
    >
      <Link
        href={`/services#${slug}`}
        className={`group block h-full ${featured ? "card-featured" : "card-standard"}`}
        style={{ transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}
      >
        {/* Icon container */}
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
          style={{
            backgroundColor:
              "color-mix(in oklch, var(--clr-accent) 10%, transparent)",
          }}
        >
          <span style={{ color: "var(--clr-accent)" }} aria-hidden="true">
            <Icon className="h-8 w-8" />
          </span>
        </div>

        {/* Heading */}
        <h3
          className="type-card mb-2"
          style={{ color: "var(--clr-text-primary)" }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="type-small"
          style={{ color: "var(--clr-text-secondary)" }}
        >
          {description}
        </p>

        {/* Stamp badge — featured card only */}
        {featured && (
          <span className="stamp-badge mt-4 inline-block">5-Year Warranty</span>
        )}
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ServicesSection                                                     */
/* ------------------------------------------------------------------ */

export default function ServicesSection() {
  return (
    <SectionBentoGrid columns={3} className="section-bg-gradient">
      {/* Section header — left-aligned, spans full grid width */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-start">
        <span
          className="badge-label mb-3"
          style={{ color: "var(--clr-accent)" }}
        >
          Our Expertise
        </span>
        <h2
          className="type-section"
          style={{ color: "var(--clr-text-primary)" }}
        >
          Fencing &amp; Deck Services
        </h2>
      </div>

      {/* Service cards */}
      {services.map((service, index) => (
        <ServiceCard
          key={service.slug}
          name={service.name}
          slug={service.slug}
          description={service.description}
          icon={service.icon}
          featured={service.featured}
          index={index}
        />
      ))}
    </SectionBentoGrid>
  );
}
