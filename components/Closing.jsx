"use client";

import { Heart } from "lucide-react";
import Reveal from "./Reveal";
import { couple, photos, event } from "@/lib/data";

export default function Closing() {
  return (
    <section className="closing">
      <div className="inner">
        <Reveal>
          <img src={photos.closing} alt="Nahiara y Rodrigo" className="closing-photo" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="cover-sub" style={{ fontSize: "clamp(1.4rem,6vw,2rem)" }}>
            ¡Los esperamos!
          </p>
          <h2 className="closing-names">
            {couple.bride} &amp; {couple.groom}
          </h2>
          <Heart size={26} className="closing-heart" fill="currentColor" />
          <p className="cover-date" style={{ marginTop: "1rem" }}>
            {event.dateLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
