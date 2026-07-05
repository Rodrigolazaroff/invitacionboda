"use client";

import { Navigation } from "lucide-react";
import Reveal from "./Reveal";
import Botanical from "./Botanical";
import { event, venues, photos } from "@/lib/data";

// Página 4 de la tarjeta: foto + "Ceremonia y Fiesta" + flores abajo a la derecha
export default function PartySection() {
  const v = venues.party;
  return (
    <section style={{ overflow: "hidden", paddingTop: 0 }}>
      <Botanical side="right" width="clamp(130px, 36vw, 200px)" style={{ bottom: -75, right: -50 }} flip />

      <div className="photo-full" style={{ marginBottom: "2.8rem" }}>
        <Reveal>
          <img src={photos.party} alt="Nahiara y Rodrigo" />
        </Reveal>
      </div>

      <div className="inner" style={{ textAlign: "center" }}>
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
