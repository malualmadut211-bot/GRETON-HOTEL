import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize, Users, Bed, Eye } from "lucide-react";
import { Room, AMENITY_ICONS } from "@/data/rooms";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomModal({ room, onClose }: RoomModalProps) {
  const [currentImg, setCurrentImg] = useState(0);

  if (!room) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        />
        
        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  sm:rounded-2xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col shadow-[0_32px_64px_rgba(0,0,0,0.3)]"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white transition-colors group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="overflow-y-auto no-scrollbar flex-1">
             {/* Gallery Header */}
             <div className="relative h-[250px] sm:h-[400px]">
               <img src={room.images[currentImg]} alt={room.name} className="w-full h-full object-cover" />
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
                 {room.images.map((img, idx) => (
                   <button 
                     key={idx}
                     onClick={() => setCurrentImg(idx)}
                     className={cn(
                       "w-16 h-12 rounded overflow-hidden border-2 transition-all shrink-0",
                       currentImg === idx ? "border-gold scale-110" : "border-transparent opacity-60 hover:opacity-100"
                     )}
                   >
                     <img src={img} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
             </div>

             {/* Content */}
             <div className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8  pb-8">
                  <div>
                    <span className="text-gold text-xs font-sans uppercase tracking-widest font-semibold mb-2 block">{room.category}</span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-white">{room.name}</h2>
                  </div>
                  <div className="text-left sm:text-right">
                     <span className="text-sm text-white/60 block mb-1">From</span>
                     <span className="text-3xl font-serif font-bold text-gold">${room.price}<span className="text-lg text-white/60 font-sans font-normal">/night</span></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <section>
                      <h3 className="text-xl font-serif text-white mb-4">About this room</h3>
                      <p className="text-white/70 font-sans leading-relaxed text-[0.9375rem]">{room.description}</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-serif text-white mb-4">Room Amenities</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                         {room.amenities.map((item, idx) => {
                           const Icon = AMENITY_ICONS[item];
                           return (
                             <div key={idx} className="flex items-center gap-3 text-white/70 bg-transparent p-3 rounded-lg">
                               {Icon && <Icon size={18} className="text-gold" />}
                               <span className="text-sm font-sans">{item}</span>
                             </div>
                           );
                         })}
                      </div>
                    </section>
                  </div>

                  {/* Sidebar specs */}
                  <div className="space-y-6">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white p-6 rounded-xl ">
                       <h4 className="font-serif text-lg mb-4 text-white">Specifications</h4>
                       <ul className="space-y-4">
                         <li className="flex items-center gap-3 text-white/70">
                           <Maximize size={18} className="text-gold" />
                           <span className="text-sm">{room.size} sq meters</span>
                         </li>
                         <li className="flex items-center gap-3 text-white/70">
                           <Users size={18} className="text-gold" />
                           <span className="text-sm">Up to {room.occupancy} guests</span>
                         </li>
                         <li className="flex items-center gap-3 text-white/70">
                           <Bed size={18} className="text-gold" />
                           <span className="text-sm">{room.bedType}</span>
                         </li>
                         <li className="flex items-center gap-3 text-white/70">
                           <Eye size={18} className="text-gold" />
                           <span className="text-sm">{room.view}</span>
                         </li>
                       </ul>
                    </div>

                    <div className="sticky bottom-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  pt-4">
                      <Link 
                        to={`/contact?room=${room.id}`}
                        className="w-full block text-center py-4 bg-[linear-gradient(135deg,#D4AF37,#F4E5B5)] text-white font-sans font-semibold uppercase tracking-widest text-sm rounded-lg hover:shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Book This Room
                      </Link>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
