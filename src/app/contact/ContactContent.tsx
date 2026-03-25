"use client";

import { useState, type FormEvent } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import SectionFullBleed from "@/components/layouts/SectionFullBleed";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/config/site";

/* ------------------------------------------------------------------ */
/*  Service options for the dropdown                                    */
/* ------------------------------------------------------------------ */

const serviceOptions = [
  "Cedar Fencing",
  "Composite Decks",
  "Aluminum & Ornamental Fencing",
  "Pergolas & Shade Structures",
  "Gates & Access",
  "Other / Not Sure",
];

/* ------------------------------------------------------------------ */
/*  Hero Background                                                     */
/* ------------------------------------------------------------------ */

function HeroBg() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "var(--clr-surface-1)" }}
      />
      {/* Spotlight from above */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--clr-primary) 0%, transparent 65%)",
          opacity: 0.12,
        }}
      />
      {/* Subtle side curtain panels */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--clr-primary-muted) 0%, transparent 30%)",
          opacity: 0.08,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, var(--clr-primary-muted) 0%, transparent 30%)",
          opacity: 0.08,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar Info Card                                                   */
/* ------------------------------------------------------------------ */

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

function InfoCard({ icon, title, children, delay = 0 }: InfoCardProps) {
  return (
    <Reveal animation="fade-up" delay={delay}>
      <div className="card-compact stage-lit-card flex items-start gap-4 py-4">
        <div
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center"
          style={{
            backgroundColor: "color-mix(in oklch, var(--clr-primary) 12%, transparent)",
            border: "1px solid color-mix(in oklch, var(--clr-primary) 25%, transparent)",
          }}
        >
          {icon}
        </div>
        <div>
          <h3
            className="type-card mb-1"
            style={{ color: "var(--clr-text-primary)" }}
          >
            {title}
          </h3>
          <div
            className="type-small"
            style={{ color: "var(--clr-text-secondary)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Form                                                        */
/* ------------------------------------------------------------------ */

function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send your message. Please call us directly.");
    }
  }

  /* Shared input styles */
  const inputClasses =
    "type-body w-full px-4 py-3 outline-none transition-colors focus:outline-none";
  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--clr-surface-3)",
    color: "var(--clr-text-primary)",
    border: "1px solid var(--clr-surface-4)",
    borderRadius: 0,
  };
  const focusClass = "focus:border-[var(--clr-accent)]";

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Reveal animation="fade-up" delay={0.1}>
      <div className="card-standard">
        <h2
          className="type-card mb-6"
          style={{ color: "var(--clr-text-primary)" }}
        >
          Tell Us About Your Project
        </h2>

        {status === "success" ? (
          <motion.div
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="py-8 text-center"
          >
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center"
              style={{
                backgroundColor: "color-mix(in oklch, var(--clr-accent) 15%, transparent)",
                border: "2px solid var(--clr-accent)",
              }}
            >
              <Send
                className="h-6 w-6"
                style={{ color: "var(--clr-accent)" }}
              />
            </div>
            <h3
              className="type-card mb-2"
              style={{ color: "var(--clr-accent)" }}
            >
              Message Sent
            </h3>
            <p
              className="type-body"
              style={{ color: "var(--clr-text-secondary)" }}
            >
              We&apos;ll get back to you within 24 hours with an estimate.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="type-small mb-1.5 block"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                Name <span style={{ color: "var(--clr-primary)" }}>*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className={`${inputClasses} ${focusClass}`}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="type-small mb-1.5 block"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                Email <span style={{ color: "var(--clr-primary)" }}>*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={`${inputClasses} ${focusClass}`}
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="contact-phone"
                className="type-small mb-1.5 block"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="(519) 555-0000"
                className={`${inputClasses} ${focusClass}`}
                style={inputStyle}
              />
            </div>

            {/* Service of Interest */}
            <div>
              <label
                htmlFor="contact-service"
                className="type-small mb-1.5 block"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                Service of Interest
              </label>
              <select
                id="contact-service"
                name="service"
                className={`${inputClasses} ${focusClass} cursor-pointer`}
                style={inputStyle}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service...
                </option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="contact-message"
                className="type-small mb-1.5 block"
                style={{ color: "var(--clr-text-secondary)" }}
              >
                Project Description{" "}
                <span style={{ color: "var(--clr-primary)" }}>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Describe your project — type of fence or deck, approximate size, timeline, and anything else we should know."
                className={`${inputClasses} ${focusClass} resize-y`}
                style={inputStyle}
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p
                className="type-small"
                style={{ color: "var(--clr-primary)" }}
              >
                {errorMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-profile inline-flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {status === "sending" ? "Sending..." : "Send Your Project Details"}
            </button>
          </form>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Contact Content                                                */
/* ------------------------------------------------------------------ */

export default function ContactContent() {
  const prefersReducedMotion = useReducedMotion();

  const heroFade = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <>
      {/* ── Hero Banner ── */}
      <SectionFullBleed
        background={<HeroBg />}
        contentPosition="center"
        minHeight="min-h-[40vh]"
        className="pt-24"
      >
        <motion.div
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate="visible"
          variants={prefersReducedMotion ? undefined : stagger}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={childFade}
            className="badge-label mb-5"
            style={{ color: "var(--clr-accent)" }}
          >
            Get in Touch
          </motion.span>

          <motion.h1
            variants={childFade}
            className="type-section mb-4 text-center"
            style={{ color: "var(--clr-text-primary)" }}
          >
            Let&apos;s Build Something Great
          </motion.h1>

          <motion.div
            variants={childFade}
            className="gold-accent-line mx-auto mb-5 h-0.5 w-16"
            style={{ backgroundColor: "var(--clr-accent)" }}
            aria-hidden="true"
          />

          <motion.p
            variants={childFade}
            className="type-body-lg mx-auto max-w-2xl text-center"
            style={{ color: "var(--clr-text-secondary)" }}
          >
            Tell us about your project and we&apos;ll get back to you within 24
            hours with a detailed estimate.
          </motion.p>
        </motion.div>
      </SectionFullBleed>

      {/* ── Main Content: Form + Sidebar ── */}
      <section
        className="section-standard"
        style={{ backgroundColor: "var(--clr-surface-1)" }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Left column — Form (~60%) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Right column — Sidebar (~40%) */}
            <div className="lg:col-span-2">
              {/* Info Cards */}
              <div className="space-y-2">
                <InfoCard
                  icon={
                    <Phone
                      className="h-5 w-5"
                      style={{ color: "var(--clr-primary)" }}
                    />
                  }
                  title="Phone"
                  delay={0.15}
                >
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:opacity-80"
                    style={{ color: "var(--clr-text-secondary)" }}
                  >
                    {siteConfig.phone}
                  </a>
                </InfoCard>

                <InfoCard
                  icon={
                    <Mail
                      className="h-5 w-5"
                      style={{ color: "var(--clr-primary)" }}
                    />
                  }
                  title="Email"
                  delay={0.2}
                >
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:opacity-80"
                    style={{ color: "var(--clr-text-secondary)" }}
                  >
                    {siteConfig.email}
                  </a>
                </InfoCard>

                <InfoCard
                  icon={
                    <MapPin
                      className="h-5 w-5"
                      style={{ color: "var(--clr-primary)" }}
                    />
                  }
                  title="Location"
                  delay={0.25}
                >
                  <p>{siteConfig.location.city}, {siteConfig.location.province}</p>
                  <p
                    className="type-caption mt-1"
                    style={{ color: "var(--clr-text-muted)" }}
                  >
                    Serving {siteConfig.location.serviceArea}
                  </p>
                </InfoCard>

                <InfoCard
                  icon={
                    <Clock
                      className="h-5 w-5"
                      style={{ color: "var(--clr-primary)" }}
                    />
                  }
                  title="Hours"
                  delay={0.3}
                >
                  <p>Mon&ndash;Fri: 7am&ndash;6pm</p>
                  <p>Sat: 8am&ndash;2pm</p>
                  <p>Sun: Closed</p>
                </InfoCard>
              </div>

              {/* Google Maps Embed */}
              <Reveal animation="fade-up" delay={0.35}>
                <div className="mt-8">
                  <iframe
                    src={siteConfig.location.mapEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Summit Fence &amp; Deck Co. location in Guelph, Ontario"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
