import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { PROFILE } from "../data/portfolio";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { href: "#machine", testid: "nav-link-machine", label: "The Machine" },
  { href: "#manifesto", testid: "nav-link-manifesto", label: "Manifesto" },
  { href: "#work", testid: "nav-link-work", label: "Work" },
  { href: "#contact", testid: "nav-link-contact", label: "Contact" },
];

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      data-testid="theme-toggle-button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center justify-center w-9 h-9 rounded-full border border-black/15 dark:border-white/15 hover:bg-[#0a0a0a] hover:text-[#f9f9f8] dark:hover:bg-[#f9f9f8] dark:hover:text-[#0a0a0a] transition-colors duration-300 ${className}`}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
};

export const Navbar = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      data-testid="main-navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#f9f9f8]/70 dark:bg-[#0a0a0a]/70 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors duration-300"
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#top" data-testid="nav-logo" className="font-display text-lg tracking-tight">
          {PROFILE.firstName}<span className="text-[#8a8a85]">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-[#5c5c5c] dark:text-[#a3a39e]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={link.testid}
              className="u-link hover:text-[#0a0a0a] dark:hover:text-[#f9f9f8]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle className="hidden sm:flex" />
          {user && (
            <img
              data-testid="nav-user-avatar"
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
              title={user.name}
              className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 object-cover"
            />
          )}
          <a
            href={`mailto:${PROFILE.email}`}
            data-testid="nav-cta-button"
            className="hidden sm:inline-flex rounded-full bg-[#0a0a0a] text-[#f9f9f8] dark:bg-[#f9f9f8] dark:text-[#0a0a0a] text-xs uppercase tracking-[0.15em] px-5 py-2.5 hover:bg-[#333] dark:hover:bg-[#dcdcd6] transition-colors duration-300"
          >
            Hire me
          </a>

          {/* mobile-only controls */}
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-black/15 dark:border-white/15"
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="mobile-menu-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-[#f9f9f8]/95 dark:bg-[#0a0a0a]/95"
          >
            <div className="flex flex-col gap-1 px-6 py-6 text-sm uppercase tracking-[0.2em] text-[#5c5c5c] dark:text-[#a3a39e]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-testid={`mobile-${link.testid}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 border-b border-black/[0.06] dark:border-white/[0.06] hover:text-[#0a0a0a] dark:hover:text-[#f9f9f8]"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between pt-5">
                <a
                  href={`mailto:${PROFILE.email}`}
                  data-testid="mobile-nav-cta-button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[#0a0a0a] text-[#f9f9f8] dark:bg-[#f9f9f8] dark:text-[#0a0a0a] text-xs uppercase tracking-[0.15em] px-5 py-2.5"
                >
                  Hire me
                </a>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
