# SorcererXStreme - Full Stack Application

Ứng dụng huyền thuật AI full-stack với Frontend (Next.js) và Backend (Express.js) tách biệt, sẵn sàng để deploy lên AWS.

## Project Structure

```
AWS_tamlinhproject3/
├── backend/                 # Express.js Backend API
│   ├── src/
│   │   ├── server.ts
│   │   ├── app.ts
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── types/
│   ├── prisma/
│   ├── package.json
│   └── README.md
│
├── frontend/                # Next.js Frontend
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── SorcererXStreme/         # Original monolithic Next.js project (reference)
```

## Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- PostgreSQL + Prisma ORM
- JWT Authentication
- Google Gemini AI
- bcryptjs

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Framer Motion (Animations)

## Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma migrate dev
npm run dev
```

Backend runs on: http://localhost:5000

### 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local to point to backend
npm run dev
```

Frontend runs on: http://localhost:3000

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/sorcererxstreme"
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Features
- `POST /api/chat` - AI chat
- `GET /api/chat/history` - Chat history
- `POST /api/tarot/reading` - Tarot reading
- `POST /api/astrology` - Astrology analysis
- `POST /api/fortune` - Fortune telling
- `POST /api/numerology` - Numerology analysis

## Database Schema

- **User** - User accounts with authentication
- **Partner** - User's partner information
- **Breakup** - Breakup tracking for recovery
- **ChatMessage** - Chat history
- **TarotReading** - Tarot reading history

## Key Features

- JWT-based authentication
- AI-powered chat with Google Gemini
- Tarot card readings with 3D animations
- Astrology birth chart analysis
- Fortune telling (daily, yearly, comprehensive)
- Numerology calculations
- VIP membership system
- Breakup recovery tracking
- Responsive design with dark cosmic theme

## Development Workflow

1. Start backend server (port 5000)
2. Start frontend dev server (port 3000)
3. Frontend calls backend API via `lib/api-client.ts`
4. All API routes require JWT authentication (except auth endpoints)

## Architecture

```
Client (Browser)
    |
    | HTTP Requests (JWT Token)
    v
Frontend (Next.js)
    |
    | API Calls (api-client.ts)
    v
Backend (Express.js)
    |
    | Authentication Middleware
    | Controllers
    | Services (Gemini AI, JWT, Prompts)
    v
Database (PostgreSQL + Prisma)
```

## AWS Deployment Options

### Backend
- AWS EC2 (Node.js server)
- AWS ECS (Docker container)
- AWS Lambda (with API Gateway)
- AWS Elastic Beanstalk

### Frontend
- AWS Amplify
- AWS S3 + CloudFront
- AWS EC2 (Node.js SSR)
- AWS ECS (Docker)
- Vercel (recommended)

### Database
- AWS RDS PostgreSQL

### Example AWS Architecture
```
Route 53 (DNS)
    |
CloudFront (CDN)
    |
    ├── S3 (Frontend Static Files)
    |
    └── ALB (Load Balancer)
            |
            ├── ECS/EC2 (Backend API)
            |
            └── RDS PostgreSQL (Database)
```

## Production Checklist

### Backend
- [ ] Set strong JWT_SECRET
- [ ] Configure DATABASE_URL for production database
- [ ] Set NODE_ENV=production
- [ ] Configure CORS with production frontend URL
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure monitoring and logging

### Frontend
- [ ] Set NEXT_PUBLIC_API_URL to production backend
- [ ] Build and test production bundle
- [ ] Configure CDN for static assets
- [ ] Enable HTTPS
- [ ] Set up error tracking
- [ ] Configure analytics

## Scripts

### Backend
```bash
npm run dev       # Development server
npm run build     # Build TypeScript
npm start         # Production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Database GUI
```

### Frontend
```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Production server
npm run lint      # Run linter
```

## Migration from Monolithic to Separated

This project was refactored from a monolithic Next.js application to separate Frontend and Backend:

1. **Backend**: All `/api` routes converted to Express.js controllers
2. **Frontend**: All pages and components remain in Next.js
3. **Communication**: Frontend calls Backend via REST API with JWT authentication
4. **State**: Frontend uses Zustand for state management
5. **No behavior changes**: Same functionality, just different architecture

## Documentation

- [Backend README](./backend/README.md) - Backend API documentation
- [Frontend README](./frontend/README.md) - Frontend application documentation

## License

Private project - All rights reserved

## Support

For issues or questions, please contact the development team.
