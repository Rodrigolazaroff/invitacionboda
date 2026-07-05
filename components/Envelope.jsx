"use client";

import { useEffect, useRef, useState } from "react";
import { useMusic } from "./MusicProvider";

/**
 * Pantalla de inicio: un video de un sobre abriéndose.
 * Al tocar cualquier parte de la pantalla el video se reproduce (con su
 * sonido) y, al terminar, se desvanece revelando la invitación mientras
 * arranca la canción de fondo.
 */
export default function Envelope() {
  const [phase, setPhase] = useState("closed"); // closed | playing | closing | done
  const videoRef = useRef(null);
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

  function handleEnded() {
    music?.play(); // arranca la canción justo cuando termina el video
    setPhase("closing"); // dispara el fade-out (CSS)
    setTimeout(() => setPhase("done"), 850); // luego desmonta y revela
  }

  function handleOpen() {
    if (phase !== "closed") return;
    setPhase("playing");
    music?.unlock(); // desbloquea la canción (iOS) dentro del gesto del toque
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {
        // Si el navegador bloqueara el video, igual revelamos la invitación
        handleEnded();
      });
    }
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
        onEnded={handleEnded}
      />
      {phase === "closed" && <div className="env-hint">Tocá para abrir</div>}
    </div>
  );
}
