"use client";

import { Navigation } from "lucide-react";
import Reveal from "./Reveal";
import Botanical from "./Botanical";
import { couple, event, venues } from "@/lib/data";

// Página 3 de la tarjeta: nombres + iglesia, con flores en las esquinas
export default function ChurchSection() {
  const v = venues.ceremony;
  return (
    <section style={{ overflow: "hidden" }}>
      <Botanical side="left" width="clamp(150px, 42vw, 230px)" style={{ top: -25, left: -50 }} />
      <Botanical side="right" width="clamp(110px, 30vw, 170px)" style={{ bottom: -25, right: -45 }} flip />
      <Botanical side="left" width="clamp(110px, 30vw, 170px)" style={{ bottom: -30, left: -45 }} flip />

      <div className="inner" style={{ textAlign: "center" }}>
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
