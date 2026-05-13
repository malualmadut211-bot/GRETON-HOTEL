import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function DiningHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers based on scrollY directly for smoother feel
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]); // 0.3x speed
  const textY = useTransform(scrollY, [0, 1000], [0, 400]); // moves a bit relative

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden bg-black flex items-center justify-center">
      {/* Background with Parallax + Ken Burns */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <motion.div 
          className="absolute inset-0 w-full h-full origin-[60%_40%]"
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{ scale: 1.15, x: "-3%", y: "2%" }}
          transition={{ duration: 60, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1544025162-811114210dcc?q=80&w=2560" 
            alt="Signature Dish" 
            className="w-full h-full object-cover opacity-90 blur-[2px]"
          />
        </motion.div>
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 mix-blend-overlay pointer-events-none" />

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity: useTransform(scrollYProgress, [0, 0.8], [1, 0]) }}
        className="relative z-20 text-center px-6 flex flex-col items-center mt-20"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.5rem,8vw,7rem)] font-serif font-bold text-white tracking-[-0.02em] leading-[1.1] mb-4 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-gold transition-all duration-700"
        >
          Culinary Excellence
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-[clamp(1.2rem,2.5vw,1.8rem)] font-sans font-light tracking-[0.15em] text-white/90 drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] mb-10"
        >
          Where flavor meets atmosphere
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-5">
          <motion.button 
            initial={{ opacity: 0, y: 80, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="w-[200px] h-[60px] bg-transparent border-2 border-gold text-white uppercase text-[16px] tracking-[0.1em] relative overflow-hidden group hover:-translate-y-[3px] transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.5)] hover:tracking-[0.15em]"
          >
            <span className="relative z-10 group-hover:text-[#2C1810] transition-colors duration-400">View Our Menu</span>
            <div className="absolute inset-0 bg-gold scale-0 group-hover:scale-[3] rounded-full transition-transform duration-700 origin-center" />
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="w-[200px] h-[60px] bg-gold text-[#1a1a1a] uppercase text-[16px] font-bold shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:brightness-115 hover:scale-105 transition-all duration-400 animate-[pulseGold_2s_infinite] relative overflow-hidden group"
          >
            <span className="relative z-10">Make a Reservation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:animate-[shine_2s_ease-in-out_infinite]" />
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/70" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
