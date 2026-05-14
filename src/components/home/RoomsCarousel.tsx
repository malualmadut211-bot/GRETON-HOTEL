import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ROOMS = [
  { img: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=1400", title: "Deluxe Room", cat: "DELUXE", price: 120 },
  { img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1400", title: "Executive Suite", cat: "SUITE", price: 250 },
  { img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1400", title: "Presidential Suite", cat: "SUITE", price: 850 },
  { img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1400", title: "Family Room", cat: "FAMILY", price: 180 },
];

export default function RoomsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => setCurrentIndex((p) => (p + 1) % ROOMS.length);
  const handlePrev = () => setCurrentIndex((p) => (p - 1 + ROOMS.length) % ROOMS.length);

  const toggleFavorite = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => prev.includes(idx) ? prev.filter(v => v !== idx) : [...prev, idx]);
  };

  return (
    <section className="bg-transparent bg-transparent py-[120px] overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-[2.75rem] font-bold text-white tracking-tight mb-4">Our Finest Accommodations</h2>
          <p className="font-sans text-[1.125rem] text-white/70">Thoughtfully designed for your comfort</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative group/carousel w-full overflow-hidden" 
          ref={containerRef}
        >
           <div 
             className="flex gap-8 transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.15,1)]"
             style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 32}px))` }}
           >
             {ROOMS.map((room, idx) => (
               <div key={idx} className={cn(
                 "relative shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[420px] aspect-[3/4] rounded-[16px] overflow-hidden transition-all duration-600 bg-black group/card",
                 currentIndex === idx ? "scale-105 opacity-100 z-10 shadow-[0_24px_64px_rgba(0,0,0,0.5)]" : "scale-95 opacity-70 z-0 shadow-[0_12px_32px_rgba(0,0,0,0.3)]"
               )}>
                 <img src={room.img} alt={room.title} className="w-full h-full object-cover brightness-90 group-hover/card:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                 
                 <motion.div 
                   initial={{ x: 100, opacity: 0 }}
                   whileInView={{ x: 0, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3 + idx * 0.1, duration: 0.5, ease: "backOut" }}
                   className="absolute top-0 right-0 bg-gold/90 text-white font-sans font-bold text-[0.75rem] uppercase tracking-widest px-4 py-2 rounded-bl-xl z-20"
                 >
                   {room.cat}
                 </motion.div>

                 <button onClick={(e) => toggleFavorite(e, idx)} className="absolute top-6 right-8 ml-auto z-20 bg-transparent backdrop-blur-md rounded-full w-11 h-11 flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-90 left-auto" style={{ right: '2rem', left: 'auto'}}>
                   <Heart className={cn("w-6 h-6 transition-colors duration-300", favorites.includes(idx) ? "fill-gold text-gold" : "text-white")} />
                 </button>

                 <div className="absolute bottom-0 inset-x-0 p-8 transform transition-transform duration-500 group-hover/card:-translate-y-2 w-full">
                    <h3 className="font-serif text-[1.75rem] font-bold text-white mb-2 drop-shadow-md">{room.title}</h3>
                    <p className="font-sans text-white/80 mb-5">
                      <span className="text-sm">From </span>
                      <span className="text-gold font-bold text-2xl">${room.price}</span>
                      <span className="text-sm"> /night</span>
                    </p>
                    <button className="w-full h-12 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  border border-white/30 rounded-lg text-white font-sans font-semibold transition-all duration-400 hover:bg-transparent/20 relative overflow-hidden group/btn">
                      <span className="relative z-10">View Details</span>
                      <div className="absolute inset-0 rounded-lg p-[2px] opacity-0 group-hover/btn:opacity-100 bg-[linear-gradient(90deg,#D4AF37,transparent,#D4AF37)] bg-[length:200%_100%] [mask-image:linear-gradient(#fff_0_0)] [mask-composite:exclude] animate-[rotateBorder_2s_linear_infinite]" />
                    </button>
                    
                    <div className="absolute top-full left-0 right-0 h-16 opacity-0 group-hover/card:opacity-100 group-hover/card:-translate-y-full transition-all duration-500 bg-black/90 p-4 flex gap-4 text-xs font-sans text-white/70 justify-center">
                       <span>King Bed</span> • <span>City View</span>
                    </div>
                 </div>
               </div>
             ))}
           </div>
           
           <button onClick={handlePrev} className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white border border-white/20  items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-gold/90 hover:scale-110 hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] transition-all z-30">
             <ChevronLeft />
           </button>
           <button onClick={handleNext} className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white border border-white/20  items-center justify-center text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-gold/90 hover:scale-110 hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] transition-all z-30">
             <ChevronRight />
           </button>
        </motion.div>
        
        <div className="flex justify-center gap-3 mt-12">
          {ROOMS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={cn("w-3 h-3 rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]", currentIndex === i ? "w-8 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]" : "bg-white/30 hover:scale-125")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
