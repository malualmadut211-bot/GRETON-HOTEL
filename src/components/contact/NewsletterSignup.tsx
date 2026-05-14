import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="bg-transparent bg-transparent text-white py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-[600px] h-[600px] border-[1px] border-white rounded-full -top-[300px] -right-[200px]" />
        <div className="absolute w-[800px] h-[800px] border-[1px] border-white rounded-full -bottom-[400px] -left-[200px]" />
      </div>

      <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 border border-gold/30 rounded-full text-gold text-xs font-bold tracking-widest uppercase mb-6 bg-gold/5">
            Exclusive Offers
          </div>
          <h2 className="text-[42px] font-serif mb-4 text-[#F5F5F5]">Join the Greton Family</h2>
          <p className="text-[16px] text-white/60 mb-10 leading-relaxed max-w-lg mx-auto">
            Subscribe to our newsletter for access to secret rates, upcoming events, and stories from Nairobi.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
             <input 
               type="email" 
               placeholder="Your email address" 
               required
               value={email}
               onChange={e => setEmail(e.target.value)}
               disabled={status !== "idle"}
               className={cn(
                 "w-full h-[60px] rounded-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold focus:bg-white/10 transition-all pr-[140px]",
                 status === "success" && "border-green-500 bg-green-500/5 text-green-400"
               )}
             />
             <div className="absolute right-[6px] top-1/2 -translate-y-1/2">
               <button 
                 type="submit"
                 disabled={status !== "idle"}
                 className={cn(
                   "h-[48px] px-8 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-400",
                   status === "idle" ? "bg-gold text-white hover:bg-[#C9A028] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" : 
                   status === "loading" ? "bg-gold/50 text-white cursor-not-allowed" : 
                   "bg-green-500 text-white pointer-events-none"
                 )}
               >
                 {status === "idle" ? (
                   <>Subscribe <Send size={16} /></>
                 ) : status === "loading" ? (
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <><CheckCircle2 size={18} /> Subscribed</>
                 )}
               </button>
             </div>
          </form>

          <p className="mt-4 text-xs text-white/60">
            By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
