export interface Service {
  name: string;
  slug: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  owner: string;
  phone: string;
  email: string;
  location: {
    city: string;
    province: string;
    serviceArea: string;
    mapEmbedUrl: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  services: Service[];
}

export const siteConfig: SiteConfig = {
  name: "Summit Fence & Deck Co.",
  tagline: "Your Backyard, Built to Last.",
  description: "Custom fencing and decks in Guelph, Ontario. Cedar fences, composite decks, pergolas, and gates — backed by a 5-year structural warranty.",
  url: "https://summitfencedeck.ca",
  owner: "Marcus Chen",
  phone: "(519) 555-0147",
  email: "hello@summitfencedeck.ca",
  location: {
    city: "Guelph",
    province: "Ontario",
    serviceArea: "Guelph, Kitchener, Waterloo, Cambridge, and surrounding Wellington County",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46193.123456789!2d-80.2483!3d43.5448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b9acbbbbbbbb%3A0xaaaaaaaaaaaaaa!2sGuelph%2C%20ON!5e0!3m2!1sen!2sca!4v1234567890",
  },
  social: {
    instagram: "#",
    facebook: "#",
  },
  services: [
    {
      name: "Cedar Fencing",
      slug: "cedar-fencing",
      description: "Western Red Cedar privacy and semi-privacy fences, custom heights and styles.",
    },
    {
      name: "Composite Decks",
      slug: "composite-decks",
      description: "Low-maintenance composite decking (TimberTech, Trex), multi-level designs.",
    },
    {
      name: "Aluminum & Ornamental Fencing",
      slug: "aluminum-fencing",
      description: "Powder-coated aluminum for pool enclosures and decorative boundaries.",
    },
    {
      name: "Pergolas & Shade Structures",
      slug: "pergolas",
      description: "Cedar and aluminum pergolas, louvred roofs, privacy walls.",
    },
    {
      name: "Gates & Access",
      slug: "gates",
      description: "Custom driveway gates, garden gates, automated gate systems.",
    },
  ],
} as const;
