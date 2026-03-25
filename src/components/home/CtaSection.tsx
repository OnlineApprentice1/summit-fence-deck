import SectionFullBleed from "@/components/layouts/SectionFullBleed";

export default function CtaSection() {
  return (
    <SectionFullBleed
      contentPosition="center"
      minHeight="min-h-0"
      background={
        <div className="absolute inset-0">
          {/* Base gradient from surface-1 to surface-2 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--clr-surface-1), var(--clr-surface-2))",
            }}
          />
          {/* Subtle radial glow */}
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
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="gold-accent-line mb-8" />

        <h2 className="type-section mb-6">Ready to Transform Your Backyard?</h2>

        <p
          className="type-body-lg mb-10"
          style={{ color: "var(--clr-text-secondary)" }}
        >
          From cedar fences to custom composite decks — get a free estimate and
          see why Guelph homeowners trust Summit.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="tel:5195550147" className="btn-profile">
            Call (519) 555-0147
          </a>
          <a href="mailto:hello@summitfencedeck.ca" className="btn-profile-ghost">
            Send a Message
          </a>
        </div>

        <div className="gold-accent-line mt-8" />
      </div>
    </SectionFullBleed>
  );
}
