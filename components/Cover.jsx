"use client";

import { motion } from "framer-motion";
import Botanical from "./Botanical";
import { couple, event } from "@/lib/data";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Cover() {
  return (
    <section className="cover">
      <Botanical side="left" width={230} style={{ top: -20, left: -60 }} />
      <Botanical side="right" width={230} style={{ top: -30, right: -60 }} />
      <Botanical side="right" width={210} style={{ bottom: -30, left: -50 }} flip />
      <Botanical side="left" width={210} style={{ bottom: -40, right: -50 }} flip />

      <div className="inner">
        <motion.div className="cover-monogram" custom={0} variants={rise} initial="hidden" animate="show">
          {couple.monogram.left}
          <span className="amp">&amp;</span>
          {couple.monogram.right}
        </motion.div>

        <motion.p className="cover-sub" custom={1} variants={rise} initial="hidden" animate="show">
          ¡Nos casamos!
        </motion.p>

        <motion.h1 className="cover-names" custom={2} variants={rise} initial="hidden" animate="show">
          {couple.bride}
          <br />
          <span style={{ fontSize: "0.55em", color: "var(--sage)" }}>&amp;</span>
          <br />
          {couple.groom}
        </motion.h1>

        <motion.p className="cover-date" custom={3} variants={rise} initial="hidden" animate="show">
          {event.dateLabel} · {event.city}
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
