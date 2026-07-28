# 3D Laptop Portfolio

![image alt](https://github.com/shreyash2507/portfolio/blob/main/web.png)

An award-style developer portfolio built around a single idea: scroll slowly, and a 3D laptop physically opens in front of you — revealing a login screen, live project previews, and a shelf of "books" that double as About/Skills/Work/Contact sections.

Built by **Shreyash Shigwan** — Creative Developer.
[LinkedIn](https://www.linkedin.com/in/shreyash-shigwan-53a765403/) · [Twitter/X](https://x.com/shreyyhey)

---

## ✨ Features

- **Scroll-driven 3D laptop** — a fixed-viewport Three.js scene where scroll progress drives the laptop lid's hinge rotation and camera movement
- **Interactive book shelf** — four clickable 3D books (*Meme Book, Cinematography, Creativity, Skill Learning*) that open into glass side panels
- **Live project previews on-screen** — clicking a project card smooth-scrolls back to the laptop and renders the project preview directly on its screen, with an emissive glow effect
- **Google Sign-In** — real OAuth flow with httpOnly cookie sessions, backed by MongoDB
- **Kinetic typography hero** with a line-by-line reveal animation, Playfair Display + Satoshi type pairing, and an editorial off-white/charcoal theme with a grain overlay
- Smooth-scroll powered by **Lenis**, animations by **Framer Motion**

## 🛠️ Tech Stack

**Frontend**
- React 19 + Create React App (via CRACO for webpack overrides)
- `@react-three/fiber` + `@react-three/drei` (Three.js)
- Framer Motion, Lenis smooth scroll
- Tailwind CSS + shadcn/ui components
- TanStack Query, React Router, React Hook Form + Zod

**Backend**
- FastAPI (Python)
- MongoDB via Motor (async driver)
- Cookie-based session auth (Google OAuth)

## 📁 Project Structure

```
├── backend/
│   ├── server.py          # FastAPI app, routes, auth
│   ├── requirements.txt
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── scene/     # 3D laptop scene & books
│   │   │   ├── ui/        # shadcn/ui primitives
│   │   │   └── ...        # Hero, Navbar, Projects, Contact
│   │   ├── context/       # AuthContext
│   │   └── data/
│   │       └── portfolio.js   # all personal/content data lives here
│   └── craco.config.js
└── memory/
    └── PRD.md             # product spec & build history
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and Yarn
- Python 3.10+
- MongoDB (local install, Docker, or a free MongoDB Atlas cluster)

### 1. Clone and configure environment variables

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

Create `backend/.env`:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
CORS_ORIGINS=http://localhost:3000
```

Create `frontend/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 2. Start MongoDB
```bash
mongod --dbpath ~/data/db
# or: docker run -d -p 27017:27017 --name local-mongo mongo
```

### 3. Run the backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

### 4. Run the frontend
```bash
cd frontend
yarn install
yarn start
```

The app runs at `http://localhost:3000` with hot reload enabled.

## ✏️ Customizing Content

All personal/portfolio content — name, tagline, book contents, and project entries — lives in a single file: `frontend/src/data/portfolio.js`. No need to touch component code to update copy.

## 🧪 Testing

```bash
cd backend
pytest
```

## 📄 License

This project is personal portfolio code. Feel free to use it as structural/technical inspiration, but please don't reuse the content, design, or copy as-is.
