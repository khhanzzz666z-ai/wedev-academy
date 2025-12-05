Wedev Academy — Final (Opinionated) Setup

Overview

- Fullstack learning platform prototype: React (Vite/Tailwind) frontend, Node.js/Express + Sequelize MySQL backend, optional legacy PHP API also included.
- Features: Auth (JWT), per-lesson progress persistence (local + server), AI lesson summarization (server-side call to external AI provider), Docker Compose for local development, seed script to populate sample data.

Quick start (recommended - Docker)

1. Copy env for Node API and set secrets (do NOT commit):

```powershell
cd node-api
copy .env.example .env
# edit node-api\.env and set AI_API_KEY and DB credentials if needed
```

2. Start everything with Docker Compose:

```powershell
# from repo root
docker compose up --build
```

3. (Optional) Seed sample data into the Node API DB:

```powershell
# If you run Node API locally:
cd node-api
npm install
npm run seed

# If using Docker, open a shell into the backend container and run the seed script
# docker exec -it <container_id> sh -c "node scripts/seed.js"
```

4. Start frontend (if not using containerized frontend):

```powershell
npm run dev
# open http://localhost:5173
```

API Endpoints (Node)

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/verify
- GET /api/courses
- GET /api/courses/:id
- GET /api/progress/:lessonId (auth)
- POST /api/progress/:lessonId (auth)
- GET /api/me/progress (auth) - course progress summary
- POST /api/ai/summarize (auth) - summarize lesson text (requires AI_API_KEY env var)

Security notes

- Never commit `.env` or real API keys. Use environment variables and CI secrets.
- Rotate keys if they were shared publicly.

CI / CD

- GitHub Actions workflow `/.github/workflows/node-ci.yml` runs a basic install and placeholder tests. To expand: add Docker image build + push steps and use repository secrets for Docker credentials and AI_PROVIDER key in protected environments.

Next steps to make this production-ready

- Replace Sequelize `sync()` with migrations and use a proper migration tool (sequelize-cli, umzug).
- Add robust validation for inputs (celebrate/Joi) and rate-limiting for AI endpoints.
- Add HTTPS, CORS policies, and production-grade logging.
- Add end-to-end tests and CI smoke tests that start services with Docker Compose.

If you want, I can:

- Add the AI Summarize button into the player UI (already implemented) and small modal.
- Implement migrations and seeders with a CLI.
- Add GitHub Actions steps to build and publish Docker images.
- Prepare a simple Nginx + Dockerfile for serving the built frontend in production.

Tell me which of those you want next and I will implement it.
