"use client";

import { Navigation } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { event, venues, photos } from "@/lib/data";

const florAnim = {
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 0.95, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
};

// Sección 4: foto + "Ceremonia y Fiesta" — flor solo abajo a la derecha
export default function PartySection() {
  const v = venues.party;
  return (
    <section style={{ overflow: "hidden", paddingTop: 0 }}>
      {/* Flor solo abajo derecha */}
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

      {/* Foto primero */}
      <div className="photo-full" style={{ marginBottom: "2.8rem" }}>
        <Reveal>
          <img src={photos.party} alt="Nahiara y Rodrigo" />
        </Reveal>
      </div>

      <div className="inner" style={{ textAlign: "center", paddingBottom: "3.5rem" }}>
        <Reveal>
          <h2 className="section-title">Ceremonia y Fiesta</h2>
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
