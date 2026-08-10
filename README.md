# Shoply

Shoply is a full-stack e-commerce application built with Express.js, TypeScript, Prisma ORM, PostgreSQL, and React.

## Features

- **User Authentication**: Secure user registration, login, logout, and profile retrieval using JWT stored in HTTP-only cookies and password hashing with bcrypt.
- **Product & Category Management**: Dynamic catalog browsing, product details view, and category filtering.
- **Cart & Order Processing**: Interactive shopping cart state, order creation, order history listing, and order status tracking.
- **Reviews & Ratings**: Customer reviews and rating system for products.
- **Role-Based Access Control**: Differentiated permissions for Customer and Admin roles across endpoints.
- **Database Soft Delete**: Safe data preservation with soft delete flag (`isDeleted`) across key models.

## Tech Stack

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors
- cookie-parser

### Frontend
- React
- TypeScript
- React Router DOM
- Vite
- Framer Motion
- Lucide React & React Icons
- SweetAlert2

## Project Structure

```
prisma-express-ts/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── API.md
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   ├── package.json
│   └── vite.config.ts
├── README.md
└── .env
```

## Installation

### 1. Clone repository
```bash
git clone https://github.com/masudurrahman07/prisma-express-ts.git
cd prisma-express-ts
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Configure .env
Create `.env` inside the `backend` directory (or root directory):
```env
DATABASE_URL=
PORT=
JWT_SECRET=
JWT_EXPIRES_IN=
AUTH_COOKIE_NAME=
FRONTEND_ORIGIN=
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run migrations if required
```bash
npx prisma db push
# or
npx prisma migrate dev
```

### 6. Start backend
```bash
npm run dev
# or build & start production bundle
npm run build
npm start
```

### 7. Install frontend dependencies
Open a new terminal window:
```bash
cd frontend
npm install
```

Configure `.env` in `frontend`:
```env
VITE_API_BASE_URL=
```

### 8. Start frontend
```bash
npm run dev
```

## Environment Variables

The required environment variable names are:

### Backend (`backend/.env`)
- `DATABASE_URL`
- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `AUTH_COOKIE_NAME`
- `FRONTEND_ORIGIN`

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL`

## API Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/` | Root server status check | No |
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login & cookie set | No |
| POST | `/api/auth/logout` | User logout & cookie clear | No |
| GET | `/api/auth/me` | Fetch current user profile | Yes |
| GET | `/api/v1/products` | Get list of all products | No |
| GET | `/api/v1/products/:id` | Get product details by ID | No |
| POST | `/api/v1/products` | Create product (Admin) | Yes |
| PATCH | `/api/v1/products/:id` | Update product (Admin) | Yes |
| DELETE | `/api/v1/products/:id` | Soft delete product (Admin) | Yes |
| GET | `/api/v1/categories` | Get list of categories | No |
| GET | `/api/v1/categories/:id` | Get category details by ID | No |
| POST | `/api/v1/categories` | Create category (Admin) | Yes |
| PATCH | `/api/v1/categories/:id` | Update category (Admin) | Yes |
| DELETE | `/api/v1/categories/:id` | Soft delete category (Admin) | Yes |
| GET | `/api/v1/users` | Get user list | No |
| GET | `/api/v1/users/:id` | Get user details by ID | No |
| POST | `/api/v1/users` | Create user (Admin) | Yes |
| PATCH | `/api/v1/users/:id` | Update user profile | Yes |
| DELETE | `/api/v1/users/:id` | Soft delete user | Yes |
| GET | `/api/v1/reviews` | Get list of reviews | No |
| GET | `/api/v1/reviews/:id` | Get review by ID | No |
| POST | `/api/v1/reviews` | Submit product review | Yes |
| PATCH | `/api/v1/reviews/:id` | Update review | Yes |
| DELETE | `/api/v1/reviews/:id` | Soft delete review | Yes |
| GET | `/api/v1/orders` | List orders (User/Admin) | Yes |
| GET | `/api/v1/orders/:id` | Get order details | Yes |
| POST | `/api/v1/orders` | Place a new order | Yes |
| PATCH | `/api/v1/orders/:id` | Update order status (Admin) | Yes |
| DELETE | `/api/v1/orders/:id` | Soft delete order | Yes |

## Frontend

To run the React frontend application locally:
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server runs at `http://localhost:5173`.

## Prisma Studio

To inspect database records interactively via Prisma Studio, run the following command inside the `backend` directory:
```bash
cd backend
npx prisma studio
```

## API Documentation

Complete API documentation with request bodies, parameters, and status codes can be found in `backend/API.md`.

## Repository

GitHub Repository: https://github.com/masudurrahman07/prisma-express-ts
