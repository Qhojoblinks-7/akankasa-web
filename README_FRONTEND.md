# Frontend — Akan Kasa ne Amammere

React + Vite single-page application for the Akan Kasa platform.

## Quick Start

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:4000` | Backend API URL |

For production, create `.env.production`:
```
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Build

```bash
npm run build
```

Outputs static files to `dist/`.

## SEO

This SPA is optimized for search engines through:

- **Dynamic meta tags** via `react-helmet-async` (`src/components/SEO.jsx`)
- **Structured data** (JSON-LD) on key pages
- **Semantic HTML** with proper heading hierarchy
- **Sitemap** (`public/sitemap.xml`)
- **Robots.txt** (`public/robots.txt`)
- **Pre-rendering** via backend middleware (Prerender.io)

### How search engines see the site

1. **Crawlers** request pages like `/community`, `/dictionary`, `/culture/traditions`
2. **Backend middleware** detects bot user-agents and serves pre-rendered HTML
3. **Pre-rendered HTML** contains the full page content, meta tags, and structured data
4. **Search engines** index the static HTML
5. **Regular users** get the normal React SPA

## Deployment

Deploy the `dist/` folder to any static host:
- Vercel
- Netlify
- AWS S3 + CloudFront
- cPanel
- Any web server with static file support

Ensure your backend has `PRERENDER_TOKEN` set for SEO pre-rendering to work.
