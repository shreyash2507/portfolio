import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PROFILE } from "../../data/portfolio";

export const BookPanel = ({ book, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      data-testid="book-panel-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="absolute inset-0 z-20 bg-black/10"
    >
      <motion.aside
        data-testid={`book-panel-${book.id}`}
        initial={{ x: "110%" }}
        animate={{ x: 0 }}
        exit={{ x: "110%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 h-full w-full sm:w-[440px] backdrop-blur-xl bg-[#f9f9f8]/90 border-l border-black/[0.08] px-8 md:px-12 pb-10 pt-24 md:pt-28 flex flex-col overflow-y-auto"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">{book.eyebrow}</p>
            <h3 className="font-display text-4xl mt-3 tracking-tight">{book.title}</h3>
          </div>
          <button
            data-testid="book-panel-close-button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-[#0a0a0a] hover:text-[#f9f9f8] transition-colors duration-300"
            aria-label="Close panel"
          >
            <X size={14} /> Close
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

        <p className="mt-auto pt-8 text-xs text-[#8a8a85]">Click outside or press Esc to close</p>
      </motion.aside>
    </motion.div>
  );
};
