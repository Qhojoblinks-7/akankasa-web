# Akan Kasa ne Amammere Website

A comprehensive digital platform for learning the Akan language and exploring Akan culture.

## Project Structure

This repository contains two independent applications:

- **Frontend** (`/`) — React + Vite SPA
- **Backend** (`/backend`) — Express + SQLite API server

## Quick Start

### Frontend
```bash
npm install
npm run dev
```
Runs on `http://localhost:5173`

### Backend
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:4000`

## Environment Variables

### Frontend (`.env` in root)
```
VITE_API_BASE_URL=http://localhost:4000
```

### Backend (`backend/.env` or system env)
```
PORT=4000
PRERENDER_TOKEN=your_prerender_io_token
```

## Deployment

- **Frontend**: Deploy the `dist/` folder to any static host (Vercel, Netlify, cPanel, S3, etc.)
- **Backend**: Deploy the `backend/` folder to any Node.js host (Render, Railway, DigitalOcean, etc.)

See [README_FRONTEND.md](./README_FRONTEND.md) for frontend details.
See [README_BACKEND.md](./README_BACKEND.md) for backend details.
See [README_PRERENDER.md](./README_PRERENDER.md) for SEO pre-rendering setup.

## SEO & Search Engine Visibility

This site is fully optimized for search engines:

1. **Dynamic meta tags** — every page has unique `<title>`, `<meta description>`, Open Graph, and Twitter Cards
2. **Structured data** — JSON-LD schema.org markup on key pages
3. **Sitemap & robots** — `public/sitemap.xml` and `public/robots.txt`
4. **Pre-rendering** — backend middleware detects search engine bots and serves fully rendered HTML via Prerender.io
5. **Semantic HTML** — proper heading hierarchy, `<main>`, `<article>`, `<nav>`, skip links

After deployment, submit your sitemap to Google Search Console and Bing Webmaster Tools.
