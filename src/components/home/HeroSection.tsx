import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ChevronDown, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // a) Headline fade in and slightly up
      gsap.from(".hero-title", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });

      // b) Subtitle + CTA button fade up on load
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(".hero-subtitle", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out" 
      })
      .to(".hero-cta", { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      }, "-=0.6");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-transparent relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center mt-20">
        <div className="flex justify-center gap-1 mb-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
           {[...Array(5)].map((_, i) => (
             <div key={i}>
               <Star className="fill-gold text-gold" size={32} />
             </div>
           ))}
        </div>

        <h1 className="hero-title text-[clamp(2.5rem,6vw,5rem)] font-serif font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] leading-tight mb-4 tracking-tight">
          Where Nairobi's Heart<br />Meets Hospitality
        </h1>

        <p className="hero-subtitle opacity-0 text-[clamp(1rem,2.5vw,1.5rem)] font-light text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] tracking-wide mb-12">
          Experience luxury in the pulse of Kenya's capital
        </p>

        <div className="hero-cta opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div>
            <Link to="/contact" className="relative group inline-flex items-center justify-center w-[200px] h-[60px] bg-gradient-to-r from-[#D4AF37] to-[#F4E5B5] rounded-[30px] font-semibold text-[18px] text-white tracking-wider shadow-[0_8px_24px_rgba(212,175,55,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6),0_12px_32px_rgba(212,175,55,0.5)] transition-all duration-300">
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

