import Loader from "@/Components/Loader";
import SmoothScroll from "@/Components/SmoothScroll";
import TopBar from "@/Components/hud/TopBar";
import AltitudeMeter from "@/Components/hud/AltitudeMeter";
import ChapterIndicator from "@/Components/hud/ChapterIndicator";
import Starfield from "@/Components/space/Starfield";
import Hero from "@/Components/sections/Hero";
import About from "@/Components/sections/About";
import Services from "@/Components/sections/Services";
import Works from "@/Components/sections/Works";
import Voices from "@/Components/sections/Voices";
import Trajectory from "@/Components/sections/Trajectory";
import Contact from "@/Components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="noise-overlay" aria-hidden />
      <TopBar />
      <AltitudeMeter />
      <ChapterIndicator />
      <Loader />
      <Starfield />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Works />
        <Voices />
        <Trajectory />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
