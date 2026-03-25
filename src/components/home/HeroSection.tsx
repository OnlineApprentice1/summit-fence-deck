"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import SectionFullBleed from "@/components/layouts/SectionFullBleed";

/* ------------------------------------------------------------------ */
/*  Background — curtain panels + spotlight + parallax                 */
/* ------------------------------------------------------------------ */

function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Base dark fill */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--clr-surface-1)" }}
      />

      {/* Parallax wrapper */}
      <motion.div
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : backgroundY }}
      >
        {/* Left curtain panel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--clr-primary-muted) 0%, transparent 35%)",
            opacity: 0.12,
          }}
        />

        {/* Right curtain panel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, var(--clr-primary-muted) 0%, transparent 35%)",
            opacity: 0.12,
          }}
        />

        {/* Centre spotlight from above */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, var(--clr-primary) 0%, transparent 65%)",
            opacity: 0.15,
          }}
        />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Content                                                       */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  /* Curtain clip-reveal: centre outward */
  const clipRevealVariants = {
    hidden: {
      clipPath: "inset(0 50% 0 50%)",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0 0% 0 0%)",
      opacity: 1,
      transition: {
        clipPath: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { duration: 0.4 },
      },
    },
  };

  /* Simple fade-in for mobile / reduced-motion */
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  /* Stagger children after the clip reveal */
  const contentStagger = {
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5,
      },
    },
  };

  const childFade = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <SectionFullBleed
      background={<HeroBackground />}
      contentPosition="center"
      minHeight="min-h-[85vh]"
    >
      {/* Clip-reveal wrapper — desktop only; fade on mobile / reduced-motion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={
          prefersReducedMotion
            ? fadeVariants
            : {
                hidden: clipRevealVariants.hidden,
                visible: {
                  ...clipRevealVariants.visible,
                  transition: {
                    ...clipRevealVariants.visible.transition,
                    ...contentStagger.visible.transition,
                  },
                },
              }
        }
        /* Remove clip-path animation on mobile via responsive class override */
        className="flex flex-col items-center"
      >
        {/* Badge */}
        <motion.span
          variants={childFade}
          className="badge-label mb-6 inline-block"
          style={{ color: "var(--clr-accent)" }}
        >
          Premium Fencing &amp; Decks
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={childFade}
          className="type-hero mb-4 text-center"
          style={{
            color: "var(--clr-text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Your Backyard, Built to Last.
        </motion.h1>

        {/* Gold accent line */}
        <motion.div
          variants={childFade}
          className="gold-accent-line mx-auto mb-6 h-0.5 w-16 rounded-full"
          style={{ backgroundColor: "var(--clr-accent)" }}
          aria-hidden="true"
        />

        {/* Subheading */}
        <motion.p
          variants={childFade}
          className="type-body-lg mx-auto mb-10 max-w-2xl text-center"
          style={{ color: "var(--clr-text-secondary)" }}
        >
          Custom cedar fences, composite decks, and pergolas — handcrafted in
          Guelph with a 5-year structural warranty.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={childFade}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
        >
          <Link href="/contact" className="btn-profile">
            Get a Free Estimate
          </Link>
          <Link href="/services" className="btn-profile-ghost">
            View Our Work
          </Link>
        </motion.div>
      </motion.div>
    </SectionFullBleed>
  );
}
