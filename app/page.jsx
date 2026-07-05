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

// Secuencia pedida:
// 1. Cover → 2. Foto + Countdown → 3. Iglesia → 4. Ceremonia y Fiesta
// → 5. Itinerario → 6. Regalos → 7+7.5. Confirmación → 8. Galería → 9. Cierre
export default function Home() {
  return (
    <main className="shell">
      <Envelope />
      <Cover />
      <PhotoFull src={photos.cover} />
      <Countdown />
      <ChurchSection />
      <PartySection />
      <Itinerary />
      <Gifts />
      <Rsvp />
      <Gallery />
      <Closing />
    </main>
  );
}
