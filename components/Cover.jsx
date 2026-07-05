"use client";

import { motion } from "framer-motion";
import { couple } from "@/lib/data";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Página 1 de la tarjeta: solo el logo N&R con "¡Nos casamos!"
export default function Cover() {
  return (
    <section className="cover">
      <div className="inner">
        <motion.img
          src="/assets/logo/logo.webp"
          alt={`${couple.monogram.left}&${couple.monogram.right}`}
          className="cover-logo"
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
        />

        <motion.p className="nos-casamos" custom={1} variants={rise} initial="hidden" animate="show">
          ¡Nos casamos!
        </motion.p>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span>Deslizá</span>
        <span className="dot">↓</span>
      </motion.div>
    </section>
  );
}
