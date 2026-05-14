import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const BEVERAGE_CATEGORIES = ["Cocktails", "Wines", "Beers", "Non-Alcoholic"];
const BEVERAGES = {
  Cocktails: [
    { name: "Golden Oasis", desc: "Aged rum, gold flakes, saffron syrup, bitters", price: 24, abv: "35%", badges: ["🔥"] },
    { name: "Sapphire Martini", desc: "Premium gin, dry vermouth, blue curacao", price: 18, abv: "30%", badges: [] },
    { name: "Smoked Old Fashioned", desc: "Rye whiskey, hickory smoke, cherry wood", price: 22, abv: "32%", badges: [] },
  ],
  Wines: [
    { name: "Château Margaux 2010", desc: "Bordeaux blend, complex dark fruit, oak", price: 65, abv: "13.5%", badges: [] },
    { name: "Cloudy Bay Sauvignon Blanc", desc: "Crisp apple, tropical fruit, mineral finish", price: 28, abv: "13%", badges: ["🌿"] }
  ]
};

export function BeverageMenu() {
  const [activeTab, setActiveTab] = useState("Cocktails");
  const items = BEVERAGES[activeTab as keyof typeof BEVERAGES] || [];

  return (
    <section className="bg-transparent bg-transparent py-[120px] px-[20px] lg:px-[80px]  relative overflow-hidden">
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03] animate-[spin_120s_infinite_linear] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M50 10 L60 40 L60 90 L40 90 L40 40 Z" fill="white" /></svg>
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif text-[clamp(2.8rem,6vw,5rem)] text-white/90 text-center drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)] mb-16 relative"
      >
        Liquid Artistry
        <div className="absolute w-[200px] h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent bottom-[-20px] left-1/2 -translate-x-1/2 animate-[shine_2s_infinite]" />
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center gap-10 mb-16 overflow-x-auto no-scrollbar pb-4 relative z-10 sticky top-[20px]">
         {BEVERAGE_CATEGORIES.map(cat => {
           const isActive = activeTab === cat;
           return (
             <button 
               key={cat}
               onClick={() => setActiveTab(cat)}
               className={cn(
                 "px-[30px] py-[15px] font-sans text-[20px] uppercase tracking-[0.15em] transition-all duration-300 relative shrink-0",
                 isActive ? "text-gold font-bold" : "text-white/90/60 hover:text-white/90 hover:-translate-y-1"
               )}
             >
               {cat}
               {isActive && (
                 <motion.div 
                   layoutId="beverageUnderline"
                   className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                 />
               )}
             </button>
           )
         })}
      </div>

      {/* Grid */}
      <div className="max-w-[1300px] mx-auto relative z-10">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
        >
          <AnimatePresence mode="wait">
            {items.map((item, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ opacity: 0, scale: 0.85, y: 50, filter: "blur(15px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="bg-transparent-[10px] border border-gold/15 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-400 group cursor-pointer"
              >
                {/* Image / Mask Pour simulation */}
                <div className="h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] p-5 relative overflow-hidden">
                   <motion.div 
                     initial={{ y: "100%" }}
                     whileInView={{ y: "0%" }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.2, ease: "easeInOut" }}
                     className="absolute inset-0 bg-gradient-to-t from-gold/40 to-transparent mix-blend-overlay z-0"
                   />
                   <div className="w-full h-full relative z-10 flex items-center justify-center">
                     {/* Placeholder shape for the drink illustration */}
                     <svg viewBox="0 0 100 100" className="w-[80px] h-full opacity-80 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                       <path d="M20 10 L80 10 L60 50 L55 90 L45 90 L40 50 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
                       <path d="M25 15 L75 15 L60 45 L40 45 Z" fill="#rgba(212,175,55,0.5)" />
                     </svg>
                   </div>
                </div>

                <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
                   <h3 className="font-serif text-[24px] text-gold font-bold mb-3 capitalize tracking-[0.05em] group-hover:text-[#FFD700] transition-colors">{item.name}</h3>
                   <p className="font-sans text-[15px] text-white/90/80 italic line-clamp-3 group-hover:line-clamp-none transition-all">{item.desc}</p>
                   
                   <div className="absolute top-[220px] right-6 font-sans text-[22px] font-bold text-[#FFD700] bg-gold/20 px-4 py-1.5 rounded-full backdrop-blur-sm group-hover:bg-gold/40 shadow-sm group-hover:scale-110 transition-all">
                      ${item.price}
                   </div>

                   <div className="flex gap-2 mt-4 items-center">
                     <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-bold text-white uppercase">{item.abv} ABV</span>
                     {item.badges.map(b => (
                       <span key={b} className="text-[16px]">{b}</span>
                     ))}
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
