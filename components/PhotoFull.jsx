"use client";

import Reveal from "./Reveal";

// Foto a pantalla completa, como las páginas de foto de la tarjeta
export default function PhotoFull({ src, alt = "Nahiara y Rodrigo" }) {
  return (
    <section className="photo-full">
      <Reveal>
        <img src={src} alt={alt} />
      </Reveal>
    </section>
  );
}
