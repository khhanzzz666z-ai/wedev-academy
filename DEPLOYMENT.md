# Deployment Guide — Wedev Academy (Final Production-Ready Version)

## Overview

- **Frontend:** React + Vite (built → Nginx)
- **Backend:** Node.js/Express + Sequelize + MySQL
- **Auth:** JWT (7d expiry)
- **Features:** Lesson progress sync, AI summarization, rate limiting, input validation
- **Deployment:** Docker Compose (dev), multi-stage Docker builds (prod), Nginx reverse proxy

## Local Development

### Quick Start (Docker Compose)

```bash
cd 'C:\Users\admin\Documents\webdev academy'
docker compose up --build
```

- Frontend: http://localhost:5173 (Vite dev server)
- Backend API: http://localhost:4000
- MySQL: localhost:3306

### Local Setup (Node + npm)

**Backend:**

```bash
cd node-api
npm install
cp .env.example .env
# Edit .env: set AI_API_KEY, DB credentials
npm run dev  # or npm run seed to populate data first
```

**Frontend:**

```bash
npm install
npm run dev
```

## Production Deployment

### Docker Images

Build production images:

```bash
# Backend
docker build -f node-api/Dockerfile.prod -t wedev-academy-api:latest ./node-api

# Frontend (served by Nginx)
docker build -f Dockerfile.frontend -t wedev-academy-frontend:latest .
```

### Environment Variables (Backend)

Set these in production (e.g., GitHub Secrets or deployment platform env config):

```env
NODE_ENV=production
PORT=4000
JWT_SECRET=<your-long-random-secret>
JWT_EXPIRES_IN=7d

DB_HOST=<mysql-host>
DB_PORT=3306
DB_NAME=webdev_academy
DB_USER=<db-user>
DB_PASSWORD=<strong-password>

AI_API_KEY=<your-ai-provider-key>
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o
```

### Docker Compose (Production)

Create `docker-compose.prod.yml`:

```yaml
version: "3.8"

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: wedev-academy-api:latest
    ports:
      - "4000:4000"
    environment:
      NODE_ENV: production
      PORT: 4000
      DB_HOST: db
      DB_PORT: 3306
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      AI_API_KEY: ${AI_API_KEY}
    depends_on:
      db:
        condition: service_healthy
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: wedev-academy-frontend:latest
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always

volumes:
  mysql_data:
```

Run with:

```bash
docker compose -f docker-compose.prod.yml up -d
```

## Security Best Practices

1. **Secrets Management**

   - Never commit `.env` or keys to git
   - Use GitHub Secrets for CI/CD
   - Use a secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault) for production

2. **API Hardening**

   - Rate limiting applied (auth: 5/15min, general: 100/15min, AI: 10/hour)
   - Input validation (email format, password strength, payload size limit)
   - CORS configured, request size limited to 1MB
   - JWT tokens have short expiry (7d)

3. **Database**

   - Use strong password for MySQL root
   - Enable MySQL SSL/TLS in production
   - Regular backups (daily/weekly)
   - Use a managed service (AWS RDS, Azure MySQL) for production

4. **Frontend**

   - Nginx security headers enabled (CSP, X-Frame-Options, etc.)
   - Gzip compression enabled
   - Static assets cached (1 year)
   - SPA routing configured (fallback to index.html)

5. **Network**
   - Use HTTPS in production (TLS certificates from Let's Encrypt or your CA)
   - API behind reverse proxy (Nginx, AWS ALB, etc.)
   - DDoS protection (Cloudflare, AWS Shield)

## Monitoring & Logging

### Backend Logs

- Access logs: Nginx/reverse proxy captures requests
- App logs: sent to stdout/stderr (capture with Docker or logging service)
- Suggested: Use ELK stack, DataDog, or New Relic for centralized logging

### Health Checks

- Backend: `GET http://localhost:4000/` → returns `{ ok: true, msg: "..." }`
- Frontend: served by Nginx, status page at `/`
- Database: monitored via Docker health check

## Scaling Recommendations

1. **Database**

   - Add read replicas for high read traffic
   - Use connection pooling (PgBouncer, ProxySQL)
   - Consider sharding if lessons/users grow large

2. **Backend**

   - Run multiple instances behind a load balancer (Docker Swarm, Kubernetes)
   - Use session cache (Redis) if needed for multi-instance setup
   - Cache frequently accessed data (courses, lessons)

3. **Frontend**

   - Use CDN (CloudFront, Cloudflare) to serve static assets globally
   - Cache busting: Vite already handles this with hashes in filenames

4. **AI Endpoint**
   - Rate limit per user (already implemented: 10/hour)
   - Cache summarization results if same content requested multiple times
   - Consider async job queue (Bull, RabbitMQ) for long-running requests

## CI/CD Pipeline (GitHub Actions)

The workflow `.github/workflows/prod-build.yml` does:

1. Runs backend tests (test database in container)
2. Lints backend code
3. Builds both Docker images
4. Smoke-tests API health

To integrate with Docker Registry (Docker Hub, GitHub Container Registry):

- Add credentials as GitHub Secrets
- Update workflow to push images:
  ```yaml
  - uses: docker/login-action@v3
    with:
      username: ${{ secrets.DOCKER_USERNAME }}
      password: ${{ secrets.DOCKER_PASSWORD }}
  - uses: docker/build-push-action@v5
    with:
      push: true
      tags: your-registry/wedev-academy-api:latest
  ```

## Checklist for Go-Live

- [ ] Set all production environment variables
- [ ] Generate strong JWT_SECRET (use `openssl rand -base64 32`)
- [ ] Configure HTTPS/TLS certificates
- [ ] Test all auth flows (register, login, token verify)
- [ ] Test AI summarization (ensure API key works)
- [ ] Verify rate limiting (try exceeding limits)
- [ ] Test progress persistence (local + server)
- [ ] Set up monitoring and alerting
- [ ] Perform load testing (ab, wrk, k6)
- [ ] Document backup/restore procedures
- [ ] Create disaster recovery plan

## Support & Troubleshooting

**Common issues:**

- API returns "AI provider error": Check AI_API_KEY and network connectivity
- Rate limit errors: Increase limits in `src/middleware/rateLimiter.js` or user upgrade plan
- DB connection fails: Verify DB_HOST, DB_USER, DB_PASSWORD match
- CORS errors: Check CORS configuration in `src/index.js`

For questions or issues, refer to the README files in the repo.
