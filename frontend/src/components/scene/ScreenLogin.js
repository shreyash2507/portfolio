import { useState } from "react";
import { toast } from "sonner";
import { PROFILE } from "../../data/portfolio";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/>
  </svg>
);

export const ScreenLogin = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const { user, login, logout } = auth;

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
      {user ? (
        <div data-testid="login-signedin-screen" style={{ textAlign: "center", maxWidth: 560 }}>
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name}
              referrerPolicy="no-referrer"
              style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 18px", border: "2px solid #0a0a0a", display: "block" }}
            />
          )}
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Welcome, {user.name?.split(" ")[0]}.
          </div>
          <p style={{ color: "#5c5c5c", fontSize: 15, lineHeight: 1.7, marginTop: 14 }}>
            You're signed in as {user.email}. Keep scrolling for the manifesto and selected work — or click the books beside this laptop.
          </p>
          <button
            data-testid="logout-button"
            onClick={logout}
            style={{
              marginTop: 20, background: "transparent", border: "1px solid #0a0a0a", color: "#0a0a0a",
              borderRadius: 999, padding: "11px 24px", fontSize: 12, letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer", fontFamily: "'Satoshi', sans-serif",
            }}
          >
            Sign out
          </button>
        </div>
      ) : !unlocked ? (
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
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#9a9a94", fontSize: 11 }}>
            <span style={{ flex: 1, height: 1, background: "#dcdcd6" }} />
            or
            <span style={{ flex: 1, height: 1, background: "#dcdcd6" }} />
          </div>
          <button
            data-testid="google-signin-button"
            type="button"
            onClick={login}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              background: "#fff", border: "1px solid #dcdcd6", borderRadius: 999,
              padding: "13px 20px", fontSize: 14, cursor: "pointer",
              fontFamily: "'Satoshi', sans-serif", color: "#0a0a0a",
            }}
          >
            <GoogleIcon /> Sign in with Google
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
