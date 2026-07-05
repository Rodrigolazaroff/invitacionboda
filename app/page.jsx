import Envelope from "@/components/Envelope";
import Cover from "@/components/Cover";
import PhotoFull from "@/components/PhotoFull";
import ChurchSection from "@/components/ChurchSection";
import Countdown from "@/components/Countdown";
import PartySection from "@/components/PartySection";
import Itinerary from "@/components/Itinerary";
import Rsvp from "@/components/Rsvp";
import Gallery from "@/components/Gallery";
import Gifts from "@/components/Gifts";
import Closing from "@/components/Closing";
import { photos } from "@/lib/data";

// Secuencia de la tarjeta original:
// logo → foto → nombres + iglesia (flores) → ceremonia y fiesta (foto + flores)
// → itinerario → confirmación → galería → regalos
export default function Home() {
  return (
    <main className="shell">
      <Envelope />
      <Cover />
      <PhotoFull src={photos.cover} />
      <ChurchSection />
      <Countdown />
      <PartySection />
      <Itinerary />
      <Rsvp />
      <Gallery />
      <Gifts />
      <Closing />
      <p className="footer-credit">Hecho con cariño para Nahiara &amp; Rodrigo · 12·12·2026</p>
    </main>
  );
}
