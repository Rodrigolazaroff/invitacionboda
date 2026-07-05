"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { couple, event } from "@/lib/data";

/**
 * Pantalla de inicio: un sobre cerrado con el sello N&R.
 * Al tocarlo, la solapa se abre, la carta sube y el overlay
 * se desvanece revelando la invitación.
 */
export default function Envelope() {
  const [phase, setPhase] = useState("closed"); // closed | opening | done
  const open = phase !== "closed";

  // Bloquea el scroll mientras el sobre está en pantalla
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="envelope-overlay"
        role="button"
        aria-label="Abrir invitación"
        onClick={() => phase === "closed" && setPhase("opening")}
        exit={{ opacity: 0 }}
        animate={open ? { opacity: 0, transition: { delay: 1.5, duration: 0.7 } } : { opacity: 1 }}
        onAnimationComplete={() => {
          if (open) setPhase("done");
        }}
      >
        <div className="envelope">
          {/* carta (sube por encima del bolsillo al abrir) */}
          <motion.div
            className="env-letter"
            style={{ zIndex: open ? 5 : 1 }}
            animate={open ? { y: "-52%", scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: open ? 0.45 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <img
                src="/assets/logo/logo.webp"
                alt={`${couple.bride} & ${couple.groom}`}
                className="env-letter-logo"
              />
              <div className="env-letter-date">
                {event.dayNumber} · {event.monthShort} · {event.year}
              </div>
            </div>
          </motion.div>

          {/* bolsillo frontal del sobre */}
          <div className="env-front" />

          {/* solapa */}
          <motion.div
            className="env-flap"
            style={{ zIndex: open ? 1 : 3 }}
            animate={open ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* sello N&R */}
          <motion.div
            className="env-seal"
            style={{ x: "-50%", y: "-42%" }}
            animate={open ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            {couple.monogram.left}
            <span style={{ fontSize: "0.6em", margin: "0 0.05em" }}>&amp;</span>
            {couple.monogram.right}
          </motion.div>
        </div>

        {!open && <div className="env-hint">Tocá para abrir</div>}
      </motion.div>
    </AnimatePresence>
  );
}
