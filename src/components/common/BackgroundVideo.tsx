import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BackgroundVideoProps {
  src?: string;
  className?: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ 
  src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", // Fallback HLS stream
  className = "" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Throttle seeking state
  const seekTarget = useRef<number>(0);
  const isSeeking = useRef<boolean>(false);
  const seekPending = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const doSeek = () => {
      if (!video) return;
      isSeeking.current = true;
      video.currentTime = seekTarget.current;
    };

    const handleSeeked = () => {
      isSeeking.current = false;
      if (seekPending.current) {
        seekPending.current = false;
        doSeek();
      }
    };

    video.addEventListener('seeked', handleSeeked);

    // HLS Initialization
    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        capLevelToPlayerSize: false,
        autoStartLoad: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        // Force highest quality
        const maxLevel = data.levels.length - 1;
        hls!.currentLevel = maxLevel;
        hls!.loadLevel = maxLevel;
        // The user mentioned startLevel: -1 in config, but manifest parsed implies we can override
      });

      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        if (video.duration) {
          const buffered = video.buffered;
          if (buffered.length > 0) {
            const bufferedEnd = buffered.end(buffered.length - 1);
            const progress = Math.min(100, Math.round((bufferedEnd / video.duration) * 100));
            setLoadingProgress(progress);
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS for Safari
      video.src = src;
    }

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay);

    // Scroll to seek logic
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (!video.duration) return;
        const targetTime = self.progress * video.duration;
        seekTarget.current = targetTime;
        
        if (!isSeeking.current) {
          doSeek();
        } else {
          seekPending.current = true;
        }
      }
    });

    // Mouse parallax logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const moveY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      gsap.to(wrapperRef.current, {
        x: moveX * -30,
        y: moveY * -30,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (hls) hls.destroy();
      st.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [src]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-500">
          <div className="text-white text-2xl font-sans tracking-widest uppercase">
            Loading... {loadingProgress}%
          </div>
        </div>
      )}
      <div 
        ref={wrapperRef}
        className="fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center pointer-events-none overflow-hidden"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          crossOrigin="anonymous"
          className={`w-full h-full object-cover scale-[1.35] ${className}`}
        />
        {/* Dark overlay for text contrast across all pages */}
        <div className="absolute inset-0 bg-black/50 z-[1]" />
      </div>
    </>
  );
};
