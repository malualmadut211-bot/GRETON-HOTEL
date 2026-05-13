import React from "react";
import { DiningHero } from "@/components/dining/DiningHero";
import { DiningIntro } from "@/components/dining/DiningIntro";
import { MenuShowcase } from "@/components/dining/MenuShowcase";
import { SignatureDishes } from "@/components/dining/SignatureDishes";
import { DiningExperience } from "@/components/dining/DiningExperience";
import { BeverageMenu } from "@/components/dining/BeverageMenu";
import { ReservationForm } from "@/components/dining/ReservationForm";
import { CustomerReviews } from "@/components/dining/CustomerReviews";

export default function Dining() {
  return (
    <div className="bg-[#FCFBF8] min-h-screen font-sans overflow-x-hidden">
      <DiningHero />
      <DiningIntro />
      <MenuShowcase />
      <SignatureDishes />
      <DiningExperience />
      <BeverageMenu />
      <ReservationForm />
      <CustomerReviews />
    </div>
  );
}
