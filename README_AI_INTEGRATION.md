**AI Integration (secure) — Wedev Academy**

- Do NOT paste secrets (API keys) into chat or commit them to the repository.
- Use environment variables locally and GitHub Secrets in CI.

Setup (local)

1. Copy example env:

```powershell
cd node-api
copy .env.example .env
```

2. Edit `node-api/.env` and set `AI_API_KEY` (do not commit `.env`).
3. Start services (docker-compose will pick up the env for the backend service if you set them in your environment or pass them into Docker):

```powershell
# If using docker-compose
docker compose up --build

# Or run backend locally
cd node-api
npm install
npm run dev
```

Using the AI endpoint

- Endpoint: `POST /api/ai/summarize` (requires authentication)
- Body: `{ "text": "...lesson content..." }`
- Response: `{ ok: true, summary: "...", raw: {...} }`

Security notes

- For CI/CD, add `AI_API_KEY` as a repository secret (GitHub Actions: Settings → Secrets → Actions) and reference it in workflows.
- For production, use a secrets manager (Azure Key Vault / AWS Secrets Manager / GitHub Secrets) and never store long-lived API keys in repo.

If you want, I can add a tiny UI button in the lesson player: "AI: Summarize this lesson" that will call this endpoint and show a small modal with the result.
