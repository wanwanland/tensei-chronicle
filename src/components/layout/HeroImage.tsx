"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const HERO_IMAGES = ["/hero/1.jpg", "/hero/2.jpg", "/hero/3.jpg", "/hero/4.jpg"];

export function HeroScene() {
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Desktop only: parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    setSrc(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const disableParallax = isMobile || prefersReducedMotion;

  return (
    <div ref={containerRef} className="relative">
      {/* Image container — responsive sizing */}
      <motion.div
        style={disableParallax ? {} : { y: imageY, opacity: imageOpacity, scale: imageScale }}
        className="relative w-full overflow-hidden"
      >
        {/* Mobile: 60vh compact, Desktop: 70vh cinematic */}
        <div className="relative h-[60vh] min-h-[380px] md:h-[70vh] md:max-h-[700px]">
          {src && (
            <Image
              src={src}
              alt="転生年表 ヒーローイメージ"
              fill
              className={`object-cover transition-all duration-[1.5s] ease-out ${
                loaded ? "scale-100 blur-0 opacity-100" : "scale-105 blur-sm opacity-0"
              }`}
              priority
              sizes="100vw"
              onLoad={() => setLoaded(true)}
            />
          )}

          {/* Bottom fade — key for smooth transition to form */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />

          {/* Subtle top darken */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

          {/* Floating particles — fewer on mobile */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(isMobile ? 8 : 15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-neon-cyan/30"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -60 - Math.random() * 80],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 6,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Tagline — sits in the fade-to-black zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 -mt-20 px-4 text-center md:-mt-24"
      >
        <p className="font-mono text-sm text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] md:text-base">
          もしも別の時代に生まれていたら——
        </p>
        <p className="mt-1 font-mono text-xs text-white/50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] md:text-sm">
          あなたのIFの人生をシミュレーション
        </p>
      </motion.div>
    </div>
  );
}
