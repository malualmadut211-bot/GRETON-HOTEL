import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Droplet, Dumbbell, Utensils, Wifi, Coffee, Sparkles, Briefcase, Car, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "restaurant", name: "Restaurant & Bar" },
  { id: "pool", name: "Infinity Pool" },
  { id: "fitness", name: "Fitness Center" },
  { id: "business", name: "Business Center" },
];

export default function Amenities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);
  const [isNavSticky, setIsNavSticky] = useState(false);

  // Parallax layers for Hero
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > 400); // adjust based on hero height

      // Check which section is in view
      const sections = NAV_ITEMS.map(i => document.getElementById(i.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && window.scrollY >= sec.offsetTop - 200) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="bg-[#fcfaeb] min-h-screen font-sans overflow-x-hidden pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex flex-col justify-end pb-20 items-center overflow-hidden bg-[#1A1A1A]">
        {/* Layer 1 - Background */}
        <motion.div style={{ y: yBg1 }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          <img 
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2560" 
            alt="Wide pool panorama" 
            className="w-full h-full object-cover blur-[2px] opacity-60 mix-blend-luminosity brightness-75 scale-105 animate-[kenBurns_20s_infinite_alternate]"
          />
        </motion.div>

        {/* Layer 2 - Mid-ground */}
        <motion.div style={{ y: yBg2 }} className="absolute inset-0 w-full h-[150%] -top-[20%] z-10 opacity-70 animate-[float_4s_ease-in-out_infinite]">
          <div className="absolute inset-x-0 top-1/3 h-64 bg-gradient-to-b from-transparent via-[#1a1a1a]/50 to-transparent shadow-[0_50px_100px_rgba(0,0,0,0.3)]"></div>
        </motion.div>

        {/* Content */}
        <div className="relative z-20 text-center text-white px-6 w-full max-w-7xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-[clamp(40px,6vw,84px)] font-serif font-bold text-white mb-4 relative overflow-hidden"
          >
            World-Class Amenities
            {/* Shimmer overlay */}
            <motion.div 
               initial={{ left: "-100%" }}
               animate={{ left: "100%" }}
               transition={{ duration: 1.5, delay: 1.5 }}
               className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent -skew-x-[20deg]"
            />
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 1.5, ease: "easeOut" }}
            className="text-[clamp(18px,2vw,24px)] font-serif italic text-white/90 tracking-wide"
          >
            Everything you need, all in one place
          </motion.p>
          
          {/* Animated Icon Row */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { 
                opacity: 1, y: 0, 
                transition: { duration: 0.4, staggerChildren: 0.08, delayChildren: 0.3 } 
              }
            }}
            className="flex gap-4 sm:gap-6 mt-16 flex-wrap justify-center"
          >
            {[Droplet, Dumbbell, Utensils, Wifi, Coffee, Sparkles, Briefcase, Car].map((Icon, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { scale: 0, rotate: -180 },
                  visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 10 } }
                }}
                className="group relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:-rotate-6 hover:shadow-[0_10px_20px_rgba(212,175,55,0.4)]"
                style={{
                   animation: `floatIcon 3s ease-in-out infinite alternate`,
                   animationDelay: `${i * 0.2}s`
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#D4AF37,#F4E5B8)] rounded-full scale-0 group-hover:scale-[1.3] opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <Icon size={24} className="text-white group-hover:text-gold transition-colors duration-300 relative z-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. NAVIGATION PILLS */}
      <div className={cn(
        "z-50 w-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isNavSticky ? "fixed top-[70px] lg:top-[90px] bg-white/95 backdrop-blur-[20px] saturate-[180%] shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-black/5" : "relative bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative px-6 py-3 rounded-full text-[13px] md:text-[14px] uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                  isActive ? "text-[#1a1a1a] font-bold" : "text-[#333] font-medium hover:text-gold hover:-translate-y-0.5 hover:bg-gold/10"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="amenityNavActive"
                    className="absolute inset-0 bg-[linear-gradient(135deg,#D4AF37_0%,#F4E5B8_100%)] rounded-full -z-10 shadow-[0_4px_15px_rgba(212,175,55,0.35)]"
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                  />
                )}
                {item.name}
              </button>
            )
          })}
        </div>
        
        {/* Reading Progress */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-gold to-[#F4E5B8] origin-left z-[100] shadow-[0_2px_10px_rgba(212,175,55,0.3)]" style={{ width: "100%", transform: `scaleX(${scrollYProgress.get()})` }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20 divide-y divide-gray-200/50">

        {/* 3. RESTAURANT & BAR (Image Right) */}
        <section id="restaurant" className="py-24 flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <div className="flex-1 w-full relative z-10">
            <motion.div 
               initial={{ opacity: 0, x: -60, filter: "blur(5px)" }}
               whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="mb-6 inline-flex p-4 rounded-full bg-gold/10 relative overflow-hidden group">
                 <Utensils size={32} className="text-gold group-hover:scale-110 transition-transform" />
                 <motion.div initial={{ left: "-100%" }} whileInView={{ left: "100%" }} transition={{ duration: 1, delay: 0.5 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent skew-x-12" />
              </div>
              <h2 className="text-[40px] lg:text-[50px] font-serif text-[#1a1a1a] mb-6 leading-tight">
                <span className="text-gold">Sports Bar</span> & Grill
              </h2>
              <div className="h-[3px] w-20 bg-gradient-to-r from-gold to-[#e63946] mb-8" />
              
              <p className="text-[16px] xl:text-[18px] text-[#444] leading-[1.8] mb-10">
                Savor local and international cuisine in our vibrant sports bar featuring indoor and outdoor seating. Watch live games while enjoying expertly crafted meals and drinks.
              </p>

              <ul className="space-y-4 mb-10">
                {["Indoor & Outdoor Seating", "Live Sports Broadcasts", "International & Local Cuisine", "Full Bar Service"].map((feat, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -30 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                    className="flex items-center gap-4 text-[#1a1a1a] font-medium group"
                  >
                    <div className="w-6 h-6 rounded-full bg-[linear-gradient(135deg,#D4AF37,#F4E5B8)] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(212,175,55,0.3)] group-hover:scale-110 group-hover:rotate-12 transition-all">
                      ✓
                    </div>
                    <span className="group-hover:text-gold group-hover:translate-x-1 transition-all">{feat}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#f5f5f5] to-[#e8e8e8] border-2 border-gold rounded-full shadow-sm mb-10">
                <span className="text-2xl animate-[spin_60s_linear_infinite]">🕐</span>
                <span className="font-sans font-bold text-[#333] tracking-wider">Daily 6:00 AM - 11:00 PM</span>
              </div>

              <br />

              <motion.button 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="group relative overflow-hidden bg-[linear-gradient(135deg,#D4AF37_0%,#F4E5B8_100%)] text-[#1a1a1a] font-bold uppercase tracking-widest rounded-full px-10 py-4 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(212,175,55,0.6)] transition-all duration-400"
              >
                <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                   📄 View Menu <span className="group-hover:translate-x-2 opacity-70 group-hover:opacity-100 transition-all font-serif">→</span>
                </span>
                <div className="absolute inset-0 bg-[rgba(255,255,255,0.2)] scale-0 group-hover:scale-[3] transition-transform duration-700 rounded-full origin-center" />
              </motion.button>

            </motion.div>
          </div>

          {/* Image Gallery */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
             <motion.div 
               initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", scale: 1.15 }}
               whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1.05 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="md:col-span-1 md:row-span-2 h-[300px] md:h-full rounded-2xl overflow-hidden relative group"
             >
                <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1400" className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-700" />
             </motion.div>
             <motion.div 
               initial={{ clipPath: "circle(0% at 50% 50%)", scale: 1.2, rotate: -5 }}
               whileInView={{ clipPath: "circle(100% at 50% 50%)", scale: 1, rotate: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
               className="h-[200px] md:h-[240px] rounded-2xl overflow-hidden relative group"
             >
                <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-700" />
             </motion.div>
             <motion.div 
               initial={{ clipPath: "inset(100% 0 0 0)", filter: "saturate(0%)" }}
               whileInView={{ clipPath: "inset(0 0 0 0)", filter: "saturate(120%)" }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
               className="hidden md:block h-[200px] md:h-[240px] rounded-2xl overflow-hidden relative group"
             >
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000" className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-700" />
             </motion.div>
          </div>
        </section>

        {/* 4. POOL SECTION (Image Left, Video BG simulation) */}
        <section id="pool" className="py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative">
          
          {/* Image */}
          <motion.div 
             className="flex-1 w-full order-2 lg:order-1"
             initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 }}
             whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(2,119,189,0.15)] group flex items-center justify-center bg-blue-100">
                <img src="https://images.unsplash.com/photo-1582604689456-11f0a071f11e?q=80&w=1400" className="w-full h-full object-cover group-hover:scale-105 group-hover:saturate-150 transition-all duration-700 filter brightness-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0277BD]/40 to-transparent mix-blend-overlay" />
                {/* Ripples */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
             </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <div className="mb-6 relative w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_8px_rgba(2,119,189,0.3)]">
                <defs>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4FC3F7" />
                    <stop offset="100%" stopColor="#0277BD" />
                  </linearGradient>
                </defs>
                <motion.path 
                  d="M50,10 Q50,40 30,60 Q50,80 50,80 Q50,80 70,60 Q50,40 50,10 Z" 
                  fill="url(#waterGrad)"
                  initial={{ strokeDasharray: 300, strokeDashoffset: 300, fillOpacity: 0, y: -20 }}
                  whileInView={{ strokeDashoffset: 0, fillOpacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="animate-[pulse_3s_ease-in-out_infinite]"
                />
              </svg>
            </div>
            
            <h2 className="text-[40px] lg:text-[50px] font-serif text-[#1a1a1a] mb-6 leading-tight">
              Refreshing <span className="text-[#0277BD]">Pool</span> Experience
            </h2>
            
            <p className="text-[16px] xl:text-[18px] text-[#444] leading-[1.8] mb-8">
              Dive into relaxation in our temperature-controlled infinity pool overlooking the city skyline. Complete with private cabanas and signature towel service.
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-10">
               {["Olympic Size (50m)", "Heated Year-Round", "Towels Provided", "Poolside Loungers", "Lifeguard on Duty", "Kids' Area"].map((feat, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <Droplet size={14} className="text-[#4FC3F7]" />
                   <span className="text-[15px] font-medium text-[#333]">{feat}</span>
                 </div>
               ))}
            </div>

            <button className="relative overflow-hidden px-10 py-4 bg-[linear-gradient(135deg,#4FC3F7_0%,#0277BD_100%)] text-white font-bold uppercase tracking-widest rounded-full shadow-[0_8px_25px_rgba(2,119,189,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(2,119,189,0.6)] transition-all duration-300 group">
              View Gallery
            </button>
          </div>
        </section>

        {/* 5. FITNESS CENTER (Image Right, Staggered Grid) */}
        <section id="fitness" className="py-24 flex flex-col-reverse lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="flex-1 w-full">
            <h2 className="text-[40px] lg:text-[50px] font-serif text-[#1a1a1a] mb-6 leading-tight">
              State-of-the-Art <span className="text-gray-500">Fitness</span>
            </h2>
            
            <p className="text-[16px] xl:text-[18px] text-[#444] leading-[1.8] mb-10">
              Maintain your routine in our fully equipped gymnasium featuring the latest cardio machines, free weights, and dedicated yoga spaces.
            </p>

            {/* Equipment Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
               {["Treadmills", "Free Weights", "Bench Press", "Ellipticals", "Yoga Mats", "Rowing Machines"].map((equip, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0, rotate: -180, filter: "blur(10px)" }}
                   whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
                   className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-gold transition-all duration-300 group cursor-pointer relative"
                 >
                    <Dumbbell size={32} className="text-gray-400 group-hover:text-gold mb-3 transition-colors" />
                    <span className="text-[13px] font-bold text-[#333] tracking-wide text-center">{equip}</span>
                    <div className="absolute top-2 right-2 scale-0 group-hover:scale-100 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
                    </div>
                 </motion.div>
               ))}
            </div>

            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring" }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#1a1a1a] text-white rounded-full font-bold uppercase tracking-widest text-[13px] shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform"
            >
              🏋️ Personal Training Available
            </motion.div>
          </div>

          <div className="flex-1 w-full">
            <motion.div 
               initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
               whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="aspect-square relative rounded-[40px] overflow-hidden group"
            >
               <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1400" className="w-full h-full object-cover filter contrast-125 group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>
        </section>

        {/* 6. BUSINESS CENTER (Image Left, Tech Theme) */}
        <section id="business" className="py-24 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="flex-1 w-full order-2 lg:order-1">
             <div className="relative group perspective-[1000px]">
               <motion.div 
                 initial={{ opacity: 0, rotateY: -90, z: -100 }}
                 whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="aspect-[3/4] max-w-[400px] mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 preserve-3d"
                 style={{ transformStyle: 'preserve-3d' }}
               >
                 <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400" className="w-full h-full object-cover" />
                 {/* Tech Overlay lines */}
                 <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.05)_0px,transparent_1px,transparent_4px)]" />
                 <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-6 rounded-2xl border border-white translate-z-[50px] shadow-xl">
                    <h4 className="font-bold text-[#1a1a1a] mb-2">Private Meeting Rooms</h4>
                    <ul className="text-sm text-[#444] space-y-1">
                      <li>• Capacity: 8-12 people</li>
                      <li>• 4K Video Conferencing</li>
                      <li>• Smart Whiteboards</li>
                    </ul>
                 </div>
               </motion.div>
             </div>
          </div>

          <div className="flex-1 w-full order-1 lg:order-2">
            <h2 className="text-[40px] lg:text-[50px] font-serif text-[#1a1a1a] mb-6 leading-tight">
              Executive <span className="relative">Business<span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400"></span></span> Center
            </h2>
            
            <p className="text-[16px] xl:text-[18px] text-[#444] leading-[1.8] mb-10">
              Seamless productivity awaits in our business center, offering high-speed connectivity, private meeting rooms, and administrative support.
            </p>

            {/* Tech Specs */}
            <div className="flex gap-12 mb-10 pb-10 border-b border-gray-200">
               <div>
                  <div className="text-[40px] font-bold text-cyan-600 tracking-tighter shadow-cyan-400/50 drop-shadow-md">
                     <span className="text-[20px]">Up to </span>1000<span className="text-[20px]"> Mbps</span>
                  </div>
                  <div className="text-[13px] font-bold uppercase tracking-widest text-[#999]">Fiber Internet Speed</div>
               </div>
               <div>
                  <div className="text-[40px] font-bold text-cyan-600 tracking-tighter drop-shadow-md">24/7</div>
                  <div className="text-[13px] font-bold uppercase tracking-widest text-[#999]">Secure Access</div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["High-Speed Internet", "Printing & Scanning", "Video Conferencing", "Office Supplies"].map((srv, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-sm animate-pulse" />
                  <span className="font-mono text-sm text-[#333]">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* 7. ADDITIONAL SERVICES (Radial Reveal Grid) */}
      <section className="bg-white py-32 px-6 border-y border-gray-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[40px] font-serif text-[#1a1a1a]">Always At Your Service</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Laundry Service", icon: Wind, desc: "Professional cleaning and pressing" },
              { title: "Room Service", icon: Coffee, desc: "24/7 dining brought to your door" },
              { title: "Valet Parking", icon: Car, desc: "Complimentary for executive guests" },
              { title: "Concierge", icon: Briefcase, desc: "Local tours and booking assistance" },
              { title: "Free Wi-Fi", icon: Wifi, desc: "Seamless roaming across the property" },
              { title: "Spa & Wellness", icon: Sparkles, desc: "Rejuvenating treatments and massages" },
            ].map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: (Math.abs(i - 2.5) * 0.1) }} // Radial stagger
                className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1),0_0_30px_rgba(212,175,55,0.1)] hover:-translate-y-2 transition-all duration-400 group cursor-pointer text-center flex flex-col items-center relative overflow-hidden"
              >
                 <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] transition-all">
                   <srv.icon size={32} className="text-gray-400 group-hover:text-gold transition-colors" />
                 </div>
                 <h3 className="text-[20px] font-bold text-[#1a1a1a] mb-2">{srv.title}</h3>
                 <p className="text-[15px] text-[#666]">{srv.desc}</p>
                 {i === 1 && <span className="mt-4 px-4 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">24/7 Available</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GRAND FINALE CTA */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1a1a1a_0%,#2d2d2d_25%,#D4AF37_50%,#2d2d2d_75%,#1a1a1a_100%)] bg-[length:400%_400%] animate-[gradientShift_15s_ease_infinite]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] animate-[patternSlide_20s_linear_infinite]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[40px] md:text-[60px] font-serif text-white mb-6 leading-tight relative overflow-hidden"
          >
            Experience Comfort Like Never Before
            {/* Shimmer */}
            <motion.div initial={{ left: "-100%" }} whileInView={{ left: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 1 }} className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/50 to-transparent skew-x-12" />
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[18px] md:text-[22px] text-white/80 font-serif italic mb-12"
          >
            Book your stay and enjoy all our <span className="text-gold">premium amenities</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", bounce: 0.4 }}
          >
            <Link 
              to="/contact" 
              className="inline-block relative bg-[linear-gradient(135deg,#D4AF37_0%,#F4E5B8_100%)] text-[#1a1a1a] font-bold text-[18px] uppercase tracking-widest px-16 py-6 rounded-full shadow-[0_8px_30px_rgba(212,175,55,0.4),inset_0_2px_10px_rgba(255,255,255,0.5)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_50px_rgba(212,175,55,0.7),inset_0_2px_15px_rgba(255,255,255,0.8)] transition-all duration-300 animate-[buttonPulse_2s_ease-in-out_infinite]"
            >
              Reserve Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
