# 🍕 FoodieHub - Full-Stack Food Ordering Application with RBAC

A complete full-stack food ordering application with role-based access control (RBAC) and location-based access management.

## 🎯 Features

- **Role-Based Access Control (RBAC)**
  - Admin: Full access to all features and countries
  - Manager: Place/cancel orders, view country-specific data
  - Member: View and create cart (cannot checkout)

- **Location-Based Filtering**
  - India users see only India restaurants/orders
  - America users see only America restaurants/orders
  - Admin sees all countries

- **Complete Order Flow**
  - Browse restaurants and menus
  - Add items to cart
  - Checkout and place orders (Manager/Admin)
  - View order history

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, Apollo Client |
| **Backend** | NestJS, GraphQL, Prisma ORM |
| **Database** | PostgreSQL |
| **Auth** | JWT (JSON Web Tokens) |

## 👥 Demo Users

| Name | Email | Role | Country | Password |
|------|-------|------|---------|----------|
| Nick Fury | nick@avengers.com | Admin | Global | password123 |
| Captain Marvel | marvel@avengers.com | Manager | India | password123 |
| Captain America | steve@avengers.com | Manager | America | password123 |
| Thanos | thanos@avengers.com | Member | India | password123 |
| Thor | thor@avengers.com | Member | India | password123 |
| Travis | travis@avengers.com | Member | America | password123 |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd fullstack-challenge-main

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

**Backend** (`backend/.env`):
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/food_ordering_db?schema=public"
JWT_SECRET="super-secret-jwt-key-change-in-production"
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

# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Seed with demo data
npm run db:seed
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

### 5. Access the App

- **Frontend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000/graphql

## 📁 Project Structure

```
fullstack-challenge-main/
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication (JWT, guards, decorators)
│   │   ├── restaurants/   # Restaurant & menu management
│   │   ├── orders/        # Order management with RBAC
│   │   ├── payments/      # Payment methods (Admin only)
│   │   └── prisma/        # Database service
│   └── prisma/
│       ├── schema.prisma  # Database schema
│       └── seed.ts        # Demo data
└── frontend/
    └── src/
        ├── app/           # Next.js App Router pages
        ├── components/    # UI components
        ├── context/       # Auth & Cart providers
        └── lib/           # Apollo client, GraphQL, types
```

## 🔐 RBAC Matrix

| Feature | Admin | Manager | Member |
|---------|:-----:|:-------:|:------:|
| View restaurants & menu items | ✅ | ✅ | ✅ |
| Create order (add to cart) | ✅ | ✅ | ✅ |
| Place order (checkout) | ✅ | ✅ | ❌ |
| Cancel order | ✅ | ✅ | ❌ |
| Manage payment methods | ✅ | ❌ | ❌ |
| View all countries | ✅ | ❌ | ❌ |

## 📡 API Endpoints

### GraphQL Queries
- `restaurants` - List restaurants (filtered by country)
- `restaurant(id)` - Get restaurant with menu
- `orders` - List orders (filtered by role/country)
- `currentCart` - Get current pending order
- `paymentMethods` - List payment methods (Admin)

### GraphQL Mutations
- `login` - Authenticate user
- `createOrder` - Create new cart
- `addItemToOrder` - Add item to cart
- `updateOrderItemQuantity` - Update cart item
- `placeOrder` - Checkout (Manager/Admin)
- `cancelOrder` - Cancel order (Manager/Admin)
- `createPaymentMethod` - Add payment (Admin)
- `deletePaymentMethod` - Remove payment (Admin)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Build check
npm run build
```

## 🌐 Deployment

### Backend (Railway/Render)
1. Connect PostgreSQL database
2. Set environment variables
3. Deploy with `npm run start:prod`

### Frontend (Vercel)
1. Import GitHub repository
2. Set `NEXT_PUBLIC_GRAPHQL_URL` to backend URL
3. Deploy

## 📜 License

This project was created for the Slooze Take Home Challenge.

---

Built with ❤️ using NestJS, Next.js, and GraphQL
# Food-Order
