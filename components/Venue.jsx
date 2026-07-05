"use client";

import { MapPin, Navigation } from "lucide-react";
import Reveal from "./Reveal";

export default function Venue({ venue, photo, side = "left", showPhoto = false }) {
  return (
    <section>
      <div className="inner venue">
        {showPhoto && photo && (
          <Reveal>
            <img src={photo} alt={venue.title} className="venue-photo" />
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <p className="kicker">
            <MapPin size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            {venue.tagline || venue.kicker}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
            {venue.kicker}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="venue-title">{venue.title}</p>
          <p className="venue-address">
            {venue.address} · {venue.city}
          </p>

          <div className="venue-meta">
            <span className="chip">{venue.time}</span>
          </div>

          <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            <Navigation size={16} />
            Cómo llegar
          </a>
        </Reveal>
      </div>
    </section>
  );
}
