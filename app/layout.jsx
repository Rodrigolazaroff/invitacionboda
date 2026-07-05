import { Lato, Great_Vibes } from "next/font/google";
import "./globals.css";
import MusicProvider from "@/components/MusicProvider";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

// Sustituto libre de Snell Roundhand LT Std Bold (fuente comercial del diseño)
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

// URL pública del sitio. En Vercel se resuelve sola al dominio de producción;
// en local usa localhost. Podés fijarla con NEXT_PUBLIC_SITE_URL si querés.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Texto de la pestaña del navegador
const tabTitle = "Nahiara & Rodrigo — 12 de Diciembre 2026";

// Previsualización al compartir (WhatsApp, etc.)
const shareTitle = "Nahiara & Rodrigo — ¡Nos casamos! 🌿";
const shareDescription =
  "Sábado 12 de diciembre de 2026 · Goya, Corrientes. Entrá para ver todos los detalles y confirmar tu asistencia.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: tabTitle,
  description:
    "Nos casamos el sábado 12 de diciembre de 2026 en Goya, Corrientes. Confirmá tu asistencia y sumate a este día tan especial.",
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    type: "website",
    locale: "es_AR",
    siteName: "Nahiara & Rodrigo",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nahiara & Rodrigo — 12 de diciembre de 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={`${lato.variable} ${greatVibes.variable}`}>
      <body>
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
