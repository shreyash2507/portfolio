import { useEffect, useRef, useState, useCallback } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LaptopSection } from "./components/scene/LaptopSection";
import { Marquee } from "./components/Marquee";
import { Manifesto } from "./components/Manifesto";
import { Projects } from "./components/Projects";
import { Contact, Footer } from "./components/Contact";

function App() {
  const lenisRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleProjectSelect = useCallback((project) => {
    setActiveProject(project);
    lenisRef.current?.scrollTo("#machine", {
      offset: window.innerHeight * 1.7,
      duration: 1.8,
    });
  }, []);

  return (
    <div className="grain bg-[#f9f9f8] text-[#0a0a0a]">
      <Toaster position="bottom-center" richColors />
      <Navbar />
      <Hero />
      <LaptopSection activeProject={activeProject} onCloseProject={() => setActiveProject(null)} />
      <div className="relative z-10">
        <Marquee />
        <Manifesto />
        <Projects onProjectSelect={handleProjectSelect} />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
