# Backend API Documentation

Base paths:
- `POST /api/auth/*` — auth endpoints
- `GET|POST|PATCH|DELETE /api/v1/*` — main resource endpoints

> Note: auth routes are also mounted under `/api/v1/auth/*` in the current application.

## Response Format
All endpoints return JSON with:
```json
{
  "success": true,
  "message": "...",
  "data": ...
}
```

---

## Auth

### POST /api/auth/register
- Purpose: register a new user and issue an auth cookie
- Authentication: no
- Body:
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- Response example:
```json
{
  "success": true,
  "message": "",
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "CUSTOMER",
    "age": null,
    "createdAt": "...",
    "updatedAt": "...",
    "isDeleted": false
  }
}
```
- Status codes: `201`, `400`, `409`, `500`

### POST /api/auth/login
- Purpose: authenticate and set HTTP-only cookie
- Authentication: no
- Body:
  - `email` (string, required)
  - `password` (string, required)
- Response example:
```json
{
  "success": true,
  "message": "",
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "CUSTOMER",
    "age": null,
    "createdAt": "...",
    "updatedAt": "...",
    "isDeleted": false
  }
}
```
- Status codes: `200`, `400`, `401`, `500`

### POST /api/auth/logout
- Purpose: clear auth cookie
- Authentication: no
- Body: none
- Response example:
```json
{
  "success": true,
  "message": "",
  "data": { "ok": true }
}
```
- Status codes: `200`, `500`

### GET /api/auth/me
- Purpose: return current authenticated user
- Authentication: yes (JWT cookie)
- Body: none
- Response example:
```json
{
  "success": true,
  "message": "",
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "CUSTOMER",
    "age": null,
    "createdAt": "..."
  }
}
```
- Status codes: `200`, `401`, `500`

---

## Users

### POST /api/v1/users
- Purpose: create a user record (admin-only)
- Authentication: yes
- Body:
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `role` (CUSTOMER or ADMIN)
  - `age` (number)
- Response example:
```json
{
  "success": true,
  "message": "User created",
  "data": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "CUSTOMER",
    "age": 30,
    "createdAt": "...",
    "updatedAt": "...",
    "isDeleted": false
  }
}
```
- Status codes: `201`, `400`, `401`, `403`, `409`, `500`

### GET /api/v1/users
- Purpose: list non-deleted users
- Authentication: no
- Response example:
```json
{
  "success": true,
  "message": "Users retrieved",
  "data": [ ... ]
}
```
- Status codes: `200`, `500`

### GET /api/v1/users/:id
- Purpose: fetch user by ID
- Authentication: no
- Response example:
```json
{
  "success": true,
  "message": "User retrieved",
  "data": { ... }
}
```
- Status codes: `200`, `404`, `500`

### PATCH /api/v1/users/:id
- Purpose: update a user
- Authentication: yes
- Body: any user fields except `email` is ignored for update
- Response example:
```json
{
  "success": true,
  "message": "User updated",
  "data": { ... }
}
```
- Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### DELETE /api/v1/users/:id
- Purpose: soft delete a user by setting `isDeleted`
- Authentication: yes
- Response example:
```json
{
  "success": true,
  "message": "User soft deleted",
  "data": { ... }
}
```
- Status codes: `200`, `401`, `403`, `404`, `500`

---

## Categories

### POST /api/v1/categories
- Purpose: create a new category
- Authentication: yes
- Body:
  - `name` (string, required)
  - `description` (string)
- Response example:
```json
{
  "success": true,
  "message": "Category created",
  "data": { ... }
}
```
- Status codes: `201`, `400`, `401`, `403`, `500`

### GET /api/v1/categories
- Purpose: list non-deleted categories
- Authentication: no
- Response example:
```json
{
  "success": true,
  "message": "Categories retrieved",
  "data": [ ... ]
}
```
- Status codes: `200`, `500`

### GET /api/v1/categories/:id
- Purpose: fetch a category by ID
- Authentication: no
- Status codes: `200`, `404`, `500`

### PATCH /api/v1/categories/:id
- Purpose: update a category
- Authentication: yes
- Body: updated `name` or `description`
- Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### DELETE /api/v1/categories/:id
- Purpose: soft delete a category
- Authentication: yes
- Status codes: `200`, `401`, `403`, `404`, `500`

---

## Products

### POST /api/v1/products
- Purpose: create a new product
- Authentication: yes
- Body:
  - `title` (string, required)
  - `price` (number, required)
  - `description` (string)
  - `sku` (string)
  - `currency` (string)
  - `categoryId` (string)
- Status codes: `201`, `400`, `401`, `403`, `500`

### GET /api/v1/products
- Purpose: list non-deleted products
- Authentication: no
- Response includes product category data
- Status codes: `200`, `500`

### GET /api/v1/products/:id
- Purpose: fetch a product by ID
- Authentication: no
- Status codes: `200`, `404`, `500`

### PATCH /api/v1/products/:id
- Purpose: update a product
- Authentication: yes
- Body: any fields to change; use `categoryId` to connect/disconnect category
- Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### DELETE /api/v1/products/:id
- Purpose: soft delete a product
- Authentication: yes
- Status codes: `200`, `401`, `403`, `404`, `500`

---

## Reviews

### POST /api/v1/reviews
- Purpose: create a review for a product
- Authentication: yes
- Body:
  - `productId` (string, required)
  - `content` (string, required)
  - `rating` (number, required, 1-5)
- Status codes: `201`, `400`, `401`, `404`, `500`

### GET /api/v1/reviews
- Purpose: list non-deleted reviews
- Authentication: no
- Includes user and product data
- Status codes: `200`, `500`

### GET /api/v1/reviews/:id
- Purpose: fetch a review by ID
- Authentication: no
- Status codes: `200`, `404`, `500`

### PATCH /api/v1/reviews/:id
- Purpose: update a review
- Authentication: yes
- Body: `content` and/or `rating`
- Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### DELETE /api/v1/reviews/:id
- Purpose: soft delete a review
- Authentication: yes
- Status codes: `200`, `401`, `403`, `404`, `500`

---

## Orders

### POST /api/v1/orders
- Purpose: create a new order
- Authentication: yes
- Body:
  - `items` (array, required)
    - each item: `productId` (string) and optional `quantity` (number)
- Status codes: `201`, `400`, `401`, `404`, `500`

### GET /api/v1/orders
- Purpose: list orders
- Authentication: yes
- Admins see all orders; other users see their own orders
- Status codes: `200`, `401`, `500`

### GET /api/v1/orders/:id
- Purpose: fetch an order by ID
- Authentication: yes
- Admins may view any order; users may view their own
- Status codes: `200`, `401`, `403`, `404`, `500`

### PATCH /api/v1/orders/:id
- Purpose: update order status
- Authentication: yes
- Body:
  - `status` (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)
- Admin only
- Status codes: `200`, `400`, `401`, `403`, `404`, `500`

### DELETE /api/v1/orders/:id
- Purpose: soft delete an order
- Authentication: yes
- Admins can delete any order; users can delete their own
- Status codes: `200`, `401`, `403`, `404`, `500`
