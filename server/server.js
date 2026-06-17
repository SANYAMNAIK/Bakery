require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

// Import routes
const adminAuthRoutes = require('./routes/adminAuth');
const adminProfileRoutes = require('./routes/adminProfile');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const dashboardRoutes = require('./routes/dashboard');

const userAuthRoutes = require('./routes/userAuth');
const userProfileRoutes = require('./routes/userProfile');
const shopRoutes = require('./routes/shop');
const userOrdersRoutes = require('./routes/userOrders');

const { requireAuth } = require('./middleware/auth');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:2000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// --- Admin API Routes ---
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin/profile', requireAuth, adminProfileRoutes);
app.use('/api/admin/products', requireAuth, productRoutes);
app.use('/api/admin/categories', requireAuth, categoryRoutes);
app.use('/api/admin/customers', requireAuth, customerRoutes);
app.use('/api/admin/orders', requireAuth, orderRoutes);
app.use('/api/admin/dashboard', requireAuth, dashboardRoutes);

// --- User API Routes ---
app.use('/api/user', userAuthRoutes);
app.use('/api/user/profile', requireAuth, userProfileRoutes);
app.use('/api/user/shop', shopRoutes); // Shop has its own internal auth for cart
app.use('/api/user/orders', requireAuth, userOrdersRoutes);

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Unified Bakery API running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
