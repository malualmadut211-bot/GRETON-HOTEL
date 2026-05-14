import React from "react";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ReservationSystem } from "@/components/contact/ReservationSystem";
import { InteractiveMap } from "@/components/contact/InteractiveMap";
import { FaqAccordion } from "@/components/contact/FaqAccordion";
import { LiveChat } from "@/components/contact/LiveChat";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { OfficeHours } from "@/components/contact/OfficeHours";
import { NewsletterSignup } from "@/components/contact/NewsletterSignup";

export default function Contact() {
  return (
    <div className="bg-transparent min-h-screen font-sans selection:bg-gold/30 selection:text-white">
      {/* 1. Hero Section */}
      <ContactHero />

      {/* 2. Contact Information Cards */}
      <ContactCards />

      {/* 3. Global Reservation System (Form + Summary side-by-side) */}
      <ReservationSystem />

      {/* 4. Interactive Location Map */}
      <InteractiveMap />

      {/* 5. Smart Office Hours / Response Times */}
      <OfficeHours />

      {/* 6. Advanced FAQ Accordion */}
      <FaqAccordion />

      {/* 7. Social Integrations */}
      <SocialLinks />

      {/* 8. Newsletter Capture */}
      <NewsletterSignup />

      {/* 9. Floating Action Live Chat */}
      <LiveChat />
    </div>
  );
}
