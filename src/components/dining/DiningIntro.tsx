import React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function DiningIntro() {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0px", "-250px"]);

  return (
    <section className="bg-transparent min-h-[700px] flex flex-col lg:flex-row bg-[#FCFBF8] overflow-hidden">
      {/* Left Column - Text */}
      <motion.div 
        style={{ y: yText }}
        className="w-full lg:w-1/2 p-[60px] lg:p-[100px_80px] flex flex-col justify-center"
      >
        <motion.div
           initial={{ opacity: 0, x: -100, filter: "blur(15px)" }}
           whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
           viewport={{ once: true, margin: "-20%" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[#3E2723] mb-4">
            Maison Royale
          </h2>
          {/* Ornamental divider SVG */}
          <svg width="200" height="20" viewBox="0 0 200 20" className="mb-8 overflow-visible">
             <motion.path 
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, delay: 0.2 }}
               d="M0,10 Q50,20 100,10 T200,10" 
               fill="none" 
               stroke="#D4AF37" 
               strokeWidth="2" 
             />
             <motion.circle 
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.3, delay: 0.8 }}
               cx="100" cy="10" r="4" fill="#D4AF37" 
             />
          </svg>
        </motion.div>

        <div className="space-y-6 mb-10">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-[18px] leading-[1.8] text-[#5D4037] max-w-[560px]"
          >
            <span className="float-left text-[50px] leading-[0.8] pr-2 text-gold font-bold">A</span>t Maison Royale, culinary artistry meets profound atmosphere. Our head chef meticulously curates seasonal menus that celebrate both avant-garde techniques and timeless traditions.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="font-serif text-[18px] leading-[1.8] text-[#5D4037] max-w-[560px]"
          >
            Sourced locally and prepared globally, every dish is an invitation to explore a world of rich, resonant flavors.
          </motion.p>
        </div>

        <div className="flex gap-3 mb-12">
          {["Fine Dining", "French Fusion", "Award Winning"].map((badge, i) => (
             <motion.span 
               key={badge}
               initial={{ scale: 0, rotate: -180, opacity: 0 }}
               whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.6 + i * 0.1, type: "spring" }}
               className="bg-gradient-to-r from-gold to-[#C19A3A] px-5 py-2 rounded-full text-[14px] uppercase text-white shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:-translate-y-[3px] hover:scale-105 hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-default"
             >
               {badge}
             </motion.span>
          ))}
        </div>

        {/* Chef Intro */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center gap-6"
        >
          <motion.div 
            initial={{ scale: 0, rotate: 720 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="w-[120px] h-[120px] rounded-full p-2 bg-gradient-to-tr from-gold to-[#C19A3A] shadow-xl hover:rotate-6 hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
             <div className="w-full h-full rounded-full border-[8px] border-white overflow-hidden">
               <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=200" alt="Chef" className="w-full h-full object-cover" />
             </div>
          </motion.div>
          <div>
            <h4 className="text-[1.3rem] font-bold text-[#3E2723]">Alexandre Dubois</h4>
            <p className="text-[0.95rem] italic text-white/60 mb-2">Executive Chef</p>
            <div className="font-[Dancing_Script] text-2xl text-[#3E2723]/70 font-script">
              A. Dubois
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column - Image */}
      <motion.div 
        style={{ y: yImage }}
        className="w-full lg:w-1/2 h-[500px] lg:h-auto relative"
      >
        <motion.div
           initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 0, scale: 1.1 }}
           whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-20%" }}
           transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
           className="w-full h-[150%] absolute top-[-25%] group overflow-hidden border-l border-gold/30"
        >
          <img 
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200" 
            className="w-full h-full object-cover filter saturate-100 group-hover:saturate-110 group-hover:brightness-110 group-hover:scale-105 transition-all duration-600"
          />
          <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/15 transition-colors duration-600 flex items-center justify-center">
             <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-200 text-white font-serif italic text-2xl text-center px-10 drop-shadow-md">
               "Cooking is like love; it should be entered into with abandon or not at all."
             </p>
          </div>
          {/* Badge */}
          <div className="absolute top-1/4 right-8 w-24 h-24 bg-transparent rounded-full flex flex-col items-center justify-center shadow-2xl border 2 border-gold/50">
             <span className="text-gold text-2xl">★</span>
             <span className="text-[10px] uppercase font-bold text-white mt-1 text-center leading-tight">Michelin<br/>Starred</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
