import React from "react";
import { motion } from "motion/react";
import { Wifi, Dumbbell, Car, Coffee, Briefcase, Bell, Droplet } from "lucide-react";

const AMENITIES = [
  { icon: Wifi, title: "Free Wi-Fi", desc: "High-speed internet throughout property" },
  { icon: Coffee, title: "Restaurant & Bar", desc: "Savor international cuisine and premium beverages in elegant settings" },
  { icon: Car, title: "Free Parking", desc: "Complimentary secure parking for all guests" },
  { icon: Droplet, title: "Swimming Pool", desc: "Rooftop infinity pool with panoramic city views" },
  { icon: Dumbbell, title: "Fitness Center", desc: "State-of-the-art equipment for your wellness routine" },
  { icon: Briefcase, title: "Business Center", desc: "Fully equipped meeting rooms and workspaces" },
];

export default function AmenitiesSection() {
  return (
    <section className="bg-white py-[80px] md:py-[120px] px-6 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-[2.5rem] font-bold text-[#1A1A1A] mb-4">World-Class Amenities</h2>
          <p className="font-sans text-[1.125rem] text-[#666666]">Everything you need for an exceptional stay</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AMENITIES.map((am, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAFAFA] rounded-xl p-10 text-center border border-transparent hover:-translate-y-2.5 hover:border-gold hover:shadow-[0_12px_40px_rgba(0,0,0,0.08),0_0_0_1px_#D4AF37] hover:bg-white transition-all duration-400 group cursor-default"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#D4AF37] to-[#F4E5B5] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(212,175,55,0.2)] bg-[length:100%_100%] group-hover:bg-[length:200%_200%] group-hover:animate-[spin_0.8s_ease-in-out_1] transition-all">
                <am.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform drop-shadow-md" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans text-xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-gold transition-colors duration-300">{am.title}</h3>
              <p className="font-sans text-[0.9375rem] text-[#666666] leading-relaxed">{am.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
