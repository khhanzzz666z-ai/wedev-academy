# 🎓 Wedev Academy — Final Production-Ready Edition

**A comprehensive full-stack learning platform with AI-powered course summarization, progress tracking, and secure authentication.**

## ✨ Features

- **📚 Interactive Lesson Player**

  - 5-step learning structure per lesson
  - Keyboard shortcuts (Space = play/pause, ◀/▶ = navigate, R = replay)
  - localStorage + server-side progress persistence
  - Smooth Framer Motion animations

- **🧠 AI Summarization**

  - OpenAI-powered lesson summaries (environment-configured, no keys in code)
  - Rate-limited (10 calls/hour per user)
  - Server-side API integration

- **🔐 Secure Authentication**

  - JWT tokens (7-day expiry)
  - Password validation (min 6 chars, uppercase, lowercase, number)
  - Rate-limited auth endpoints (5 attempts/15min)

- **📊 Progress Tracking**

  - Per-lesson progress (current step, completion %)
  - Per-course enrollment & progress summary
  - Automatic sync to backend when authenticated
  - localStorage fallback when offline

- **🚀 Production Ready**
  - Multi-stage Docker builds with health checks
  - Nginx reverse proxy with security headers
  - Rate limiting & input validation
  - GitHub Actions CI/CD pipeline
  - Deployment guide included

## 📁 Project Structure

```
wedev-academy/
├── src/                           # React frontend (Vite)
│   ├── EnhancedVideoPlayer.jsx     # Main lesson player
│   ├── AuthComponent_PHP.jsx       # Legacy auth UI
│   ├── api.js                      # PHP API client
│   ├── api_node.js                 # Node API client
│   └── App.jsx                     # Main app
├── node-api/                       # Node.js/Express backend
│   ├── src/
│   │   ├── models/                 # Sequelize models (User, Course, Lesson, etc.)
│   │   ├── controllers/            # Route handlers
│   │   ├── routes/                 # API routes
│   │   ├── middleware/             # Auth, rate limiting
│   │   └── utils/                  # Validation helpers
│   ├── scripts/
│   │   └── seed.js                 # Populate sample data
│   ├── Dockerfile                  # Dev image
│   ├── Dockerfile.prod             # Production image
│   └── package.json
├── php-api/                        # Legacy PHP API (optional)
├── docker-compose.yml              # Local dev stack
├── Dockerfile.frontend             # Production frontend build
├── nginx.conf                      # Nginx config
├── DEPLOYMENT.md                   # Production deployment guide
└── README.md                       # This file
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
git clone https://github.com/khhanzzz666z-ai/wedev-academy.git
cd 'wedev-academy'
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- MySQL: localhost:3306

### Option 2: Local Development

**Prerequisites:** Node.js 18+, MySQL 8.0+

**Backend:**

```bash
cd node-api
npm install
cp .env.example .env
# Edit .env: set AI_API_KEY, DB credentials
npm run dev
```

**Frontend:**

```bash
npm install
npm run dev
```

**Seed sample data (optional):**

```bash
cd node-api
npm run seed
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and get JWT token
- `GET /api/auth/verify` — Verify token (requires Bearer token)

### Courses & Lessons

- `GET /api/courses` — List all courses
- `GET /api/courses/:id` — Get course with lessons

### Progress

- `GET /api/progress/:lessonId` (auth) — Get lesson progress
- `POST /api/progress/:lessonId` (auth) — Save/update lesson progress
- `GET /api/me/progress` (auth) — Get user's progress across all courses

### AI

- `POST /api/ai/summarize` (auth) — Summarize lesson content using AI

## 🔑 Environment Variables

### Backend (node-api/.env)

```env
NODE_ENV=development
PORT=4000
JWT_SECRET=dev_secret_change_in_prod
JWT_EXPIRES_IN=7d

DB_HOST=localhost
DB_PORT=3306
DB_NAME=webdev_academy
DB_USER=root
DB_PASSWORD=

AI_API_KEY=your_openai_key_here
AI_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL=gpt-4o
```

**Security:** Do NOT commit `.env` to git. For production, set env vars via platform (Docker, CI/CD, cloud provider).

## 🧪 Testing

### Backend Unit Tests

```bash
cd node-api
npm test
```

### API Smoke Test

```bash
# With Docker Compose running:
curl http://localhost:4000/
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123"}'
```

### Frontend Tests

```bash
npm run test  # (placeholder, ready for testing framework)
```

## 📦 Production Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed production deployment steps, security hardening, scaling strategies, and monitoring setup.

**Quick summary:**

1. Build production images: `docker build -f node-api/Dockerfile.prod . && docker build -f Dockerfile.frontend .`
2. Set environment variables on your platform
3. Use Docker Compose with `.prod` config or orchestrate with Kubernetes
4. Set up monitoring, backups, and TLS/HTTPS

## 🔒 Security

- **Authentication:** JWT tokens with short expiry (7 days)
- **Rate Limiting:**
  - Auth: 5 attempts/15 minutes
  - General API: 100 requests/15 minutes
  - AI: 10 requests/hour per user
- **Input Validation:** Email, password strength, payload size limits
- **Headers:** CSP, X-Frame-Options, X-Content-Type-Options configured
- **HTTPS:** Required in production (use Let's Encrypt or your CA)

## 📚 Learning Modules

Currently includes:

- **HTML Basics** (`lesson-1-1`): Tags, structure, semantic HTML
- **CSS Fundamentals** (`lesson-1-2`): Selectors, Box Model, Flexbox, Grid

Each lesson has 5 steps with interactive code examples and AI-powered summaries.

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -m 'Add my feature'`
3. Push: `git push origin feature/my-feature`
4. Open a Pull Request

## 📝 License

MIT

## 👤 Author

Khanz AI (khhanzzz666z-ai)

## 📞 Support

For issues or questions:

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
- Review API docs at `/api/*` endpoints (swagger or postman collection coming soon)
- Refer to inline code comments in `src/` and `node-api/src/`

---

**Happy learning! 🚀**

Built with ❤️ using React, Node.js, and MySQL.
