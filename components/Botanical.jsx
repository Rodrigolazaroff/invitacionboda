"use client";

import { motion } from "framer-motion";

/**
 * Ramas de eucalipto decorativas (asset real extraído de la tarjeta original).
 * side: "left" | "right".  Aparecen con un leve giro/deriva.
 */
export default function Botanical({ side = "left", style, width = 190, flip = false }) {
  const src =
    side === "left"
      ? "/assets/botanical/eucalyptus_left.webp"
      : "/assets/botanical/eucalyptus_right.webp";
  const fromX = side === "left" ? -30 : 30;

  return (
    <motion.img
      src={src}
      alt=""
      aria-hidden="true"
      className="sprig"
      draggable={false}
      style={{ width, transform: flip ? "scaleX(-1)" : "none", ...style }}
      initial={{ opacity: 0, x: fromX, rotate: side === "left" ? -6 : 6 }}
      whileInView={{ opacity: 0.95, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
