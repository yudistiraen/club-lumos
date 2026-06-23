import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Countdown from "@/components/countdown";
import About from "@/components/about";
import Services from "@/components/services";
import DjSection from "@/components/dj-section";
import Drinks from "@/components/drinks";
import Experience from "@/components/experience";
import Staff from "@/components/staff";
import Rules from "@/components/rules";
import Reserve from "@/components/reserve";
import Footer from "@/components/footer";
import Confetti from "@/components/confetti";
import DevMenu from "@/components/dev-menu";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Confetti />
      <DevMenu />
      <Navbar />
      <Hero />
      <Countdown />
      <About />
      <Services />
      <DjSection />
      <Drinks />
      <Experience />
      <Staff />
      <Rules />
      <Reserve />
      <Footer />
    </div>
  );
}
