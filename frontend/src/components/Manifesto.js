import { motion } from "framer-motion";
import { MANIFESTO } from "../data/portfolio";

export const Manifesto = () => (
  <section id="manifesto" data-testid="manifesto-section" className="px-6 md:px-12 py-32 bg-[#f9f9f8] dark:bg-[#0a0a0a] transition-colors duration-300">
    <div className="max-w-[1400px] mx-auto">
      <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">Manifesto</p>
      <h2 className="font-display text-3xl md:text-4xl mt-4 max-w-2xl leading-tight">
        Three beliefs I bring to <span className="italic">every single build.</span>
      </h2>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.08] dark:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08]">
        {MANIFESTO.map((item, i) => (
          <motion.article
            key={item.n}
            data-testid={`manifesto-chapter-${item.n}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f9f9f8] dark:bg-[#0a0a0a] p-10 md:p-12 min-h-[340px] flex flex-col justify-between group hover:bg-[#0a0a0a] dark:hover:bg-[#f9f9f8] transition-colors duration-500"
          >
            <span className="font-display italic text-5xl text-[#b3aa96] group-hover:text-[#8a8a85] transition-colors duration-500">{item.n}</span>
            <div>
              <h3 className="font-display text-2xl tracking-tight group-hover:text-[#f9f9f8] dark:group-hover:text-[#0a0a0a] transition-colors duration-500">{item.title}</h3>
              <p className="mt-4 text-[#5c5c5c] dark:text-[#a3a39e] leading-relaxed text-sm group-hover:text-[#a3a39e] dark:group-hover:text-[#5c5c5c] transition-colors duration-500">{item.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
