import { useState } from "react";
import { toast } from "sonner";
import { PROFILE } from "../../data/portfolio";

export const ScreenLogin = () => {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setUnlocked(true);
    toast.success("Access granted — welcome to the portfolio.");
  };

  return (
    <div
      data-testid="laptop-login-screen"
      style={{
        width: 920,
        height: 560,
        background: "#f9f9f8",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Satoshi', sans-serif",
        padding: 48,
        boxSizing: "border-box",
      }}
    >
      {!unlocked ? (
        <form onSubmit={handleLogin} style={{ width: 380, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div
              style={{
                width: 72, height: 72, borderRadius: "50%", background: "#0a0a0a", color: "#f9f9f8",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
                fontFamily: "'Playfair Display', serif", fontSize: 30, fontStyle: "italic",
              }}
            >
              {PROFILE.firstName[0]}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, letterSpacing: "-0.02em" }}>{PROFILE.name}</div>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.25em", color: "#8a8a85", marginTop: 6 }}>
              {PROFILE.role} — OS 1.0
            </div>
          </div>
          <input
            data-testid="login-email-input"
            className="screen-input"
            type="email"
            placeholder="visitor@anywhere.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input data-testid="login-password-input" className="screen-input" type="password" placeholder="••••••••  (any password works)" />
          <button
            data-testid="login-submit-button"
            type="submit"
            style={{
              background: "#0a0a0a", color: "#f9f9f8", border: "none", borderRadius: 999,
              padding: "14px 20px", fontSize: 14, letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Satoshi', sans-serif",
            }}
          >
            Enter Portfolio
          </button>
          <div style={{ fontSize: 11, color: "#9a9a94", textAlign: "center" }}>No account needed. Just curiosity.</div>
        </form>
      ) : (
        <div data-testid="login-welcome-screen" style={{ textAlign: "center", maxWidth: 560 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Welcome in.
          </div>
          <p style={{ color: "#5c5c5c", fontSize: 16, lineHeight: 1.7, marginTop: 16 }}>
            {PROFILE.tagline} Keep scrolling for the manifesto and selected work — or click the books beside this laptop to read about me.
          </p>
          <div style={{ marginTop: 20, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.25em", color: "#8a8a85" }}>
            {PROFILE.email}
          </div>
        </div>
      )}
    </div>
  );
};
