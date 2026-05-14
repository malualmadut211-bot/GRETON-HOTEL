import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";

export function OfficeHours() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minDeg = (minutes * 6) + (seconds * 0.1);

  return (
    <section className="bg-transparent max-w-[1000px] mx-auto px-5 my-[80px] grid grid-cols-1 md:grid-cols-3 gap-[30px]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  p-[40px_30px] rounded-[16px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 group overflow-hidden relative hover:-translate-y-[10px] hover:shadow-[0_8px_35px_rgba(212,175,55,0.2)]"
      >
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-gold to-[#C9A028] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
        
        {/* Animated Clock */}
        <div className="w-[80px] h-[80px] mx-auto mb-5 relative group-hover:scale-110 transition-transform duration-500">
           <div className="w-full h-full border-[4px] border-gold rounded-full relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  shadow-[inset_0_0_20px_rgba(212,175,55,0.1),0_4px_15px_rgba(0,0,0,0.1)]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full z-10" />
             {/* 12 o'clock marker */}
             <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-gold" />
             <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[2px] h-[6px] bg-gold" />
             <div className="absolute left-[2px] top-1/2 -translate-y-1/2 w-[6px] h-[2px] bg-gold" />
             <div className="absolute right-[2px] top-1/2 -translate-y-1/2 w-[6px] h-[2px] bg-gold" />

             <div 
               className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[3px] h-[20px] bg-[#2C2C2C] rounded-sm origin-bottom"
               style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
             />
             <div 
               className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-[30px] bg-gold rounded-sm origin-bottom"
               style={{ transform: `translateX(-50%) rotate(${minDeg}deg)` }}
             />
           </div>
        </div>

        <h4 className="text-[20px] text-white mb-[10px] font-bold group-hover:text-gold transition-colors">Reception Hours</h4>
        <p className="text-[24px] font-bold text-gold mb-2 group-hover:animate-[timePulse_2s_ease_infinite]">24 Hours / 7 Days</p>
        <span className="text-[14px] text-white/60 italic">Always here to serve you</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  p-[40px_30px] rounded-[16px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 group overflow-hidden relative hover:-translate-y-[10px] hover:shadow-[0_8px_35px_rgba(212,175,55,0.2)]"
      >
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-gold to-[#C9A028] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
        <div className="text-gold flex justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
           <Mail size={80} strokeWidth={1} className="drop-shadow-sm" />
        </div>
        <h4 className="text-[20px] text-white mb-[10px] font-bold group-hover:text-gold transition-colors">Email Response</h4>
        <p className="text-[24px] font-bold text-gold mb-2 group-hover:animate-[timePulse_2s_ease_infinite]">Within 24 Hours</p>
        <span className="text-[14px] text-white/60 italic">Usually much faster</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  p-[40px_30px] rounded-[16px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-400 group overflow-hidden relative hover:-translate-y-[10px] hover:shadow-[0_8px_35px_rgba(212,175,55,0.2)]"
      >
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-gold to-[#C9A028] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
        <div className="text-gold flex justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
           <Phone size={80} strokeWidth={1} className="drop-shadow-sm group-hover:animate-[phoneRing_0.6s_ease-in-out_infinite]" />
        </div>
        <h4 className="text-[20px] text-white mb-[10px] font-bold group-hover:text-gold transition-colors">Phone Availability</h4>
        <p className="text-[24px] font-bold text-gold mb-2 group-hover:animate-[timePulse_2s_ease_infinite]">24/7 Support</p>
        <span className="text-[14px] text-white/60 italic">Instant assistance anytime</span>
      </motion.div>
    </section>
  );
}
