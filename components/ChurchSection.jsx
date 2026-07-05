"use client";

import { Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { couple, event, venues } from "@/lib/data";

const florAnim = {
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 0.95, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
};

// Sección 3: Iglesia — flores propias arriba-izq y abajo-der, sin superposición
export default function ChurchSection() {
  const v = venues.ceremony;
  return (
    <section style={{ overflow: "hidden" }}>
      {/* Flor arriba izquierda */}
      <motion.img
        src="/assets/botanical/florarribaizquierda.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="sprig"
        style={{
          top: -10,
          left: -10,
          width: "clamp(120px, 32vw, 180px)",
        }}
        {...florAnim}
      />
      {/* Flor abajo derecha */}
      <motion.img
        src="/assets/botanical/florabajoderecha.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="sprig"
        style={{
          bottom: -10,
          right: -10,
          width: "clamp(140px, 38vw, 210px)",
        }}
        {...florAnim}
      />

      <div className="inner" style={{ textAlign: "center", padding: "3.5rem 2rem" }}>
        <Reveal>
          <h2 className="cover-names" style={{ marginTop: 0 }}>
            {couple.bride}
            <br />
            <span style={{ fontSize: "0.55em", color: "var(--sage)" }}>&amp;</span>
            <br />
            {couple.groom}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="venue-title">{v.title}</p>
          <p className="venue-address">{v.address}</p>
          <p className="venue-address" style={{ marginTop: "0.2rem" }}>
            - {v.city} -
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={v.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
            style={{ marginTop: "1.6rem" }}
          >
            <Navigation size={16} />
            Cómo llegar
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="date-chips">
            <div>{event.dayName}</div>
            <div>
              {event.monthShort}, {event.dayNumber}
              <br />
              {event.year}
            </div>
            <div>{v.time.replace(" hs", "hs")}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
