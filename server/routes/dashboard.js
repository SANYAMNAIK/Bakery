/**
 * Dashboard Stats Routes (admin — all require auth)
 * POST /api/dashboard/delivered
 * POST /api/dashboard/pending
 * POST /api/dashboard/out-for-delivery
 * POST /api/dashboard/new-orders
 * POST /api/dashboard/low-stock
 */
const express = require('express');
const router = express.Router();
const { getAdminDB } = require('../db');

// POST /api/dashboard/delivered
router.post('/delivered', async (req, res) => {
    try {
        const { DeliveryStatus } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({ DeliveryStatus }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Dashboard delivered error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/dashboard/pending
router.post('/pending', async (req, res) => {
    try {
        const { DeliveryStatus1, DeliveryStatus2 } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({
            $or: [{ DeliveryStatus: DeliveryStatus1 }, { DeliveryStatus: DeliveryStatus2 }]
        }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Dashboard pending error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/dashboard/out-for-delivery
router.post('/out-for-delivery', async (req, res) => {
    try {
        const { DeliveryStatus } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({ DeliveryStatus }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Dashboard out-for-delivery error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/dashboard/new-orders
router.post('/new-orders', async (req, res) => {
    try {
        const { DeliveryStatus } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({ DeliveryStatus }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Dashboard new orders error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/dashboard/low-stock
router.post('/low-stock', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('product').find({ Quantity: { $lte: 3 } }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Dashboard low stock error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
