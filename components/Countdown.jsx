"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { event, photos } from "@/lib/data";

function diff(target) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, done: ms === 0 };
}

const cells = [
  ["d", "Días"],
  ["h", "Horas"],
  ["m", "Min"],
  ["s", "Seg"],
];

export default function Countdown() {
  const target = new Date(event.dateISO).getTime();
  const [t, setT] = useState(null); // null hasta montar (evita hydration mismatch)

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section>
      <div className="inner" style={{ textAlign: "center" }}>
        <Reveal>
          <p className="kicker">Falta muy poco</p>
          <h2 className="section-title" style={{ marginTop: "0.6rem" }}>
            La cuenta regresiva
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          {t?.done ? (
            <p className="cover-sub" style={{ marginTop: "1.5rem" }}>
              ¡Hoy es el gran día!
            </p>
          ) : (
            <div className="countdown">
              {cells.map(([key, label]) => (
                <div className="count-cell" key={key}>
                  <div className="count-num">{t ? String(t[key]).padStart(2, "0") : "--"}</div>
                  <div className="count-label">{label}</div>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <div className="divider" style={{ marginTop: "3rem" }}>❦</div>
          <img
            src={photos.cover}
            alt="Nahiara y Rodrigo"
            className="venue-photo"
            style={{ maxWidth: 360, aspectRatio: "3 / 4", marginTop: "1.5rem" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
