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

  if (!src) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative mx-auto mb-6 hidden w-full max-w-3xl overflow-hidden rounded-xl md:block"
    >
      <div className="relative h-[360px]">
        <Image
          src={src}
          alt="転生年表 ヒーローイメージ"
          fill
          className="object-cover"
          priority
          sizes="768px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      </div>
    </motion.div>
  );
}

/** Mobile: イラストをフォーム背景として表示 */
export function HeroBackground() {
  const [src, setSrc] = useState("");

  useEffect(() => {
    setSrc(HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  }, []);

  if (!src) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-lg md:hidden"
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Edge fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)]" />
    </motion.div>
  );
}
