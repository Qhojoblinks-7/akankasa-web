# Backend — Akan Kasa ne Amammere

Express + SQLite API server for the Akan Kasa platform.

## Quick Start

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:4000` by default.

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4000` | Server port |
| `PRERENDER_TOKEN` | — | Prerender.io token for SEO pre-rendering |
| `PRERENDER_HOST` | `service.prerender.io` | Prerender service host |

## API Endpoints

### Public
- `GET /api/health` — health check
- `GET /api/config` — feature flags and app config
- `GET /api/alphabet` — Akan alphabet letters
- `GET /api/greetings` — greeting phrases
- `GET /api/lessons` — language lessons
- `GET /api/vocabulary/modules` — vocabulary modules
- `GET /api/dictionary` — search dictionary
- `GET /api/documents` — research documents
- `GET /api/culture` — culture articles
- `GET /api/events` — community events
- `GET /api/forum/posts` — forum discussions
- `GET /api/folk-stories` — folk stories
- `GET /api/drumming` — drumming lessons
- `GET /api/festival-photos` — festival photos
- `GET /api/research-papers` — research papers
- `GET /api/profiles` — user profiles
- `GET /api/festivals` — festivals

### Auth Required
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/users/me`
- `PUT /api/users/me/password`
- `POST /api/users/me/progress`
- `GET /api/users/me/progress`

### Admin Auth Required
- `GET /api/admin/articles`
- `POST /api/admin/articles`
- `PUT /api/admin/articles/:id`
- `DELETE /api/admin/articles/:id`
- `GET /api/admin/documents`
- `POST /api/admin/documents`
- `PUT /api/admin/documents/:id`
- `DELETE /api/admin/documents/:id`
- `GET /api/admin/events`
- `POST /api/admin/events`
- `PUT /api/admin/events/:id`
- `DELETE /api/admin/events/:id`
- `GET /api/admin/lessons`
- `POST /api/admin/lessons`
- `PUT /api/admin/lessons/:id`
- `DELETE /api/admin/lessons/:id`
- `GET /api/admin/vocabulary`
- `POST /api/admin/vocabulary`
- `PUT /api/admin/vocabulary/:id`
- `DELETE /api/admin/vocabulary/:id`
- `GET /api/admin/greetings`
- `POST /api/admin/greetings`
- `PUT /api/admin/greetings/:id`
- `DELETE /api/admin/greetings/:id`
- `GET /api/admin/articles`
- `POST /api/admin/articles`
- `PUT /api/admin/articles/:id`
- `DELETE /api/admin/articles/:id`
- `GET /api/admin/alphabets`
- `POST /api/admin/alphabets`
- `PUT /api/admin/alphabets/:id`
- `DELETE /api/admin/alphabets/:id`
- `GET /api/admin/folk-stories`
- `POST /api/admin/folk-stories`
- `PUT /api/admin/folk-stories/:id`
- `DELETE /api/admin/folk-stories/:id`
- `GET /api/admin/drumming`
- `POST /api/admin/drumming`
- `PUT /api/admin/drumming/:id`
- `DELETE /api/admin/drumming/:id`
- `GET /api/admin/festival-photos`
- `POST /api/admin/festival-photos`
- `PUT /api/admin/festival-photos/:id`
- `DELETE /api/admin/festival-photos/:id`
- `GET /api/admin/research-papers`
- `POST /api/admin/research-papers`
- `PUT /api/admin/research-papers/:id`
- `DELETE /api/admin/research-papers/:id`
- `GET /api/admin/approval-queue`
- `POST /api/admin/contributions/:type/:id/approve`
- `POST /api/admin/contributions/:type/:id/reject`
- `GET /api/admin/moderation`
- `GET /api/admin/forum`
- `GET /api/admin/suggestions`
- `GET /api/admin/users`
- `GET /api/admin/media`
- `POST /api/uploads`
- `GET /api/admin/versions`
- `POST /api/admin/versions`

## Database

SQLite database file: `akankasa.db` (created automatically)

Initialize with seed data:
```bash
npm run db:init
```

## CORS

Development: allows all origins
Production: configure `CORS_ORIGIN` environment variable

## SEO Pre-rendering

The backend includes middleware for search engine bot pre-rendering.

### Prerender.io (recommended)
1. Create an account at https://prerender.io
2. Add your site domain
3. Copy your token
4. Set environment variable:
   ```bash
   PRERENDER_TOKEN=your_token_here
   ```

The middleware will automatically detect search engine bots and serve pre-rendered HTML, ensuring your dynamic React content is fully indexable.

### Self-hosted alternative
Set `PRERENDER_HOST` to your self-hosted Rendertron instance:
```bash
PRERENDER_HOST=your-rendertron-domain.com
```

## Deployment

- Build: not required (Node.js server)
- Start: `npm start` or `npm run dev`
- Process manager: PM2, systemd, Docker, etc.
- Reverse proxy: nginx/Apache for SSL termination
