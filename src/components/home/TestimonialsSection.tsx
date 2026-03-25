"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star, Check } from "lucide-react";
import SectionStackedCards from "@/components/layouts/SectionStackedCards";

/* ------------------------------------------------------------------ */
/*  Testimonial data                                                   */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote:
      "The crew was on time every single morning. Our cedar fence looks incredible \u2014 the neighbours keep asking for Marcus\u2019s number.",
    author: "Sarah T.",
    neighbourhood: "Westminster Woods",
  },
  {
    quote:
      "We got three quotes. Summit was the only one who brought a 3D preview to the consultation. The deck turned out exactly like the render.",
    author: "Mike P.",
    neighbourhood: "Exhibition Park",
  },
  {
    quote:
      "Our pool fence passed city inspection on the first try. That never happens. Really impressed with the aluminum work.",
    author: "Rachel K.",
    neighbourhood: "Kortright Hills",
  },
  {
    quote:
      "Best decision we made was the pergola. We practically live on our deck now from May to October.",
    author: "James L.",
    neighbourhood: "Old University",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

function getRotateInVariants(index: number) {
  /* Wave stagger: sinusoidal delay */
  const delay = index * 0.1 + Math.sin(index) * 0.05;

  return {
    hidden: { rotate: -3, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

/* ------------------------------------------------------------------ */
/*  StarRating                                                         */
/* ------------------------------------------------------------------ */

function StarRating() {
  return (
    <div className="flex gap-1" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill="currentColor"
          style={{ color: "var(--clr-accent)" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TestimonialCard                                                    */
/* ------------------------------------------------------------------ */

interface TestimonialCardProps {
  quote: string;
  author: string;
  neighbourhood: string;
  index: number;
}

function TestimonialCard({
  quote,
  author,
  neighbourhood,
  index,
}: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? reducedMotionVariants
    : getRotateInVariants(index);

  /* Slight rotation offset: odd cards rotate(-1deg), even cards rotate(1deg) */
  const rotationOffset = index % 2 === 0 ? "1deg" : "-1deg";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="card-standard flex flex-col gap-4"
      style={{
        transform: `rotate(${rotationOffset})`,
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Star rating */}
      <StarRating />

      {/* Quote */}
      <blockquote>
        <p
          className="type-body italic"
          style={{ color: "var(--clr-text-secondary)" }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Author + neighbourhood */}
      <p className="type-small" style={{ color: "var(--clr-text-muted)" }}>
        {author}, {neighbourhood}
      </p>

      {/* Verified badge */}
      <span className="stamp-badge inline-flex items-center gap-1.5 self-start">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Verified Review
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  TestimonialsSection                                                */
/* ------------------------------------------------------------------ */

export default function TestimonialsSection() {
  return (
    <SectionStackedCards className="section-bg-deep">
      {/* Single child wrapping the full section content */}
      <div>
        {/* Header — centred */}
        <div className="mb-12">
          <span
            className="badge-label mb-3 inline-block"
            style={{ color: "var(--clr-accent)" }}
          >
            What Homeowners Say
          </span>
          <h2
            className="type-section"
            style={{ color: "var(--clr-text-primary)" }}
          >
            Trusted Across Wellington County
          </h2>
        </div>

        {/* Card grid — 2-column desktop, 2-column tablet, 1-column mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard
              key={index}
              quote={t.quote}
              author={t.author}
              neighbourhood={t.neighbourhood}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionStackedCards>
  );
}
