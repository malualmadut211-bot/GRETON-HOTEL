import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // Standard scroll
  const yIcons = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative h-[60vh] min-h-[500px] overflow-hidden bg-black flex items-center justify-center">
      {/* Background */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 origin-top"
      >
        <img 
          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2560" 
          alt="Hotel Reception" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: yContent, opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
        className="relative z-10 text-center px-6 mt-16"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-serif text-[clamp(3rem,6vw,72px)] text-white tracking-tight leading-none mb-4"
        >
          Get in Touch
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-sans text-[clamp(1.1rem,2vw,24px)] font-light text-white/80 leading-[1.6]"
        >
          We're here to make your stay perfect
        </motion.p>
      </motion.div>

      {/* Floating Icons */}
      <motion.div 
        style={{ y: yIcons }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-6 z-20"
      >
        {[
          { Icon: Phone, delay: 0.8 },
          { Icon: Mail, delay: 0.95 },
          { Icon: MapPin, delay: 1.1 }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, y: -50, opacity: 0 }}
            animate={{ scale: [0, 1.1, 0.9, 1.05, 1], y: [-50, 0, -5, 0, 0], opacity: [0, 1, 1, 1, 1] }}
            transition={{ duration: 0.6, delay: item.delay, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="w-12 h-12 rounded-full bg-gold/90 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:bg-gold hover:scale-110 transition-colors duration-300 cursor-pointer"
          >
            <item.Icon size={20} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
