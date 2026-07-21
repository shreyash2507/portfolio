const ITEMS = ["React", "Three.js", "WebGL", "Framer Motion", "FastAPI", "MongoDB", "GSAP", "Tailwind", "Node.js", "Creative Coding"];

export const Marquee = () => (
  <div data-testid="tech-marquee" className="py-10 border-y border-black/[0.08] bg-[#f9f9f8] overflow-hidden select-none">
    <div className="marquee-track">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center shrink-0">
          {ITEMS.map((item) => (
            <span key={`${dup}-${item}`} className="flex items-center">
              <span className="font-display italic text-2xl md:text-4xl text-[#0a0a0a] px-8 whitespace-nowrap">{item}</span>
              <span className="text-[#b3aa96] text-xl">✳</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
