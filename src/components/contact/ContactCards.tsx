import React from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    title: "Call Us",
    detail: "+254 701 110010",
    subtext: "Available 24/7",
    btnLabel: "Tap to Call",
    link: "tel:+254701110010",
    icon: Phone,
    iconGlow: "group-hover:animate-[phoneRing_0.6s_ease-in-out_infinite]"
  },
  {
    title: "Email Us",
    detail: "info@gretonhotel.com",
    subtext: "We reply within 24 hours",
    btnLabel: "Send Email",
    link: "mailto:info@gretonhotel.com",
    icon: Mail,
    iconGlow: "group-hover:animate-[envelopeFlip_0.8s_ease-in-out]"
  },
  {
    title: "Visit Us",
    detail: "Tsavo Road, Nairobi",
    subtext: "PR8G+Q9", // Plus code look
    btnLabel: "Get Directions",
    link: "https://maps.google.com",
    icon: MapPin,
    iconGlow: "group-hover:animate-[pinBounce_0.6s_ease-in-out]"
  }
];

export function ContactCards() {
  return (
    <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-24 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.2, ease: [0.4, 0.0, 0.2, 1] }}
            className="bg-white rounded-xl border border-gold/20 p-8 flex flex-col items-center text-center group hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_20px_rgba(0,0,0,0.06)] h-[320px]"
          >
            <div className="w-[80px] h-[80px] rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6 group-hover:scale-115 transition-transform duration-300 relative">
               <div className={cn("relative z-10", card.iconGlow)}>
                 <card.icon size={32} />
               </div>
            </div>
            <h3 className="font-bold text-[28px] text-[#2C2C2C] mb-2">{card.title}</h3>
            <p className="text-[20px] text-gold font-medium mb-1">{card.detail}</p>
            <p className={cn("text-[16px] text-gray-500 line-clamp-1 flex-1", card.title === "Visit Us" && "font-mono text-[14px]")}>
              {card.subtext}
            </p>
            
            <a 
              href={card.link}
              className="w-full py-3 mt-4 rounded-lg bg-gold/10 text-gold font-bold transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              <card.icon size={16} />
              {card.btnLabel}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
