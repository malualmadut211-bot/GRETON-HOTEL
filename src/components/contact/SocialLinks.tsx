import React from "react";
import { motion } from "motion/react";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"; // Using generic lucide icons for social
import { cn } from "@/lib/utils";

const SOCIALS = [
  { icon: Facebook, name: "facebook", gradient: "from-[#4267B2] to-[#385898]" },
  { icon: Instagram, name: "instagram", gradient: "from-[#E1306C] via-[#C13584] to-[#833AB4]" },
  { icon: Twitter, name: "twitter", gradient: "from-[#1DA1F2] to-[#0D8BD9]" },
  { icon: MessageCircle, name: "tripadvisor", gradient: "from-[#00AF87] to-[#009974]" }, // fallback for tripadvisor
];

export function SocialLinks() {
  return (
    <section className="bg-transparent text-center py-20 -">
      <h3 className="text-[32px] text-white mb-[10px] font-serif">Connect With Us</h3>
      <p className="text-[16px] text-[#6B6B6B] mb-[40px] font-sans">Follow us for exclusive offers and updates</p>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="flex justify-center gap-[20px] flex-wrap"
      >
        {SOCIALS.map((Social, i) => (
          <motion.a
            key={i}
            href="#"
            variants={{
              hidden: { opacity: 0, scale: 0, y: 50 },
              visible: { 
                opacity: 1, scale: 1, y: 0, 
                transition: { type: "spring", bounce: 0.5, duration: 0.6 } 
              }
            }}
            className={cn(
              "w-[60px] h-[60px] rounded-full flex items-center justify-center text-white relative overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_4px_15px_rgba(0,0,0,0.15)] group hover:-translate-y-[10px] hover:scale-115 hover:shadow-[0_8px_25px_rgba(0,0,0,0.25),0_0_30px_rgba(212,175,55,0.3)] bg-gradient-to-br",
              Social.gradient
            )}
          >
             {/* Glow Pulse */}
             <div className="absolute inset-[-4px] rounded-full bg-inherit filter blur-[10px] opacity-0 group-hover:opacity-60 group-hover:animate-[glowPulse_1.5s_ease_infinite] -z-10" />
             
             {/* Ripple */}
             <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] scale-0 group-hover:scale-150 transition-transform duration-500" />
             
             <Social.icon size={24} className="group-hover:scale-110 group-hover:rotate-[360deg] transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] relative z-10" />
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
