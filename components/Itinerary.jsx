"use client";

import { Church, Wine, UtensilsCrossed, PartyPopper } from "lucide-react";
import Reveal from "./Reveal";
import Botanical from "./Botanical";
import { itinerary, dressCode } from "@/lib/data";

const ICONS = {
  church: Church,
  glass: Wine,
  dinner: UtensilsCrossed,
  party: PartyPopper,
};

// Íconos de dress code: vestido + traje (SVG a medida, trazo olivo)
function DressIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      aria-label="Vestido">
      <path d="M9 3l3 2 3-2" />
      <path d="M9 3l.6 5-3.1 12h11l-3.1-12L15 3" />
      <path d="M9.6 8h4.8" />
    </svg>
  );
}

function SuitIcon({ size = 46 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      aria-label="Traje">
      <path d="M7 3.5 6 20h12L17 3.5" />
      <path d="M7 3.5 10 5.2 12 9l2-3.8 3-1.7" />
      <path d="M12 9v11" />
      <circle cx="12" cy="12.4" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15.2" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Itinerary() {
  return (
    <section>
      <Botanical side="left" width={140} style={{ bottom: 30, left: -40, opacity: 0.8 }} flip />
      <div className="inner" style={{ textAlign: "center" }}>
        <Reveal>
          <h2 className="section-title">Itinerario</h2>
          <div className="divider">❦</div>
        </Reveal>

        <div className="timeline-alt">
          {itinerary.map((it, i) => {
            const Icon = ICONS[it.icon] || Wine;
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
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <div className="tl-side right">{!onLeft && content}</div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="dresscode">
            <div className="dc-icons">
              <DressIcon size={46} />
              <SuitIcon size={46} />
            </div>
            <span className="dc-note">{dressCode.note}</span>
            <span className="dc-value">{dressCode.label}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
