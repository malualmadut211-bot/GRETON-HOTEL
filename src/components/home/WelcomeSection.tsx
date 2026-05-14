import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { animate, onScroll, stagger, splitText } from "animejs";

export default function WelcomeSection() {
  useEffect(() => {
    // a) Split text — words fly in as you scroll down
    const headingSplit = splitText('.about-heading', { words: true });
    animate(headingSplit.words, {
      opacity: [0, 1],
      y: [40, 0],
      delay: stagger(80),
      autoplay: onScroll({ sync: 'play' }),
    });

    // b) Paragraph lines fade in staggered
    const bodySplit = splitText('.about-body', { lines: true });
    animate(bodySplit.lines, {
      opacity: [0, 1],
      x: [-20, 0],
      delay: stagger(100),
      autoplay: onScroll({ sync: 'play' }),
    });
  }, []);

  return (
    <section className="bg-[#FAFAFA] py-[80px] md:py-[120px] px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        
        {/* Left Column */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center">
          <motion.div
             initial={{ width: 0 }}
             whileInView={{ width: 60 }}
             viewport={{ once: true, margin: "-20%" }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="h-[4px] bg-gradient-to-r from-gold to-transparent mb-6"
          />
          <h2 
            className="about-heading font-serif text-[clamp(2rem,5vw,3rem)] font-bold text-[#1A1A1A] leading-[1.2] mb-6"
          >
            Welcome to Greton Hotel
          </h2>

          <p 
            className="about-body font-sans text-[1.125rem] text-[#4A4A4A] leading-[1.8] max-w-[600px] mb-8 font-light"
          >
            Nestled in the vibrant heart of Nairobi's Central Business District, 
            Greton Hotel seamlessly blends contemporary luxury with authentic Kenyan 
            hospitality. Our prime location places you within walking distance of 
            the Maasai Market's vibrant crafts and just 2km from Nairobi's historic 
            Train Station. Whether you're here for business or leisure, experience 
            a sanctuary of comfort where modern amenities meet timeless elegance.
          </p>

          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-20%" }}
             transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <Link to="/about" className="group inline-flex items-center text-gold font-sans font-semibold text-[1rem] relative pb-1">
              <span>Discover Our Story</span>
              <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-400 group-hover:translate-x-1" />
              <div className="absolute bottom-0 left-0 h-[2px] bg-gold w-0 group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" />
            </Link>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[40%]">
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="relative aspect-[4/5] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-gray-200 group overflow-hidden block"
          >
            <motion.div
              className="absolute inset-[8px] border-2 border-gold/20 rounded-[18px] z-20 pointer-events-none"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 1 }}
            />
            <motion.img 
              initial={{ clipPath: "circle(0% at 50% 50%)", scale: 1.2 }}
              whileInView={{ clipPath: "circle(150% at 50% 50%)", scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 1 }}
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1500&auto=format&fit=crop"
              alt="Luxury suite detail"
              className="w-full h-full object-cover transition-all duration-600 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.08] group-hover:contrast-[1.05] cursor-zoom-in"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
