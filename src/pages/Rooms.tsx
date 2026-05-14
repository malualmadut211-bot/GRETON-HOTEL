import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { LayoutGrid, List, ChevronRight, ChevronDown, Check, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROOMS_DATA, Room } from "@/data/rooms";
import { RoomCard } from "@/components/rooms/RoomCard";
import { RoomModal } from "@/components/rooms/RoomModal";
import { ComparisonTool } from "@/components/rooms/ComparisonTool";

const CATEGORIES = ["All Rooms", "Deluxe", "Executive", "Family Suites"];
const SORT_OPTIONS = [
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
  "Size: Largest First",
  "Size: Smallest First"
];

export default function Rooms() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCheckIn = searchParams.get("checkIn") || "";
  const initialCheckOut = searchParams.get("checkOut") || "";
  const initialGuests = searchParams.get("guests") || "2 Guests, 1 Room";

  const [activeTab, setActiveTab] = useState("All Rooms");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const [selectedRoomsToCompare, setSelectedRoomsToCompare] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [quickViewRoom, setQuickViewRoom] = useState<Room | null>(null);
  const [selectedForBooking, setSelectedForBooking] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const scaleBg = useTransform(scrollY, [0, 1000], [1, 1.1]);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter & Sort
  let filteredRooms = activeTab === "All Rooms" 
    ? [...ROOMS_DATA]
    : ROOMS_DATA.filter(r => r.category === activeTab);

  if (initialGuests) {
    const match = initialGuests.match(/(\d+)\s+Guests?/);
    if (match) {
      const guestNumber = parseInt(match[1], 10);
      filteredRooms = filteredRooms.filter(r => r.occupancy >= guestNumber);
    }
  }

  useEffect(() => {
    if (initialCheckIn && filteredRooms.length > 0 && !selectedForBooking) {
      setSelectedForBooking(filteredRooms[0].id);
      // Optional: open the modal directly or auto-scroll?
      // window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, [initialCheckIn, filteredRooms, selectedForBooking]);

  filteredRooms.sort((a, b) => {
    switch(sortBy) {
      case "Price: Low to High": return a.price - b.price;
      case "Price: High to Low": return b.price - a.price;
      case "Size: Largest First": return b.size - a.size;
      case "Size: Smallest First": return a.size - b.size;
      default: return b.popularity - a.popularity;
    }
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleCompare = (id: string) => {
    setSelectedRoomsToCompare(prev => {
      if (prev.includes(id)) return prev.filter(r => r !== id);
      if (prev.length >= 3) return prev; 
      return [...prev, id];
    });
  };

  useEffect(() => {
    if (quickViewRoom || isComparing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [quickViewRoom, isComparing]);

  return (
    <div className="bg-transparent min-h-screen pb-24 font-sans relative">
      
      {/* 1. HERO SECTION */}
      <section className="bg-transparent relative min-h-[600px] flex flex-col justify-center overflow-hidden">
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 mt-20">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="flex items-center gap-2 text-white/80 text-[13px] uppercase tracking-[0.5px] mb-12"
          >
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ChevronRight size={14} className="opacity-50" />
             <span className="text-white">Rooms & Suites</span>
          </motion.div>

          <motion.h1 
             initial={{ opacity: 0, y: 60 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="text-[clamp(36px,5vw,72px)] font-serif font-bold text-white tracking-[-2px] leading-tight mb-4 drop-shadow-md"
          >
             Rooms & Suites
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
             animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
             transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
             className="text-[24px] font-serif italic text-white/90 tracking-[0.5px] drop-shadow-sm mb-16"
          >
             Your sanctuary in the city
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.4 }}
             className="inline-flex bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white-[20px] rounded-full p-2  relative"
          >
             {CATEGORIES.map(cat => {
               const isActive = activeTab === cat;
               return (
                 <button
                   key={cat}
                   onClick={() => setActiveTab(cat)}
                   className={cn(
                     "relative px-8 py-3 text-[14px] font-medium uppercase tracking-[1px] rounded-full transition-colors duration-300 z-10",
                     isActive ? "text-white" : "text-white/70 hover:text-white hover:bg-transparent/10"
                   )}
                 >
                   {isActive && (
                     <motion.div 
                       layoutId="heroActiveTab"
                       className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  rounded-full -z-10 shadow-sm"
                       transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                     />
                   )}
                   {cat}
                 </button>
               );
             })}
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER & SORT BAR (Sticky) */}
      <AnimatePresence>
        {isSticky && (
          <motion.div 
            initial={{ translateY: "-100%", opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-[70px] lg:top-[90px] left-0 right-0 z-40 bg-transparent-[20px] saturate-[180%]  shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 px-6"
          >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
               {/* Filter Pills */}
               <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                  {CATEGORIES.map(cat => {
                    const isActive = activeTab === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={cn(
                          "relative px-6 py-2.5 text-[13px] uppercase tracking-[0.8px] rounded-full transition-all duration-300 whitespace-nowrap",
                          isActive ? "bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] text-white shadow-[0_6px_20px_rgba(0,0,0,0.15)]" : "bg-transparent text-white/60 border border-black/10 hover:bg-black/5 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                        )}
                      >
                        {cat}
                        {isActive && (
                          <motion.div 
                            layoutId="stickyActiveTabHighlight"
                            className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#F4E5B5] rounded-full"
                            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
                          />
                        )}
                      </button>
                    )
                  })}
               </div>

               {/* Sort & View Config */}
               <div className="hidden md:flex items-center gap-6">
                 {/* Sort Dropdown */}
                 <div className="relative">
                   <button 
                     onClick={() => setIsSortOpen(!isSortOpen)}
                     className={cn(
                       "flex items-center gap-3 px-4 py-2.5 bg-transparent border border-white/20 border rounded-lg text-[14px] font-medium transition-all duration-200",
                       isSortOpen ? "border-gold shadow-[0_4px_12px_rgba(212,175,55,0.15)]" : "border-gray-200 hover:border-gold hover:shadow-[0_4px_12px_rgba(212,175,55,0.15)]"
                     )}
                   >
                     <span className="text-white/60">Sort by:</span>
                     <span className="text-white">{sortBy}</span>
                     <ChevronDown size={16} className={cn("text-white/60 transition-transform duration-300", isSortOpen && "rotate-180")} />
                   </button>
                   
                   <AnimatePresence>
                     {isSortOpen && (
                       <motion.div 
                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
                         transition={{ duration: 0.3, ease: "easeOut" }}
                         className="absolute top-[calc(100%+8px)] right-0 w-[240px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  border border-black/5 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-2 z-50 transform-origin-top"
                       >
                          {SORT_OPTIONS.map((opt, i) => (
                            <motion.button
                              key={opt}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                              className={cn(
                                "flex items-center justify-between w-full p-[12px_16px] rounded-lg text-[14px] text-left transition-all duration-150 group",
                                sortBy === opt ? "bg-gold/10 text-gold" : "text-white/70 hover:bg-gold/10 hover:text-gold hover:translate-x-1"
                              )}
                            >
                              {opt}
                              {sortBy === opt && <Check size={16} className="text-gold" />}
                            </motion.button>
                          ))}
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 {/* View Toggle */}
                 <div className="flex bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  border border-gray-200 rounded-lg p-1 relative">
                    <motion.div 
                      className="absolute top-1 bottom-1 w-[40px] bg-transparent rounded-md z-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                      animate={{ translateX: viewMode === 'grid' ? 0 : 44, backgroundColor: viewMode === 'list' ? 'rgba(212,175,55,0.1)' : '#f5f5f5' }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                    <button 
                      onClick={() => setViewMode('grid')}
                      className="w-[40px] h-[40px] flex md:hidden lg:flex items-center justify-center rounded-md z-10 text-white/60 relative transition-colors duration-300"
                    >
                      <LayoutGrid size={20} className={cn("transition-all duration-400", viewMode === 'grid' && "text-white stroke-2")} />
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className="w-[40px] h-[40px] flex md:hidden lg:flex items-center justify-center rounded-md z-10 text-white/60 relative transition-colors duration-300"
                    >
                      <List size={20} className={cn("transition-all duration-400", viewMode === 'list' && "text-white stroke-2")} />
                    </button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN CONTENT */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-[80px] flex flex-col lg:flex-row gap-12 relative items-start">
        
        {/* ROOMS LISTING */}
        <div className="flex-1 w-full">
          <motion.div 
             layout
             className={cn(
               "grid gap-[40px] md:gap-[24px] lg:gap-[40px]",
               viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
             )}
          >
            <AnimatePresence mode="popLayout">
              {filteredRooms.flatMap((room, i) => {
                const items = [];
                
                items.push(
                  <motion.div
                    key={room.id}
                    layout
                    initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.12 }}
                    className="w-full"
                    onClick={() => {
                        setSelectedForBooking(room.id);
                        if (window.innerWidth < 1024 && !quickViewRoom) {
                          // Scroll slightly to let them know it's selected on mobile if needed
                        }
                    }}
                  >
                    <RoomCard
                      room={room}
                      isFavorite={favorites.includes(room.id)}
                      toggleFavorite={toggleFavorite}
                      onViewDetails={() => setQuickViewRoom(room)}
                      onCompare={handleCompare}
                      isCompared={selectedRoomsToCompare.includes(room.id)}
                      viewMode={viewMode}
                      isSelected={selectedForBooking === room.id}
                    />
                  </motion.div>
                );

                return items;
              })}
            </AnimatePresence>
          </motion.div>
          {filteredRooms.length === 0 && (
            <div className="text-center py-32 opacity-50">
              <p>No rooms found.</p>
            </div>
          )}
        </div>
      </div>

      {/* 7. COMPARE BAR (Sticky Bottom) */}
      <AnimatePresence>
        {selectedRoomsToCompare.length > 0 && !isComparing && (
          <motion.div 
            initial={{ bottom: -100, opacity: 0 }}
            animate={{ bottom: 0, opacity: 1 }}
            exit={{ bottom: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 right-0 z-[999] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  border-t-[3px] border-gold shadow-[0_-8px_32px_rgba(0,0,0,0.15)] p-[20px_40px] flex items-center justify-between gap-4 overflow-x-auto"
          >
            <div className="flex gap-4 overflow-x-auto flex-1 no-scrollbar pr-4">
              <AnimatePresence>
                {selectedRoomsToCompare.map((id, i) => {
                  const room = ROOMS_DATA.find(r => r.id === id);
                  if(!room) return null;
                  return (
                    <motion.div 
                      key={id}
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.4, delay: Math.min(i * 0.1, 0.3) }}
                      className="w-[200px] h-[80px] bg-transparent rounded-xl flex items-center gap-3 p-3 relative shrink-0"
                    >
                      <img src={room.images[0]} alt={room.name} className="w-[56px] h-[56px] rounded-lg object-cover" />
                      <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-white truncate max-w-[100px]">{room.name}</span>
                        <span className="text-[12px] text-gold">${room.price}</span>
                      </div>
                      <button 
                        onClick={() => handleCompare(room.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#e63946] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100 hover:scale-110"
                      >
                        <X size={12} />
                      </button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-4 shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  shadow-[-10px_0_10px_white] pl-4">
               <button 
                 onClick={() => setSelectedRoomsToCompare([])}
                 className="text-[14px] text-white/60 underline hover:text-[#e63946] hover:decoration-[#e63946] transition-colors p-2"
               >
                 Clear All
               </button>
               <button 
                 disabled={selectedRoomsToCompare.length < 2}
                 onClick={() => setIsComparing(true)}
                 className={cn(
                   "p-[14px_32px] rounded-lg text-[15px] font-semibold text-white uppercase tracking-[1px] shadow-[0_4px_16px_rgba(201,169,96,0.3)] transition-all duration-300 md:animate-[pulse_2s_infinite]",
                   selectedRoomsToCompare.length < 2 
                    ? "opacity-50 cursor-not-allowed grayscale-[50%]" 
                    : "bg-[linear-gradient(135deg,#c9a960_0%,#b8975a_100%)] hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,169,96,0.5)] hover:bg-[linear-gradient(135deg,#d4b56c_0%,#c9a960_100%)]"
                 )}
               >
                 Compare
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. MODALS */}
      <RoomModal 
        room={quickViewRoom} 
        onClose={() => setQuickViewRoom(null)} 
      />
      
      {isComparing && (
        <ComparisonTool 
          selectedRooms={selectedRoomsToCompare}
          roomsData={ROOMS_DATA}
          onRemove={handleCompare}
          onClear={() => {
            setSelectedRoomsToCompare([]);
            setIsComparing(false);
          }}
        />
      )}
    </div>
  );
}
