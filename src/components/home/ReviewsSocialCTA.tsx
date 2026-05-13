import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Star, Instagram, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const REVIEWS = [
  { text: "Exceptional service and prime location. The rooftop pool was stunning!", name: "Sarah Johnson", loc: "New York, USA" },
  { text: "The staff made our anniversary unforgettable. Highly recommend!", name: "David Chen", loc: "Singapore" },
  { text: "Perfect blend of comfort and convenience in Nairobi's CBD.", name: "Amara Okafor", loc: "Lagos, Nigeria" },
  { text: "Spotless rooms and incredible hospitality. Will definitely return!", name: "Emma Thompson", loc: "London, UK" },
];

const IG_PICS = [
  "https://images.unsplash.com/photo-1542314831-c6a4d14b4fbc?q=80&w=800",
  "https://images.unsplash.com/photo-1414235077428-33898bd18261?q=80&w=800",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800",
];

export default function ReviewsSocialCTA() {
  // Testimonials Logic
  const [currentReview, setCurrentReview] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let duration = 6000;
    let animationFrame: number;

    const tick = () => {
      let elapsed = Date.now() - startTime;
      let percent = (elapsed / duration) * 100;
      if (percent >= 100) {
        setCurrentReview((p) => (p + 1) % REVIEWS.length);
        setProgress(0);
        startTime = Date.now();
      } else {
        setProgress(percent);
      }
      animationFrame = requestAnimationFrame(tick);
    };
    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [currentReview]);

  // Parallax for Final CTA
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0.5, 1], [0, 150]);

  return (
    <>
      {/* Testimonials */}
      <section className="bg-gradient-to-b from-[#FAFAFA] to-white py-[80px] md:py-[120px] px-6 md:px-20 relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto relative z-10">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "backOut" }} className="text-center mb-16">
               <h2 className="font-serif text-[3rem] font-bold text-[#1A1A1A] mb-2">What Our Guests Say</h2>
               <div className="flex justify-center mb-2">
                 {[...Array(5)].map((_, i) => (
                   <motion.div key={i} initial={{ scale: 0, rotate: -360, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "backOut" }}>
                     <Star size={36} className="fill-gold text-gold" />
                   </motion.div>
                 ))}
               </div>
               <p className="font-sans text-[1.125rem] text-[#666666]">333 Reviews</p>
            </motion.div>

            <div className="max-w-[800px] mx-auto bg-white rounded-3xl p-[40px] md:p-[60px] md:px-[80px] shadow-[0_16px_48px_rgba(0,0,0,0.08)] relative min-h-[400px] flex flex-col justify-center">
              <span className="absolute top-[20px] left-[20px] md:top-[40px] md:left-[40px] font-serif text-[80px] md:text-[120px] text-gold/15 leading-none pointer-events-none">❝</span>
              
              <AnimatePresence mode="popLayout">
                 <motion.div key={currentReview} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, transition:{ duration: 0.8, ease: "easeInOut" } }} exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: "easeInOut" } }} className="text-center relative z-10">
                   <p className="font-sans text-[1.125rem] md:text-[1.25rem] text-[#2A2A2A] leading-[1.8] mb-10 max-w-[700px] mx-auto">
                     "{REVIEWS[currentReview].text}"
                   </p>
                   <div className="flex items-center justify-center gap-5 flex-col md:flex-row">
                     <motion.img initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition:{ delay: 0.3, duration: 0.6, ease: "backOut" } }} src={`https://i.pravatar.cc/150?img=${currentReview + 10}`} alt={REVIEWS[currentReview].name} className="w-20 h-20 rounded-full border-[3px] border-gold object-cover shadow-[0_4px_16px_rgba(0,0,0,0.1)]" />
                     <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition:{ delay: 0.4, duration: 0.5 } }} className="text-center md:text-left">
                       <h4 className="font-sans text-[1.125rem] font-semibold text-[#1A1A1A] mb-1">{REVIEWS[currentReview].name}</h4>
                       <p className="font-sans text-[0.9375rem] text-[#666666]">{REVIEWS[currentReview].loc}</p>
                     </motion.div>
                   </div>
                   <div className="flex justify-center mt-6 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition:{ delay: 0.5 + i * 0.05, duration: 0.3 } }} className="animate-[starShine_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }}>
                           <Star size={20} className="fill-gold text-gold" />
                        </motion.div>
                      ))}
                   </div>
                 </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-[400px] mx-auto h-1 bg-black/10 rounded-full mt-12 relative overflow-hidden">
               <motion.div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4E5B5] rounded-full" style={{ width: `${progress}%` }} />
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-4 mt-6">
              {REVIEWS.map((_, i) => (
                 <button key={i} onClick={() => setCurrentReview(i)} className={cn("w-3 h-3 rounded-full transition-all duration-300", currentReview === i ? "bg-gold scale-125 shadow-[0_0_8px_rgba(212,175,55,0.5)]" : "bg-black/20 hover:scale-110 hover:bg-black/30")} />
              ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden py-20 px-6">
         <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
            <img src="https://images.unsplash.com/photo-1542314831-c6a4d14b4fbc?q=80&w=2560" className="w-full h-full object-cover" alt="Hotel Night" />
         </motion.div>
         <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.7)_0%,rgba(26,26,26,0.8)_100%)]" />
         
         <div className="relative z-10 max-w-[900px] mx-auto text-center">
            <motion.h2 initial={{ scale: 0.9, opacity: 0, y: 40 }} whileInView={{ scale: 1, opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "backOut" }} className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-tight mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
               Your Nairobi Experience Awaits
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="font-sans text-[1.125rem] md:text-[1.25rem] text-white/90 tracking-wide mb-12">
               Book directly for best rates and exclusive perks
            </motion.p>

            <motion.button initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }} className="w-full max-w-[300px] md:w-[240px] h-[70px] bg-[linear-gradient(135deg,#D4AF37_0%,#F4E5B5_100%)] hover:bg-[linear-gradient(135deg,#F4E5B5_0%,#D4AF37_100%)] rounded-full font-sans font-bold text-[1.125rem] text-[#1A1A1A] uppercase tracking-widest shadow-[0_12px_40px_rgba(212,175,55,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(212,175,55,0.5),0_0_60px_rgba(212,175,55,0.7)] transition-all duration-300 animate-[ctaGlow_2.5s_ease-in-out_infinite] mb-10 block mx-auto">
               Reserve Your Room
            </motion.button>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
               {["Free Cancellation", "Best Price Guarantee", "Secure Booking"].map((badge, i) => (
                  <motion.div key={i} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }} className="flex flex-col items-center">
                     <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-gold mb-3">
                       <CheckCircle size={20} />
                     </div>
                     <span className="font-sans text-[0.9375rem] font-medium text-white/90">{badge}</span>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
    </>
  );
}
