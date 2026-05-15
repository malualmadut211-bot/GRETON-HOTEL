import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

export default function BackgroundVideo({ src, className }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Seeking state for throttling
  const currentTargetTime = useRef(0);
  const isSeeking = useRef(false);
  const seekPending = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const doSeek = () => {
      if (video.seeking) {
        seekPending.current = true;
        return;
      }
      video.currentTime = currentTargetTime.current;
      seekPending.current = false;
    };

    const handleSeeked = () => {
      if (seekPending.current) {
        doSeek();
      }
    };

    video.addEventListener("seeked", handleSeeked);

    // HLS Initialization
    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Force highest quality level
        const maxLevel = hls!.levels.length - 1;
        hls!.currentLevel = maxLevel;
        hls!.loadLevel = maxLevel;
      });

      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        if (video.duration) {
          const buffered = video.buffered;
          if (buffered.length > 0) {
            const bufferedEnd = buffered.end(buffered.length - 1);
            const progress = Math.min((bufferedEnd / video.duration) * 100, 100);
            setLoadingProgress(Math.floor(progress));
          }
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS for Safari
      video.src = src;
    }

    const handleCanPlay = () => {
      setIsLoading(false);
    };
    video.addEventListener("canplay", handleCanPlay);

    // Scroll-to-seek using GSAP
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          currentTargetTime.current = self.progress * video.duration;
          doSeek();
        }
      },
    });

    // Mouse parallax on video wrapper
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const moveY = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      gsap.to(wrapperRef.current, {
        x: moveX * -30,
        y: moveY * -30,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (hls) hls.destroy();
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("canplay", handleCanPlay);
      window.removeEventListener("mousemove", handleMouseMove);
      st.kill();
    };
  }, [src]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[5000] bg-black flex flex-col items-center justify-center">
          <div className="text-white text-2xl font-sans animate-pulse">
            Loading... {loadingProgress}%
          </div>
        </div>
      )}
      
      <div 
        ref={wrapperRef}
        className="fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center overflow-hidden pointer-events-none"
      >
        <video
          ref={videoRef}
          className={`w-full h-full object-cover scale-[1.35] ${className}`}
          muted
          playsInline
          crossOrigin="anonymous"
        />
        {/* Subtle overlay for content readability - can be adjusted based on video brightness */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </>
  );
}
