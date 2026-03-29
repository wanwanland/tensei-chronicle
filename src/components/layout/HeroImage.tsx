"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGES = ["/hero/1.jpg", "/hero/2.jpg", "/hero/3.jpg", "/hero/4.jpg"];

/**
 * Full-screen immersive hero with parallax + crossfade reveal
 *
 * Art direction concept:
 * - イラストが画面全体を支配する（映画のオープニングのように）
 * - スクロールすると parallax でイラストが奥に沈む
 * - フォームはイラストの上にフローティングで重なる
 * - 光の粒子が常に浮遊するオーバーレイ
 */
export function HeroScene() {
  const [src, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Fade out as user scrolls down
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Scale up slightly on scroll for depth
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    setSrc(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  }, []);

  return (
    <div ref={containerRef} className="relative -mx-4 -mt-4 mb-8 md:-mx-0 md:-mt-0">
      {/* Full-bleed image container */}
      <motion.div
        style={{ y: imageY, opacity: imageOpacity, scale: imageScale }}
        className="relative h-[85vh] min-h-[500px] max-h-[800px] w-full overflow-hidden md:h-[70vh] md:rounded-2xl"
      >
        {/* The illustration */}
        {src && (
          <Image
            src={src}
            alt="転生年表 ヒーローイメージ"
            fill
            className={`object-cover transition-all duration-[2s] ${loaded ? "scale-100 blur-0" : "scale-110 blur-sm"}`}
            priority
            sizes="100vw"
            onLoad={() => setLoaded(true)}
          />
        )}

        {/* Cinematic color grading overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

        {/* Side cinematic bars (subtle letterbox feel) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-neon-cyan/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80 - Math.random() * 120],
                x: [0, (Math.random() - 0.5) * 60],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Bottom neon line */}
        <div className="absolute right-0 bottom-0 left-0 z-10 h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
      </motion.div>

      {/* Content overlay — positioned at the bottom of the hero */}
      <div className="absolute right-0 bottom-0 left-0 z-20 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-lg"
        >
          <p className="mb-6 text-center font-mono text-base text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-lg">
            もしも別の時代に生まれていたら——
            <br />
            <span className="text-sm text-white/70">あなたのIFの人生をシミュレーション</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
