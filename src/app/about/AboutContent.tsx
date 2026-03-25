"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Hammer, Eye, Shield, Users, ArrowRight } from "lucide-react";
import SectionFullBleed from "@/components/layouts/SectionFullBleed";
import SectionEditorial from "@/components/layouts/SectionEditorial";
import SectionStatsBar from "@/components/layouts/SectionStatsBar";
import WaveDivider from "@/components/effects/WaveDivider";
import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Hero Background — dark image overlay + spotlight gradient          */
/* ------------------------------------------------------------------ */

function HeroBackground() {
  return (
    <div className="absolute inset-0">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&h=600&fit=crop&q=80"
        alt="Carpenter working on a custom outdoor structure"
        className="absolute inset-0 h-full w-full object-cover"
        fill
        sizes="100vw"
        priority
      />
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, var(--clr-surface-1) 75%, transparent) 0%, color-mix(in oklch, var(--clr-surface-1) 60%, transparent) 50%, color-mix(in oklch, var(--clr-surface-1) 85%, transparent) 100%)",
        }}
      />
      {/* Spotlight gradient from above */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--clr-primary) 0%, transparent 65%)",
          opacity: 0.18,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Values Card                                                        */
/* ------------------------------------------------------------------ */

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function ValueCard({ icon, title, description, delay = 0 }: ValueCardProps) {
  return (
    <Reveal animation="fade-up" delay={delay}>
      <div className="card-standard h-full p-6 md:p-8">
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
          style={{
            backgroundColor: "var(--clr-accent-muted)",
          }}
        >
          <span style={{ color: "var(--clr-accent)" }}>{icon}</span>
        </div>
        <h3 className="type-card mb-2">{title}</h3>
        <p className="type-body" style={{ color: "var(--clr-text-secondary)" }}>
          {description}
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Item                                                          */
/* ------------------------------------------------------------------ */

interface StatItemProps {
  value: string;
  label: string;
  badge?: boolean;
}

function StatItem({ value, label, badge = false }: StatItemProps) {
  return (
    <div className="text-center">
      <p
        className="type-section mb-1"
        style={{ color: "var(--clr-accent)" }}
      >
        {value}
      </p>
      <p className="type-small" style={{ color: "var(--clr-text-muted)" }}>
        {label}
      </p>
      {badge && (
        <span className="stamp-badge mt-2 inline-block">Guaranteed</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Content                                                 */
/* ------------------------------------------------------------------ */

export default function AboutContent() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <SectionFullBleed
        background={<HeroBackground />}
        contentPosition="left"
        minHeight="min-h-[60vh]"
        className="spotlight-section pt-24"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={prefersReducedMotion ? { visible: {} } : stagger}
          className="max-w-2xl py-12 md:py-16"
        >
          <motion.span
            variants={prefersReducedMotion ? {} : fadeUp}
            className="badge-label mb-6 inline-block"
            style={{ color: "var(--clr-accent)" }}
          >
            About Us
          </motion.span>

          <motion.h1
            variants={prefersReducedMotion ? {} : fadeUp}
            className="type-section mb-6"
            style={{ color: "var(--clr-text-primary)" }}
          >
            Built by Hand. Backed by Our Word.
          </motion.h1>

          <motion.div
            variants={prefersReducedMotion ? {} : fadeUp}
            className="gold-accent-line mb-6 h-0.5 w-16 rounded-full"
            style={{ backgroundColor: "var(--clr-accent)" }}
            aria-hidden="true"
          />

          <motion.p
            variants={prefersReducedMotion ? {} : fadeUp}
            className="type-body-lg"
            style={{ color: "var(--clr-text-secondary)" }}
          >
            Marcus Chen founded Summit Fence &amp; Deck Co. in Guelph with one
            promise: every project gets the same attention to detail he&rsquo;d
            put into his own backyard. That promise hasn&rsquo;t changed.
          </motion.p>
        </motion.div>
      </SectionFullBleed>

      <WaveDivider color="var(--clr-surface-2)" variant="sharp" />

      {/* ============================================================ */}
      {/* 2. ORIGIN STORY                                              */}
      {/* ============================================================ */}
      <SectionEditorial align="left" className="section-bg-gradient">
        <Reveal animation="fade-up">
          <h2
            className="type-section mb-4"
            style={{ color: "var(--clr-text-primary)" }}
          >
            From Side Project to Summit
          </h2>
        </Reveal>

        <Reveal animation="fade-up" delay={0.1}>
          <div
            className="gold-accent-line mb-8 h-0.5 w-16 rounded-full"
            style={{ backgroundColor: "var(--clr-accent)" }}
            aria-hidden="true"
          />
        </Reveal>

        <Reveal animation="fade-up" delay={0.15}>
          <p style={{ color: "var(--clr-text-secondary)" }}>
            It started with a neighbour&rsquo;s fence. Back in 2018, Marcus was
            a trained carpenter picking up side work on weekends — building
            privacy fences and patching decks around Guelph. Word spread fast.
            One project turned into five, five turned into a full schedule, and
            Summit Fence &amp; Deck Co. was born.
          </p>
        </Reveal>

        <Reveal animation="fade-up" delay={0.2}>
          <p style={{ color: "var(--clr-text-secondary)" }}>
            What hasn&rsquo;t changed is how we work. Every fence post gets
            set by hand. Every deck board gets checked for straightness before
            it&rsquo;s fastened. We don&rsquo;t cut corners because the
            shortcuts that save an afternoon cost homeowners thousands down the
            road — and that&rsquo;s not a business we want to run.
          </p>
        </Reveal>

        <Reveal animation="fade-up" delay={0.25}>
          <p style={{ color: "var(--clr-text-secondary)" }}>
            Today, Summit serves families across Wellington County — from
            downtown Guelph to Kitchener, Waterloo, and Cambridge. We source our
            Western Red Cedar from Ontario mills, hire local tradespeople, and
            reinvest in the communities we build in. When you choose Summit,
            you&rsquo;re choosing a team that lives where you live.
          </p>
        </Reveal>
      </SectionEditorial>

      <WaveDivider color="var(--clr-surface-1)" variant="sharp" flip />

      {/* ============================================================ */}
      {/* 3. VALUES GRID                                               */}
      {/* ============================================================ */}
      <section className="section-bg-deep py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal animation="fade-up">
            <div className="mb-12 text-center">
              <h2
                className="type-section mb-4"
                style={{ color: "var(--clr-text-primary)" }}
              >
                What We Stand For
              </h2>
              <div
                className="gold-accent-line mx-auto h-0.5 w-16 rounded-full"
                style={{ backgroundColor: "var(--clr-accent)" }}
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            <ValueCard
              icon={<Hammer size={24} />}
              title="Craftsmanship"
              description="Every joint, every post, every board is set by hand. No shortcuts, no pneumatic nail guns on finish work — just clean, lasting carpentry."
              delay={0}
            />
            <ValueCard
              icon={<Eye size={24} />}
              title="Transparency"
              description="3D previews before we break ground. Itemized quotes with no hidden fees. No surprises on your invoice — ever."
              delay={0.1}
            />
            <ValueCard
              icon={<Shield size={24} />}
              title="Durability"
              description="5-year structural warranty on every build. We use materials rated for Ontario winters — because your fence shouldn't bow after one freeze-thaw cycle."
              delay={0.2}
            />
            <ValueCard
              icon={<Users size={24} />}
              title="Community"
              description="Locally sourced cedar from Ontario mills. We hire local, buy local, and build local — keeping dollars and jobs in Wellington County."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <WaveDivider color="var(--clr-surface-2)" variant="sharp" />

      {/* ============================================================ */}
      {/* 4. CREDENTIALS / STATS                                       */}
      {/* ============================================================ */}
      <SectionStatsBar columns={4} className="section-bg-gradient">
        <Reveal animation="fade-up" delay={0}>
          <StatItem value="8+" label="Years in Business" />
        </Reveal>
        <Reveal animation="fade-up" delay={0.1}>
          <StatItem value="500+" label="Projects Completed" />
        </Reveal>
        <Reveal animation="fade-up" delay={0.2}>
          <StatItem value="5-Year" label="Structural Warranty" badge />
        </Reveal>
        <Reveal animation="fade-up" delay={0.3}>
          <StatItem value="100%" label="Locally Sourced Cedar" />
        </Reveal>
      </SectionStatsBar>

      <WaveDivider color="var(--clr-surface-1)" variant="sharp" flip />

      {/* ============================================================ */}
      {/* 5. CTA                                                       */}
      {/* ============================================================ */}
      <SectionFullBleed
        contentPosition="center"
        minHeight="min-h-0"
        background={
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, var(--clr-surface-1), var(--clr-surface-2))",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, var(--clr-primary) 0%, transparent 70%)",
                opacity: 0.12,
              }}
            />
          </div>
        }
      >
        <div className="mx-auto max-w-3xl px-4 py-20 text-center md:py-24">
          <Reveal animation="fade-up">
            <div
              className="gold-accent-line mx-auto mb-8 h-0.5 w-16 rounded-full"
              style={{ backgroundColor: "var(--clr-accent)" }}
              aria-hidden="true"
            />
          </Reveal>

          <Reveal animation="fade-up" delay={0.1}>
            <h2
              className="type-section mb-6"
              style={{ color: "var(--clr-text-primary)" }}
            >
              Ready to See What We Can Build for You?
            </h2>
          </Reveal>

          <Reveal animation="fade-up" delay={0.2}>
            <p
              className="type-body-lg mb-10"
              style={{ color: "var(--clr-text-secondary)" }}
            >
              From cedar privacy fences to multi-level composite decks — tell
              us about your project and we&rsquo;ll put together a free,
              no-obligation estimate.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={0.3}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="btn-profile">
                Get a Free Estimate
                <ArrowRight size={18} className="ml-2 inline-block" />
              </Link>
            </div>
          </Reveal>
        </div>
      </SectionFullBleed>
    </>
  );
}
