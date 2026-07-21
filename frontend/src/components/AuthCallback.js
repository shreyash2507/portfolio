import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const AuthCallback = ({ onDone }) => {
  const hasProcessed = useRef(false);
  const { setUser } = useAuth();

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const run = async () => {
      const sessionId = new URLSearchParams(window.location.hash.substring(1)).get("session_id");
      try {
        const res = await fetch(`${API}/auth/session`, {
          method: "POST",
          headers: { "X-Session-ID": sessionId },
          credentials: "include",
        });
        if (res.ok) setUser(await res.json());
      } catch (e) {
        // exchange failed — continue as guest
      }
      window.history.replaceState(null, "", window.location.pathname);
      onDone();
    };
    run();
  }, [onDone, setUser]);

  return (
    <div
      data-testid="auth-callback-screen"
      className="fixed inset-0 z-[100] bg-[#f9f9f8] flex flex-col items-center justify-center gap-4"
    >
      <span className="font-display italic text-2xl">Signing you in…</span>
      <span className="text-xs uppercase tracking-[0.3em] text-[#8a8a85]">One moment</span>
    </div>
  );
};
