export const ProjectPreview = ({ project, onClose }) => (
  <div
    data-testid="laptop-project-preview"
    style={{
      width: 920,
      height: 560,
      background: "#101012",
      color: "#f9f9f8",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Satoshi', sans-serif",
      overflow: "hidden",
      boxSizing: "border-box",
    }}
  >
    {/* browser chrome */}
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
      <span style={{ marginLeft: 16, fontSize: 12, color: "#8a8a85", letterSpacing: "0.1em" }}>
        {project.name.toLowerCase().replace(/\s/g, "")}.app
      </span>
      <button
        data-testid="project-preview-close-button"
        onClick={onClose}
        style={{
          marginLeft: "auto", background: "transparent", border: "1px solid rgba(255,255,255,0.25)",
          color: "#f9f9f8", borderRadius: 999, padding: "6px 16px", fontSize: 11,
          letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
          fontFamily: "'Satoshi', sans-serif",
        }}
      >
        Close
      </button>
    </div>

    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", position: "relative" }}>
      <div
        style={{
          position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(216,207,174,0.22) 0%, rgba(216,207,174,0) 70%)",
        }}
      />
      <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.3em", color: "#b3aa96" }}>
        Project {project.id} — {project.year}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 58, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 14 }}>
        {project.name}
      </div>
      <p style={{ color: "#a3a39e", fontSize: 17, lineHeight: 1.7, marginTop: 18, maxWidth: 560 }}>
        {project.desc}
      </p>
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        {project.tags.split(" · ").map((tag) => (
          <span
            key={tag}
            style={{
              border: "1px solid rgba(255,255,255,0.18)", borderRadius: 999, padding: "7px 16px",
              fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d8cfae",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "#5c5c5c", letterSpacing: "0.2em", textTransform: "uppercase" }}>
      Live preview — rendered on the machine
    </div>
  </div>
);
