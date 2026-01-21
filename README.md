# 🍕 FoodieHub - Full-Stack Food Ordering Application

FoodieHub is a premium, role-based food ordering system built with a modern tech stack. It features a sophisticated Dark Mode UI, real-time feedback mechanisms, and robust backend validation.

> **Key Update**: The frontend has been completely refactored with a Glassmorphism design system, smooth animations, and enhanced user error handling.

## 🎯 Features

- **Role-Based Access Control (RBAC)**
  - **Admin**: Full system control, manage payment methods, view all orders globally.
  - **Manager**: Manage orders for their specific country/region.
  - **Member**: Browse menus and manage their cart (restricted from placing orders).

- **Location-Based Logic**
  - Users are restricted to viewing and ordering from restaurants in their own country (India/USA).
  - Admin users have global access.

- **Modern User Interface**
  - **Dark Mode**: Deep zinc/indigo palette with glassmorphism cards and elements.
  - **Interactive**: Smooth `Framer Motion` animations for page transitions and hover states.
  - **Responsive**: Fully optimized for mobile and desktop experiences.

- **Cart & Order Management**
  - Real-time cart updates with backend validation.
  - Smart error handling (e.g., country restrictions, quantity limits).
  - Self-healing cart state synchronization.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, React Hot Toast |
| **Backend** | NestJS, GraphQL, Prisma ORM, Class Validator |
| **Database** | PostgreSQL |
| **Auth** | JWT (JSON Web Tokens) with Custom Guards |

## 👥 Demo Users

Login with any of the following accounts (Password for all: `password123`):

| Name | Role | Country | Capabilities |
|------|------|---------|--------------|
| **Nick Fury** | Admin | Global | Full Access |
| **Captain Marvel** | Manager | India | Manage India Orders |
| **Captain America** | Manager | USA | Manage USA Orders |
| **Thanos** | Member | India | Browse/Cart (India) |
| **Travis** | Member | USA | Browse/Cart (USA) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database

### 1. Clone & Install
```bash
git clone https://github.com/atharvak-dev/Food-Order.git
cd Food-Order

# Install dependencies (Root/Backend)
cd backend
npm install

# Install dependencies (Frontend)
cd ../frontend
npm install
```

### 2. Configure Environment

**Backend** (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/food_ordering_db?schema=public"
JWT_SECRET="super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=4000
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### 3. Setup Database
```bash
cd backend
npx prisma generate
npx prisma db push
npm run db:seed  # Seeds demo users & restaurants
```

### 4. Run the Application

**Start Backend** (Terminal 1):
```bash
cd backend
npm run start:dev
```

**Start Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

## 🧪 Recent Improvements (v2.0)

- **UI Overhaul**: Replaced basic styles with a custom "Glass" design system.
- **Improved Error Handling**: `graphql-client` now properly extracts and displays deep backend validation errors (fixing the "Bad Request" silent failure).
- **Backend Fix**: Fixed `CreateOrderInput` DTO validation to correctly handle nested `items` array.
- **Cart Logic**: Added mechanism to automatically refetch/sync cart if backend state (Cancelled/Placed) mismatches frontend state.

## 📜 License
This project was created for the Slooze Take Home Challenge.
