import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Leaf, Flame } from "lucide-react"; // Sample dietary icons

const MENU_CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Drinks", "Specials"];

const MENU_DATA: Record<string, any[]> = {
  Dinner: [
    { name: "Truffle Filet Mignon", desc: "Wild mushroom reduction, pommes purée.", price: 45, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200", dietary: [] },
    { name: "Seared Sea Bass", desc: "Citrus beurre blanc, asparagus.", price: 38, img: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=200", dietary: ["GF"] },
    { name: "Saffron Risotto", desc: "Arborio rice, aged parmesan, gold leaf.", price: 32, img: "https://images.unsplash.com/photo-1633337474564-1d9e961917f8?q=80&w=200", dietary: ["V"] },
    { name: "Spicy Lobster Pasta", desc: "Linguine, chili garlic butter, fresh herbs.", price: 42, img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=200", dietary: ["Spicy"] },
  ],
  Breakfast: [
    { name: "Eggs Benedict", desc: "Poached eggs, hollandaise.", price: 18, img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=200", dietary: [] }
  ]
};

export function MenuShowcase() {
  const [activeTab, setActiveTab] = useState("Dinner");
  const [isSticky, setIsSticky] = useState(false);
  const items = MENU_DATA[activeTab] || MENU_DATA["Dinner"];

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("menu-showcase-nav");
      if (el) {
        setIsSticky(window.scrollY > el.offsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-transparent min-h-[800px] relative pb-20">
      {/* Sticky Tab Navigation */}
      <div id="menu-showcase-nav" className="h-[70px]">
        <div className={cn(
          "w-full flex justify-center transition-all duration-400 z-50",
           isSticky ? "fixed top-[70px] lg:top-[90px] bg-transparent-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] h-[60px]" : "relative h-[70px]"
        )}>
          <div className="flex gap-4 sm:gap-10 h-full overflow-x-auto no-scrollbar px-6 items-center">
            {MENU_CATEGORIES.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 md:px-8 py-3 text-[14px] md:text-[18px] uppercase tracking-[0.1em] transition-all duration-300 relative border-b-3 h-full flex items-center shrink-0",
                    isActive ? "text-gold font-semibold border-transparent" : "text-[#6D4C41] border-transparent hover:text-gold hover:border-gold/30 hover:-translate-y-0.5"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="menuTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                    />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gold/5 pointer-events-none" />
                  )}
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-[1200px] mx-auto pt-20 px-6 lg:px-10">
        <motion.div 
           layout
           className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12"
        >
          <AnimatePresence mode="wait">
             {items.map((item, i) => (
                <motion.div 
                  key={`${activeTab}-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: "0 12px 40px rgba(212,175,55,0.25)" }}
                  className="bg-transparent border border-[#6D4C41]/10 rounded-xl p-[30px] relative overflow-hidden group transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-white/20 hover:border-gold/40"
                >
                  {/* Hover bg sweep */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.05),transparent)] -translate-x-[100%] group-hover:animate-[shimmerSweep_1.5s_infinite]" />

                  {/* Thumbnail */}
                  <div className="float-left mr-5 w-[100px] h-[100px] rounded-lg overflow-hidden border-2 border-gold shadow-[0_4px_15px_rgba(0,0,0,0.1)] group-hover:border-[3px] transition-all">
                     <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-2 transition-all duration-400" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-serif text-[24px] font-semibold text-[#3E2723] group-hover:text-gold transition-colors mb-2">{item.name}</h3>
                    <p className="font-sans text-[15px] leading-[1.6] text-[#6D4C41] line-clamp-3">{item.desc}</p>
                    
                    {/* Dietary Icons */}
                    <div className="mt-3 flex gap-2">
                       {item.dietary.includes("V") && <Leaf size={20} className="text-green-600" />}
                       {item.dietary.includes("Spicy") && <Flame size={20} className="text-red-500" />}
                       {item.dietary.includes("GF") && <span className="text-orange-500 font-bold text-xs border border-orange-500 rounded px-1">GF</span>}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="absolute top-[30px] right-[30px] font-sans text-[21px] font-bold text-gold drop-shadow-sm group-hover:text-[#FFD700] group-hover:scale-110 transition-all duration-400 px-3 py-1 bg-transparent group-hover:bg-gold/20 rounded-full group-hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                    ${item.price}
                  </div>
                </motion.div>
             ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
