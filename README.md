# Full-Stack Developer Portfolio & Control Center (CMS)

A professional, premium, high-performance developer portfolio featuring a live scrollable portfolio SPA and a secure Admin Control Center (CMS) to manage your projects, skills, experience timeline, certifications, and read visitor contact submissions.

## Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS v4 (using native `@tailwindcss/vite` compiler integration), Font Awesome CDN.
*   **Backend**: Node.js, Express.js (RESTful API).
*   **Database**: PostgreSQL (Neon Cloud DB), `pg` connection pool.
*   **Authentication**: JSON Web Tokens (JWT) & `bcryptjs` password hashing.
*   **Asset Uploads**: `multer` configuration serving static uploads locally.
*   **Messaging**: `nodemailer` SMTP email dispatcher alerts.

---

## Key Features

1.  **Premium Glassmorphic Design**: A modern dark-themed UI featuring custom typography, CSS glow elements, sticky frosted-glass header, and responsive flex grids.
2.  **Interactive Portfolio**: Live timeline rendering, automated technical skill bars, project details modal highlighting architecture achievements, and credential grids.
3.  **Secure Admin Portal**:
    *   JWT authentication guarding edit/creation endpoints.
    *   Full CRUD controls (Add, Edit, Delete) for projects, experience timeline nodes, skills, and certifications.
    *   Supports local project file uploading (images, videos, PDFs) through the admin panel.
4.  **Inbound Inquiries Center**: Form validation sending contact form entries straight to your PostgreSQL database, alongside optional nodemailer alerts and an admin inbox viewer.

---

## Directory Structure

```
portfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection pool (db.js)
│   │   ├── middleware/      # JWT validation (auth.js), File uploads (upload.js)
│   │   ├── controllers/     # API request logic (auth, projects, skills, exp, certs, messages)
│   │   ├── routes/          # Express route routes (api.js)
│   │   └── db/              # SQL schema script and DB seeder
│   │   └── app.js           # Server application
│   ├── .env                 # Port, DATABASE_URL, and JWT_SECRET
│   └── package.json         # Backend pnpm config
└── frontend/
    ├── src/
    │   ├── components/      # UI Layouts (Navbar, Hero, About, Skills, Timeline, Modals)
    │   ├── pages/           # Admin dashboard CRUD portal
    │   ├── context/         # Auth token context provider
    │   ├── utils/           # REST API fetch helper client
    │   ├── index.css        # Tailwind base imports & custom styles
    │   └── App.jsx          # Route controller
    ├── index.html           # Main DOM page loading Inter font and Font Awesome CDN
    ├── vite.config.js       # Native Tailwind v4 Vite compilation plugin configuration
    └── package.json         # Frontend pnpm config
```

---

## Installation & Setup

### Prerequisite
Ensure you have `pnpm` installed on your machine.

### 1. Database Connection
The backend requires a PostgreSQL database. Set the connection string `DATABASE_URL` in `backend/.env`.

```env
PORT=5000
DATABASE_URL=postgresql://username:password@your-database-host.neon.tech/neondb?sslmode=require
JWT_SECRET=your_jwt_secret_key
```

### 2. Seed Database
Run the seed script in the backend directory to apply the schema and insert all initial CV content:
```bash
cd backend
pnpm run seed
```

### 3. Startup

**Start Backend API Server**:
```bash
cd backend
pnpm run dev
```
*Server runs on [http://localhost:5000](http://localhost:5000)*

**Start Frontend Client Server**:
```bash
cd frontend
pnpm run dev
```
*Client runs on [http://localhost:5173](http://localhost:5173)*

### 4. Admin Portal Login
Navigate to `http://localhost:5173/` and click **Admin Portal** in the navigation header.
*   **Default Username**: `ashraf`
*   **Default Password**: `ashraf_portfolio_secure`
*(Password can be customized by changing the hashing input in `backend/src/db/seed.js` or updating the table record).*
