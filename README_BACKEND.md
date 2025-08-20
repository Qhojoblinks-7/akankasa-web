AkanKasa — Backend Handoff

Purpose

This document describes the minimal API contract and operational notes required for the frontend (AkanKasa web app) to integrate with a real backend. It includes endpoint definitions, request/response shapes, examples, and integration notes (CORS, audio hosting, pagination, feature flags).

Location of frontend consumer code

- Frontend entry: `src/main.jsx`, pages of interest:
  - `src/pages/Dictionary.jsx` (search, filters, pagination, audio, favorites)
  - `src/pages/EventsPage` / `src/pages/EventRegistration.jsx` (events & registrations)
  - API wrapper: `src/api/index.js` (currently uses mock data/localStorage)
  - Mock dataset: `src/data/mockData.js` — use this to seed/test the backend.

Environment

- The frontend expects a configurable API base URL. For Vite-based dev builds use:
  - VITE_API_BASE_URL — example: `http://localhost:4000/api`

General integration notes

- All endpoints should return JSON and follow the shapes below.
- CORS: allow the frontend origin (or set Access-Control-Allow-Origin: *) during development. Audio files (if hosted on separate domain/CDN) must allow CORS for audio elements to load.
- Auth: MVP does not require auth. If adding per-user favorites/registrations, add standard auth (Bearer tokens) and update the frontend to include Authorization headers.
- Versioning: consider prefixing endpoints with `/v1`.
- Audio URLs: return absolute URLs to MP3/OGG files. Prefer CDN or object storage with CORS enabled.

API endpoints (contract)

1) GET /dictionary

Purpose: search and list dictionary words with server-side pagination.

Query parameters
- q (string, optional) — search term
- direction (string, optional) — "akan-english" | "english-akan" (default: "akan-english")
- dialect (string, optional)
- partOfSpeech (string, optional)
- sort (string, optional) — "alphabetical" | "relevance"
- page (integer, optional, default 1)
- limit (integer, optional, default 10)

Response 200
{
  "total": 123,        // total matching results
  "page": 1,
  "limit": 10,
  "results": [ Word ]
AkanKasa — Backend Handoff

Purpose

This document describes the API surface and operational notes required for the frontend (AkanKasa web app) to integrate with a real backend. It includes endpoint definitions, request/response shapes, examples, and integration notes (CORS, audio hosting, pagination, feature flags).

Frontend consumer locations

- Frontend entry: `src/main.jsx`
- Pages/components of interest:
  - `src/pages/Dictionary.jsx` (search, filters, pagination, audio, favorites)
  - `src/pages/EventsPage.jsx`, `src/pages/EventRegistration.jsx`, `src/pages/Community.jsx` (events & registrations)
  - Community/forum pages: `src/pages/DiscussionView.jsx`, `src/pages/JoinDiscussion.jsx`
  - Research pages: `src/pages/Research.jsx`, `src/pages/ResearchNewDiscussion.jsx`
  - API wrapper: `src/api/index.js` (currently uses mock data/localStorage)
  - Mock dataset: `src/data/mockData.js` — use this to seed/test the backend.

Environment

- Frontend expects a configurable API base URL. For Vite-based dev builds use:
  - `VITE_API_BASE_URL` — example: `http://localhost:4000/api`

General integration notes

- All endpoints should return JSON and follow the shapes below.
- CORS: allow the frontend origin (or set Access-Control-Allow-Origin: *) during development. Audio files (if hosted on separate domain/CDN) must allow CORS for audio elements.
- Auth: MVP does not require auth. If adding per-user favorites/registrations, add standard auth (Bearer tokens) and update the frontend to include Authorization headers.
- Versioning: consider prefixing endpoints with `/v1`.
- Audio URLs: return absolute URLs to MP3/OGG files. Prefer CDN or object storage with CORS enabled.

Core endpoints (summary)

1) Dictionary (search + pagination)
- GET /api/dictionary
  - Query: q, direction, dialect, partOfSpeech, sort, page, limit
  - Response: { total, page, limit, results: [Word] }
- GET /api/dictionary/:id
  - Response: Word

2) Favorites
- GET /api/favorites
- PUT /api/favorites
- (optional) POST/DELETE /api/favorites/:id

3) Events & Registrations
- GET /api/events
- GET /api/events/:id
- POST /api/events
- POST /api/registrations
- GET /api/registrations?eventId=... (admin)

4) Community / Forums
- GET /api/forums (or /api/posts)
- GET /api/forums/:postId
- POST /api/forums
- POST /api/forums/:postId/comments

5) Research hub
- GET /api/research/resources
- POST /api/research/proposals

6) User profiles
- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id

7) Uploads
- POST /api/uploads (multipart/form-data) -> returns { url }

8) Config & Feature flags
- GET /api/config

9) Auth (optional)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Full endpoint list and shapes

1) System / Health
- GET /api/health
  - Response 200: { status: "ok", time: "2025-08-19T12:00:00Z" }

2) Dictionary (search, details, audio)
- GET /api/dictionary
  - Query params: q, direction, dialect, partOfSpeech, sort, page, limit
  - Response 200:
    {
      "total": 123,
      "page": 1,
      "limit": 10,
      "results": [ Word ]
    }
- GET /api/dictionary/:id
  - Response: Word

