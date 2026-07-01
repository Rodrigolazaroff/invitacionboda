import { Lato, Parisienne } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://invitacion-nahiara-rodrigo.vercel.app"),
  title: "Nahiara & Rodrigo — ¡Nos casamos!",
  description:
    "Nos casamos el sábado 12 de diciembre de 2026 en Goya, Corrientes. Confirmá tu asistencia y sumate a este día tan especial.",
  openGraph: {
    title: "Nahiara & Rodrigo — ¡Nos casamos!",
    description:
      "Sábado 12 de diciembre de 2026 · Goya, Corrientes. Confirmá tu asistencia.",
    type: "website",
    locale: "es_AR",
    images: ["/assets/photos/couple_1.webp"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f5f0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={`${lato.variable} ${parisienne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
