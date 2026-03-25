"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionAsymmetricSplit from "@/components/layouts/SectionAsymmetricSplit";

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "600+", label: "Sq Ft Deck Area" },
  { value: "120", label: "Ft Fence Run" },
  { value: "3", label: "Week Build" },
];

/* ------------------------------------------------------------------ */
/*  SignatureProject                                                    */
/* ------------------------------------------------------------------ */

export default function SignatureProject() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Blur-sharpen animation for the image */
  const blurSharpenVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  /* Simple fade for reduced motion */
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  /* ---- Text side (left prop, visually on the left at 5fr) ---- */
  const textContent = (
    <div className="flex flex-col items-start gap-6">
      <span className="badge-label" style={{ color: "var(--clr-accent)" }}>
        Featured Project
      </span>

      <h2 className="type-section" style={{ color: "var(--clr-text-primary)" }}>
        The Wellington Backyard
      </h2>

      <p className="type-body" style={{ color: "var(--clr-text-secondary)" }}>
        A complete outdoor transformation &mdash; 600 sq ft composite deck with
        built-in lighting, 120 ft of Western Red Cedar privacy fence, and a
        custom pergola. Delivered in just three weeks.
      </p>

      {/* Gold accent line above stats */}
      <div
        className="gold-accent-line h-0.5 w-full rounded-full"
        style={{ backgroundColor: "var(--clr-accent)" }}
        aria-hidden="true"
      />

      {/* Stats row */}
      <div className="flex w-full flex-wrap gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span
              className="type-card font-bold"
              style={{ color: "var(--clr-accent)" }}
            >
              {stat.value}
            </span>
            <span
              className="type-small"
              style={{ color: "var(--clr-text-muted)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/services"
        className="btn-profile-ghost mt-2 inline-flex items-center gap-2"
      >
        See All Projects
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );

  /* ---- Image side (right prop, visually on the right at 7fr) ---- */
  const imageContent = (
    <motion.div
      className="stage-lit-card overflow-hidden rounded-xl"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={prefersReducedMotion ? fadeVariants : blurSharpenVariants}
    >
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80"
        alt="Completed backyard deck and cedar fence project in Wellington, Guelph"
        className="aspect-[3/2] w-full rounded-xl object-cover"
        loading="lazy"
        width={1200}
        height={800}
      />
    </motion.div>
  );

  return (
    <div ref={sectionRef} id="signature-project" className="spotlight-section">
      <SectionAsymmetricSplit
        left={imageContent}
        right={textContent}
        reverse
      />
    </div>
  );
}
