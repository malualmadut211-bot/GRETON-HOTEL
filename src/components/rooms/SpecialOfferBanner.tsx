import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export function SpecialOfferBanner() {
  const [timeLeft, setTimeLeft] = useState(48 * 60 * 60); // 48 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className="w-full bg-[linear-gradient(135deg,#D4AF37,#F4E5B5)] rounded-2xl p-8 sm:p-12 my-16 shadow-[0_20px_40px_rgba(212,175,55,0.2)] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#ffffff_0%,transparent_60%)]" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-transparent rounded-full text-white text-xs font-sans font-bold uppercase tracking-widest mb-4 animate-[pulse_2s_infinite]">
            <Clock size={14} /> Limited Time Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Stay longer, Save more.</h2>
          <p className="font-sans text-white/80 text-[1rem]">Book 3 nights or more and receive 20% off your entire stay plus complimentary spa access.</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
          <div className="text-white font-mono text-3xl font-bold tracking-wider tabular-nums bg-white/30 px-6 py-3 rounded-xl backdrop-blur">
            {formatTime(timeLeft)}
          </div>
          <Link 
            to="/contact?offer=stay-longer" 
            className="px-8 py-4 bg-transparent text-white font-sans font-semibold uppercase tracking-widest text-sm rounded hover:bg-white/20 hover:text-white transition-colors shadow-xl"
          >
            Claim Offer
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
