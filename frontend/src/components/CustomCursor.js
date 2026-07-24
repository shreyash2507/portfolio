import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// Renders a fixed "0" (light mode) / "1" (dark mode) glyph that follows the
// pointer, replacing the native cursor. Only activates on devices that
// actually have a precise pointer with hover (real mice/trackpads) — on
// touch devices this renders nothing and the OS handles touch normally.
export const CustomCursor = () => {
  const { theme } = useTheme();
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    const hide = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, visible]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      data-testid="custom-cursor"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
        width: 22,
        height: 22,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Satoshi', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        background: theme === "dark" ? "#f9f9f8" : "#0a0a0a",
        color: theme === "dark" ? "#0a0a0a" : "#f9f9f8",
      }}
    >
      {theme === "dark" ? "1" : "0"}
    </div>
  );
};
