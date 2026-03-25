import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free estimate for your fence or deck project in Guelph, Ontario. Call, email, or fill out our form — we respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactContent />;
}
