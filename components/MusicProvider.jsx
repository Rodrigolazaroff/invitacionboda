"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Provee la música de fondo a toda la invitación.
 *
 * Flujo (ver Envelope): al TOCAR el sobre desbloqueamos el audio dentro del
 * gesto del usuario (requisito de iOS Safari); cuando el video termina llamamos
 * a play() y la canción arranca sin superponerse con el audio del video.
 */
const MusicContext = createContext(null);
export const useMusic = () => useContext(MusicContext);

export default function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  // Desbloquea el <audio> dentro del gesto del usuario (iOS no deja reproducir
  // audio más tarde si no se "tocó" primero). play()+pause() instantáneo.
  const unlock = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = true;
    const p = a.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        a.pause();
        a.currentTime = 0;
        a.muted = false;
      }).catch(() => {});
    }
  }, []);

  // Arranca la canción (tras el desbloqueo). Fade-in suave donde el navegador
  // lo permita (iOS ignora volume y suena directo, sin error).
  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = false;
    setMuted(false);
    try {
      a.volume = 0;
    } catch {}
    const p = a.play();
    const onOk = () => {
      setStarted(true);
      let v = 0;
      const id = setInterval(() => {
        v = Math.min(1, v + 0.05);
        try {
          a.volume = v;
        } catch {}
        if (v >= 1) clearInterval(id);
      }, 60);
    };
    if (p && typeof p.then === "function") p.then(onOk).catch(() => setStarted(true));
    else onOk();
  }, []);

  const toggleMute = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    // Si iOS hubiera bloqueado el arranque diferido, este toque (gesto real
    // del usuario) reanuda la reproducción en vez de solo togglear el mute.
    if (a.paused) {
      a.muted = false;
      a.play().catch(() => {});
      setMuted(false);
      return;
    }
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  return (
    <MusicContext.Provider value={{ unlock, play, toggleMute, started, muted }}>
      <audio
        ref={audioRef}
        src="/assets/audio/ed_sheeran_thinking_out_loud.mp3"
        loop
        preload="none"
      />
      {children}
      {started && (
        <button
          type="button"
          className="music-toggle"
          onClick={toggleMute}
          aria-label={muted ? "Activar música" : "Silenciar música"}
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </MusicContext.Provider>
  );
}
