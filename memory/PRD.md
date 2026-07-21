# PRD — 3D Laptop Portfolio

## Original Problem Statement
Portfolio website where scrolling slowly opens a 3D laptop revealing a login page on its screen, with books beside the laptop showing personal details/contact. Clean, award-level design. React + Three.js.

## Architecture
- Frontend: React (CRA/craco), three.js + @react-three/fiber + @react-three/drei, framer-motion, lenis smooth scroll, Tailwind + shadcn tokens
- Backend: FastAPI + MongoDB (template only, no custom endpoints used — site is fully frontend)
- 3D stage: position:fixed full-viewport Canvas inside a 350vh section; scroll progress (framer-motion useScroll) drives lid hinge rotation + camera rig. Content sections (z-10) slide over the fixed stage — this prevents any drei <Html> drift.
- Laptop screen UI: drei <Html transform> plane on the lid (login form / project preview)

## User Personas
- Recruiters/clients evaluating the developer's craft
- Visitors exploring projects and contact info

## Implemented (June 2026)
- Kinetic hero with masked line-by-line reveal, Playfair Display + Satoshi, off-white/charcoal editorial theme, grain overlay
- Scroll-driven 3D laptop open animation with login screen (decorative login → welcome state + sonner toast)
- 4 clickable 3D books (spines: MEME BOOK, CINEMATOGRAPHY, CREATIVITY, SKILL LEARNING) opening glass side panels — renamed per user request (was About/Skills/Work/Contact)
- Project cards (#work): click → lenis smooth-scroll back to laptop, lid opens, project preview renders on screen with glow (emissive + boxShadow) — user request iteration 2
- Fixed login-screen drift on scroll via fixed stage refactor — user request iteration 2
- Marquee, numbered manifesto chapters, projects list rows, contact + footer
- Emergent-managed Google OAuth sign-in (June 2026): "Sign in with Google" on the laptop login screen; backend /api/auth/session, /api/auth/me, /api/auth/logout; httpOnly cookie sessions (7d) in MongoDB (users, user_sessions); signed-in view + navbar avatar; auth passed as props into drei <Html> (context doesn't cross roots). Tested: iteration_3.json 100% pass.
- Testing: iteration_1.json — all flows pass (~95%); preview close-button overlay bug found & fixed (pointer-events on glow div)

## Content
Personal data lives in /app/frontend/src/data/portfolio.js. Real name (Shreyash Shigwan), email (shreyashshigwan12@gmail.com), phone (+91 93726 71748), location (Mumbai, India), LinkedIn + Twitter links set (June 2026). Projects still placeholder.

## Backlog
- P0: Replace placeholder profile/projects content with user's real data
- P1: Real contact form (backend POST + storage), project detail pages/links
- P1: Mobile tuning for 3D scene (camera framing at small viewports)
- P2: Real laptop GLTF model, meme gallery inside Meme Book panel, prefers-reduced-motion support
