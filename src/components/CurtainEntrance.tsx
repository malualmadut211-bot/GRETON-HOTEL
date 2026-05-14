import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './CurtainEntrance.css';

export function CurtainEntrance() {
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenCurtain = sessionStorage.getItem('curtainAnimationSeen');
    
    if (reducedMotion || hasSeenCurtain) {
      return;
    }
    
    setShow(true);
    document.body.style.overflow = 'hidden';

    // Animation timeline mapping CSS
    const mobileFactor = isMobile ? 0.75 : 1; 

    // Define timeline
    const logoAnimStart = 0;
    const rippleStart = 800 * mobileFactor;
    const curtainOpenStart = 1500 * mobileFactor;
    const logoExitStart = 2000 * mobileFactor;
    const cleanupStart = 3500 * mobileFactor;

    const curtainLeft = document.getElementById('curtainLeft');
    const curtainRight = document.getElementById('curtainRight');
    const logo = document.getElementById('curtainLogo');

    const timeline = [
      {
        delay: logoAnimStart,
        action: () => {
          if (logo) logo.style.animation = 'logoGlow 2s ease-in-out infinite';
        }
      },
      {
        delay: rippleStart,
        action: () => {
          if (!isMobile) {
            if (curtainLeft) curtainLeft.style.animation = 'fabricRipple 0.7s ease-in-out';
            if (curtainRight) curtainRight.style.animation = 'fabricRipple 0.7s ease-in-out';
          }
        }
      },
      {
        delay: curtainOpenStart,
        action: () => {
          if (curtainLeft) curtainLeft.style.animation = `openCurtainLeft ${isMobile ? 1.5 : 2}s cubic-bezier(0.65, 0, 0.35, 1) forwards`;
          if (curtainRight) curtainRight.style.animation = `openCurtainRight ${isMobile ? 1.5 : 2}s cubic-bezier(0.65, 0, 0.35, 1) forwards`;
        }
      },
      {
        delay: logoExitStart,
        action: () => {
          if (logo) logo.style.animation = 'logoExit 1s ease-out forwards';
        }
      },
      {
        delay: cleanupStart,
        action: () => {
          setFade(true);
          setTimeout(() => {
            setShow(false);
            document.body.style.overflow = '';
            sessionStorage.setItem('curtainAnimationSeen', 'true');
          }, 500);
        }
      }
    ];

    const timeouts = timeline.map(phase => setTimeout(phase.action, phase.delay));

    return () => {
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (!show) return null;

  return createPortal(
    <div className={`curtain-entrance ${fade ? 'opacity-0' : ''}`} id="curtainEntrance">
      <div className="curtain-panel left" id="curtainLeft"></div>
      <div className="curtain-panel right" id="curtainRight"></div>
      
      <div className="curtain-logo" id="curtainLogo">
        <div className="text-4xl md:text-6xl font-serif text-[#D4AF37] tracking-[0.2em] font-semibold">GRETON</div>
        <p className="welcome-text font-sans text-[#D4AF37] mt-4 tracking-[0.4em] uppercase text-sm md:text-base opacity-80 font-medium pb-2">
            Welcome
        </p>
      </div>
      
      <button 
        className="skip-intro group" 
        id="skipIntro"
        onClick={() => {
            setFade(true);
            setTimeout(() => {
              setShow(false);
              document.body.style.overflow = '';
              sessionStorage.setItem('curtainAnimationSeen', 'true');
            }, 300);
        }}
      >
        Skip Intro
        <span className="skip-icon inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>,
    document.body
  );
}
