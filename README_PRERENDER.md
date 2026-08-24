# SEO Pre-rendering Setup Guide

This guide explains how to configure search engine pre-rendering so that your Akan Kasa site is fully indexable by Google, Bing, and other search engines.

## What is pre-rendering?

Akan Kasa is a single-page application (SPA). By default, search engines see only `index.html` and may miss dynamically loaded content. Pre-rendering solves this by serving search engine bots a fully rendered static HTML version of each page.

We use **Prerender.io** to handle this automatically.

## Prerequisites

- A deployed backend (Express server on Node.js)
- A domain name (e.g. `https://akankasa.com`)
- Prerender.io account (free tier available)

## Step-by-step setup

### 1. Deploy the backend

Deploy the `backend/` folder to a Node.js host (Render, Railway, DigitalOcean, etc.).

Make sure the backend is accessible at your domain, e.g.:
- Frontend: `https://akankasa.com` (static host)
- Backend: `https://api.akankasa.com` (Node.js host)

### 2. Sign up for Prerender.io

1. Go to https://prerender.io
2. Create a free account
3. Click **"Add New Site"**
4. Enter your frontend domain: `https://akankasa.com`
5. Copy the **token** they generate for you

### 3. Set the environment variable

Add `PRERENDER_TOKEN` to your backend environment:

**Local development** — create `backend/.env`:
```
PORT=4000
PRERENDER_TOKEN=your_token_here
```

**Production** — set the environment variable in your hosting platform:
- Render: Settings → Environment → Add variable
- Railway: Variables tab
- DigitalOcean: App → Settings → App-Level Environment Variables

### 4. Configure your frontend API URL

Update `.env.production` in the frontend root:
```
VITE_API_BASE_URL=https://api.akankasa.com
```

Rebuild and redeploy the frontend:
```bash
npm run build
```

### 5. Verify it works

Test with a bot user-agent:
```bash
curl -A "Googlebot" https://akankasa.com/community
```

You should receive a full HTML document, not just `index.html`.

Check the response headers for:
```
X-Prerender-Cache: HIT
Content-Type: text/html
```

### 6. Submit your sitemap

1. Google Search Console: https://search.google.com/search-console
   - Add your property
   - Submit sitemap: `https://akankasa.com/sitemap.xml`

2. Bing Webmaster Tools: https://www.bing.com/webmasters
   - Import from Google Search Console or add manually
   - Submit sitemap

## How it works

```
User Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
    ↓
Backend middleware detects bot (backend/server.js:19)
    ↓
Backend fetches https://service.prerender.io/https://akankasa.com/community
    ↓
Prerender.io returns fully rendered HTML with meta tags and content
    ↓
Backend serves HTML to Googlebot
    ↓
Google indexes the full page content
```

Regular users bypass this and get the normal React SPA.

## Environment variables reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PRERENDER_TOKEN` | Yes | Your Prerender.io token |
| `PRERENDER_HOST` | No | Default: `service.prerender.io` |
| `PORT` | No | Backend port (default: 4000) |
| `VITE_API_BASE_URL` | Yes | Backend API URL for frontend |

## Troubleshooting

**Pages not indexing:**
- Verify `PRERENDER_TOKEN` is set correctly in backend env
- Check backend logs for "Prerender error" messages
- Ensure your frontend is deployed and accessible publicly
- Test with `curl -A "Googlebot"` to see what bots receive

**Pre-rendered HTML missing content:**
- Check that pages load fully in a browser
- Ensure API calls complete before Prerender.io snapshots the page
- Some content may need SSR instead of pre-rendering

**Slow indexing:**
- Submit sitemap to Google Search Console
- Request indexing for key pages manually
- Ensure `robots.txt` allows crawling
