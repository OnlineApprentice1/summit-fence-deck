import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description: `Custom cedar fencing, composite decks, aluminum fencing, pergolas, and gates in ${siteConfig.location.city}, ${siteConfig.location.province}. 5-year structural warranty on every project.`,
};

export default function ServicesPage() {
  return <ServicesContent />;
}
