# AlgoRank

A full-stack DSA (Data Structures & Algorithms) problem-solving platform inspired by LeetCode and Striver's TUF+ platform. Built as a production-style learning project to understand modern full-stack development: from frontend UI frameworks to backend APIs, database design, authentication, and deployment.

**Live Demo:** [AlgoRank](https://algorank.vercel.app) | **Backend API:** [Railway](https://algorank-api.railway.app)

---

## 🎯 Project Intent

This project was built with a singular goal: **understand how real-world production applications are architected and deployed.**

Rather than following tutorials blindly, I chose to build an end-to-end application that required:
- Modern frontend framework with state management
- Secure backend with authentication and authorization
- Complex database relationships and migrations
- Integration with external services (Judege0 code execution APIs)
- Production deployment with environment management
- Debugging and problem-solving across the entire stack

The result is a functional platform where users can solve DSA problems, track progress, and organize problems into custom playlists—all while learning critical engineering patterns.

---

## 💻 Comprehensive Tech Stack

### **Frontend Architecture**

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework with hooks | 18+ |
| **Vite** | Lightning-fast build tool & dev server | Latest |
| **Tailwind CSS** | Utility-first CSS framework | 3.x |
| **DaisyUI** | Pre-built components on Tailwind | Latest |
| **Zustand** | Lightweight state management | 4.x |
| **React Router** | Client-side routing | 6.x |
| **Axios** | HTTP client with interceptors | Latest |
| **Monaco Editor** | VS Code's code editor for in-browser coding | Latest |
| **React Hot Toast** | Beautiful notifications | Latest |
| **Lucide React** | Icon library (500+ icons) | Latest |

**Deployment:** Vercel (auto-deployed from GitHub)

---

### **Backend Architecture**

| Technology | Purpose | Details |
|-----------|---------|---------|
| **Node.js** | JavaScript runtime | LTS version |
| **Express.js** | Web framework & routing | 4.x |
| **Prisma ORM** | Database ORM with type safety | Latest |
| **PostgreSQL** | Relational database | 14+ |
| **JWT (jsonwebtoken)** | Authentication tokens | Industry standard |
| **bcryptjs** | Password hashing | Secure salting (12 rounds) |
| **Middleware Stack** | Auth verification, CORS, logging | Custom implementations |
| **REST API** | RESTful endpoint design | 25+ endpoints |

**Deployment:** Railway (with automatic database migrations)

---

### **Database Layer**

| Aspect | Implementation |
|--------|----------------|
| **Database** | PostgreSQL 14+ on Railway |
| **ORM** | Prisma with type-safe queries |
| **Schema** | 8+ interconnected models with proper relations |
| **Migrations** | Automated Prisma migrations on deploy |
| **Models** | User, Problem, Submission, Playlist, TestCase, ProblemSolved |
| **Indexing** | Optimized for common queries |
| **Constraints** | Foreign keys, unique constraints, cascading deletes |

---

### **Code Execution Services**

| Service | Status | Purpose |
|---------|--------|---------|
| **Piston API** | ✅ Current | Open-source code execution for 50+ languages |
| **Judge0** | 🔧 In Progress | Commercial-grade execution (was primary, debugging integration) |

**Supported Languages:** JavaScript, Python, Java others will come soon.

---

### **External Integrations**

- **Authentication:** JWT-based with HTTP-only cookies
- **State Sync:** Zustand store with localStorage persistence
- **Real-time:** Toast notifications for user feedback
- **Code Execution:** Piston API with async polling and error handling

---

### **Development Tools**

| Tool | Purpose |
|------|---------|
| **Git & GitHub** | Version control & repository hosting |
| **VS Code** | Primary editor |
| **Postman** | API testing and debugging |
| **Railway CLI** | Database and deployment management |
| **Vercel CLI** | Frontend deployment and preview |
| **npm** | Package management |

---

## ✨ Current Features

### **Problem Solving**
- ✅ Browse 30+ carefully curated DSA problems
- ✅ Filter by difficulty (Easy, Medium, Hard)
- ✅ Filter by topic (Arrays, Strings, Trees, etc.)
- ✅ Filter by company (Amazon, Google, Microsoft, Meta, Apple)
- ✅ Search problems by keyword
- ✅ Real-time code execution in browser
- ✅ Multi-language support (JavaScript, Python, Java, C++, etc.)
- ✅ View submission history with detailed results
- ✅ Company-specific problem collections

### **User System**
- ✅ Secure authentication with JWT
- ✅ User profiles with statistics
- ✅ Monthly problem-solving contribution graph
- ✅ Track problems solved count
- ✅ Track submission count
- ✅ Admin role for creating problems

### **Problem Organization**
- ✅ Create custom playlists
- ✅ Add/remove problems from playlists
- ✅ Organize learning journey
- ✅ Quick access to grouped problems
- ✅ Tag-based problem discovery

### **User Interface**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light mode support (DaisyUI themes)
- ✅ Monaco Editor for professional code writing
- ✅ Real-time test case results
- ✅ Loading states and error handling
- ✅ Beautiful animations and transitions
- ✅ Tag cloud for easy filtering

---

## 📚 Database Seeding

AlgoRank comes with a database seeding script that populates your database with 30+ quality DSA problems from top companies.

### **Quick Start**
```bash
cd backend
npm run seed
```

### **What Gets Seeded**
- **30 DSA Problems** across Easy, Medium, and Hard difficulty levels
- **25 Unique Tags** including company names, topic names, and difficulty levels
- **Multiple Code Templates** (JavaScript, Python, Java) for each problem
- **Test Cases** (2-3 per problem) for validation
- **Admin User** for problem creation

### **Companies Covered**
- Amazon (8 problems)
- Google (3 problems)
- Microsoft (2 problems)
- Meta (2 problems)
- Apple (3 problems)

### **API Endpoints for Filtering**
```bash
# Get all available tags
GET /api/problems/tags

# Filter problems by tags, difficulty, and search
GET /api/problems/filter?tags=Amazon&difficulty=EASY

# Search specific problems
GET /api/problems/filter?search=two%20sum
```

### **Documentation**
- [QUICK_START_SEED.md](./QUICK_START_SEED.md) - 2-minute quick start
- [SEEDING_GUIDE.md](./SEEDING_GUIDE.md) - Complete seeding guide
- [FRONTEND_INTEGRATION_GUIDE.md](./FRONTEND_INTEGRATION_GUIDE.md) - React code examples
- [DATABASE_SEEDING_COMPLETE.md](./DATABASE_SEEDING_COMPLETE.md) - Full overview

---

## 🎓 Key Challenges & Learnings

### **1. Code Execution Integration**
**Challenge:** Integrating Judge0 for reliable code execution proved complex.

**Issues Encountered:**
- Incorrect language ID mappings (Python vs Python3, etc.)
- Async polling for submission results with timeouts
- Rate limiting and API quota management
- Error responses that didn't clearly indicate failures

**Solutions:**
- Built language mapping layer between frontend and APIs
- Implemented exponential backoff for polling
- Added comprehensive error handling and logging
- Switched to Piston API as backup with fallback logic

**Learning:** External service integrations require defensive programming—always have fallbacks and clear error messages, spned almost 5 days into this ... but will try again.

---

### **2. Authentication in Production**
**Challenge:** JWT authentication worked seamlessly on localhost but failed in production.

**Root Causes:**
- CORS headers not properly configured for Vercel domain
- Cookies not being sent with credentials flag
- Environment variables not synced correctly on Railway

**Solutions:**
- Implemented proper CORS middleware with origin whitelisting
- Configured `credentials: 'include'` in Axios
- Set up environment variable validation on startup
- Added detailed logging to track auth failures

**Learning:** Development ≠ production. Always test cross-origin requests and credential handling before deploying.

---

### **3. Deployment Complexity**
**Challenge:** First production deployment revealed hidden complexities (spent nearly a full day debugging).

**Issues:**
- Database migrations failing silently on Railway
- Environment variables leaking or being undefined
- Frontend calling wrong API endpoints in production build
- Vercel caching build artifacts inconsistently

**Solutions:**
- Automated Prisma migrations in Railway's post-deployment script
- Created `.env.example` and strict validation
- Implemented feature flags for API endpoint selection
- Learned Vercel's deployment caching and cache invalidation

**Learning:** Deployment isn't just "push to prod." It requires infrastructure knowledge, proper environment management, and extensive testing.

---

### **4. State Management at Scale**
**Challenge:** Managing global state across multiple features (auth, problems, submissions, playlists) became complex with useState.

**Solution:** Adopted Zustand for lightweight, scalable state management.

**Benefits:**
- Separate stores for each domain (problems, submissions, playlists)
- Minimal boilerplate compared to Redux
- Built-in persistence with localStorage
- Clean separation of concerns

**Learning:** Choose state management based on project scale, not hype. Zustand proved perfect for this size.

---

### **5. Database Design & Relations**
**Challenge:** Modeling complex relationships between Users, Problems, Submissions, Playlists, and TestCases.

**Key Decisions:**
- Many-to-many relationship for Problems-in-Playlist
- One-to-many for User-to-Submissions
- Proper indexing on frequently queried fields
- Cascade deletes for data integrity

**Learning:** Good database design prevents N+1 queries and ensures scalability from day one, loved this specific phase .

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL FRONTEND                       │
│  React (Vite) + Tailwind + DaisyUI + Zustand State Management│
│                                                               │
│  Pages: Landing, Home, Problem, Auth, Profile, Playlists    │
│  Components: Editor, Submission, ProblemTable, etc.          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTPS / REST API / JWT Auth
                 │
┌────────────────▼────────────────────────────────────────────┐
│                  RAILWAY BACKEND                             │
│           Node.js + Express.js REST API                      │
│                                                               │
│  Routes: /auth, /problems, /submissions, /playlists          │
│  Middleware: JWT Verification, CORS, Error Handling          │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────┴──────────┐
        │                   │
┌───────▼────────┐   ┌──────▼──────────┐
│  RAILWAY DB    │   │  PISTON API     │
│  PostgreSQL    │   │  (Code Exec)    │
│  + Prisma      │   │                 │
└────────────────┘   └─────────────────┘
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 16+
- PostgreSQL 14+
- Git

### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev  # Vite dev server on http://localhost:5173
```

### **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure DATABASE_URL, JWT_SECRET
npx prisma migrate dev  # Run migrations
npm run dev  # Express on http://localhost:3000
```

### **Environment Variables**

**Backend (.env)**
```env
DATABASE_URL=postgresql://user:password@host:port/db_name
JWT_SECRET=your-super-secret-key
PORT=3000
NODE_ENV=development
PISTON_API_URL=https://emkc.org/api/v2/piston
```

**Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:3000
```

---

## 🔮 Future Scope (Not Yet Implemented)

### **Phase 2: Enhanced Learning**
- [ ] **AI-Powered Hints:** Use Claude/ChatGPT API to generate context-aware hints
- [ ] **Video Explanations:** Embed solution walkthroughs for each problem
- [ ] **Step-by-Step Debugger:** Built-in code debugger to trace execution

### **Phase 3: Gamification & Community**
- [ ] **365-Day Heatmap:** GitHub-style contribution graph
- [ ] **Leaderboard:** Rank users by problems solved and streak
- [ ] **Badges & Achievements:** Unlock badges for milestones
- [ ] **Likes & Comments:** Let users discuss problems in-platform
- [ ] **Discussion Threads:** Problem-specific discussion forum

### **Phase 4: Personalization**
- [ ] **Company-Specific Sheets:** Amazon 50, Google 30, Microsoft Top 25, etc.
- [ ] **Adaptive Difficulty:** ML-based difficulty recommendation based on solve history
- [ ] **Learning Paths:** Curated learning sequences (e.g., "Two Pointers Mastery")
- [ ] **Interview Prep Mode:** Mock interview timer and scoring

### **Phase 5: Infrastructure**
- [ ] **WebSockets:** Real-time notifications and live collaboration
- [ ] **Caching Layer:** Redis for problem stats and user data
- [ ] **CDN:** Cloudflare for static asset optimization
- [ ] **Search:** Elasticsearch for full-text problem search

---

## 📊 Metrics & Performance

- **Frontend Load Time:** < 2s (optimized with Vite)
- **API Response Time:** < 500ms average
- **Database Query Time:** < 100ms (with proper indexing)
- **Code Execution:** < 3s per submission

---

## 🤔 Why This Project Matters

This isn't a side project or weekend hack—it's a comprehensive learning exercise that taught me:

1. **System Design Thinking:** How to architect a system that scales from day one
2. **Debugging Skills:** Production bugs are different; they require logs, traces, and patience
3. **DevOps Basics:** learned Dockers on the way  Environment management, deployment pipelines, and infrastructure
4. **Security:** Authentication, authorization, and input validation matter more than code quality
5. **Real-World Constraints:** Users expect 99.9% uptime; your code will fail in production
6. **Communication:** Clear error messages and logging make debugging 10x faster

The code isn't perfect, but it's *honest*—it reflects real challenges and real solutions, not textbook examples.

---

## 📚 Learning Resources Used

- **Course:** Chaicode Cohort-1
- **Database:** PostgreSQL & Prisma documentation
- **Backend:** Express.js best practices from production teams
- **Frontend:** React patterns and Zustand docs
- **Deployment:** Railway and Vercel documentation
- **Code Execution:** Piston API documentation

---

## 🛠️ Future Improvements

- [ ] Add request caching with Redis
- [ ] Implement rate limiting for API endpoints
- [ ] Add comprehensive error tracking (Sentry)
- [ ] Write integration tests (Jest, Supertest)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement database query optimization
- [ ] Add performance monitoring (New Relic / DataDog)

---

## 📝 License

This project is open source and available under the MIT License. Feel free to fork, modify, and learn from it.

---

## 👤 About the Developer

**Yash Mandhare**

This project represents my journey from "I can write code" to "I can build production systems." Every bug fixed, every deployment issue resolved, and every late-night debugging session taught me something invaluable.

If you're starting your engineering journey, I hope AlgoRank serves as a reference—not just for code, but for how to approach building real things.

**Connect:** [LinkedIn](https://www.linkedin.com/in/yashmandhare1/) | [GitHub](https://github.com/Yasss333) | [Instagram](yash333)

---

## 💬 Feedback & Questions

If you find bugs, have suggestions, or want to discuss architecture decisions, feel free to open an issue or reach out. I'm always learning, and I'd love your feedback.

---

**Last Updated:** January 2026  
**Status:** Active Development  
**Next Focus:** AI-powered hints and expanded language support
