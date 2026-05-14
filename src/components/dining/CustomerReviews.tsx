import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const REVIEWS = [
  { text: "An unforgettable evening. The Truffle Filet Mignon was cooked to absolute perfection, and the wine pairing suggested by our sommelier was extraordinary.", dish: "Truffle Filet Mignon", name: "Eleanor Vance", date: "April 12, 2026" },
  { text: "The ambiance alone is worth the visit. Stunning views, impeccable service, and a vibrant yet intimate atmosphere. Will definitely return.", dish: "Saffron Risotto", name: "Marcus Thorne", date: "May 3, 2026" },
  { text: "Hands down the best dining experience in the city. Every course was a masterclass in flavor and presentation.", dish: "Chef's Tasting Menu", name: "Sophia Lin", date: "May 10, 2026" },
  { text: "Loved the cocktails and the buzzing energy at the bar before our dinner. The seared scallops melted in my mouth.", dish: "Seared Scallops", name: "James Holden", date: "May 8, 2026" },
  { text: "We celebrated our anniversary here and they made it so special. Complimenatary champagne and a private corner booth.", dish: "Lobster Thermidor", name: "The Miller Family", date: "May 1, 2026" },
];

export function CustomerReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto scroll
  useEffect(() => {
    if (isHovered) return;
    const int = setInterval(() => {
      if (containerRef.current) {
        const nextIdx = (activeIndex + 1) % REVIEWS.length;
        scrollToIndex(nextIdx);
      }
    }, 6000);
    return () => clearInterval(int);
  }, [activeIndex, isHovered]);

  const scrollToIndex = (idx: number) => {
    if (!containerRef.current) return;
    const child = containerRef.current.children[idx] as HTMLElement;
    if (child) {
      containerRef.current.scrollTo({
        left: child.offsetLeft - containerRef.current.offsetWidth / 2 + child.offsetWidth / 2,
        behavior: 'smooth'
      });
      setActiveIndex(idx);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children) as HTMLElement[];
    const containerCenter = containerRef.current.scrollLeft + containerRef.current.offsetWidth / 2;
    
    let closestIdx = 0;
    let minDistance = Infinity;
    
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });
    
    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  return (
    <section className="bg-transparent bg-[linear-gradient(135deg,#F5F5DC_0%,#F0E6D2_100%)] overflow-hidden py-[120px]">
      <motion.div 
         initial={{ opacity: 0, y: -30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="text-center px-4"
      >
        <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[#3E2723] mb-5 drop-shadow-sm">What Our Guests Say</h2>
        <p className="font-sans text-[1.125rem] text-[#8D6E63] uppercase tracking-[0.1em] mb-[60px]">Real experiences from real diners</p>
      </motion.div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-10 px-[10vw] overflow-x-auto no-scrollbar snap-x snap-mandatory py-10"
        style={{ scrollBehavior: 'smooth' }}
      >
        {REVIEWS.map((review, i) => {
          const isActive = i === activeIndex;
          
          return (
            <motion.div
              key={i}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "w-[420px] shrink-0 snap-center bg-transparent border border-white/20 rounded-[20px] p-[40px_35px] relative transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer group",
                isActive ? "scale-105 z-10 opacity-100 shadow-[0_20px_60px_rgba(212,175,55,0.25)] border-2 border-gold/30" 
                         : "scale-95 z-0 opacity-70 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border-2 border-transparent hover:opacity-100 hover:scale-[0.98]"
              )}
            >
              {/* Quote Mark */}
              <div className="absolute top-[20px] left-[20px] font-serif text-[6rem] text-gold/10 z-0 select-none leading-none">"</div>

              <div className="relative z-10 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                   {[1,2,3,4,5].map((s) => (
                     <motion.div
                       key={s}
                       initial={isActive ? { scale: 0, opacity: 0 } : false}
                       animate={isActive ? { scale: 1, opacity: 1 } : false}
                       transition={{ duration: 0.3, delay: s * 0.08 }}
                     >
                       <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FFD700] fill-current group-hover:scale-110 transition-transform">
                         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                       </svg>
                     </motion.div>
                   ))}
                </div>

                <p className="font-serif text-[18px] leading-[1.7] text-[#3E2723] mb-6 line-clamp-6 flex-1">
                  "{review.text}"
                </p>

                <div className="inline-block bg-gold/15 px-4 py-2 rounded-full mb-6 self-start">
                  <span className="font-bold text-[15px] text-gold">🍽️ {review.dish}</span>
                </div>

                <div className="flex items-center gap-[15px] pt-4 ">
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gold to-[#C19A3A] flex items-center justify-center text-white font-bold text-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-2 border-white group-hover:scale-110 transition-transform">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#3E2723] text-[16px]">{review.name}</h5>
                    <p className="text-[14px] text-[#8D6E63]">{review.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-3 mt-10">
         {REVIEWS.map((_, i) => (
           <button 
             key={i}
             onClick={() => scrollToIndex(i)}
             className={cn(
               "h-[10px] rounded-full transition-all duration-300",
               i === activeIndex ? "w-[14px] bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "w-[10px] bg-gold/30 hover:bg-gold/60"
             )}
           />
         ))}
      </div>
    </section>
  );
}
