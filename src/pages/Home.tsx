import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BookingBar from '../components/home/BookingBar';
import WelcomeSection from '../components/home/WelcomeSection';
import AmenitiesSection from '../components/home/AmenitiesSection';
import RoomsCarousel from '../components/home/RoomsCarousel';
import StatsLocation from '../components/home/StatsLocation';
import ReviewsSocialCTA from '../components/home/ReviewsSocialCTA';

export default function Home() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <HeroSection />
      <BookingBar />
      <WelcomeSection />
      <AmenitiesSection />
      <RoomsCarousel />
      <StatsLocation />
      <ReviewsSocialCTA />
    </main>
  );
}
