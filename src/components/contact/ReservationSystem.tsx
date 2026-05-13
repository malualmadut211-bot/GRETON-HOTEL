import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const ROOMS = [
  { id: "deluxe", name: "Deluxe City View", price: 120, img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800" },
  { id: "suite", name: "Executive Suite", price: 250, img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800" },
  { id: "family", name: "Family Interconnecting", price: 180, img: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=800" },
  { id: "penthouse", name: "Presidential Penthouse", price: 850, img: "https://images.unsplash.com/photo-1502672260266-1c1c24240f58?q=80&w=800" }
];

export function ReservationSystem() {
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    name: "", email: "", phone: "", checkIn: "", checkOut: "", roomType: ROOMS[0].id, guests: "2", requests: ""
  });

  const [nights, setNights] = useState(1);
  const selectedRoom = ROOMS.find(r => r.id === form.roomType) || ROOMS[0];

  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const inDate = new Date(form.checkIn);
      const outDate = new Date(form.checkOut);
      const diff = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
      setNights(diff > 0 ? diff : 1);
    }
  }, [form.checkIn, form.checkOut]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const FloatingInput = ({ label, name, type = "text", required = false, ...props }: any) => {
    const isFocused = focused === name;
    const hasValue = !!form[name as keyof typeof form];
    const isFloating = isFocused || hasValue;
    const isValid = hasValue && !isFocused; // simplified valid state

    return (
      <div className="relative mb-6">
        <input
          type={type}
          id={name}
          required={required}
          value={form[name as keyof typeof form]}
          onChange={e => setForm({...form, [name]: e.target.value})}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          className={cn(
            "w-full h-[54px] px-[20px] rounded-lg border-2 bg-white text-[16px] transition-all duration-300 outline-none",
            isFocused ? "border-gold shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-[#E0E0E0]",
            isValid && "border-green-500 pr-[50px]"
          )}
          {...props}
        />
        <label 
          htmlFor={name}
          className={cn(
            "absolute left-[20px] transition-all duration-300 pointer-events-none text-gray-400 bg-white px-1 font-sans",
            isFloating ? "top-0 -translate-y-[50%] text-[12px] font-semibold text-gold" : "top-1/2 -translate-y-1/2 text-[14px]"
          )}
        >
          {label}
        </label>
        {isValid && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute right-[20px] top-1/2 -translate-y-1/2 text-green-500">
            ✓
          </motion.div>
        )}
      </div>
    );
  };

  const subtotal = selectedRoom.price * nights;
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* LEFT COLUMN: FORM */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center h-[500px] flex flex-col items-center justify-center"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle size={48} />
              </motion.div>
              <h3 className="text-3xl font-serif text-black mb-4">Reservation Confirmed!</h3>
              <p className="text-green-800 mb-8">We've sent your booking details and confirmation number to your email.</p>
              <div className="bg-white p-6 rounded-lg shadow-sm text-left w-full max-w-sm space-y-3 mx-auto">
                <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-semibold">{form.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Check-in</span><span className="font-semibold">{form.checkIn}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Room</span><span className="font-semibold text-right max-w-[160px] truncate">{selectedRoom.name}</span></div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl font-serif text-[#2C2C2C] mb-8">Secure Your Stay</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FloatingInput name="name" label="Full Name" required />
                <FloatingInput name="email" label="Email Address" type="email" required />
              </div>
              
              <FloatingInput name="phone" label="Phone Number" type="tel" required />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FloatingInput name="checkIn" label="Check-in Date" type="date" required />
                <FloatingInput name="checkOut" label="Check-out Date" type="date" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <div className="relative mb-6">
                  <select 
                    value={form.roomType}
                    onChange={e => setForm({...form, roomType: e.target.value})}
                    onFocus={() => setFocused("roomType")}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      "w-full h-[54px] px-[20px] rounded-lg border-2 bg-white text-[16px] transition-all duration-300 outline-none appearance-none cursor-pointer",
                      focused === "roomType" ? "border-gold shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-[#E0E0E0]"
                    )}
                  >
                    {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name} - ${r.price}</option>)}
                  </select>
                  <label className="absolute left-[20px] top-0 -translate-y-1/2 text-[12px] font-semibold text-gold bg-white px-1">Room Type</label>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                </div>

                <div className="relative mb-6">
                  <select 
                    value={form.guests}
                    onChange={e => setForm({...form, guests: e.target.value})}
                    onFocus={() => setFocused("guests")}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      "w-full h-[54px] px-[20px] rounded-lg border-2 bg-white text-[16px] transition-all duration-300 outline-none appearance-none cursor-pointer",
                      focused === "guests" ? "border-gold shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-[#E0E0E0]"
                    )}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                  <label className="absolute left-[20px] top-0 -translate-y-1/2 text-[12px] font-semibold text-gold bg-white px-1">Guests</label>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
                </div>
              </div>

              <div className="relative mb-8">
                <textarea 
                  value={form.requests}
                  onChange={e => setForm({...form, requests: e.target.value})}
                  onFocus={() => setFocused("requests")}
                  onBlur={() => setFocused(null)}
                  className={cn(
                    "w-full min-h-[120px] max-h-[200px] p-[20px] rounded-lg border-2 bg-white text-[16px] transition-all duration-300 outline-none resize-y",
                    focused === "requests" ? "border-gold shadow-[0_0_0_4px_rgba(212,175,55,0.1)]" : "border-[#E0E0E0]"
                  )}
                />
                <label className={cn(
                  "absolute left-[20px] transition-all duration-300 pointer-events-none bg-white px-1",
                  focused === "requests" || form.requests ? "top-0 -translate-y-1/2 text-[12px] font-semibold text-gold" : "top-5 text-[14px] text-gray-400"
                )}>
                  Special Requests (Optional)
                </label>
                <div className={cn("absolute bottom-3 right-4 text-xs font-mono transition-colors", form.requests.length >= 200 ? "text-red-500 font-bold" : form.requests.length >= 180 ? "text-orange-500" : "text-gray-400")}>
                  {form.requests.length}/200
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={cn(
                  "w-full h-[60px] rounded-lg font-semibold text-[18px] transition-all duration-300 relative overflow-hidden flex items-center justify-center",
                  loading ? "bg-gradient-to-br from-[#B8941F] to-[#A17D1A] text-transparent pointer-events-none" : "bg-[linear-gradient(135deg,#D4AF37_0%,#C9A028_100%)] text-white shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:-translate-y-[2px]"
                )}
              >
                {!loading && <span className="relative z-10">Book Now</span>}
                {/* Glow effect on hover */}
                {!loading && <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 scale-0 hover:scale-100 transition-transform duration-600 rounded-full" />}
                
                {loading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* RIGHT COLUMN: SUMMARY */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="bg-[#FAF9F6] border-2 border-gold rounded-xl p-8 sticky top-[100px] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <h3 className="font-serif text-[24px] text-black border-b border-gray-200 pb-4 mb-6">Booking Summary</h3>
            
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={selectedRoom.img}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={selectedRoom.img} 
                className="w-full h-[200px] object-cover rounded-lg mb-6 shadow-sm"
              />
            </AnimatePresence>

            <h4 className="font-bold text-lg mb-2">{selectedRoom.name}</h4>
            <div className="text-sm text-gray-600 space-y-1 mb-6">
              <p>Check-in: {form.checkIn || "--/--/----"}</p>
              <p>Check-out: {form.checkOut || "--/--/----"}</p>
              <p className="font-medium text-gold">📅 {nights} Night{nights !== 1 ? 's' : ''}</p>
            </div>

            <div className="space-y-3 text-sm border-t border-gray-200 pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rate per night</span>
                <span className="font-mono">${selectedRoom.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal ({nights} nights)</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes & Fees (18%)</span>
                <span className="font-mono">${taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-2">
                <span className="font-black">TOTAL</span>
                <span className="text-[28px] font-bold text-black group">
                  $<motion.span key={total} initial={{ opacity: 0.5, y: -5 }} animate={{ opacity: 1, y: 0, color: ["#000", "#D4AF37", "#000"] }} transition={{ duration: 0.6 }}>{total.toFixed(2)}</motion.span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
               {[
                 { text: "Free Cancellation", icon: CheckCircle },
                 { text: "Best Price Guarantee", icon: ShieldCheck },
                 { text: "Instant Confirmation", icon: Zap }
               ].map((badge, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                   className="flex items-center gap-2 bg-white p-3 rounded-lg text-sm text-gray-700 shadow-sm relative overflow-hidden group"
                 >
                   <badge.icon size={18} className="text-gold group-hover:scale-125 transition-transform duration-500" />
                   <span className="font-medium">{badge.text}</span>
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                 </motion.div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
