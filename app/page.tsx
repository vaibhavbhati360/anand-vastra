import { Collections, Pillars } from "@/components/Collections";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { KurtasSection } from "@/components/KurtasSection";
import { PantShirtSection } from "@/components/PantShirtSection";
import { SuitsSection } from "@/components/SuitsSection";
import { VisitShowroom } from "@/components/VisitShowroom";
import { WeddingSection } from "@/components/WeddingSection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

// Section order (docs/rules.md rule 8):
// Hero → Collections → Suits → Kurtas → Wedding & Sherwani → Pant-Shirt → Visit.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-maroon-700 focus:px-4 focus:py-3 focus:text-ivory-100"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Collections />
        <SuitsSection />
        <KurtasSection />
        <WeddingSection />
        <PantShirtSection />
        <Pillars />
        <VisitShowroom />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
