"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "./MusicProvider";

/**
 * Pantalla de inicio: un video de un sobre abriéndose.
 * Al tocar cualquier parte de la pantalla el video se reproduce (con su
 * sonido) y, al terminar, se desvanece revelando la invitación mientras
 * arranca la canción de fondo.
 *
 * La revelación se dispara por varios caminos redundantes (evento `ended`,
 * `timeupdate` cerca del final y un timer de seguridad) para que la
 * invitación SIEMPRE aparezca, incluso en navegadores móviles donde `ended`
 * no es confiable en videos inline.
 */
export default function Envelope() {
  const [phase, setPhase] = useState("closed"); // closed | playing | closing | done
  const videoRef = useRef(null);
  const revealed = useRef(false);
  const safetyTimer = useRef(null);
  const music = useMusic();

  // Bloquea el scroll mientras el sobre está en pantalla
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  // Al desmontar, corta cualquier timer pendiente
  useEffect(() => () => clearTimeout(safetyTimer.current), []);

  // Revela la invitación. Idempotente: puede llamarse desde `ended`, desde el
  // `timeupdate` cercano al final o desde el timer de seguridad; corre 1 vez.
  function reveal() {
    if (revealed.current) return;
    revealed.current = true;
    clearTimeout(safetyTimer.current);
    music?.play(); // arranca la canción justo cuando termina el video
    setPhase("closing"); // dispara el fade-out
    setTimeout(() => setPhase("done"), 850); // luego desmonta y revela
  }

  // Si el video llega (casi) al final pero `ended` no disparó, revelamos igual.
  function handleTimeUpdate(e) {
    const v = e.currentTarget;
    if (Number.isFinite(v.duration) && v.duration - v.currentTime < 0.35) {
      reveal();
    }
  }

  function handleOpen() {
    if (phase !== "closed") return;
    setPhase("playing");
    music?.unlock(); // desbloquea la canción (iOS) dentro del gesto del toque
    const v = videoRef.current;
    if (!v) {
      reveal();
      return;
    }
    v.currentTime = 0;
    v.play().catch(() => reveal()); // si el navegador bloquea el video, revelamos igual
    // Red de seguridad: si ni `ended` ni `timeupdate` disparan, revelamos igual.
    const dur = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : 10;
    safetyTimer.current = setTimeout(reveal, (dur + 4) * 1000);
  }

  if (phase === "done") return null;

  return (
    <div
      className="envelope-overlay video-mode"
      role="button"
      aria-label="Abrir invitación"
      onClick={handleOpen}
      style={{ opacity: phase === "closing" ? 0 : 1, transition: "opacity 0.8s ease" }}
    >
      <video
        ref={videoRef}
        className="env-video"
        src="/assets/video/video_inicio.mp4"
        playsInline
        preload="auto"
        onEnded={reveal}
        onTimeUpdate={handleTimeUpdate}
      />
      {phase === "closed" && <div className="env-hint">Tocá para abrir</div>}
    </div>
  );
}
