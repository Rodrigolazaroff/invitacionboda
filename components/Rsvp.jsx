"use client";

import { useState } from "react";
import { Heart, Send, Loader2, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { rsvp } from "@/lib/data";

const florAnim = {
  initial: { opacity: 0, scale: 0.85 },
  whileInView: { opacity: 0.95, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
};

const personaVacia = () => ({ nombre: "", asiste: "si", restriccion: "Ninguna" });
const MAX_PERSONAS = 8;

export default function Rsvp() {
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [invitadoDe, setInvitadoDe] = useState("novio");
  const [personas, setPersonas] = useState([personaVacia()]);

  function updatePersona(i, campo, valor) {
    setPersonas((prev) => prev.map((p, idx) => (idx === i ? { ...p, [campo]: valor } : p)));
  }
  function addPersona() {
    setPersonas((prev) => (prev.length >= MAX_PERSONAS ? prev : [...prev, personaVacia()]));
  }
  function removePersona(i) {
    setPersonas((prev) => prev.filter((_, idx) => idx !== i));
  }

  // Estado de asistencia del grupo (para el mensaje final y el corazón)
  const algunoAsiste = personas.some((p) => p.asiste === "si");
  const todosAsisten = personas.every((p) => p.asiste === "si");
  const nadieAsiste = personas.every((p) => p.asiste === "no");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const payload = {
      invitadoDe: invitadoDe === "novio" ? "Novio" : "Novia",
      mensaje: form.mensaje.value.trim(),
      personas: personas.map((p) => ({
        nombre: p.nombre.trim(),
        asiste: p.asiste === "si" ? "Sí" : "No",
        restriccion: p.asiste === "si" ? p.restriccion : "",
      })),
      fecha: new Date().toLocaleString("es-AR"),
    };
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
    <>
      {/* ── Sección 6: intro con flores (título + texto + fecha) ── */}
      <section id="confirmar" style={{ overflow: "hidden" }}>
        {/* Flor arriba izquierda */}
        <motion.img
          src="/assets/botanical/florarribaizquierda.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="sprig"
          style={{
            top: -10,
            left: -10,
            width: "clamp(120px, 32vw, 180px)",
          }}
          {...florAnim}
        />
        {/* Flor abajo derecha */}
        <motion.img
          src="/assets/botanical/florabajoderecha.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="sprig"
          style={{
            bottom: 20,
            right: -10,
            width: "clamp(140px, 38vw, 210px)",
          }}
          {...florAnim}
        />

        <div className="inner" style={{ padding: "3.5rem 2rem 5rem" }}>
          <Reveal>
            <h2 className="section-title">Confirmación de asistencia</h2>
            <div className="divider">❦</div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="rsvp-intro">
              {rsvp.intro.replace("¡Gracias por comprender!", "").trim()}{" "}
              <span style={{ whiteSpace: "nowrap" }}>¡Gracias por comprender!</span>
            </p>
            <p className="rsvp-deadline">Por favor, confirmá antes del {rsvp.deadlineLabel}.</p>
          </Reveal>
        </div>
      </section>

      {/* ── Sección 6.5: formulario (sin flores) ── */}
      <section style={{ paddingTop: 0 }}>
        <div className="inner">
          {status === "ok" ? (
            <Reveal>
              <div className="card rsvp-success">
                {algunoAsiste && (
                  <Heart size={40} className="heart" fill="currentColor" />
                )}
                {nadieAsiste ? (
                  <>
                    <h3 style={{ color: "var(--olive)", fontSize: "1.3rem" }}>¡Gracias por avisarnos!</h3>
                    <p style={{ color: "var(--sage)" }}>
                      Lamentamos que no puedas acompañarnos. ¡Te vamos a extrañar!
                    </p>
                  </>
                ) : (
                  <>
                    <h3 style={{ color: "var(--olive)", fontSize: "1.3rem" }}>
                      {todosAsisten ? "¡Gracias por confirmar!" : "¡Gracias por tu respuesta!"}
                    </h3>
                    <p style={{ color: "var(--sage)" }}>
                      Recibimos tu respuesta. ¡Nos vemos el 12 de diciembre! 🌿
                    </p>
                  </>
                )}
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <div className="form-wrap">
              <form className="form card" onSubmit={onSubmit}>
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

                {personas.map((p, i) => (
                  <div className="persona-block" key={i}>
                    <div className="persona-head">
                      <span className="persona-num">Persona {i + 1}</span>
                      {personas.length > 1 && (
                        <button
                          type="button"
                          className="persona-remove"
                          onClick={() => removePersona(i)}
                          aria-label={`Quitar persona ${i + 1}`}
                        >
                          <X size={14} /> Quitar
                        </button>
                      )}
                    </div>

                    <div className="field">
                      <label htmlFor={`nombre-${i}`}>Nombre y apellido</label>
                      <input
                        id={`nombre-${i}`}
                        required
                        placeholder="Nombre completo"
                        value={p.nombre}
                        onChange={(e) => updatePersona(i, "nombre", e.target.value)}
                      />
                    </div>

                    <div className="field">
                      <label>¿Vas a asistir?</label>
                      <div className="radio-row">
                        <label>
                          <input
                            type="radio"
                            name={`asiste-${i}`}
                            value="si"
                            checked={p.asiste === "si"}
                            onChange={() => updatePersona(i, "asiste", "si")}
                          />
                          <span>Sí, ahí estaré</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`asiste-${i}`}
                            value="no"
                            checked={p.asiste === "no"}
                            onChange={() => updatePersona(i, "asiste", "no")}
                          />
                          <span>No podré ir</span>
                        </label>
                      </div>
                    </div>

                    {p.asiste === "si" && (
                      <div className="field">
                        <label htmlFor={`restriccion-${i}`}>Restricción alimentaria</label>
                        <select
                          id={`restriccion-${i}`}
                          value={p.restriccion}
                          onChange={(e) => updatePersona(i, "restriccion", e.target.value)}
                        >
                          {rsvp.mealOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                {personas.length < MAX_PERSONAS && (
                  <button type="button" className="add-persona" onClick={addPersona}>
                    <Plus size={16} /> Agregar otra persona
                  </button>
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
              {status === "loading" && (
                <div className="form-loading" aria-live="polite">
                  <div className="spinner-ring" />
                  <p>Enviando tu confirmación…</p>
                </div>
              )}
              </div>
            </Reveal>
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
          .form-wrap {
            position: relative;
          }
          .form-loading {
            position: absolute;
            inset: 0;
            border-radius: 20px;
            background: rgba(247, 245, 240, 0.82);
            backdrop-filter: blur(2px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.1rem;
            z-index: 5;
          }
          .spinner-ring {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 4px solid rgba(129, 160, 98, 0.25);
            border-top-color: var(--olive);
            animation: spin 0.85s linear infinite;
          }
          .form-loading p {
            color: var(--olive);
            font-weight: 700;
            font-size: 0.8rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
        `}</style>
      </section>
    </>
  );
}
