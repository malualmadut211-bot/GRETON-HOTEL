import React from "react";
import { DiningHero } from "@/components/dining/DiningHero";
import { DiningIntro } from "@/components/dining/DiningIntro";
import { MenuShowcase } from "@/components/dining/MenuShowcase";
import CulinaryHighlights from "@/components/dining/CulinaryHighlights";
import { DiningExperience } from "@/components/dining/DiningExperience";
import { BeverageMenu } from "@/components/dining/BeverageMenu";
import { ReservationForm } from "@/components/dining/ReservationForm";
import { CustomerReviews } from "@/components/dining/CustomerReviews";

export default function Dining() {
  return (
    <div className="bg-transparent min-h-screen font-sans overflow-x-hidden">
      <DiningHero />
      <DiningIntro />
      <MenuShowcase />
      <CulinaryHighlights />
      <DiningExperience />
      <BeverageMenu />
      <ReservationForm />
      <CustomerReviews />
    </div>
  );
}
