"use client";

import { Church, Wine, UtensilsCrossed, PartyPopper, Shirt } from "lucide-react";
import Reveal from "./Reveal";
import Botanical from "./Botanical";
import { itinerary, dressCode } from "@/lib/data";

const ICONS = {
  church: Church,
  glass: Wine,
  dinner: UtensilsCrossed,
  party: PartyPopper,
};

export default function Itinerary() {
  return (
    <section>
      <Botanical side="left" width={140} style={{ bottom: 30, left: -40, opacity: 0.8 }} flip />
      <div className="inner" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="section-title">Itinerario</h2>
          <div className="divider">❦</div>
        </Reveal>

        <div className="timeline">
          {itinerary.map((it, i) => {
            const Icon = ICONS[it.icon] || Wine;
            return (
              <Reveal key={it.time} delay={i * 0.08} className="tl-item">
                <div className="tl-icon">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div className="tl-time">{it.time} hs</div>
                  <div className="tl-label">{it.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="dresscode">
            <Shirt size={30} strokeWidth={1.5} className="dc-icon" />
            <span className="dc-note">{dressCode.note}</span>
            <span className="dc-value">{dressCode.label}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
