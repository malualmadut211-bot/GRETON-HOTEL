import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { Room, AMENITY_ICONS } from "@/data/rooms";
import { Link } from "react-router-dom";

interface ComparisonToolProps {
  selectedRooms: string[];
  roomsData: Room[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function ComparisonTool({ selectedRooms, roomsData, onRemove, onClear }: ComparisonToolProps) {
  const rooms = selectedRooms.map(id => roomsData.find(r => r.id === id)!).filter(Boolean);
  
  const allAmenities = Array.from(new Set(rooms.flatMap(r => r.amenities)));

  return (
    <AnimatePresence>
      {rooms.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[120] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  overflow-y-auto"
        >
           <div className="sticky top-0 z-10 bg-transparent  px-6 py-4 flex items-center justify-between">
             <div>
               <h2 className="font-serif text-2xl text-white">Compare Rooms</h2>
               <p className="text-white/60 font-sans text-sm">{rooms.length} room{rooms.length !== 1 ? 's' : ''} selected</p>
             </div>
             <div className="flex items-center gap-4">
                <button onClick={onClear} className="text-sm font-sans text-white/60 hover:text-red-500 transition-colors">Clear All</button>
                <button onClick={onClear} className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <X size={20} />
                </button>
             </div>
           </div>

           <div className="max-w-7xl mx-auto px-6 py-12">
             <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory no-scrollbar">
                {rooms.map((room, idx) => (
                  <motion.div 
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="min-w-[300px] w-[calc(33.333%-1.33rem)] shrink-0 snap-start flex flex-col"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6">
                      <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                      <button onClick={() => onRemove(room.id)} className="absolute top-3 right-3 w-8 h-8 bg-transparent rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-white shadow-sm">
                        <X size={14} />
                      </button>
                    </div>
                    
                    <div className="flex flex-col flex-1">
                       <span className="text-gold text-xs font-sans uppercase tracking-widest font-semibold mb-1">{room.category}</span>
                       <h3 className="text-xl font-serif text-white mb-4">{room.name}</h3>
                       
                       <div className="text-2xl font-serif font-bold text-gold mb-8 pb-8 ">
                         ${room.price}<span className="text-sm font-sans text-white/60 font-normal">/night</span>
                       </div>

                       <div className="space-y-6 flex-1">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Size</div>
                            <div className="font-sans text-white">{room.size} sq meters</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Max Occupancy</div>
                            <div className="font-sans text-white">{room.occupancy} Guests</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-widest text-white/60 mb-2">Bed Type</div>
                            <div className="font-sans text-white">{room.bedType}</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-widest text-white/60 mb-2">View</div>
                            <div className="font-sans text-white">{room.view}</div>
                          </div>
                          <div>
                            <div className="text-xs uppercase tracking-widest text-white/60 mb-4">Amenities</div>
                            <ul className="space-y-3">
                              {allAmenities.map(amenity => {
                                const hasAmenity = room.amenities.includes(amenity);
                                return (
                                  <li key={amenity} className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${hasAmenity ? 'bg-gold/10 text-gold' : 'bg-transparent text-gray-300'}`}>
                                      {hasAmenity ? <Check size={12} /> : <X size={12} />}
                                    </div>
                                    <span className={`text-sm font-sans ${hasAmenity ? 'text-white' : 'text-white/60'}`}>{amenity}</span>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                       </div>

                       <div className="mt-12 pt-8 ">
                         <Link to={`/contact?room=${room.id}`} className="w-full block text-center py-3 bg-transparent text-white font-sans font-semibold uppercase tracking-widest text-sm rounded hover:bg-gold transition-colors">
                           Book Room
                         </Link>
                       </div>
                    </div>
                  </motion.div>
                ))}
                
                {rooms.length < 3 && (
                  <div className="min-w-[300px] w-[calc(33.333%-1.33rem)] shrink-0 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl bg-transparent/50 p-12 text-center">
                    <div>
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  shadow-sm flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-white/60">+</span>
                      </div>
                      <p className="text-white/60 font-sans text-sm">Select another room<br/>to compare</p>
                    </div>
                  </div>
                )}
             </div>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
