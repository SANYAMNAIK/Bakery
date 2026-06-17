# Bakery Shop Management System

A full-stack bakery management and ordering system with a customer storefront, admin dashboard, shopping cart, product management, order management, invoices, and MongoDB Atlas database connectivity.

Built using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for the database.

---

## Features

- User authentication with login and register
- Admin authentication and protected admin dashboard
- Product management with add, update, view, and delete functionality
- Category management with add and delete functionality
- Customer management with customer delete option
- Shopping cart with quantity and total calculation
- Order placement and order tracking
- Invoice page for customer orders
- Admin profile with editable details and avatar upload
- Responsive user interface for user and admin panels
- MongoDB Atlas database integration

---

## Tech Stack

**Frontend**

- React.js
- JavaScript
- HTML5
- CSS3
- SCSS
- Bootstrap

**Backend**

- Node.js
- Express.js
- JSON Web Token authentication
- bcrypt.js

**Database**

- MongoDB Atlas

---

## Project Structure

```text
Bakery/
├── Admin/      # Admin dashboard frontend
├── User/       # Customer storefront frontend
├── server/     # Node.js and Express backend API
├── .gitignore
└── README.md
```

---

## Ports

| App | Port | URL |
| --- | --- | --- |
| User Frontend | 2000 | `http://localhost:2000` |
| Admin Frontend | 3000 | `http://localhost:3000` |
| Backend Server | 5000 | `http://localhost:5000` |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/SANYAMNAIK/Bakery.git
cd Bakery
```

Install backend dependencies:

```bash
cd server
npm install
```

Install user frontend dependencies:

```bash
cd ../User
npm install
```

Install admin frontend dependencies:

```bash
cd ../Admin
npm install
```

---

## Environment Setup

Create environment files from the examples:

```bash
copy server\.env.example server\.env
copy User\.env.example User\.env
copy Admin\.env.example Admin\.env
```

Update `server/.env` with your MongoDB Atlas connection string and JWT secret.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

Real `.env` files are ignored by Git and should not be uploaded to GitHub.

---

## Run The Project

Open three terminals.

**Terminal 1: Start Backend**

```bash
cd server
npm start
```

**Terminal 2: Start Admin Panel**

```bash
cd Admin
npm start
```

Admin panel:

```text
http://localhost:3000
```

**Terminal 3: Start User Website**

```bash
cd User
npm start
```

User website:

```text
http://localhost:2000
```

---

## Admin Login

```text
Username: admin
Password: admin123
```

---

## Available Scripts

In each frontend folder:

```bash
npm start
npm run build
```

In the backend folder:

```bash
npm start
```

---

## Screens

- User home page
- Product menu page
- Cart page
- Order page
- Invoice page
- Admin dashboard
- Product management page
- Category management page
- Customer management page
- Admin profile page

---

## Notes

- Run the backend first before opening the admin or user frontend.
- The project uses MongoDB Atlas, so database access depends on a valid connection string in `server/.env`.
- `node_modules`, build folders, and real environment files are intentionally ignored.

