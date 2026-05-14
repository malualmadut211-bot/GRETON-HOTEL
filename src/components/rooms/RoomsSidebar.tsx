import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Room } from "@/data/rooms";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomsSidebarProps {
  selectedRoomId: string | null;
  roomsData: Room[];
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
}

export function RoomsSidebar({ selectedRoomId, roomsData, initialCheckIn, initialCheckOut, initialGuests }: RoomsSidebarProps) {
  const room = roomsData.find(r => r.id === selectedRoomId);

  // Compute dates and nights if valid dates provided
  let nights = 3; // default
  let displayCheckIn = initialCheckIn ? new Date(initialCheckIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Select Date";
  let displayCheckOut = initialCheckOut ? new Date(initialCheckOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Select Date";

  if (initialCheckIn && initialCheckOut) {
    const d1 = new Date(initialCheckIn);
    const d2 = new Date(initialCheckOut);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) nights = diffDays;
  }

  const taxes = room ? Math.round(room.price * nights * 0.15) : 0;
  const total = room ? (room.price * nights) + taxes : 0;

  return (
    <>
      <div className={cn(
        "hidden lg:block sticky top-[140px] bg-transparent border border-white/20 rounded-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] z-40 transform-gpu",
        !selectedRoomId && "opacity-50 blur-[2px] translate-x-[20px]"
      )}>
        {/* Active Selection */}
        <div className="p-6 ">
          <h3 className="text-[20px] font-semibold text-white mb-2">{room ? "Your Selection" : "No Room Selected"}</h3>
          {room ? (
            <>
              <div className="w-full h-[180px] rounded-xl overflow-hidden mb-4 relative cursor-pointer group">
                 <img src={room.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                 <span className="absolute top-2 left-2 bg-transparent backdrop-blur-md/80 backdrop-blur text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                   {room.category}
                 </span>
              </div>
              <h4 className="text-[20px] font-semibold text-white mb-2">{room.name}</h4>
              <p className="text-[13px] text-gold underline cursor-pointer hover:opacity-80 transition-opacity">Change Room</p>
            </>
          ) : (
            <p className="text-white/60 text-sm">Please select a room to view pricing details and proceed.</p>
          )}
        </div>

        {/* Date / Guests Summary (Mocked for visual) */}
        {room && (
          <>
            <div className="p-6 ">
               <h4 className="text-[14px] font-semibold text-white/70 uppercase tracking-[0.5px] mb-4">Dates</h4>
               <div className="flex gap-3">
                 <div className="flex-1 p-[12px_16px] bg-transparent border-2 border-[#e0e0e0] rounded-[10px] text-[15px] text-white hover:border-gold hover:bg-white/20 transition-colors cursor-pointer">
                    {displayCheckIn}
                 </div>
                 <div className="flex-1 p-[12px_16px] bg-transparent border-2 border-[#e0e0e0] rounded-[10px] text-[15px] text-white hover:border-gold hover:bg-white/20 transition-colors cursor-pointer">
                    {displayCheckOut}
                 </div>
               </div>
               <p className="mt-3 text-[13px] text-white/70">{nights} nights selected {initialGuests ? `(${initialGuests})` : ''}</p>
            </div>

            <div className="p-6 bg-transparent  space-y-3">
               <div className="flex justify-between text-[14px] text-white/70">
                 <span>Room rate x {nights} nights</span>
                 <span className="font-medium text-white">${room.price * nights}</span>
               </div>
               <div className="flex justify-between text-[14px] text-white/70">
                 <span>Taxes & fees</span>
                 <span className="font-medium text-white">${taxes}</span>
               </div>
               <div className="pt-4 mt-4  flex items-end justify-between">
                 <span className="text-[16px] font-semibold text-white/90">Total</span>
                 <span className="text-[32px] font-bold text-gold tracking-[-1px] leading-none">${total}</span>
               </div>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white ">
               <Link 
                 to="/contact"
                 className="w-full block text-center p-[18px] bg-[linear-gradient(135deg,#c9a960_0%,#b8975a_100%)] rounded-xl font-semibold text-[16px] text-white uppercase tracking-[1px] shadow-[0_6px_20px_rgba(201,169,96,0.3)] hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(201,169,96,0.4)] hover:bg-[linear-gradient(135deg,#d4b56c_0%,#c9a960_100%)] active:scale-[0.98] active:shadow-[0_4px_12px_rgba(201,169,96,0.3)] transition-all overflow-hidden relative"
               >
                 Confirm Booking
               </Link>
            </div>

            <div className="p-[20px_24px] bg-transparent text-center">
               <p className="text-[14px] text-white/70 mb-3">Need help with your booking?</p>
               <a href="tel:+123456789" className="inline-flex items-center gap-2 text-[14px] text-gold underline hover:text-[#b8975a] hover:-translate-y-[2px] transition-all">
                  📞 +1 234 567 890
               </a>
            </div>
          </>
        )}
      </div>

      {/* MOBILE STICKY FOOTER */}
      <div className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-transparent border border-white/20 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]  p-[16px_20px_24px] transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
        room ? "translate-y-0" : "translate-y-full"
      )}>
        {room && (
          <div className="flex items-center justify-between gap-4">
             <div className="flex flex-col flex-1">
               <p className="text-[12px] text-white/60 uppercase tracking-[0.5px]">Total ({nights} nights)</p>
               <p className="text-[24px] font-bold text-gold tracking-[-0.5px]">${total}</p>
               <p className="text-[12px] text-white/70 underline mt-1 cursor-pointer">View Details</p>
             </div>
             
             <Link 
               to="/contact"
               className="p-[14px_32px] bg-[linear-gradient(135deg,#c9a960_0%,#b8975a_100%)] rounded-[10px] font-semibold text-[15px] text-white uppercase shadow-[0_4px_16px_rgba(201,169,96,0.3)] active:scale-[0.95] active:shadow-[0_2px_8px_rgba(201,169,96,0.3)] transition-all whitespace-nowrap"
             >
               Confirm &rarr;
             </Link>
          </div>
        )}
      </div>
    </>
  );
}
