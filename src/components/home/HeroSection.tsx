import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMAGE = "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2560&auto=format&fit=crop";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-charcoal">
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <motion.img
          src={HERO_IMAGE}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          transition={{ opacity: { duration: 1.5 }, scale: { duration: 6, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover origin-center"
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center mt-20">
        <motion.div
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 1.4, duration: 0.4 }}
           className="flex justify-center gap-1 mb-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
        >
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               initial={{ clipPath: "inset(0 100% 0 0)" }}
               animate={{ clipPath: "inset(0 0% 0 0)" }}
               transition={{ delay: 1.8 + i * 0.24, duration: 0.3 }}
             >
               <Star className="fill-gold text-gold" size={32} />
             </motion.div>
           ))}
        </motion.div>

        <motion.h1 
          className="text-[clamp(2.5rem,6vw,5rem)] font-serif font-semibold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] leading-tight mb-4 tracking-tight"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Where Nairobi's Heart<br />Meets Hospitality
        </motion.h1>

        <motion.p 
          className="text-[clamp(1rem,2.5vw,1.5rem)] font-light text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] tracking-wide mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
        >
          Experience luxury in the pulse of Kenya's capital
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Link to="/contact" className="relative group inline-flex items-center justify-center w-[200px] h-[60px] bg-gradient-to-r from-[#D4AF37] to-[#F4E5B5] rounded-[30px] font-semibold text-[18px] text-[#1A1A1A] tracking-wider shadow-[0_8px_24px_rgba(212,175,55,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6),0_12px_32px_rgba(212,175,55,0.5)] transition-all duration-300">
              <span className="relative z-10 font-sans">Book Your Stay</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Link to="/rooms" className="relative group flex items-center justify-center w-[180px] h-[60px] border-2 border-white/60 rounded-[30px] font-medium text-[16px] text-white tracking-wider hover:text-[#D4AF37] transition-all duration-300 overflow-hidden">
              <span className="relative z-10 font-sans">Explore Rooms</span>
              <div className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#D4AF37] via-[#F4E5B5] to-[#D4AF37] [mask-image:linear-gradient(#fff_0_0)] [mask-composite:exclude]" />
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/70 text-sm tracking-[0.1em] font-sans">Scroll to explore</span>
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="text-white/80" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
