import { motion, Variants } from "motion/react"
import React from "react"

/**
 * ==============   Data   ================
 */

// Format: [Label/Title, HueA, HueB, ImageURL]
const HOTEL_INFO: [string, number, number, string][] = [
    ["Fine Dining", 340, 10, "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800"],
    ["Vintage Wines", 20, 40, "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800"],
    ["Artisan Pastry", 60, 90, "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800"],
    ["Global Buffet", 80, 120, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800"],
    ["Sunset Bar", 100, 140, "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800"],
    ["Chef's Table", 205, 245, "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800"],
    ["Private Events", 260, 290, "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800"],
    ["Royal Service", 290, 320, "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800"],
]

export default function CulinaryHighlights() {
    return (
        <section className="py-[120px] bg-transparent overflow-hidden">
            <div className="max-w-[1400px] mx-auto text-center mb-20 px-6">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-[clamp(2.5rem,6vw,5rem)] text-gold mb-4"
                >
                    Culinary Excellence
                </motion.h2>
                <p className="text-white/70 font-sans max-w-2xl mx-auto text-lg">
                    Discover the passion and precision behind every plate at Maison Royale.
                </p>
            </div>
            
            <div style={container}>
                {HOTEL_INFO.map(([title, hueA, hueB, img], i) => (
                    <Card key={title} i={i} title={title} hueA={hueA} hueB={hueB} img={img} />
                ))}
            </div>
        </section>
    )
}

interface CardProps {
    title: string
    hueA: number
    hueB: number
    img: string
    i: number
    key?: React.Key
}

function Card({ title, hueA, hueB, img, i }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants} className="card overflow-hidden">
                 <img 
                    src={img} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-center pb-12 px-6">
                    <span className="text-white font-serif text-3xl text-center drop-shadow-xl tracking-wider uppercase">
                        {title}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    )
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "0 auto",
    maxWidth: 500,
    paddingBottom: 100,
    width: "100%",
}

const cardContainer: React.CSSProperties = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
}

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
    // fontSize is not needed since I'm placing title/img
    width: 300,
    height: 430,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    transformOrigin: "10% 60%",
}
