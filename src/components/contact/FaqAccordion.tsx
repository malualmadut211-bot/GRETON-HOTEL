import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What are your check-in/check-out times?",
    a: "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability."
  },
  {
    q: "Do you offer airport transportation?",
    a: "Yes, we offer luxury concierge airport transfers for our guests. Please contact the front desk at least 24 hours prior to arrival to arrange."
  },
  {
    q: "Is parking available on site?",
    a: "We offer complimentary valet parking for all Executive and Penthouse guests, and standard on-site parking at a daily rate for other room categories."
  },
  {
    q: "Are pets allowed in the hotel?",
    a: "We welcome small pets (up to 20 lbs) in specific pet-friendly rooms with advance notice. A small cleaning fee applies."
  }
];

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="max-w-[900px] mx-auto py-[100px] px-[20px]">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center text-[48px] font-serif text-[#2C2C2C] mb-[60px]"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="space-y-5">
         {FAQS.map((faq, i) => {
           const isOpen = openIdx === i;
           // Alternating entrance animation
           const initialX = i % 2 === 0 ? -50 : 50;

           return (
             <motion.div
               key={i}
               initial={{ opacity: 0, x: initialX }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
               className={cn(
                 "bg-white border rounded-[12px] overflow-hidden transition-all duration-300",
                 isOpen ? "border-gold shadow-[0_4px_20px_rgba(0,0,0,0.08),inset_3px_0_0_#D4AF37] bg-[linear-gradient(to_right,rgba(212,175,55,0.05),white)]" : "border-[#E0E0E0] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-gold/30"
               )}
             >
               <div 
                 className="flex justify-between items-center p-[24px_30px] cursor-pointer select-none group"
                 onClick={() => setOpenIdx(isOpen ? null : i)}
               >
                 <h3 className={cn("text-[18px] font-semibold transition-colors duration-300", isOpen ? "text-gold" : "text-[#2C2C2C] group-hover:text-gold")}>
                   {faq.q}
                 </h3>
                 <div className={cn(
                   "w-[30px] h-[30px] flex items-center justify-center text-[28px] font-light text-gold transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]",
                   isOpen ? "bg-gold/10 rounded-full rotate-180" : "rotate-0"
                 )}>
                    {isOpen ? "−" : "+"}
                 </div>
               </div>
               
               <AnimatePresence>
                 {isOpen && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: "auto", opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                   >
                     <div className="px-[30px] pb-[24px]">
                       <motion.p 
                         initial={{ y: -10, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 0.1, duration: 0.3 }}
                         className="text-[#6B6B6B] leading-[1.8] text-[16px]"
                       >
                         {faq.a}
                       </motion.p>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
           )
         })}
      </div>
    </section>
  );
}
