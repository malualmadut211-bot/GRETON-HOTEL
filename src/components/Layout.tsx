import React, { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Menu, X, Phone, MapPin, Mail, Instagram, Facebook, Twitter, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from "@/lib/gsap-setup";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Rooms", path: "/rooms" },
  { name: "Amenities", path: "/amenities" },
  { name: "Dining", path: "/dining" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    // window.scrollTo(0, 0); // Scroll to top on navigation - ScrollSmoother handles this or we use ScrollTo
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTop(0);
      // Ensure ScrollTrigger recalibrates for new page content height
      ScrollTrigger.refresh();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen ? "bg-transparent border border-white/20 shadow-md py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className={cn(
            "text-2xl font-serif font-bold tracking-wider transition-colors",
            isScrolled || isMobileMenuOpen ? "text-white" : "text-white"
          )}>
            GRETON <span className="text-gold font-light">HOTEL</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium tracking-wide relative group transition-colors",
                isScrolled ? "text-white hover:text-gold" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-gold" : "bg-transparent border border-white/20"
              )} />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+254701110010" className={cn(
            "flex items-center gap-2 text-sm transition-colors hover:text-gold",
            isScrolled ? "text-white" : "text-white"
          )}>
            <Phone size={18} />
          </a>
          <Link
            to="/contact"
            className={cn(
              "px-6 py-2.5 border transition-all duration-300 uppercase tracking-widest text-xs font-semibold",
              isScrolled 
                ? "border-charcoal text-white hover:bg-charcoal hover:text-white hover:shadow-[0_0_15px_rgba(44,44,44,0.3)] hover:border-transparent" 
                : "border-white text-white hover:bg-white/20 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:border-transparent"
            )}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden w-10 h-10 flex items-center justify-center", 
            isScrolled || isMobileMenuOpen ? "text-white" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 top-[72px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  z-40 overflow-y-auto"
          >
            <div className="flex flex-col p-8 gap-6 h-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-serif text-white hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-8 pt-8  flex flex-col gap-4">
                <a href="tel:+254701110010" className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Phone size={18} />
                  </div>
                  <span>+254 701 110010</span>
                </a>
                <Link
                  to="/contact"
                  className="mt-4 bg-transparent backdrop-blur-md text-white text-center py-4 tracking-widest uppercase font-semibold text-sm hover:bg-gold transition-colors"
                >
                  Book Your Stay
                </Link>
                
                <div className="flex gap-4 items-center justify-center mt-6">
                  <a href="#" className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-transparent text-white w-full pt-[80px] px-6 lg:px-[60px] pb-[40px]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[48px]">
        
        {/* Brand */}
        <div className="flex flex-col items-start gap-6">
          <Link to="/" className="flex flex-col group">
            <span className="text-2xl font-serif font-bold tracking-wider footer-logo filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300">
              GRETON <span className="text-gold font-light">HOTEL</span>
            </span>
          </Link>
          <p className="text-white/70 text-[0.9375rem] font-sans">
            Where Nairobi's Heart Meets Hospitality
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="social-icon facebook w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:-translate-y-2 hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_8px_16px_rgba(212,175,55,0.4)] transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon instagram w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:-translate-y-2 hover:border-transparent hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] hover:shadow-[0_8px_16px_rgba(212,175,55,0.4)] transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon twitter w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:-translate-y-2 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-[0_8px_16px_rgba(212,175,55,0.4)] transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-[1.25rem] font-semibold text-white relative pb-2 w-fit">
            Quick Links
            <div className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-gold" />
          </h4>
          <nav className="flex flex-col gap-3">
            {[...NAV_LINKS, {name: 'Privacy Policy', path: '/privacy'}].slice(0, 7).map(link => (
              <Link key={link.name} to={link.path} className="footer-link block font-sans text-[0.9375rem] text-white/70 hover:text-gold hover:translate-x-1 transition-all duration-300 relative w-fit group">
                {link.name}
                <div className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-[1.25rem] font-semibold text-white relative pb-2 w-fit">
            Contact Us
            <div className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-gold" />
          </h4>
          <div className="flex flex-col gap-5">
            <div className="flex gap-4 items-start">
              <span className="text-[24px] w-8 shrink-0">📍</span>
              <div className="font-sans text-[0.9375rem] text-white/70 leading-[1.6]">
                <p>Greton Hotel</p>
                <p>123 CBD Avenue</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>
            <div className="flex gap-4 items-start group">
              <span className="text-[24px] w-8 shrink-0 group-hover:scale-110 transition-transform">📞</span>
              <a href="tel:+254123456789" className="font-sans text-[0.9375rem] text-white/70 leading-[1.6] hover:text-gold transition-colors">
                +254 123 456 789
              </a>
            </div>
            <div className="flex gap-4 items-start group">
              <span className="text-[24px] w-8 shrink-0 group-hover:animate-[envelopeOpen_0.6s_ease]">✉️</span>
              <a href="mailto:reservations@gretonhotel.com" className="font-sans text-[0.9375rem] text-white/70 leading-[1.6] hover:text-gold transition-colors">
                reservations@gretonhotel.com
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-[1.25rem] font-semibold text-white relative pb-2 w-fit">
            Stay Updated
            <div className="absolute bottom-0 left-0 w-[40px] h-[2px] bg-gold" />
          </h4>
          <p className="text-white/60 font-sans text-[0.875rem]">
            Subscribe to receive exclusive offers and news
          </p>
          <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white/10 border border-white/20 p-[14px_20px] rounded-lg text-[0.9375rem] font-sans text-white focus:outline-none focus:border-gold focus:bg-white/15 focus:ring-4 ring-gold/20 transition-all placeholder:text-white/50"
              required
            />
            <button 
              type="submit" 
              className="w-full p-[14px_20px] bg-gradient-to-r from-[#D4AF37] to-[#F4E5B5] rounded-lg font-sans text-[0.9375rem] font-semibold text-white uppercase tracking-[0.05em] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,175,55,0.4)] hover:bg-gradient-to-l transition-all duration-300"
              style={{ background: isSubscribed ? '#4CAF50' : '' }}
            >
              {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-[60px] pt-[32px]  flex flex-col md:flex-row justify-between items-center gap-4 text-[0.875rem] font-sans">
        <p className="text-white/50">&copy; {new Date().getFullYear()} Greton Hotel. All rights reserved.</p>
        <div className="flex gap-5 text-white/60">
          <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link to="/sitemap" className="hover:text-gold transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

function FloatingBookButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      to="/contact"
      className={cn(
        "fixed bottom-8 right-8 z-[1000] h-[60px] bg-[linear-gradient(135deg,#D4AF37,#F4E5B5)] shadow-[0_8px_32px_rgba(212,175,55,0.4),0_0_60px_rgba(212,175,55,0.3)] rounded-[30px] flex items-center justify-center text-white transition-all duration-400 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] overflow-hidden group hover:px-6 hover:shadow-[0_12px_40px_rgba(212,175,55,0.5),0_0_80px_rgba(212,175,55,0.5)] animate-[floatingPulse_2.5s_ease-in-out_infinite]",
        isVisible ? "opacity-100 translate-y-0 w-[60px] hover:w-[160px]" : "opacity-0 translate-y-5 pointer-events-none w-[60px]"
      )}
    >
      <div className="flex items-center justify-center shrink-0 w-[60px] h-full absolute left-0">
        <Phone size={24} />
      </div>
      <span className="font-sans font-bold uppercase tracking-wider text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-8 whitespace-nowrap">Book Now</span>
    </Link>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.4 }}
          onClick={scrollToTop}
          className="fixed bottom-[110px] right-8 z-[1000] w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white  shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center text-gold hover:bg-gold hover:text-white hover:-translate-y-[5px] transition-all duration-300 group focus:outline-none"
        >
          <motion.div
            whileTap={{ y: -5 }}
            transition={{ type: "spring" }}
            className="group-hover:animate-[bounce_1s_infinite]"
          >
            <ArrowUp size={24} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<any>(null);

  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, // How long it takes in seconds to catch up to the scroll position
      effects: true, // Look for data-speed and data-lag attributes
      smoothTouch: 0.1, // Smooth scrolling on touch devices
    });

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
    };
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen flex flex-col" id="smooth-wrapper">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1" id="smooth-content">
        {children}
        <Footer />
      </main>
      <BackToTopButton />
      <FloatingBookButton />
    </div>
  );
}
