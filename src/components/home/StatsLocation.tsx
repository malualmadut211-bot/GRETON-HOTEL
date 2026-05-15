import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MessageSquare, MapPin, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function StatCounter({ target, duration = 1.5 }: { target: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ val: 0 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!displayRef.current) return;

    const anim = gsap.to(countRef.current, {
      val: target,
      duration: duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: displayRef.current,
        start: "top 90%",
        once: true
      },
      onUpdate: () => {
        setCount(Math.round(countRef.current.val));
      }
    });

    return () => {
      anim.kill();
    };
  }, [target, duration]);

  return (
    <span ref={displayRef}>
      {count}
    </span>
  );
}

export default function StatsLocation() {
  const ATTRACTIONS = [
    { icon: "🚉", title: "Nairobi Train Station", dist: "2 km away" },
    { icon: "🌳", title: "Uhuru Park", dist: "4 km away" },
    { icon: "🛍️", title: "Maasai Market", dist: "15-minute walk" },
    { icon: "🏢", title: "CBD Shopping District", dist: "Nearby" },
  ];

  return (
    <>
      <section className="bg-transparent py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center px-6 md:px-0">
          
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-6 relative">
             <div className="flex justify-center mb-4 text-gold">
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0, opacity: 0, rotate: -180 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "backOut" }}>
                    <Star size={24} className="fill-gold" />
                  </motion.div>
                ))}
             </div>
             <div className="font-serif text-[3.5rem] font-bold text-white leading-none">4.1</div>
             <div className="font-sans text-[1rem] text-white/80 uppercase tracking-widest mt-2">Rating</div>
          </motion.div>

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="p-6 relative">
             <div className="flex justify-center mb-4 text-gold">
                <MessageSquare size={32} />
             </div>
             <div className="font-serif text-[3.5rem] font-bold text-white leading-none">
                <StatCounter target={333} />
             </div>
             <div className="font-sans text-[1rem] text-white/80 uppercase tracking-widest mt-2">Reviews</div>
          </motion.div>

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="p-6 relative">
             <div className="flex justify-center mb-4 text-gold">
                <MapPin size={32} />
             </div>
             <div className="font-serif text-[3.5rem] font-bold text-white leading-none">
                <StatCounter target={2} /><sup className="text-xl font-sans ml-1">km</sup>
             </div>
             <div className="font-sans text-[1rem] text-white/80 uppercase tracking-widest mt-2">from City Center</div>
          </motion.div>

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="p-6 relative group">
             <div className="flex justify-center mb-4 text-gold">
                <motion.div initial={{ scale: 0, rotate: -360, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1, ease: "backOut" }} className="animate-[badgePulse_3s_ease-in-out_infinite] delay-[2s]">
                   <Award size={48} />
                </motion.div>
             </div>
             <div className="font-serif text-[3.5rem] font-bold text-white leading-none">10+</div>
             <div className="font-sans text-[1rem] text-white/80 uppercase tracking-widest mt-2">Years of Excellence</div>
          </motion.div>

        </div>
      </section>

      {/* Location Highlight */}
      <section className="bg-transparent py-[80px] md:py-[120px] px-6 md:px-20 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row shadow-[0_0_32px_rgba(0,0,0,0.08)] rounded-[16px]">
          
          <motion.div initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1, ease: "easeOut" }} className="w-full md:w-1/2 h-[400px] md:h-[600px] relative overflow-hidden rounded-t-[16px] md:rounded-tr-none md:rounded-l-[16px]">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              style={{ border: 0 }} 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.24040974868!2d36.81290610000001!3d-1.2882199000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d655f419c7%3A0xe54d6fae26c63a6a!2sNairobi%20Central%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1715456209587!5m2!1sen!2sus" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="Google Map Location"
              className="grayscale"
            />
          </motion.div>

          <motion.div initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1, ease: "easeOut" }} className="w-full md:w-1/2 p-[40px] md:p-[60px] md:pr-[80px] flex flex-col justify-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  rounded-b-[16px] md:rounded-bl-none md:rounded-r-[16px]">
            <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }} className="font-serif text-[2.5rem] font-bold text-white leading-[1.2] mb-8">
              Perfectly Positioned in Nairobi's Heart
            </motion.h2>

            <ul className="flex flex-col gap-6">
              {ATTRACTIONS.map((attr, idx) => (
                <motion.li key={idx} initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 + idx * 0.15, ease: "backOut" }} className="flex items-center group cursor-pointer">
                  <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 + idx * 0.15, ease: "backOut" }} className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4E5B5] flex items-center justify-center text-2xl mr-5 shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    {attr.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-sans text-[1.125rem] font-semibold text-white mb-1 group-hover:text-gold transition-colors">{attr.title}</h4>
                    <p className="font-sans text-[0.9375rem] text-white/80">{attr.dist}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }} className="mt-10">
              <button className="flex items-center gap-2 border-2 border-gold text-gold font-sans font-semibold text-[1rem] py-4 px-8 rounded-lg hover:bg-gold hover:text-white transition-all group max-w-fit">
                Explore the Area
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
