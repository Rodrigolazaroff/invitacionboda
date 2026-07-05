"use client";

import { useState } from "react";
import { Heart, Send, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { rsvp } from "@/lib/data";

export default function Rsvp() {
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [attending, setAttending] = useState("si");
  const [invitadoDe, setInvitadoDe] = useState("novio");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    // Ojo: si no asiste, los campos acompañantes/restricciones no existen
    // en el DOM (render condicional) — leerlos directo rompía el envío.
    const payload = {
      nombre: form.nombre.value.trim(),
      invitadoDe: invitadoDe === "novio" ? "Novio" : "Novia",
      asiste: attending === "si" ? "Sí" : "No",
      acompanantes: attending === "si" ? form.acompanantes.value : "0",
      restricciones: attending === "si" ? form.restricciones.value : "",
      mensaje: form.mensaje.value.trim(),
      fecha: new Date().toLocaleString("es-AR"),
    };
    // Timeout de red: si en 10s no hubo respuesta, cortamos y mostramos error
    // en vez de dejar el botón clavado en "Enviando…".
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <section id="confirmar">
      <div className="inner">
        <Reveal>
          <h2 className="section-title">Confirmación de asistencia</h2>
          <div className="divider">❦</div>
        </Reveal>

        {status === "ok" ? (
          <Reveal>
            <div className="card rsvp-success">
              <Heart size={40} className="heart" fill="currentColor" />
              {attending === "si" ? (
                <>
                  <h3 style={{ color: "var(--olive)", fontSize: "1.3rem" }}>¡Gracias por confirmar!</h3>
                  <p style={{ color: "var(--sage)" }}>
                    Recibimos tu respuesta. ¡Nos vemos el 12 de diciembre! 🌿
                  </p>
                </>
              ) : (
                <>
                  <h3 style={{ color: "var(--olive)", fontSize: "1.3rem" }}>¡Gracias por avisarnos!</h3>
                  <p style={{ color: "var(--sage)" }}>
                    Lamentamos que no puedas acompañarnos. ¡Te vamos a extrañar! 💛
                  </p>
                </>
              )}
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
                  <label>Sos invitado de:</label>
                  <div className="radio-row">
                    <label>
                      <input
                        type="radio"
                        name="invitadoDe"
                        value="novio"
                        checked={invitadoDe === "novio"}
                        onChange={() => setInvitadoDe("novio")}
                      />
                      <span>Novio</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="invitadoDe"
                        value="novia"
                        checked={invitadoDe === "novia"}
                        onChange={() => setInvitadoDe("novia")}
                      />
                      <span>Novia</span>
                    </label>
                  </div>
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
                      <label htmlFor="restricciones">Menú / restricción alimentaria</label>
                      <select id="restricciones" name="restricciones" defaultValue="Ninguna">
                        {rsvp.mealOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
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
