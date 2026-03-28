"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function TimelineConnector() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex justify-center">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-12 w-px origin-top bg-gradient-to-b from-neon-cyan/40 to-neon-cyan/10"
      />
    </div>
  );
}
