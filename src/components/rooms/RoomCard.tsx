import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, Users, Maximize, Check } from "lucide-react";
import { Room, AMENITY_ICONS } from "@/data/rooms";
import { cn } from "@/lib/utils";

interface RoomCardProps {
  room: Room;
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent, id: string) => void;
  onViewDetails: () => void;
  onCompare: (id: string) => void;
  isCompared: boolean;
  viewMode: 'grid' | 'list';
  isSelected: boolean;
}

export function RoomCard({ room, isFavorite, toggleFavorite, onViewDetails, onCompare, isCompared, viewMode, isSelected }: RoomCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  // Auto advance
  React.useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => setCurrentImg(p => (p + 1) % room.images.length), 2500);
    return () => clearInterval(interval);
  }, [isHovered, room.images.length]);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((p) => (p + 1) % room.images.length);
  };
  
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((p) => (p - 1 + room.images.length) % room.images.length);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    if (!isFavorite) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 800);
    }
    toggleFavorite(e, room.id);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative bg-white flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] will-change-transform",
        viewMode === 'list' && "md:flex-row",
        isSelected && "ring-2 ring-gold"
      )}
    >
      {/* Optional Hover border overlay */}
      <div className="absolute inset-0 border border-gold/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-20" />

      {/* 3.1 Image Carousel Container (60% height in grid) */}
      <div className={cn(
        "relative overflow-hidden shrink-0 bg-[#f5f5f5]",
        viewMode === 'list' ? "md:w-[400px]" : "h-[280px] md:h-[360px]"
      )}>
        <AnimatePresence initial={false}>
          <motion.img
            key={currentImg}
            src={room.images[currentImg]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-105"
          />
        </AnimatePresence>
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {room.images.map((_, idx) => (
            <div 
              key={idx} 
              onClick={(e) => { e.stopPropagation(); setCurrentImg(idx); }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_2px_8px_rgba(0,0,0,0.2)] cursor-pointer",
                idx === currentImg ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              )}
            />
          ))}
        </div>

        {/* Carousel Controls - visible on hover */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
           <button onClick={prevImg} className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all text-charcoal shadow-sm">
             <ChevronLeft size={20} />
           </button>
           <button onClick={nextImg} className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 transition-all text-charcoal shadow-sm">
             <ChevronRight size={20} />
           </button>
        </div>

        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className={cn(
            "absolute top-4 left-4 backdrop-blur-md text-white font-sans text-[11px] font-bold uppercase tracking-[1px] px-4 py-1.5 rounded-full z-10 border border-white/20",
            room.category === 'Deluxe' && "bg-[#c9a960]/90",
            room.category === 'Executive' && "bg-[#4a90e2]/90",
            room.category === 'Family Suites' && "bg-[#7cb342]/90",
            "bg-black/70"
          )}
        >
          {room.category}
        </motion.div>
        
        {/* Heart Icon & Compare Box Container */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
           {/* Compare Checkbox */}
           <div 
             onClick={(e) => { e.stopPropagation(); onCompare(room.id); }}
             className={cn(
               "w-10 h-10 rounded-xl backdrop-blur-md flex items-center justify-center cursor-pointer transition-all duration-300 border-2",
               isCompared ? "bg-gold border-gold" : "bg-white/90 border-gold/50 hover:bg-gold/10 hover:border-gold hover:scale-110"
             )}
           >
              <Check size={18} className={cn("transition-all duration-300", isCompared ? "text-white scale-100 opacity-100" : "text-transparent scale-0 opacity-0")} />
           </div>

           {/* Heart */}
           <button 
             onClick={handleFavoriteClick}
             className={cn(
               "w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md relative",
               isFavorite ? "bg-white" : "bg-white/90 animate-[pulseUnfavorited_1.5s_infinite]"
             )}
           >
             <Heart size={20} className={cn("transition-all duration-400", isFavorite ? "fill-[#e63946] text-[#e63946]" : "text-[#1a1a1a]")} />
             {showHeartBurst && (
               <div className="absolute inset-0 rounded-full bg-[#e63946]/20 animate-[heartBurst_0.6s_cubic-bezier(0.34,1.56,0.64,1)] -z-10" />
             )}
           </button>
        </div>
      </div>

      {/* 3.2 Content Container (40% height) */}
      <div className={cn("p-[24px_28px_28px] flex-1 flex flex-col gap-4", viewMode === 'list' && "justify-between")}>
        
        {/* Top Info */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
            className="text-[22px] md:text-[26px] font-semibold leading-[1.2] text-[#1a1a1a] tracking-[-0.5px] mb-2 hover:text-gold transition-colors cursor-pointer"
          >
            {room.name}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            className={cn(
              "text-[15px] leading-[1.6] text-[#666] overflow-hidden text-ellipsis transition-all duration-300",
              viewMode === 'grid' ? "line-clamp-2 group-hover:line-clamp-none max-h-[48px] group-hover:max-h-[100px]" : "line-clamp-4"
            )}
          >
            {room.description}
          </motion.p>
        </div>
        
        {/* Amenities Row */}
        <div className="flex flex-wrap gap-4 py-4 border-y border-[#f0f0f0]">
           {room.amenities.slice(0, viewMode === 'list' ? 8 : 6).map((item, idx) => {
             const Icon = AMENITY_ICONS[item];
             return Icon ? (
               <div key={idx} className="flex flex-col items-center gap-1.5 relative group/icon transition-transform duration-200 ease-out hover:-translate-y-1">
                 <Icon size={24} strokeWidth={1.5} className="text-[#666] group-hover/icon:text-gold group-hover/icon:scale-110 transition-all" />
                 <span className="text-[11px] text-[#999] uppercase tracking-[0.5px] group-hover/icon:text-gold group-hover/icon:font-medium">{item}</span>
               </div>
             ) : null;
           })}
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-6 my-2">
           <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.4 }} className="flex items-center gap-2">
             <Maximize size={18} className="opacity-70 text-gold" />
             <span className="text-[15px] font-semibold text-[#1a1a1a]">{room.size}</span>
             <span className="text-[13px] text-[#999]">m²</span>
           </motion.div>
           <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.68, duration: 0.4 }} className="flex items-center gap-2">
             <Users size={18} className="opacity-70 text-gold" />
             <span className="text-[15px] font-semibold text-[#1a1a1a]">Max {room.occupancy}</span>
             <span className="text-[13px] text-[#999]">Guests</span>
           </motion.div>
        </div>

        {/* Pricing & Actions */}
        <div className={cn(
          "mt-auto pt-5 border-t border-[#f0f0f0] flex gap-4",
          viewMode === 'grid' ? "flex-col xl:flex-row xl:items-end justify-between" : "flex-row items-center justify-between"
        )}>
          {/* Price */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#999] uppercase tracking-[0.5px]">From</span>
            <div className="flex items-baseline">
              <span className="text-[28px] md:text-[32px] font-bold text-[#1a1a1a] tracking-[-1px] leading-none">${room.price}</span>
              <span className="text-[14px] text-[#999] ml-1">/night</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 w-full xl:w-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
              className="flex-1 xl:flex-initial p-[14px_28px] bg-white border-2 border-[#1a1a1a] rounded-lg font-semibold text-[14px] uppercase tracking-[0.8px] text-[#1a1a1a] relative overflow-hidden group/view hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] transition-all duration-300"
            >
              <span className="relative z-10">Details</span>
              <div className="absolute inset-0 border-2 border-gold rounded-lg opacity-0 group-hover/view:opacity-100 scale-105 group-hover/view:scale-100 transition-all duration-300 pointer-events-none" />
            </button>
            <Link 
              to={`/contact?room=${room.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 xl:flex-initial p-[14px_28px] bg-[linear-gradient(135deg,#c9a960_0%,#b8975a_100%)] rounded-lg font-semibold text-[14px] uppercase tracking-[0.8px] text-white shadow-[0_4px_15px_rgba(201,169,96,0.3)] animate-[ctaPulse_2s_infinite] hover:animate-none hover:bg-[linear-gradient(135deg,#d4b56c_0%,#c9a960_100%)] hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(201,169,96,0.5)] transition-all duration-300 text-center flex items-center justify-center"
            >
              Book Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
