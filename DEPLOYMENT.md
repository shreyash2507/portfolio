# Deployment Guide — Free Hosting (Atlas + Render + Vercel)

This app is deployed across three free services. Each piece needs the URL/credentials from the previous one, so **follow this exact order**:

```
MongoDB Atlas  →  Render (backend)  →  Vercel (frontend)  →  back to Render (fix CORS)
```

---

## 1. Database — MongoDB Atlas

1. Sign up at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a cluster → select the **M0 (Free)** tier — free forever, 512 MB storage
3. Create a database user (username + password) under **Database Access**
4. Under **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`)
   - Needed because Render's free tier doesn't give a fixed server IP
5. Click **Connect** on your cluster → **Drivers** → **Python** → copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>`/`<password>` with your real DB user credentials (URL-encode special characters like `@` or `#` if present)

This full string is your **`MONGO_URL`** for the next step.

---

## 2. Backend — Render

1. Sign up at [render.com](https://render.com) with GitHub
2. **New +** → **Web Service** → connect your GitHub repo
3. Configure:

   | Field | Value |
   |---|---|
   | Region | Singapore (closest to India) |
   | Branch | `main` |
   | Root Directory | `backend` |
   | Runtime | Python 3 |
   | Build Command | `pip install -r requirements.txt` |
   | Start Command | `uvicorn server:app --host 0.0.0.0 --port $PORT` |
   | Instance Type | Free |

4. Add environment variables:
   | Key | Value |
   |---|---|
   | `MONGO_URL` | your Atlas connection string from step 1 |
   | `DB_NAME` | `portfolio-db` |
   | `CORS_ORIGINS` | `*` (temporary — fixed in step 4 below) |

5. Click **Create Web Service** and wait for the logs to show `Application startup complete`
6. Your backend URL: `https://portfolio-backend-ymkn.onrender.com`
7. Verify: visit `https://portfolio-backend-ymkn.onrender.com/docs` — Swagger UI should load

> **Note:** `GET /` returning `404` is expected — there's no route at the bare root, only under `/api/...`

> **Free tier cold starts:** the service spins down after 15 minutes of inactivity. The first request after that takes ~30-60 seconds to wake back up. Normal for a portfolio site, just don't be alarmed by it.

---

## 3. Frontend — Vercel

1. Sign up at [vercel.com](https://vercel.com) with GitHub
2. **Add New...** → **Project** → import your repo
3. Configure:

   | Field | Value |
   |---|---|
   | Framework Preset | Create React App |
   | Root Directory | `frontend` |
   | Build Command | `yarn build` |
   | Output Directory | `build` |
   | Install Command | `yarn install` |

4. Add environment variable:
   | Key | Value |
   |---|---|
   | `REACT_APP_BACKEND_URL` | `https://portfolio-backend-ymkn.onrender.com` |

5. Click **Deploy**
6. Your live site: `https://portfolio-smoky-five-htfneui6k3.vercel.app`

---

## 4. Connect them — fix CORS on Render

The frontend is now live, but the backend is still only set to accept requests from `*`. Lock it down to your real domain:

1. Go to Render → **portfolio-backend** service → **Environment** tab
2. Edit `CORS_ORIGINS` → replace `*` with your real Vercel URL (no trailing slash):
   ```
   https://portfolio-smoky-five-htfneui6k3.vercel.app
   ```
3. Save — Render auto-redeploys (~1-2 min)

---

## 5. Final check

Visit your live Vercel URL and try **Google Sign-In**. If it redirects to Google and successfully returns you to the app logged in, the full chain — frontend → backend → MongoDB — is confirmed working end to end.

---

## Environment variable reference

| Service | Variable | Example |
|---|---|---|
| Render | `MONGO_URL` | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/` |
| Render | `DB_NAME` | `portfolio-db` |
| Render | `CORS_ORIGINS` | `https://portfolio-smoky-five-htfneui6k3.vercel.app` |
| Vercel | `REACT_APP_BACKEND_URL` | `https://portfolio-backend-ymkn.onrender.com` |

## Troubleshooting

- **Backend crashes on deploy (`KeyError`)** → `MONGO_URL` or `DB_NAME` missing/misspelled in Render's Environment tab
- **Frontend loads but login/API calls fail silently** → `REACT_APP_BACKEND_URL` missing on Vercel, or `CORS_ORIGINS` on Render doesn't exactly match your Vercel URL
- **First visit after a while is slow** → Render free tier cold start, not a bug
