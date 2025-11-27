🍽️ Food Recipe Dashboard

A full-stack Food Recipe Dashboard built using:

Next.js 15+ (App Router) — Frontend

Node.js + Express — Backend API

PostgreSQL + Drizzle ORM — Database

Tailwind CSS

This project allows users to view, search, filter, paginate, and manage food recipes with a seamless both SSR and CSR powered frontend and a clean REST API backend.

🚀 Features
🖥️ Frontend (Next.js)

Server-Side Rendering (SSR) for recipe listing

Search recipes

Filter by category.

Pagination with query params

Column selection + localStorage-based preferences

Fully responsive UI using Tailwind

Error & loading states

Clean architecture with reusable components

🛠️ Backend (Node + Express + PostgreSQL)

REST API for fetching recipes

Supports:

Search

Filters

Pagination

Drizzle ORM for schema + queries

CORS enabled

Environment-based configuration

Production-ready (Render compatible)

JavaScript backend (no TS required)

📁 Project Structure
Food-Recipe-Dashboard/
│── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── recipes/
│   ├── package.json
│   ├── next.config.js
│   └── README.md
│
│── backend/
│   ├── db/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│
└── README.md  (this file)

⚙️ Installation & Setup (Full-Stack)

You can run both frontend and backend locally.

🛠️ Backend Setup (Node.js + PostgreSQL)
1️⃣ Navigate to backend folder
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env
PORT=8000
DATABASE_URL=postgres://user:password@host:5432/fooddb
CORS_ORIGIN=http://localhost:3000

4️⃣ Push Drizzle migrations
npx drizzle-kit push

5️⃣ Start server
npm start


Backend runs at:

http://localhost:8000

📡 Backend API Documentation
GET /recipes

Fetch recipes with full query support.

Query Params:
Param	Description
page	Pagination (default: 1)
limit	Items per page
search	Search by name
category	Filter by category
Example:
GET /recipes?page=2&limit=20&search=pasta

🖥️ Frontend Setup (Next.js)
1️⃣ Navigate to frontend
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api/

4️⃣ Start development server
npm run dev


Frontend runs at:

http://localhost:3000

🍳 Frontend Features Explained
🔎 1. Search

Search updates URL query params without full reload.

🧪 2. Filters

Supports filtering by:

category

limit


♻️ 3. SSR Fetching

The page loads data using:

export const dynamic = "force-dynamic";


Ensures fresh server-rendered recipes every time.

🧩 4. Column Selector with localStorage

User can hide/show columns:

stored in browser

instantly applied to table

recipe detail using CSR.

💡 Deployment
🚀 Backend (Render)

Build command → npm install

Start command → npm start

Add env variables in Dashboard

🌐 Frontend (Vercel)

Build command → npm run build

Output → .next

Add env:

NEXT_PUBLIC_API_URL=https://your-backend-render-url.com

Schema:
import { serial, text, integer, timestamp, pgTable } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ingredients: text("ingredients").notNull(),
  steps: text("steps").notNull(),
  imageUrl: text("image_url"),
  macrosProtein: integer("macros_protein").notNull(),
  macrosCarbs: integer("macros_carbs").notNull(),
  macrosFats: integer("macros_fats").notNull(),
  macrosCalories: integer("macros_calories").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});




🐞 Troubleshooting
❗ "Cannot find module dist/index.js"

Backend uses JavaScript, no dist folder needed.

❗ "ts-node not recognized"

Removed — backend uses pure JS.

❗ Pagination or filter not working

Ensure:

router.push(`/recipes?${params.toString()}`);

❗ Render not detecting file

Ensure main file is:

"main": "index.js"

🤝 Contributing

Pull requests are welcome.

If adding new API routes:

Document them

Follow existing folder structure


This monorepo contains:

Fully working backend

Fully SSR-enabled Next.js frontend

Drizzle ORM for database

Production-ready deployment guides

