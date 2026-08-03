# Incident Tracker

A modern, full-stack incident management application built with NestJS, React, and Prisma. This project allows users to track, manage, and prioritize technical or operational incidents.

## 🚀 Features

- **Incident Management**: Create, view, update, and delete incidents.
- **Validation**: Strict input validation using `class-validator` and `zod`.
- **Type Safety**: End-to-end type safety with TypeScript and Prisma.
- **API Documentation**: Interactive Swagger UI for backend testing.
- **Modern UI**: Built with React 19, Tailwind CSS 4, and React Query 5.
- **Database**: PostgreSQL integration with Prisma 7.

## 🏗 Architecture

The project is structured as a monorepo-style setup:

- `/backend`: NestJS application (REST API).
- `/frontend`: React + Vite application.
- `docker-compose.yml`: Database orchestration.

## 🛠 Tech Stack

### Backend

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Validation**: `class-validator`, `class-transformer`
- **Documentation**: Swagger/OpenAPI

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **State Management**: [React Query 5](https://tanstack.com/query)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Form Handling**: React Hook Form + Zod

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose

### 1. Database Setup

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (Create a `.env` file):
   ```env
   DATABASE_URL="postgresql://user_admin:password123@localhost:5432/incident_tracker?schema=public"
   JWT_SECRET="change-me-to-a-long-random-value"
   ```
4. Run Prisma migrations and generate client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
5. Start the development server:
   ```bash
   npm run start:dev
   ```
   API will be available at: `http://localhost:3000`
   Swagger UI: `http://localhost:3000/api`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will be available at: `http://localhost:5173`

## 📂 Project Structure

```text
.
├── backend                 # NestJS Source
│   ├── prisma              # Database schema & migrations
│   ├── src                 # Application logic
│   └── generated           # Auto-generated Prisma client
├── frontend                # React Source
│   ├── src                 # UI Components, Hooks, Stores
│   └── public              # Static assets
└── docker-compose.yml      # Infrastructure
```
