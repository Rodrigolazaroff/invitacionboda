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
// 1. logo (Cover) → 2. foto + countdown → 3. iglesia → 4. ceremonia y fiesta
// → 5. itinerario → 6+6.5. confirmación → 7. galería → 8. regalos → 9. cierre
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
      <Rsvp />
      <Gallery />
      <Gifts />
      <Closing />
    </main>
  );
}
