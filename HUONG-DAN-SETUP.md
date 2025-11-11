# HUONG DAN CHAY DU AN

## BUOC 1: SETUP BACKEND

1. Mo terminal, di chuyen vao folder backend:
```bash
cd backend
```

2. Cai dat dependencies:
```bash
npm install
```

3. Tao file .env tu template:
```bash
copy .env.example .env
```

4. Mo file .env va sua cac thong tin:
```
DATABASE_URL="postgresql://user:password@localhost:5432/sorcererxstreme"
JWT_SECRET="doi-thanh-secret-key-manh"
GEMINI_API_KEY="api-key-cua-ban"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Setup database:
```bash
npx prisma generate
npx prisma migrate dev
```

6. Chay backend server:
```bash
npm run dev
```

Backend se chay o: http://localhost:5000

---

## BUOC 2: SETUP FRONTEND

1. Mo terminal moi, di chuyen vao folder frontend:
```bash
cd frontend
```

2. Cai dat dependencies:
```bash
npm install
```

3. Tao file .env.local tu template:
```bash
copy .env.example .env.local
```

4. Mo file .env.local va kiem tra:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. Chay frontend server:
```bash
npm run dev
```

Frontend se chay o: http://localhost:3000

---

## KIEM TRA

1. Kiem tra backend: http://localhost:5000/health
   - Ket qua: {"status": "ok", "message": "Backend is running"}

2. Kiem tra frontend: http://localhost:3000
   - Se redirect den trang login

3. Thu dang ky tai khoan moi
4. Dang nhap va test cac chuc nang

---

## CAU TRUC DU AN SAU KHI TACH

```
AWS_tamlinhproject3/
├── backend/          Backend API (Express.js)
│   ├── src/          Source code
│   ├── prisma/       Database
│   └── .env          Cau hinh backend
│
├── frontend/         Frontend UI (Next.js)
│   ├── app/          Pages
│   ├── components/   Components
│   ├── lib/          Utils + API client
│   └── .env.local    Cau hinh frontend
│
└── SorcererXStreme/  Project goc (de tham khao)
```

---

## CAC LENH QUAN TRONG

### Backend
- npm run dev        Chay development
- npm run build      Build production
- npm start          Chay production
- npx prisma studio  Mo database GUI

### Frontend
- npm run dev        Chay development
- npm run build      Build production
- npm start          Chay production

---

## LOI THUONG GAP

1. Backend khong ket noi database:
   - Kiem tra PostgreSQL da chay chua
   - Kiem tra DATABASE_URL trong .env

2. Frontend khong ket noi backend:
   - Kiem tra backend da chay chua (port 5000)
   - Kiem tra NEXT_PUBLIC_API_URL trong .env.local

3. Loi Prisma Client:
   - Chay lai: npx prisma generate

4. Loi CORS:
   - Kiem tra FRONTEND_URL trong backend/.env

---

## DEPLOY LEN AWS

### Backend (chon 1):
- AWS EC2 (Node.js server)
- AWS ECS (Docker)
- AWS Lambda + API Gateway
- AWS Elastic Beanstalk

### Frontend (chon 1):
- AWS Amplify (de nhat)
- AWS S3 + CloudFront
- AWS EC2
- Vercel (recommend)

### Database:
- AWS RDS PostgreSQL

---

## NOTES

- Backend va Frontend PHAI chay dong thoi
- Khong xoa thu muc SorcererXStreme (de tham khao)
- Tat ca logic van giu nguyen, chi thay doi cau truc
- JWT token tu dong gui trong Authorization header
