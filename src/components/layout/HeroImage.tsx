"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HERO_IMAGES = ["/hero/1.jpg", "/hero/2.jpg", "/hero/3.jpg", "/hero/4.jpg"];

export function HeroImage() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    setSrc(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  }, []);

  if (!src) return <div className="h-[280px] md:h-[360px]" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mx-auto mb-6 w-full max-w-3xl overflow-hidden rounded-xl"
    >
      {/* Image */}
      <div className="relative h-[280px] md:h-[360px]">
        <Image
          src={src}
          alt="転生年表 ヒーローイメージ"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />

        {/* Bottom gradient fade to black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Subtle top fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)]" />

        {/* Neon border glow at bottom */}
        <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      </div>
    </motion.div>
  );
}
