import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";

export const Projects = ({ onProjectSelect }) => (
  <section id="work" data-testid="projects-section" className="px-6 md:px-12 py-32 bg-[#eae9e5]">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">Selected Work</p>
          <h2 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
            Things I've <span className="italic">shipped.</span>
          </h2>
        </div>
        <span className="hidden md:block text-xs uppercase tracking-[0.25em] text-[#8a8a85]">2024 — 2026</span>
      </div>
      <p className="mt-4 text-sm text-[#8a8a85]">Click a project — it opens on the laptop above.</p>

      <div className="mt-16 border-t border-black/[0.12]">
        {PROJECTS.map((p, i) => (
          <motion.button
            type="button"
            onClick={() => onProjectSelect(p)}
            key={p.id}
            data-testid={`project-row-${p.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="project-row w-full text-left grid grid-cols-12 items-center gap-4 py-8 border-b border-black/[0.12] px-2 cursor-pointer"
          >
            <span className="project-meta col-span-2 md:col-span-1 font-display italic text-xl text-[#8a8a85]">{p.id}</span>
            <span className="project-name col-span-10 md:col-span-4 font-display text-2xl md:text-4xl tracking-tight">{p.name}</span>
            <span className="project-meta hidden md:block col-span-4 text-sm text-[#5c5c5c]">{p.desc}</span>
            <span className="project-meta hidden md:block col-span-2 text-xs uppercase tracking-[0.15em] text-[#8a8a85]">{p.tags}</span>
            <span className="project-meta col-span-12 md:col-span-1 flex md:justify-end items-center gap-2 text-sm text-[#8a8a85]">
              {p.year} <ArrowUpRight size={16} />
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);
