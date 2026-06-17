# Bakery Project

Bakery web app with a user storefront, admin dashboard, and Node/Express backend.

## Apps

- `User`: customer frontend on port `2000`
- `Admin`: admin frontend on port `3000`
- `server`: backend API on port `5000`

## Setup

Install dependencies in each app:

```bash
cd server
npm install

cd ../User
npm install

cd ../Admin
npm install
```

Create environment files from the examples:

```bash
copy server\.env.example server\.env
copy User\.env.example User\.env
copy Admin\.env.example Admin\.env
```

Update `server/.env` with your real MongoDB Atlas URL and JWT secret.

## Run

Open three terminals:

```bash
cd server
npm start
```

```bash
cd User
npm start
```

```bash
cd Admin
npm start
```

URLs:

- User: `http://localhost:2000`
- Admin: `http://localhost:3000`
- Server: `http://localhost:5000`

## Notes

Real `.env` files and `node_modules` are intentionally ignored and should not be committed to GitHub.
