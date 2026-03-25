"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import SectionOffsetGrid from "@/components/layouts/SectionOffsetGrid";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const materials = [
  {
    name: "Western Red Cedar",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&q=80",
    alt: "Close-up of natural Western Red Cedar wood grain texture",
    description:
      "The gold standard for privacy fencing. Our Western Red Cedar is hand-selected from Ontario mills for tight grain and natural durability.",
    properties: [
      "Naturally rot-resistant",
      "25+ year lifespan",
      "Ontario mill sourced",
    ],
  },
  {
    name: "Composite Decking",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80",
    alt: "Modern composite deck extending from a home exterior",
    description:
      "Built for Canadian winters. Composite decking won't warp, splinter, or fade \u2014 just hose it down in spring.",
    properties: [
      "Zero maintenance",
      "Fade & stain resistant",
      "TimberTech & Trex",
    ],
  },
  {
    name: "Powder-Coated Aluminum",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop&q=80",
    alt: "Clean house exterior with powder-coated aluminum fencing",
    description:
      "Ornamental strength without the upkeep. Powder-coated aluminum stands up to salt, sun, and Ontario winters.",
    properties: [
      "Rust-proof",
      "Pool code compliant",
      "Lifetime colour warranty",
    ],
  },
];

/* Fan stagger order: centre card (index 1) first, then outer cards */
const fanDelays = [0.15, 0, 0.15];

/* ------------------------------------------------------------------ */
/*  Material Card                                                      */
/* ------------------------------------------------------------------ */

function MaterialCard({
  material,
  index,
}: {
  material: (typeof materials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const scaleUpVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: prefersReducedMotion ? 0 : fanDelays[index],
      },
    },
  };

  const reducedVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={prefersReducedMotion ? reducedVariants : scaleUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="stage-lit-card card-standard flex flex-col overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={material.image}
          alt={material.alt}
          className="h-full w-full rounded-t-xl object-cover"
          loading="lazy"
          width={600}
          height={400}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className="type-card mb-2"
          style={{ color: "var(--clr-text-primary)" }}
        >
          {material.name}
        </h3>

        <p
          className="type-small mb-4"
          style={{ color: "var(--clr-text-secondary)" }}
        >
          {material.description}
        </p>

        {/* Properties list */}
        <ul className="mt-auto flex flex-col gap-2">
          {material.properties.map((prop) => (
            <li key={prop} className="flex items-center gap-2">
              <Check
                size={16}
                className="shrink-0"
                style={{ color: "var(--clr-accent)" }}
                aria-hidden="true"
              />
              <span
                className="type-small"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                {prop}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Materials Section                                                   */
/* ------------------------------------------------------------------ */

export default function MaterialsSection() {
  return (
    <SectionOffsetGrid className="spotlight-section section-bg-texture">
      {/* Header */}
      <div className="mb-10 text-center sm:mb-12 lg:col-span-full">
        <span
          className="badge-label mb-4 inline-block"
          style={{ color: "var(--clr-accent)" }}
        >
          Built to Last
        </span>

        <h2
          className="type-section"
          style={{ color: "var(--clr-text-primary)" }}
        >
          Premium Materials, No Compromise
        </h2>
      </div>

      {/* Cards grid — 3 columns desktop, 2+1 tablet, stacked mobile */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {materials.map((material, index) => (
          <MaterialCard key={material.name} material={material} index={index} />
        ))}
      </div>
    </SectionOffsetGrid>
  );
}
