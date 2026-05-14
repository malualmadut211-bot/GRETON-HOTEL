import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReservationForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "", time: "", party: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const FloatingInput = ({ name, label, type = "text", ...props }: any) => {
    const isFocused = focusedField === name;
    const hasValue = formData[name as keyof typeof formData].length > 0;
    const isActive = isFocused || hasValue;

    return (
      <div className="relative mb-[30px]">
        <input 
          id={name}
          type={type}
          value={formData[name as keyof typeof formData]}
          onChange={(e) => setFormData(p => ({ ...p, [name]: e.target.value }))}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          className={cn(
            "w-full h-[56px] px-[20px] pb-2 pt-6 border-2 rounded-[12px] bg-white/5 backdrop-blur-md font-sans text-[16px] text-white transition-all duration-300 outline-none",
            isFocused ? "border-gold border border-white/20 shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-white/20",
            hasValue && !isFocused && "border-green-500 bg-green-500/5"
          )}
          {...props}
        />
        <label 
          htmlFor={name}
          className={cn(
            "absolute left-[20px] transition-all duration-300 pointer-events-none origin-left font-sans",
            isActive ? "top-[8px] text-[12px] font-semibold text-gold tracking-[0.05em]" : "top-1/2 -translate-y-1/2 text-[16px] text-[#9E9E9E]"
          )}
        >
          {label}
        </label>
        {/* Valid Icon */}
        <AnimatePresence>
          {hasValue && !isFocused && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
            >
              <Check size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="bg-transparent bg-transparent py-[100px]">
      <motion.div 
         initial={{ opacity: 0, y: -40, scale: 0.95 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
         viewport={{ once: true, margin: "-20%" }}
         transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
         className="text-center"
      >
        <h2 className="font-serif text-[clamp(2.5rem,5vw,3.8rem)] text-white mb-5">Reserve Your Experience</h2>
        <p className="font-sans text-[1.125rem] text-gold tracking-[0.05em] mb-[60px]">Secure your table in moments</p>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 40 }}
         whileInView={{ opacity: 1, scale: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
         className="max-w-[800px] mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  rounded-[20px] p-[30px] md:p-[50px] shadow-[0_15px_60px_rgba(0,0,0,0.08)]"
      >
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form 
               key="form"
               exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
               onSubmit={handleSubmit}
               className="flex flex-col gap-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px]">
                 <FloatingInput name="name" label="Full Name" required />
                 <FloatingInput name="email" label="Email Address" type="email" required />
              </div>
              
              <div className="w-full">
                 <FloatingInput name="phone" label="Phone Number" type="tel" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[30px]">
                 <FloatingInput name="date" label="Date" type="date" required />
                 
                 <div className="relative mb-[30px]">
                    <select 
                      id="time"
                      value={formData.time}
                      onChange={e => setFormData(p => ({...p, time: e.target.value}))}
                      onFocus={() => setFocusedField("time")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "w-full h-[56px] px-[20px] pb-2 pt-6 border-2 rounded-[12px] bg-white/5 backdrop-blur-md font-sans text-[16px] text-white transition-all duration-300 outline-none appearance-none cursor-pointer",
                        focusedField === "time" ? "border-gold border border-white/20 shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-white/20"
                      )}
                      required
                    >
                      <option value="" disabled hidden></option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                    <label className={cn("absolute left-[20px] transition-all duration-300 pointer-events-none origin-left font-sans", formData.time || focusedField === "time" ? "top-[8px] text-[12px] font-semibold text-gold tracking-[0.05em]" : "top-1/2 -translate-y-1/2 text-[16px] text-[#9E9E9E]")}>Time</label>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">▼</div>
                 </div>

                 <div className="relative mb-[30px]">
                    <select 
                      id="party"
                      value={formData.party}
                      onChange={e => setFormData(p => ({...p, party: e.target.value}))}
                      onFocus={() => setFocusedField("party")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "w-full h-[56px] px-[20px] pb-2 pt-6 border-2 rounded-[12px] bg-white/5 backdrop-blur-md font-sans text-[16px] text-white transition-all duration-300 outline-none appearance-none cursor-pointer",
                        focusedField === "party" ? "border-gold border border-white/20 shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-white/20"
                      )}
                      required
                    >
                      <option value="" disabled hidden></option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests (Call to confirm)</option>
                    </select>
                    <label className={cn("absolute left-[20px] transition-all duration-300 pointer-events-none origin-left font-sans", formData.party || focusedField === "party" ? "top-[8px] text-[12px] font-semibold text-gold tracking-[0.05em]" : "top-1/2 -translate-y-1/2 text-[16px] text-[#9E9E9E]")}>Party Size</label>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">▼</div>
                 </div>
              </div>

              <div className="relative mb-[40px]">
                 <textarea 
                   id="notes"
                   value={formData.notes}
                   onChange={e => setFormData(p => ({...p, notes: e.target.value}))}
                   onFocus={() => setFocusedField("notes")}
                   onBlur={() => setFocusedField(null)}
                   className={cn(
                     "w-full min-h-[120px] max-h-[200px] px-[20px] pt-8 pb-3 border-2 rounded-[12px] bg-transparent font-sans text-[16px] text-[#3E2723] transition-all duration-300 outline-none resize-y",
                     focusedField === "notes" ? "border-gold bg-transparent border border-white/20 shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-[#E0E0E0]"
                   )}
                 />
                 <label className={cn("absolute left-[20px] transition-all duration-300 pointer-events-none origin-left font-sans", formData.notes || focusedField === "notes" ? "top-[12px] text-[12px] font-semibold text-gold tracking-[0.05em]" : "top-[20px] text-[16px] text-[#9E9E9E]")}>Special Requests (Optional)</label>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full h-[64px] rounded-[32px] font-sans uppercase font-bold text-[18px] tracking-[0.15em] transition-all duration-400 relative overflow-hidden group",
                  loading ? "bg-gray-300 text-white/60 cursor-not-allowed shadow-[0_5px_15px_rgba(0,0,0,0.1)]" : "bg-[linear-gradient(135deg,#D4AF37_0%,#C19A3A_100%)] text-[#2C1810] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:-translate-y-0.5 hover:shadow-[0_15px_50px_rgba(212,175,55,0.5)] active:translate-y-0 active:scale-[0.98]"
                )}
              >
                 {!loading ? (
                   <>
                     <span className="relative z-10">Reserve My Table</span>
                     <div className="absolute inset-0 w-[50%] h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] -translate-x-[150%] skew-x-[-20deg] animate-[shineSweep_8s_ease-in-out_infinite]" />
                   </>
                 ) : (
                   <div className="w-8 h-8 mx-auto border-4 border-[#2C1810]/20 border-t-[#2C1810] rounded-full animate-spin" />
                 )}
              </button>

            </motion.form>
          ) : (
            <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-10"
            >
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", delay: 0.2 }}
                 className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center text-white"
               >
                 <Check size={48} />
               </motion.div>
               <motion.h3 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.5 }}
                 className="font-serif text-[32px] text-gold font-bold mb-4"
               >
                 Reservation Confirmed!
               </motion.h3>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.8 }}
                 className="bg-gold/10 p-6 rounded-xl inline-block text-left"
               >
                 <p><strong>Name:</strong> {formData.name}</p>
                 <p><strong>Date:</strong> {formData.date} at {formData.time}</p>
                 <p><strong>Party:</strong> {formData.party} Guests</p>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