Word schema (example)
{
  "id": "w_001",
  "akan": "akwaaba",
  "english": "welcome",
  "pronunciation": "ah-kwah-bah",
  "audio": "https://cdn.example.com/audio/w_001.mp3",
  "dialect": "Twi",
  "partOfSpeech": "interjection",
  "examples": [ { "akan": "Akwaaba!", "english": "Welcome!", "audio": "https://.../ex_1.mp3" } ],
  "etymology": "From ...",
  "related": ["w_002","w_003"]
}

3) Favorites
- GET /api/favorites
  - Response 200: { "favorites": ["w_001", "w_005"] }
- PUT /api/favorites
  - Body: { "favorites": ["w_001", "w_005"] }
  - Response 200: { "favorites": ["w_001","w_005"] }
- Optional per-user endpoints:
  - POST /api/favorites/:id
  - DELETE /api/favorites/:id

4) Events & Registrations
- GET /api/events
  - Query: page, limit, upcoming=true/false, q
  - Response: { total, page, limit, results: [Event] }
- GET /api/events/:id
  - Response: Event
- POST /api/events
  - Body: { title, description, date, time, location, capacity, type, organizer }
  - Response: created Event (201)
- POST /api/registrations
  - Body: { eventId, name, email, notes }
  - Response 201: { id, eventId, name, email, createdAt }
- GET /api/registrations?eventId=... (admin)
  - Response: [ Registration ]

Event schema (example)
{
  "id": "e_001",
  "title": "Twi Conversation Meetup",
  "description": "Practice Twi with native speakers.",
  "date": "2025-09-10T14:00:00Z",
  "time": "14:00",
  "capacity": 40,
  "location": "Accra Cultural Centre",
  "organizer": "AkanKasa",
  "registrationCount": 5
}

5) Community / Forums / Discussions
- GET /api/forums
  - Query: page, limit, category, q
  - Response: { total, page, limit, results: [Post] }
- GET /api/forums/:postId
  - Response: Post with comments
- POST /api/forums
  - Body: { title, content, authorName, category, tags }
  - Response: created Post
- POST /api/forums/:postId/comments
  - Body: { authorName, content }
  - Response: created Comment
- PUT /api/forums/:postId
- DELETE /api/forums/:postId

Post schema (example)
{
  "id": "p_001",
  "title": "What are common Akan greetings?",
  "content": "I noticed there are different greetings by time of day...",
  "authorName": "Kofi",
  "category": "Language Learning",
  "tags": ["greetings","Twi"],
  "createdAt": "2025-08-19T10:00:00Z",
  "comments": [ { "id":"c_1", "authorName":"Ama", "content":"Thanks!", "createdAt":"..." } ]
}

6) Research hub
- GET /api/research/resources
  - Query: q, type, page, limit
  - Response: { total, page, limit, results: [Resource] }
- GET /api/research/resources/:id
- POST /api/research/proposals
  - Body: { title, summary, proposerName, contact, attachments? }

7) User profiles / members
- GET /api/users
  - Query: q, page, limit
  - Response: { total, page, limit, results: [UserProfile] }
- GET /api/users/:id
  - Response: UserProfile
- PUT /api/users/:id

UserProfile schema
{
  "id": "u_001",
  "name": "Jane Doe",
  "bio": "Linguist and community organizer",
  "location": "Accra",
  "avatarUrl": "https://.../avatar.jpg",
  "social": { "twitter": "@jdoe" }
}

8) Uploads (audio/assets)
- POST /api/uploads
  - Accepts multipart/form-data; returns { url: "https://.../audio/file.mp3" }
  - Note: audio assets must be CORS-accessible for <audio> elements

9) Auth (optional)
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password } -> { token }
- GET /api/auth/me -> { user }

10) Config & Feature flags
- GET /api/config
  - Response: { featureFlags: { ... }, dialects: [...], partsOfSpeech: [...] }

Operational & implementation notes

- Pagination: always return `total` and `page` so frontend can compute totalPages.
- Dates: use ISO 8601 strings (UTC recommended).
- Errors: return JSON { error: "message" } with appropriate HTTP status codes.
- CORS: during development allow the dev origin, and for production enable only allowed origins.
- Audio hosting: use object storage/CDN and ensure CORS; return absolute URLs in `audio` fields.
- Large datasets: implement server-side search and pagination; consider full-text indexes or a search engine (Elastic, Postgres FTS).

Testing with the frontend

- Seed the backend with the JSON arrays found in `src/data/mockData.js`.
- Update `src/api/index.js` to call `import.meta.env.VITE_API_BASE_URL` + endpoints and handle errors.
- During development you can host a small Express server to serve these endpoints and static audio files from `public/`.

Deliverables for backend team

1. Implement endpoints above (dictionary, favorites, events, registrations, forums, research, users, uploads, config).
2. Provide an OpenAPI/Swagger spec (I can generate one on request).
3. Export `src/data/mockData.js` as JSON to bootstrap the DB.
4. Document CORS policy and audio hosting details.

Next steps I can take

- Generate an OpenAPI spec (YAML) and add it to the repo.
- Replace `src/api/index.js` mock functions with a fetch-based implementation wired to `VITE_API_BASE_URL` with basic loading/error handling.
- Add a small Express mock server for local backend testing and integration.

If you prefer, tell me whether I should:
- generate the OpenAPI spec now, or
- update `src/api/index.js` to call a configurable backend now.

---
File: `README_BACKEND.md`
