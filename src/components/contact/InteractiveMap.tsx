import React, { useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { MapPin } from "lucide-react";

export function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3, margin: "0px 0px -100px 0px" });

  // Map styles provided in instructions
  const mapUrl = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600"; // Fallback aesthetic map image if no actual Google Maps API key

  return (
    <section className="bg-transparent px-6 py-20 max-w-[1400px] mx-auto">
      <div 
        ref={containerRef}
        className="w-full h-[500px] rounded-[12px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative bg-[#E3DCC8] flex items-center justify-center"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
           animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
           transition={{ duration: 1 }}
           className="absolute inset-0"
        >
          {/* Using a placeholder aesthetic map image */}
          <img src={mapUrl} alt="Map" className="w-full h-full object-cover filter sepia-[0.3] opacity-60" />
        </motion.div>

        {/* Marker */}
        {isInView && (
          <motion.div 
            initial={{ y: -500, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 0.6 }}
            className="relative z-10 cursor-pointer group"
          >
             {/* Pulsing ring */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[30px] h-[30px] bg-gold/30 rounded-full animate-[ping_2s_infinite]" />
             
             {/* Pin SVG */}
             <svg width="60" height="80" viewBox="0 0 60 80" className="group-hover:scale-115 transition-transform duration-300 drop-shadow-[0_8px_15px_rgba(212,175,55,0.4)] relative z-10">
               <ellipse cx="30" cy="75" rx="15" ry="3" fill="rgba(0,0,0,0.2)"/>
               <path d="M30,5 Q45,5 45,20 Q45,35 30,55 Q15,35 15,20 Q15,5 30,5Z" fill="#D4AF37" stroke="#B8941F" strokeWidth="2"/>
               <circle cx="30" cy="20" r="10" fill="white"/>
               <text x="30" y="24" fontSize="12" textAnchor="middle" fill="#D4AF37">🏨</text>
             </svg>

             {/* Tooltip */}
             <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 -mb-2 p-[8px_16px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  text-white text-[14px] font-semibold rounded-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-[10px] transition-all pointer-events-none">
               Greton Hotel
               <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white" />
             </div>
          </motion.div>
        )}

        {/* Directions Button */}
        <motion.div
           initial={{ opacity: 0, x: 100 }}
           animate={isInView ? { opacity: 1, x: 0 } : {}}
           transition={{ duration: 0.6, delay: 1.2 }}
           className="absolute bottom-[20px] right-[20px] z-10"
        >
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-[10px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  p-[12px_24px] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-300 hover:bg-gold hover:text-white hover:-translate-y-[3px] hover:shadow-[0_6px_30px_rgba(212,175,55,0.4)] group"
          >
            <MapPin size={20} className="group-hover:rotate-15 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[14px]">Get Directions</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
