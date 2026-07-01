"use client";

import { useState } from "react";
import { Heart, Send, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import Botanical from "./Botanical";
import { rsvp } from "@/lib/data";

export default function Rsvp() {
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [attending, setAttending] = useState("si");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const payload = {
      nombre: form.nombre.value.trim(),
      asiste: attending === "si" ? "Sí" : "No",
      acompanantes: form.acompanantes.value,
      restricciones: form.restricciones.value.trim(),
      mensaje: form.mensaje.value.trim(),
      fecha: new Date().toLocaleString("es-AR"),
    };
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="confirmar">
      <Botanical side="right" width={150} style={{ top: 10, right: -40, opacity: 0.85 }} />
      <div className="inner">
        <Reveal>
          <h2 className="section-title">Confirmación de asistencia</h2>
          <div className="divider">❦</div>
        </Reveal>

        {status === "ok" ? (
          <Reveal>
            <div className="card rsvp-success">
              <Heart size={40} className="heart" fill="currentColor" />
              <h3 style={{ color: "var(--olive)", fontSize: "1.3rem" }}>¡Gracias por confirmar!</h3>
              <p style={{ color: "var(--sage)" }}>
                Recibimos tu respuesta. ¡Nos vemos el 12 de diciembre! 🌿
              </p>
            </div>
          </Reveal>
        ) : (
          <>
            <Reveal delay={0.05}>
              <p className="rsvp-intro">{rsvp.intro}</p>
              <p className="rsvp-deadline">Por favor, confirmá antes del {rsvp.deadlineLabel}.</p>
            </Reveal>

            <Reveal delay={0.1}>
              <form className="form card" onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="nombre">Nombre y apellido</label>
                  <input id="nombre" name="nombre" required placeholder="Tu nombre completo" />
                </div>

                <div className="field">
                  <label>¿Vas a asistir?</label>
                  <div className="radio-row">
                    <label>
                      <input
                        type="radio"
                        name="asiste"
                        value="si"
                        checked={attending === "si"}
                        onChange={() => setAttending("si")}
                      />
                      <span>Sí, ahí estaré 🥂</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="asiste"
                        value="no"
                        checked={attending === "no"}
                        onChange={() => setAttending("no")}
                      />
                      <span>No podré ir</span>
                    </label>
                  </div>
                </div>

                {attending === "si" && (
                  <>
                    <div className="field">
                      <label htmlFor="acompanantes">Cantidad de personas (incluyéndote)</label>
                      <select id="acompanantes" name="acompanantes" defaultValue="1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="restricciones">Restricciones alimentarias (opcional)</label>
                      <input
                        id="restricciones"
                        name="restricciones"
                        placeholder="Vegetariano, celíaco, etc."
                      />
                    </div>
                  </>
                )}

                <div className="field">
                  <label htmlFor="mensaje">Dejanos un mensaje (opcional)</label>
                  <textarea id="mensaje" name="mensaje" placeholder="Un saludo para los novios ♡" />
                </div>

                <button
                  type="submit"
                  className="btn btn-solid"
                  disabled={status === "loading"}
                  style={{ marginTop: "0.4rem" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="spin" /> Enviando…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Confirmar asistencia
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p className="form-msg err">
                    Hubo un problema al enviar. Probá de nuevo en un momento.
                  </p>
                )}
              </form>
            </Reveal>
          </>
        )}
      </div>

      <style jsx>{`
        .spin {
          animation: spin 0.9s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
