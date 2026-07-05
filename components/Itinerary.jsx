"use client";

import Reveal from "./Reveal";
import { itinerary, dressCode } from "@/lib/data";

export default function Itinerary() {
  return (
    <section>
      <div className="inner" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="section-title">Itinerario</h2>
          <div className="divider">❦</div>
        </Reveal>

        <div className="timeline-alt">
          {itinerary.map((it, i) => {
            const onLeft = i % 2 === 0;
            const content = (
              <>
                <div className="tl-time">{it.time} hs</div>
                <div className="tl-label">{it.label}</div>
              </>
            );
            return (
              <Reveal key={it.time} delay={i * 0.08} className="tl-row">
                <div className="tl-side left">{onLeft && content}</div>
                <div className="tl-node">
                  <img src={`/assets/icons/${it.icon}.webp`} alt={it.label} />
                </div>
                <div className="tl-side right">{!onLeft && content}</div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="dresscode">
            <img src="/assets/icons/dresscode.webp" alt="Vestido y traje" className="dc-img" />
            <span className="dc-note">{dressCode.note}</span>
            <span className="dc-value">{dressCode.label}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
