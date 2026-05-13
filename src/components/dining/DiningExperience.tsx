import React from "react";
import { motion } from "motion/react";
import { Tv, Flame, Wind, Clock } from "lucide-react";

export function DiningExperience() {
  return (
    <section className="bg-[#F8F6F2] py-[100px] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[30px] lg:px-[60px] flex flex-col lg:flex-row gap-16">
        
        {/* Left Content */}
        <div className="w-full lg:w-[60%]">
          <motion.div
             initial={{ opacity: 0, x: -80 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-20%" }}
             transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-sans text-[1.2rem] text-[#8D6E63] uppercase tracking-[0.2em] mb-5">
              The Atmosphere
            </h4>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] text-[#3E2723] leading-[1.2] mb-8 tracking-[-0.01em]">
              Indoor & Outdoor Seating
            </h2>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-serif text-[1.125rem] leading-[1.8] text-[#5D4037] max-w-[600px] mb-10">
              <span className="text-[1.25rem]">Whether you prefer the intimate warmth of our dining room or the breezy elegance of our terrace, we provide the perfect setting.</span> Our diverse dining areas are designed to cater to your mood, from romantic dinners to celebratory gatherings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
             {[
               { name: "Cozy Firepits", desc: "Warm outdoor ambiance", icon: Flame },
               { name: "Al Fresco Dining", desc: "Breezy terrace seating", icon: Wind },
             ].map((feat, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex items-center group transition-all duration-300 hover:translate-x-2 hover:bg-gold/5 rounded-lg p-2"
                >
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-[#C19A3A] flex items-center justify-center shadow-[0_4px_15px_rgba(212,175,55,0.2)] group-hover:rotate-15 group-hover:scale-110 transition-transform">
                     <feat.icon size={24} className="text-white" />
                   </div>
                   <div className="ml-4">
                     <h5 className="font-bold text-[#3E2723] text-[1.1rem]">{feat.name}</h5>
                     <p className="text-[0.95rem] text-[#6D4C41] leading-[1.5]">{feat.desc}</p>
                   </div>
                </motion.div>
             ))}
          </div>

          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-[#2C2C2C] text-white p-[30px] border-l-[4px] border-gold rounded-r-lg my-10 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex items-start gap-6"
          >
             <Tv size={60} className="text-gold shrink-0 animate-pulse" />
             <div>
               <h4 className="text-[1.5rem] font-bold mb-2">Live Sports Action</h4>
               <p className="text-white/80 mb-2">Catch every game on our 10+ HD screens</p>
               <p className="text-sm font-bold text-gold">NFL • NBA • Soccer • UFC</p>
             </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="bg-white border-2 border-[#E0E0E0] rounded-xl p-[25px] font-mono text-[1rem] max-w-[400px]"
          >
             <h4 className="flex items-center gap-2 font-bold mb-4 border-b pb-2"><Clock size={20}/> HOURS OF OPERATION</h4>
             <div className="flex justify-between mb-2 group hover:bg-gold/10 hover:pl-2 transition-all rounded px-1">
               <span className="font-bold">Mon - Thu</span>
               <span className="text-gold group-hover:text-[#FFD700]">11:00 AM - 10:00 PM</span>
             </div>
             <div className="flex justify-between mb-2 group hover:bg-gold/10 hover:pl-2 transition-all rounded px-1">
               <span className="font-bold">Fri - Sat</span>
               <span className="text-gold group-hover:text-[#FFD700]">11:00 AM - 11:00 PM</span>
             </div>
             <div className="flex justify-between group hover:bg-gold/10 hover:pl-2 transition-all rounded px-1">
               <span className="font-bold">Sunday</span>
               <span className="text-gold group-hover:text-[#FFD700]">10:00 AM - 9:00 PM</span>
             </div>
          </motion.div>

        </div>

        {/* Right Gallery */}
        <div className="w-full lg:w-[40%] grid grid-cols-2 grid-rows-3 gap-4 h-[600px]">
           <motion.div 
             initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0, scale: 1.1 }}
             whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 1.0, delay: 0.5 }}
             className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] group relative cursor-pointer"
           >
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800" className="w-full h-full object-cover group-hover:saturate-115 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                 <p className="text-white font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">Elegant Indoor Dining</p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 }}
             whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer"
           >
              <img src="https://images.unsplash.com/photo-1525648199074-ceeea74b5c77?q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-all" />
           </motion.div>
           <motion.div 
             initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 }}
             whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 0.8, delay: 0.95 }}
             className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer"
           >
              <img src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=400" className="w-full h-full object-cover group-hover:scale-105 transition-all" />
           </motion.div>
        </div>

      </div>
    </section>
  );
}
