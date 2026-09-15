# Ansari Furniture — Premium Contemporary Furniture E-Commerce

A full-stack MERN (MongoDB, Express, React, Node.js) luxury furniture e-commerce platform with an editorial design language inspired by high-end interior architecture brands.

## ✨ Features

### Customer Experience
- **Editorial Homepage** — Hero carousel, shop-by-room vignettes, featured collection panels, bestseller grid, testimonials, journal articles, newsletter
- **Product Catalog** — Multi-faceted filtering (room, category, material, price), real-time search, responsive grid
- **Product Details** — Image gallery, color swatch selection, customer reviews with ratings, related products
- **Shopping Cart** — Slide-out drawer, promo codes (`WELCOME10`, `LUXURY2026`), free shipping threshold tracker
- **Multi-Step Checkout** — Shipping address form → Payment method selection → Order confirmation
- **User Accounts** — Order history with status tracking, saved addresses, wishlist management, profile editing
- **JWT Authentication** — Secure login/register with bcrypt password hashing

### Admin Dashboard
- **Analytics Overview** — Revenue, orders, products, customers KPIs with low-stock watchlist
- **Product Management** — Create, edit, delete products with image URLs
- **Order Management** — View all orders, update fulfillment status (Processing → Confirmed → Shipped → Delivered)
- **Customer Directory** — View all registered users and their roles

### Design System
- **Typography** — Playfair Display (editorial serif), Plus Jakarta Sans (clean UI sans), Caveat (handwritten accents)
- **Colors** — Warm ivory `#FAF7F2`, dark forest `#1C251E`, wood `#7B5E43`, terracotta `#B86B49`
- **Animations** — Framer Motion page transitions, hover effects, carousel slides, toast notifications

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite 8, Tailwind CSS 3, Framer Motion, Lucide Icons, Axios |
| Backend | Node.js, Express.js, Mongoose |
| Database | MongoDB 8 |
| Auth | JWT, bcryptjs |
| State | React Context API (Auth, Cart, Wishlist, Toast) |

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB running on `localhost:27017`

### 1. Install Dependencies

```bash
# Frontend
cd Anzari_Furniture
npm install

# Backend
cd server
npm install
```

### 2. Configure Environment

```bash
cp server/.env.example server/.env
# Edit server/.env with your JWT secret
```

### 3. Seed the Database

```bash
cd server
node seed.js
```

This creates:
- **Admin user**: `admin@ansarifurniture.com` / `admin123`
- **Demo customer**: `aanya@example.com` / `customer123`
- **12 luxury furniture products** with editorial descriptions
- **Sample reviews, orders, and newsletter subscriptions**

### 4. Start Development Servers

```bash
# Terminal 1 — Backend API (port 5000)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd Anzari_Furniture
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
Anzari_Furniture/
├── index.html                # Entry HTML with Google Fonts
├── tailwind.config.js        # Luxury design tokens
├── postcss.config.js
├── src/
│   ├── main.jsx              # App entry with context providers
│   ├── App.jsx               # Router with all page routes
│   ├── index.css             # Tailwind layers & custom styles
│   ├── services/api.js       # Axios client with JWT interceptor
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── WishlistContext.jsx
│   │   └── ToastContext.jsx
│   ├── components/
│   │   ├── common/           # Navbar, Footer, ProductCard, QuickViewModal, SearchModal, VideoModal
│   │   ├── cart/             # CartDrawer
│   │   └── home/             # HeroSection, TrustBenefitsBar, ShopByRoom, FeaturedCollection, etc.
│   └── pages/
│       ├── HomePage.jsx
│       ├── ShopPage.jsx
│       ├── ProductDetailPage.jsx
│       ├── CartPage.jsx
│       ├── CheckoutPage.jsx
│       ├── AuthPage.jsx
│       ├── AccountPage.jsx
│       ├── CollectionsPage.jsx
│       ├── RoomsPage.jsx
│       ├── AboutPage.jsx
│       ├── InspirationPage.jsx
│       └── AdminDashboardPage.jsx
├── server/
│   ├── index.js              # Express server entry
│   ├── seed.js               # Database seeder
│   ├── .env                  # Environment variables
│   ├── config/db.js          # MongoDB connection
│   ├── middleware/auth.js     # JWT & admin guards
│   ├── models/               # User, Product, Order, Review, Newsletter, Category, Collection
│   ├── controllers/          # authController, productController, orderController, reviewController, adminController, newsletterController
│   └── routes/               # authRoutes, productRoutes, orderRoutes, reviewRoutes, adminRoutes, newsletterRoutes
```

## 🔐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login & get JWT |
| GET | `/api/auth/me` | ✓ | Get current user |
| PUT | `/api/auth/profile` | ✓ | Update profile |
| POST | `/api/auth/wishlist/toggle` | ✓ | Toggle wishlist item |
| GET | `/api/products` | — | List/filter/search products |
| GET | `/api/products/featured` | — | Featured products |
| GET | `/api/products/bestsellers` | — | Bestseller products |
| GET | `/api/products/meta/filters` | — | Filter metadata |
| GET | `/api/products/:identifier` | — | Product by slug or ID |
| POST | `/api/orders` | Optional | Create order |
| GET | `/api/orders/myorders` | ✓ | User's order history |
| GET | `/api/reviews/product/:id` | — | Product reviews |
| POST | `/api/reviews` | Optional | Submit review |
| POST | `/api/newsletter/subscribe` | — | Newsletter signup |
| GET | `/api/admin/*` | Admin | Analytics, product CRUD, orders, users |

## 📝 License

© 2026 Ansari Furniture. All rights reserved. This is a demonstration project.
