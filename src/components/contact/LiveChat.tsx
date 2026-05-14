import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: "hotel" | "user"; time: string }[]>([
    { id: 1, text: "Hello! How can we help you today?", sender: "hotel", time: "Just now" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, sender: "user" as const, time: "Just now" };
    setMessages(p => [...p, newMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(p => [...p, { id: Date.now() + 1, text: "Thank you for reaching out. A concierge member will be with you shortly.", sender: "hotel", time: "Just now" }]);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-[30px] right-[30px] z-[1000]">
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-[70px] h-[70px] rounded-full bg-[linear-gradient(135deg,#D4AF37_0%,#C9A028_100%)] flex items-center justify-center text-white cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.4),0_2px_10px_rgba(0,0,0,0.2)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(212,175,55,0.5),0_4px_15px_rgba(0,0,0,0.25)] animate-[chatPulse_3s_infinite]",
            isOpen && "scale-0 opacity-0 pointer-events-none animate-none" // hide when open
          )}
        >
          <MessageCircle size={32} className="group-hover:rotate-15 group-hover:scale-110 transition-transform" />
          <div className="absolute top-[-5px] right-[-5px] bg-green-500 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.2)] animate-[badgeBounce_2s_infinite]">
            Online
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0, y: 50, x: 50 }}
            transition={{ duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] }} // Back out
            className="fixed bottom-[120px] right-[30px] w-[380px] h-[550px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  rounded-[16px] shadow-[0_8px_40px_rgba(0,0,0,0.2),0_2px_10px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden z-[999] origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[linear-gradient(135deg,#D4AF37_0%,#C9A028_100%)] text-white p-5 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-3">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100" className="w-[45px] h-[45px] rounded-full border-2 border-white object-cover animate-[avatarPulse_2s_infinite]" />
                 <div>
                   <h4 className="font-bold text-lg leading-tight">Greton Hotel</h4>
                   <span className="text-[13px] flex items-center gap-1">
                     <span className="text-green-300 text-lg animate-[statusBlink_2s_infinite] leading-none">●</span> Online
                   </span>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-transparent/20 hover:rotate-90 transition-all text-white">
                 <X size={24} />
               </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 overflow-y-auto bg-[#F5F5F5] flex flex-col gap-4">
              {messages.map(msg => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "max-w-[75%] p-[12px_16px] rounded-[18px] text-[14px] leading-relaxed relative",
                    msg.sender === "hotel" ? "self-start bg-transparent border border-white/20 text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded-bl-[4px]" : "self-end bg-[linear-gradient(135deg,#D4AF37_0%,#C9A028_100%)] text-white rounded-br-[4px]"
                  )}
                >
                  {msg.text}
                  <span className={cn("absolute bottom-[-18px] text-[11px] text-white/60 whitespace-nowrap", msg.sender === "hotel" ? "left-0" : "right-0")}>
                    {msg.time}
                  </span>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="self-start bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  p-[15px_20px] rounded-[18px] rounded-bl-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex gap-[5px] mb-4">
                   <div className="w-2 h-2 bg-gold rounded-full animate-[typingDot_1.4s_infinite]" />
                   <div className="w-2 h-2 bg-gold rounded-full animate-[typingDot_1.4s_infinite_0.2s]" />
                   <div className="w-2 h-2 bg-gold rounded-full animate-[typingDot_1.4s_infinite_0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-[15px_20px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white   flex gap-[10px] shrink-0">
               <input 
                 type="text" 
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 placeholder="Type your message..."
                 className="flex-1 border border-[#E0E0E0] rounded-[24px] px-[20px] py-[12px] text-[14px] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] transition-all"
               />
               <button 
                 type="submit"
                 className="w-[45px] h-[45px] rounded-full bg-[linear-gradient(135deg,#D4AF37_0%,#C9A028_100%)] text-white flex items-center justify-center hover:scale-110 hover:rotate-15 hover:shadow-[0_4px_15px_rgba(212,175,55,0.4)] transition-all active:scale-95"
               >
                 <Send size={20} className="-ml-1" />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
