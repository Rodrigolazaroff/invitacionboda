"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { gallery } from "@/lib/data";

export default function Gallery() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!gallery?.length) return null;

  // Duplicamos las fotos para lograr un desplazamiento infinito y sin cortes.
  const loop = [...gallery, ...gallery];

  return (
    <section className="gallery-section">
      <div className="inner" style={{ textAlign: "center", padding: "0 1.5rem" }}>
        <Reveal>
          <p className="kicker">Nuestros momentos</p>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            Galería
          </h2>
          <div className="divider">❦</div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="marquee">
          <div className="marquee-track">
            {loop.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt || "Foto"}
                loading="lazy"
                draggable={false}
                onClick={() => setOpen(img.src)}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={open}
              alt="Foto ampliada"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
