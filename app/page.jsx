import Cover from "@/components/Cover";
import Countdown from "@/components/Countdown";
import Venue from "@/components/Venue";
import Itinerary from "@/components/Itinerary";
import Rsvp from "@/components/Rsvp";
import Gifts from "@/components/Gifts";
import Gallery from "@/components/Gallery";
import Closing from "@/components/Closing";
import { venues, photos } from "@/lib/data";

export default function Home() {
  return (
    <main className="shell">
      <Cover />
      <Countdown />
      <Venue venue={venues.ceremony} side="left" />
      <Venue venue={venues.party} photo={photos.party} side="right" showPhoto />
      <Itinerary />
      <Gallery />
      <Rsvp />
      <Gifts />
      <Closing />
      <p className="footer-credit">Hecho con cariño para Nahiara &amp; Rodrigo · 12·12·2026</p>
    </main>
  );
}
