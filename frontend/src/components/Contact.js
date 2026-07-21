import { motion } from "framer-motion";
import { PROFILE } from "../data/portfolio";

export const Contact = () => (
  <section id="contact" data-testid="contact-section" className="px-6 md:px-12 py-32 bg-[#0a0a0a] text-[#f9f9f8]">
    <div className="max-w-[1400px] mx-auto">
      <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">Ch. 05 — Contact</p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[11vw] md:text-[7vw] leading-[0.95] tracking-tight mt-8"
      >
        Let's build something<br />
        <span className="italic text-[#8a8a85]">worth remembering.</span>
      </motion.h2>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <a
            href={`mailto:${PROFILE.email}`}
            data-testid="contact-email-link"
            className="u-link font-display text-2xl md:text-3xl italic"
          >
            {PROFILE.email}
          </a>
          <p className="mt-4 text-[#a3a39e] text-sm">{PROFILE.phone} — {PROFILE.location}</p>
        </div>
        <div className="md:col-span-6 flex flex-col md:items-end gap-3">
          {PROFILE.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`social-link-${s.label.toLowerCase().replace(/[^a-z]/g, "")}`}
              className="u-link text-sm uppercase tracking-[0.2em] text-[#a3a39e] hover:text-[#f9f9f8] transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer data-testid="footer" className="bg-[#0a0a0a] text-[#5c5c5c] px-6 md:px-12 py-8 border-t border-white/[0.08]">
    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-3 text-xs uppercase tracking-[0.2em]">
      <span>© 2026 {PROFILE.name}</span>
      <span>Designed & built in the browser — React · Three.js</span>
      <a href="#top" data-testid="footer-back-to-top" className="u-link hover:text-[#f9f9f8] transition-colors duration-300">Back to top ↑</a>
    </div>
  </footer>
);
