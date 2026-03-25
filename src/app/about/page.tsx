import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Summit Fence & Deck Co. — Guelph's trusted fence and deck builders since 2018. Craftsmanship, transparency, and a 5-year structural warranty.",
};

export default function AboutPage() {
  return <AboutContent />;
}
