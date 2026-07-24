import { motion } from "framer-motion";
import { PROFILE } from "../data/portfolio";

const lineAnim = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.1, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Line = ({ children, i, className = "" }) => (
  <span className="line-mask">
    <motion.span custom={i} variants={lineAnim} initial="hidden" animate="show" className={`block ${className}`}>
      {children}
    </motion.span>
  </span>
);

export const Hero = () => (
  <header id="top" data-testid="hero-section" className="relative z-10 bg-[#f9f9f8] dark:bg-[#0a0a0a] transition-colors duration-300 min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 pt-32">
    <div className="absolute top-28 left-6 md:left-12 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#8a8a85]">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        data-testid="hero-eyebrow"
      >
        Portfolio — {PROFILE.role} — Est. 2021
      </motion.span>
    </div>

    <div className="max-w-[1400px]">
      <h1 data-testid="hero-heading" className="font-display font-medium tracking-tight leading-[0.95] text-[13vw] md:text-[9vw]">
        <Line i={0}>Scroll to open</Line>
        <Line i={1} className="italic text-[#8a8a85]">the machine —</Line>
        <Line i={2}>{PROFILE.firstName}'s world.</Line>
      </h1>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-subtext"
          className="md:col-span-5 text-base md:text-lg text-[#5c5c5c] dark:text-[#a3a39e] leading-relaxed max-w-md"
        >
          {PROFILE.tagline} A 3D laptop waits below — scroll down and it will open for you. The books beside it hold everything about me.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="md:col-span-7 flex md:justify-end"
        >
          <div data-testid="hero-scroll-hint" className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-[#8a8a85]">
            <span className="h-px w-16 bg-[#8a8a85]" />
            Scroll slowly
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  </header>
);
