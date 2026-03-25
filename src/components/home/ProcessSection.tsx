"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ClipboardCheck, PencilRuler, Hammer, Sun } from "lucide-react";
import SectionZigzag from "@/components/layouts/SectionZigzag";

const steps = [
  {
    number: "01",
    title: "Consult",
    description:
      "We visit your property, discuss your vision, and take measurements. You\u2019ll get a detailed quote within 48 hours.",
    Icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Design",
    description:
      "Our team creates a 3D preview of your project. Adjust materials, heights, and layouts before a single post goes in the ground.",
    Icon: PencilRuler,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Our crew handles everything \u2014 permits, materials, construction. Marcus is on-site daily to ensure every detail is right.",
    Icon: Hammer,
  },
  {
    number: "04",
    title: "Enjoy",
    description:
      "Walk out your back door to a backyard that\u2019s truly yours. Backed by our 5-year structural warranty.",
    Icon: Sun,
  },
];

function StepNumber({ number, index }: { number: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut" as const,
      }}
      className="flex items-center justify-center"
    >
      <span
        className="type-card font-bold leading-none"
        style={{
          fontSize: "clamp(4rem, 8vw, 7rem)",
          color: "var(--clr-accent)",
        }}
      >
        {number}
      </span>
    </motion.div>
  );
}

function StepContent({
  title,
  description,
  Icon,
  index,
}: {
  title: string;
  description: string;
  Icon: typeof ClipboardCheck;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.5,
        delay: index * 0.08 + 0.1,
        ease: "easeOut" as const,
      }}
      className="card-standard flex flex-col gap-4 p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <Icon
          className="size-6 shrink-0"
          style={{ color: "var(--clr-accent)" }}
          strokeWidth={1.75}
        />
        <h3 className="type-card">{title}</h3>
      </div>
      <p className="type-body" style={{ color: "var(--clr-text-muted)" }}>
        {description}
      </p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const zigzagItems = steps.map((step, i) => ({
    visual: <StepNumber number={step.number} index={i} />,
    content: (
      <StepContent
        title={step.title}
        description={step.description}
        Icon={step.Icon}
        index={i}
      />
    ),
  }));

  return (
    <div className="section-bg-gradient">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 lg:pt-24">
        <motion.div
          ref={headerRef}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="text-left max-w-2xl"
        >
          <span className="badge-label">How It Works</span>
          <h2 className="type-section mt-4">
            Four Steps to Your Dream Backyard
          </h2>
        </motion.div>
      </div>

      <SectionZigzag items={zigzagItems} gap="standard" />
    </div>
  );
}
