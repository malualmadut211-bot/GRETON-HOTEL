import React, { useState, useEffect } from "react";
import { Calendar, Users, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BookingBar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests, 1 Room");

  useEffect(() => {
    // Simple sticky trigger when scrolled past hero
    const onScroll = () => setIsSticky(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const params = new URLSearchParams();
      if (checkIn) params.append("checkIn", checkIn);
      if (checkOut) params.append("checkOut", checkOut);
      if (guests) params.append("guests", guests);
      
      navigate(`/rooms?${params.toString()}`);
    }, 800);
  };

  return (
    <div className={cn("flex justify-center w-full z-40 px-6 md:px-0 transition-all duration-500", isSticky ? "fixed top-[70px] lg:top-[90px] left-0 right-0 px-0" : "relative -top-[50px]")}>
      <div 
        className={cn(
          "transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] bg-black/40 backdrop-blur-[20px] saturate-[1.8] border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row items-center gap-4",
          isSticky 
            ? "w-full max-w-none h-auto md:h-[70px] rounded-none px-6 md:px-12 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.15)]" 
            : "mx-auto max-w-[1200px] w-full min-h-[100px] rounded-2xl p-5 md:px-8 py-5"
        )}
      >
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col group focus-within:ring-2 ring-gold/50 rounded-lg p-2 transition-all">
            <span className={cn("font-semibold text-white/60 uppercase tracking-widest", isSticky ? "text-[10px]" : "text-xs font-sans")}>Check In</span>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="text-gold" size={isSticky ? 16 : 20} />
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={cn("bg-transparent outline-none text-white font-medium w-full font-sans", isSticky ? "text-sm" : "text-lg")} />
            </div>
          </div>
          <div className="flex flex-col group focus-within:ring-2 ring-gold/50 rounded-lg p-2 transition-all">
            <span className={cn("font-semibold text-white/60 uppercase tracking-widest font-sans", isSticky ? "text-[10px]" : "text-xs")}>Check Out</span>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="text-gold" size={isSticky ? 16 : 20} />
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={cn("bg-transparent outline-none text-white font-medium w-full font-sans", isSticky ? "text-sm" : "text-lg")} />
            </div>
          </div>
          <div className="flex flex-col group focus-within:ring-2 ring-gold/50 rounded-lg p-2 transition-all relative">
            <span className={cn("font-semibold text-white/60 uppercase tracking-widest font-sans", isSticky ? "text-[10px]" : "text-xs")}>Guests</span>
            <div className="flex items-center justify-between mt-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <Users className="text-gold" size={isSticky ? 16 : 20} />
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className={cn("bg-transparent outline-none text-white font-medium font-sans appearance-none", isSticky ? "text-sm" : "text-lg")}>
                  <option value="1 Guest, 1 Room">1 Guest, 1 Room</option>
                  <option value="2 Guests, 1 Room">2 Guests, 1 Room</option>
                  <option value="3 Guests, 1 Room">3 Guests, 1 Room</option>
                  <option value="4 Guests, 2 Rooms">4 Guests, 2 Rooms</option>
                </select>
              </div>
              <ChevronDown className="text-white/50" size={16} pointerEvents="none" />
            </div>
          </div>
        </div>

        <button 
          onClick={handleBook}
          className={cn(
            "bg-gradient-to-r from-[#D4AF37] to-[#C49B2E] text-white font-sans font-semibold flex items-center justify-center rounded-lg shadow-[0_4px_16px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(212,175,55,0.4)] transition-all shrink-0",
            isSticky ? "w-full md:w-[140px] h-12 text-sm" : "w-full md:w-[180px] h-[60px] text-base",
            isLoading && "md:w-[60px] md:rounded-full text-transparent"
          )}
        >
          {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin absolute" /> : "Check Availability"}
        </button>
      </div>
    </div>
  );
}
