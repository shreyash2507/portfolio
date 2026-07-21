import { motion } from "framer-motion";
import { PROFILE } from "../data/portfolio";

export const Navbar = () => (
  <motion.nav
    data-testid="main-navbar"
    initial={{ y: -60, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-xl bg-[#f9f9f8]/70 border-b border-black/[0.06]"
  >
    <a href="#top" data-testid="nav-logo" className="font-display text-lg tracking-tight">
      {PROFILE.firstName}<span className="text-[#8a8a85]">.dev</span>
    </a>
    <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-[#5c5c5c]">
      <a href="#machine" data-testid="nav-link-machine" className="u-link hover:text-[#0a0a0a]">The Machine</a>
      <a href="#manifesto" data-testid="nav-link-manifesto" className="u-link hover:text-[#0a0a0a]">Manifesto</a>
      <a href="#work" data-testid="nav-link-work" className="u-link hover:text-[#0a0a0a]">Work</a>
      <a href="#contact" data-testid="nav-link-contact" className="u-link hover:text-[#0a0a0a]">Contact</a>
    </div>
    <a
      href={`mailto:${PROFILE.email}`}
      data-testid="nav-cta-button"
      className="rounded-full bg-[#0a0a0a] text-[#f9f9f8] text-xs uppercase tracking-[0.15em] px-5 py-2.5 hover:bg-[#333] transition-colors duration-300"
    >
      Hire me
    </a>
  </motion.nav>
);
