import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BookingBar from '../components/home/BookingBar';
import WelcomeSection from '../components/home/WelcomeSection';
import AmenitiesSection from '../components/home/AmenitiesSection';
import RoomsCarousel from '../components/home/RoomsCarousel';
import StatsLocation from '../components/home/StatsLocation';
import ReviewsSocialCTA from '../components/home/ReviewsSocialCTA';

const HOME_BG = "https://raw.githubusercontent.com/malualmadut211-bot/ai-studio-media/11a77858f8206ead3a9e5d402f53024af0663a4c/pexels-larry-penaloza-311813562-13549224.jpg";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <div className="fixed inset-0 w-full h-full -z-10">
        <img src={HOME_BG} className="w-full h-full object-cover" alt="Hotel Background" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

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
