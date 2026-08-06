# 💡 Idea Tracker

A full-stack application for tracking, organizing, and managing creative ideas with role-based access control and multi-strategy authentication.

---

## 🚀 Features

- **Multi-Strategy Authentication**: 
  - Local Email/Password authentication with `bcryptjs` hashing.
  - Stateless JSON Web Token (JWT) authorization for protected routes.
  - Google OAuth 2.0 & Facebook OAuth 2.0 integration (with automatic account linking).
- **Role-Based Access Control (RBAC)**:
  - `user`: Create, view, update, and delete their own ideas.
  - `admin`: System-wide access to manage all users and ideas.
- **Request Validation & Security**:
  - `express-validator` middleware for payload validation.
  - Environment variable validation using `Joi`.
  - CORS enabled and centralized error handling with `APIError` and `Winston` logging.

---

## 📁 Project Structure

```text
idea-tracker/
├── backend/
│   ├── src/
│   │   ├── config/          # Express, Mongoose, Passport, Environment & Winston configs
│   │   ├── controllers/     # Route controller logic & authentication middleware
│   │   ├── errors/          # Custom APIError class
│   │   ├── models/          # Mongoose models & schemas (Users, Ideas)
│   │   ├── routes/          # API route definitions
│   │   ├── scripts/         # CLI utility scripts
│   │   ├── utils/           # Helper functions & constants (JWT generator, Roles, RegEx)
│   │   ├── validators/      # express-validator request validation schemas
│   │   └── index.ts         # Application entry point
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Runtime & Language**: Node.js, TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (`passport-local`, `passport-jwt`, `passport-google-oauth20`, `passport-facebook`)
- **Validation**: Express-Validator, Joi
- **Logging & Utilities**: Winston, dotenv, bcryptjs

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (Local or MongoDB Atlas)

---

### Backend Setup

1. **Navigate to the `backend` directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create Environment Configuration**:
   Create a `.env` file in the `backend/` root directory (refer to `.env.example` if available):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/idea-tracker
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=1d

   # Optional OAuth Credentials
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   FACEBOOK_APP_ID=
   FACEBOOK_APP_SECRET=
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000`.

---

## 📜 Available NPM Scripts (Backend)

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the server in development mode using `tsx` with live reloading. |
| `npm run build` | Cleans `dist/` and compiles TypeScript to JavaScript (`tsc`). |
| `npm start` | Runs the compiled production build from `dist/index.js`. |
| `npm run cli` | Runs administrative CLI scripts (`tsx src/scripts/index.ts`). |

---

## 🔌 API Endpoints Summary

All API endpoints are prefixed with `/api`.

### 🧪 System Status
- `GET /api/test` - Health check & status endpoint.

### 👤 User & Authentication Routes (`/api/users`)
- `POST /api/users/register` - Register a new user account.
- `POST /api/users/login` - Authenticate user & receive JWT token.
- `GET /api/users/profile` - Get authenticated user profile *(Requires JWT)*.
- `GET /api/users` - Retrieve all users *(Admin Only)*.
- `DELETE /api/users/:id` - Delete a user *(Admin Only)*.

### 💡 Idea Routes (`/api/ideas`) *(All routes require JWT)*
- `POST /api/ideas` - Create a new idea.
- `GET /api/ideas` - Retrieve ideas *(Returns owned ideas for normal users; all ideas for Admin)*.
- `GET /api/ideas/:id` - Get details of a specific idea *(Owner or Admin)*.
- `PUT /api/ideas/:id` - Update an existing idea *(Owner or Admin)*.
- `DELETE /api/ideas/:id` - Delete an idea *(Owner or Admin)*.

---
