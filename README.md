# Texibooking

A full-stack taxi booking and ride management system with a customer booking website, vendor/driver dashboard, admin dashboard, ride management, live ride tracking, KYC document management, payments, invoices, support tickets, and MongoDB database connectivity.

Built using React.js for the frontend, Node.js and Express.js for the backend, MongoDB for the database, Socket.IO for real-time updates, and Redis for active driver presence.

## Features

- User authentication with login, register, social login, and session expiry handling
- Vendor/driver authentication and protected vendor dashboard
- Admin authentication and protected admin dashboard
- Taxi ride booking with pickup and drop location selection
- Vehicle selection with fare estimate and ride confirmation
- Ride request management for vendors/drivers
- Live ride tracking with driver location updates
- Ride status flow including assigned, arriving, ongoing, completed, and cancelled
- User ride history and invoice generation
- Vendor vehicle management with add, view, update, and delete functionality
- Vendor KYC document upload and status tracking
- Admin KYC review and approval workflow
- Admin management for users, drivers, rides, payments, reviews, support, and settings
- Wallet, payment, refund, and split fare support
- Razorpay payment integration
- Contact form and support ticket management
- Chatbot support sessions for users
- Redis-based active driver presence and dispatch support
- Responsive user interface for user, vendor, and admin panels
- MongoDB database integration

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- React Router
- Axios
- Leaflet
- React Leaflet
- Socket.IO Client
- React Icons

### Backend

- Node.js
- Express.js
- JSON Web Token authentication
- bcrypt.js
- Socket.IO
- Redis
- Cloudinary
- Razorpay
- Nodemailer
- Multer

### Database

- MongoDB
- Mongoose

## Project Structure

```text
Texibooking/
├── Backend/        # Node.js and Express backend API
├── texiBooking/    # React.js frontend application
├── .gitignore
└── README.md
```

## Ports

| App | Port | URL |
| --- | --- | --- |
| Frontend | 5173 | http://localhost:5173 |
| Backend Server | 3003 | http://localhost:3003 |
| Redis | 6379 | localhost:6379 |

## Installation

Clone the repository:

```bash
git clone https://github.com/SANYAMNAIK/Texibooking.git
cd Texibooking
```

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../texiBooking
npm install
```

## Environment Setup

Create environment files from the examples:

```bash
copy Backend\.env.example Backend\.env
copy texiBooking\.env.example texiBooking\.env
```

Update `Backend/.env` with your MongoDB connection string, JWT secret, email settings, Cloudinary keys, Razorpay keys, OAuth keys, and Redis configuration.

Example backend environment:

```env
PORT=3003
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=Texibooking
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
REDIS_HOST=localhost
REDIS_PORT=6379
```

Update `texiBooking/.env` with your frontend API URL and OAuth configuration.

Example frontend environment:

```env
VITE_API_BASE_URL=http://localhost:3003
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APPLE_CLIENT_ID=your_apple_client_id
VITE_APPLE_REDIRECT_URI=http://localhost:5173
```

Real `.env` files are ignored by Git and should not be uploaded to GitHub.

## Run The Project

Open two terminals.

Terminal 1: Start Backend

```bash
cd Backend
npm run dev
```

Backend server:

```text
http://localhost:3003
```

Terminal 2: Start Frontend

```bash
cd texiBooking
npm run dev
```

Frontend website:

```text
http://localhost:5173
```

## Admin Login

Create an admin account using the backend seed script:

```bash
cd Backend
npm run seed:admin
```

Then log in from:

```text
http://localhost:5173/admin/login
```

Use the admin email and password configured in your backend seed/admin setup.

## Available Scripts

In the frontend folder:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

In the backend folder:

```bash
npm run dev
npm start
npm run seed:admin
npm run seed:vendor
npm run smoke:core
```

## Smoke Test

The backend includes a smoke test for the main ride flow:

- Health check
- Auth guard check
- User registration
- Vendor registration
- Vendor vehicle creation
- Ride creation
- Vendor ride acceptance
- User ride history verification

Run the smoke test:

```bash
cd Backend
npm run smoke:core
```

## Screens

- User home page
- Login and register page
- Ride booking page
- Vehicle selection section
- Ride status and tracking section
- My rides page
- User profile page
- Vendor dashboard
- Vendor KYC page
- Vendor vehicles page
- Vendor ride requests page
- Vendor active ride page
- Vendor earnings page
- Admin dashboard
- Admin users page
- Admin drivers page
- Admin KYC page
- Admin rides page
- Admin payments page
- Admin settings page
- Admin support page

## Notes

- Run the backend first before opening the frontend.
- The project uses MongoDB, so database access depends on a valid connection string in `Backend/.env`.
- Redis is used for active driver presence and dispatch support.
- If Redis is not running locally, the backend can still run, but real-time driver presence may be less reliable.
- `node_modules`, `dist` folders, Redis binaries, and real environment files are intentionally ignored.
