import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PROFILE } from "../../data/portfolio";

export const BookPanel = ({ book, onClose }) => (
  <motion.aside
    data-testid={`book-panel-${book.id}`}
    initial={{ x: "110%" }}
    animate={{ x: 0 }}
    exit={{ x: "110%" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-0 right-0 h-full w-full sm:w-[440px] z-30 backdrop-blur-xl bg-[#f9f9f8]/85 border-l border-black/[0.08] p-8 md:p-12 flex flex-col overflow-y-auto"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">{book.eyebrow}</p>
        <h3 className="font-display text-4xl mt-3 tracking-tight">{book.title}</h3>
      </div>
      <button
        data-testid="book-panel-close-button"
        onClick={onClose}
        className="p-2 rounded-full border border-black/10 hover:bg-[#0a0a0a] hover:text-[#f9f9f8] transition-colors duration-300"
        aria-label="Close panel"
      >
        <X size={18} />
      </button>
    </div>

    <div className="mt-4 h-1 w-12" style={{ background: book.color }} />

    <div className="mt-8 space-y-5 text-[#3c3c3a] leading-relaxed text-[15px]">
      {book.lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.p>
      ))}
    </div>

    {book.id === "skills" && (
      <a
        href={`mailto:${PROFILE.email}`}
        data-testid="book-panel-email-cta"
        className="mt-8 inline-flex self-start rounded-full bg-[#0a0a0a] text-[#f9f9f8] text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#333] transition-colors duration-300"
      >
        Write to me
      </a>
    )}
  </motion.aside>
);
