// ─────────────────────────────────────────────────────────────
//  DATOS DE LA INVITACIÓN — editá todo desde acá
// ─────────────────────────────────────────────────────────────

export const couple = {
  bride: "Nahiara",
  groom: "Rodrigo",
  monogram: { left: "N", right: "R" },
};

// Fecha del evento (Argentina, UTC-3). Se usa para el countdown y el calendario.
export const event = {
  dateISO: "2026-12-12T18:00:00-03:00",
  dateLabel: "Sábado 12 de Diciembre de 2026",
  dayName: "Sábado",
  dayNumber: "12",
  monthShort: "Dic",
  year: "2026",
  city: "Goya, Corrientes",
};

// Ceremonia y Fiesta. Los links de "Cómo llegar" son los que abren Google Maps.
export const venues = {
  ceremony: {
    kicker: "Ceremonia",
    tagline: "Dónde nos casamos",
    title: "Iglesia Catedral Nuestra Señora del Rosario",
    address: "Mariano I. Loza 661",
    city: "Goya, Corrientes",
    time: "18:00 hs",
    mapUrl:
      "https://www.google.com/maps?q=Iglesia+Catedral+Nuestra+Se%C3%B1ora+del+Rosario,+Mariano+I.+Loza+661,+W3450BXM+Corrientes&ftid=0x944e84be0de755d9:0x539e18c2c4a9c07f",
  },
  party: {
    kicker: "Fiesta",
    tagline: "Dónde lo festejamos",
    title: "Cristino Multiespacio",
    address: "Ruta Nacional 12, KM 803",
    city: "Goya, Corrientes",
    time: "19:30 hs",
    mapUrl:
      "https://www.google.com/maps?q=Cristino+Multiespacio,+Av.+Combate+de+los+Mojones,+W3451+Col.+Carolina,+Corrientes&ftid=0x944e81b7e44e9377:0xd10a0ebb2732ce99",
  },
};

// Itinerario del día. icon = nombre del archivo en /assets/icons/*.webp
export const itinerary = [
  { time: "18:00", label: "Iglesia", icon: "iglesia" },
  { time: "19:30", label: "Civil", icon: "civil" },
  { time: "22:00", label: "Cena", icon: "cena" },
  { time: "00:00", label: "Fiesta", icon: "fiesta" },
];

export const dressCode = {
  label: "Elegante",
  note: "Dress code",
};

// Confirmación de asistencia
export const rsvp = {
  deadlineLabel: "23 de noviembre de 2026",
  intro:
    "Aunque amamos a los más pequeños, en esta ocasión hemos decidido celebrar esta noche tan especial solo con adultos, para que puedan disfrutar, bailar y celebrar con nosotros sin preocupaciones. ¡Gracias por comprender!",
  // Opciones de menú (respuesta unívoca en un desplegable)
  mealOptions: ["Ninguna", "Vegetariano", "Vegano", "Celíaco"],
};

// Regalos — datos bancarios (solo copiar)
export const gifts = {
  intro:
    "Para nosotros, lo más importante es compartir este momento con ustedes. Si además desean acompañarnos con un regalo para comenzar esta nueva etapa juntos, pueden hacerlo aquí:",
  accounts: [
    {
      id: "mp",
      label: "Mercado Pago",
      holder: "Rodrigo Nahuel Lazaroff",
      fields: [
        { name: "Alias", value: "rodrigo.lazaroff.mp" },
        { name: "CVU", value: "0000003100054498834663" },
      ],
    },
    {
      id: "usd",
      label: "Banco de la Nación Argentina · Cuenta en dólares",
      holder: "Rodrigo Nahuel Lazaroff",
      fields: [
        { name: "Alias", value: "Lazaroff.dolares" },
        { name: "CBU", value: "0110599531000073818520" },
      ],
    },
  ],
};

// Galería / carrusel — 6 fotos que se desplazan en movimiento continuo
export const gallery = [
  { src: "/assets/photos/carousel_1.webp", alt: "Nahiara y Rodrigo" },
  { src: "/assets/photos/carousel_2.webp", alt: "Nahiara y Rodrigo" },
  { src: "/assets/photos/carousel_3.webp", alt: "Nahiara y Rodrigo" },
  { src: "/assets/photos/carousel_4.webp", alt: "Nahiara y Rodrigo" },
  { src: "/assets/photos/carousel_5.webp", alt: "Nahiara y Rodrigo" },
  { src: "/assets/photos/carousel_6.webp", alt: "Nahiara y Rodrigo" },
];

export const photos = {
  cover: "/assets/photos/couple_1.webp",
  party: "/assets/photos/couple_2.webp",
  closing: "/assets/photos/couple_3.webp",
};
