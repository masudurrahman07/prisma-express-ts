# shoply

Simple e-commerce demo using Prisma + Express + TypeScript (backend) and React + Vite + TypeScript (frontend).

## Project structure

- backend/: Express + TypeScript backend with Prisma ORM.
- frontend/: React + Vite TypeScript frontend.

## Backend setup

1. Copy or create a `.env` file in `backend/` with `DATABASE_URL` and optionally `FRONTEND_ORIGIN`.
2. Install dependencies: `cd backend && npm install`
3. Generate Prisma client: `cd backend && npx prisma generate` (may fail on Windows with EPERM due to binary file lock; if it fails, retry once or run after reboot)
4. Build: `cd backend && npm run build`
5. Start dev: `cd backend && npm run dev` or run `node dist/server.js` after build.

## Seeding the database

Run the safe seed script (idempotent/upsert):

```
cd backend
npm run seed
```

This will create demo categories and products if they do not already exist.

## Frontend setup

1. Install dependencies: `cd frontend && npm install`
2. Configure environment (optional): create `.env` in `frontend/` and set `VITE_API_BASE_URL` if backend is not at `http://localhost:5000`.
3. Build: `cd frontend && npm run build`
4. Dev: `cd frontend && npm run dev`

## Notes

- Do not run destructive Prisma commands (migrate reset) on production data.
- The seed script uses `upsert` to avoid creating duplicate records.
- If Prisma client generation fails on Windows due to a locked binary, try closing Node processes, disabling antivirus, or rebooting and retrying `npx prisma generate` once.
