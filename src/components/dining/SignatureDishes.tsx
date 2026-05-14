import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SIGNATURE_DISHES = [
  { id: 1, name: "Truffle Encrusted Filet", desc: "Prime beef, wild mushrooms, aged balsamic reduction.", img: "https://images.unsplash.com/photo-1544025162-811114210dcc?q=80&w=1200" },
  { id: 2, name: "Pan-Seared Scallops", desc: "Saffron risotto, asparagus, citrus beurre blanc.", img: "https://images.unsplash.com/photo-1599084942896-6e2165507ab3?q=80&w=1200" },
  { id: 3, name: "Lobster Thermidor", desc: "Cognac cream sauce, gruyere crust, fine herbs.", img: "https://images.unsplash.com/photo-1533682805518-48d1f5e8bb43?q=80&w=1200" }
];

export function SignatureDishes() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const int = setInterval(() => {
      setCurrentIdx(p => (p + 1) % SIGNATURE_DISHES.length);
    }, 5000);
    return () => clearInterval(int);
  }, [isHovered]);

  const next = () => setCurrentIdx(p => (p + 1) % SIGNATURE_DISHES.length);
  const prev = () => setCurrentIdx(p => (p - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length);

  return (
    <section className="bg-transparent bg-[#2C2C2C] text-white/90 py-[120px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center mb-20 px-6">
        <motion.h2 
           initial={{ opacity: 0, y: -40, scale: 0.9 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-20%" }}
           transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
           className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-gold drop-shadow-[0_4px_20px_rgba(212,175,55,0.3)] mb-6"
        >
          Our Signature Creations
        </motion.h2>
        <motion.div 
           initial={{ width: 0 }}
           whileInView={{ width: 100 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, delay: 0.4 }}
           className="h-[2px] bg-gold mx-auto"
        />
      </div>

      <div 
        className="relative max-w-[1400px] mx-auto h-[600px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {SIGNATURE_DISHES.map((dish, i) => {
            let position = "hidden";
            if (i === currentIdx) position = "active";
            else if (i === (currentIdx - 1 + SIGNATURE_DISHES.length) % SIGNATURE_DISHES.length) position = "prev";
            else if (i === (currentIdx + 1) % SIGNATURE_DISHES.length) position = "next";

            if (position === "hidden") return null;

            return (
              <motion.div
                key={dish.id}
                layout
                initial={{ 
                  opacity: 0, 
                  scale: 0.85, 
                  x: position === "next" ? "50%" : position === "prev" ? "-50%" : "0%"
                }}
                animate={{
                  opacity: position === "active" ? 1 : 0.6,
                  scale: position === "active" ? (isHovered ? 1.08 : 1.05) : 0.95,
                  x: position === "active" ? "0%" : position === "next" ? "20%" : "-20%",
                  zIndex: position === "active" ? 10 : 5,
                  filter: position === "active" ? "blur(0px) brightness(100%)" : "blur(2px) brightness(80%)"
                }}
                exit={{ opacity: 0, scale: 0.85, x: position === "prev" ? "-50%" : "50%" }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                className={cn(
                  "absolute w-[80%] md:w-[60%] lg:w-[50%] h-[550px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] cursor-pointer",
                  position === "active" && "shadow-[0_20px_60px_rgba(212,175,55,0.25)]"
                )}
                onClick={() => position !== "active" && setCurrentIdx(i)}
              >
                <img src={dish.img} className="w-full h-full object-cover filter contrast-105 saturate-110" />
                
                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-[40px_30px_30px]">
                  {position === "active" && (
                    <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <h3 className="font-serif text-[32px] font-bold text-white drop-shadow-md tracking-[0.02em]">{dish.name}</h3>
                      <p className="font-sans text-[16px] leading-[1.6] text-white/90 max-w-[90%] my-[15px]">{dish.desc}</p>
                      <button className="w-[160px] h-[48px] bg-transparent border-2 border-gold text-gold font-bold uppercase text-[14px] rounded-full mt-5 hover:bg-gold hover:text-white transition-all">Order Now</button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Controls */}
        <button onClick={prev} className="absolute left-4 lg:left-[10%] top-1/2 -translate-y-1/2 z-20 w-[60px] h-[60px] rounded-full bg-gold/20 backdrop-blur-md border-2 border-gold/50 flex items-center justify-center text-gold hover:bg-gold/50 hover:scale-110 hover:border-gold hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all group">
           <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={next} className="absolute right-4 lg:right-[10%] top-1/2 -translate-y-1/2 z-20 w-[60px] h-[60px] rounded-full bg-gold/20 backdrop-blur-md border-2 border-gold/50 flex items-center justify-center text-gold hover:bg-gold/50 hover:scale-110 hover:border-gold hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all group">
           <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-10">
         {SIGNATURE_DISHES.map((_, i) => (
           <button 
             key={i} 
             onClick={() => setCurrentIdx(i)}
             className={cn(
               "h-3 rounded-full transition-all duration-400 border border-gold/50",
               i === currentIdx ? "w-8 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.6)]" : "w-3 bg-white/30 hover:scale-125 hover:bg-gold/60"
             )} 
           />
         ))}
      </div>
    </section>
  );
}
