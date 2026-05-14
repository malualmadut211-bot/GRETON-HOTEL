import React, { useEffect } from "react";
import { animate, onScroll, createTimeline } from 'animejs';
import { ChevronDown, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMAGE = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2560&auto=format&fit=crop";

export default function HeroSection() {
  useEffect(() => {
    // Only apply the long delay if the curtain animation hasn't been blocked/seen
    const hasSeenCurtain = sessionStorage.getItem('curtainAnimationSeen');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isFirstTime = !hasSeenCurtain && !reducedMotion;
    const dFactor = isMobile ? 0.75 : 1;
    const delayBase = isFirstTime ? 2500 * dFactor : 0;

    // Initial image blur and zoom out effect
    animate('.hero-image-wrap', {
      filter: ['blur(10px)', 'blur(0px)'],
      scale: isFirstTime ? [1.1, 1] : 1,
      duration: 1500,
      ease: 'outQuad',
      delay: isFirstTime ? delayBase : 0,
    });

    animate('.hero-stars', {
      opacity: [0, 1],
      y: [20, 0],
      duration: 800,
      delay: delayBase,
      ease: 'outBack(1.5)',
    });

    // a) Headline scramble text on load (with delay)
    animate('.hero-title', {
      scrambleText: {
        text: 'Where Luxury Meets Comfort',
        chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        duration: 2000,
      },
      opacity: [0, 1],
      y: [40, 0],
      delay: delayBase + 300,
    });

    // b) Subtitle + CTA button fade up on load
    createTimeline()
      .add('.hero-subtitle', { opacity: [0, 1], y: [30, 0], duration: 800 }, delayBase + 500)
      .add('.hero-cta', { opacity: [0, 1], y: [20, 0], duration: 600 }, '-=400');

    // c) Hero image slow Ken Burns zoom (scroll-synced parallax)
    animate('.hero-image', {
      scale: [1, 1.08],
      autoplay: onScroll({ sync: true }),
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
      <div className="hero-image-wrap absolute inset-0 w-full h-[120%] -top-[10%] z-0" style={{ filter: 'blur(10px)', scale: 1.1 }}>
        <img
          src={HERO_IMAGE}
          className="hero-image absolute inset-0 w-full h-full object-cover origin-center"
          alt="Hero"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center mt-20">
        <div className="hero-stars opacity-0 flex justify-center gap-1 mb-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
           {[...Array(5)].map((_, i) => (
             <div key={i}>
               <Star className="fill-gold text-gold" size={32} />
             </div>
           ))}
        </div>

        <h1 className="hero-title opacity-0 text-[clamp(2.5rem,6vw,5rem)] font-serif font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] leading-tight mb-4 tracking-tight">
          Where Nairobi's Heart<br />Meets Hospitality
        </h1>

        <p className="hero-subtitle opacity-0 text-[clamp(1rem,2.5vw,1.5rem)] font-light text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] tracking-wide mb-12">
          Experience luxury in the pulse of Kenya's capital
        </p>

        <div className="hero-cta opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div>
            <Link to="/contact" className="relative group inline-flex items-center justify-center w-[200px] h-[60px] bg-gradient-to-r from-[#D4AF37] to-[#F4E5B5] rounded-[30px] font-semibold text-[18px] text-[#1A1A1A] tracking-wider shadow-[0_8px_24px_rgba(212,175,55,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6),0_12px_32px_rgba(212,175,55,0.5)] transition-all duration-300">
              <span className="relative z-10 font-sans">Book Your Stay</span>
            </Link>
          </div>

          <div>
            <Link to="/rooms" className="relative group flex items-center justify-center w-[180px] h-[60px] border-2 border-white/60 rounded-[30px] font-medium text-[16px] text-white tracking-wider hover:text-[#D4AF37] transition-all duration-300 overflow-hidden">
              <span className="relative z-10 font-sans">Explore Rooms</span>
              <div className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#D4AF37] via-[#F4E5B5] to-[#D4AF37] [mask-image:linear-gradient(#fff_0_0)] [mask-composite:exclude]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/70 text-sm tracking-[0.1em] font-sans">Scroll to explore</span>
        <div className="animate-bounce">
          <ChevronDown className="text-white/80" size={24} />
        </div>
      </div>
    </section>
  );
}

