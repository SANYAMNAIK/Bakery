/**
 * Order & Bill Routes (admin panel — all require auth)
 * POST /api/orders/list
 * POST /api/orders/view
 * POST /api/orders/update-status
 * POST /api/orders/filter
 * POST /api/orders/search
 * POST /api/orders/address-update
 * POST /api/orders/bill-view
 * POST /api/orders/bill-update
 * POST /api/orders/bill-add-product
 * POST /api/orders/bill-delete-record
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getAdminDB } = require('../db');

// Helper: escape regex special characters
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// POST /api/orders/list
router.post('/list', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('orders').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Orders list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/view
router.post('/view', async (req, res) => {
    try {
        const { Orderid } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').findOne({ _id: new ObjectId(Orderid) });
        res.json(data);
    } catch (err) {
        console.error('Order view error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/update-status
router.post('/update-status', async (req, res) => {
    try {
        const { status, orderid } = req.body;
        const db = getAdminDB();
        await db.collection('orders').updateOne(
            { _id: new ObjectId(orderid) },
            { $set: { DeliveryStatus: status } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Order status update error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/filter
router.post('/filter', async (req, res) => {
    try {
        const { filterval } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({ DeliveryStatus: filterval }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Order filter error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/search
router.post('/search', async (req, res) => {
    try {
        const { username } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({
            Username: { $regex: `.*${escapeRegex(username)}.*`, $options: 'i' }
        }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Order search error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/address-update
router.post('/address-update', async (req, res) => {
    try {
        const { Orderid, ...ObjData } = req.body;
        const db = getAdminDB();
        await db.collection('orders').updateOne(
            { _id: new ObjectId(Orderid) },
            { $set: { ...ObjData } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Order address update error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/bill-view
router.post('/bill-view', async (req, res) => {
    try {
        const { Orderid } = req.body;
        const db = getAdminDB();
        const data = await db.collection('bill').findOne({ OrderId: new ObjectId(Orderid) });
        res.json(data);
    } catch (err) {
        console.error('Bill view error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/bill-update
router.post('/bill-update', async (req, res) => {
    try {
        const { Orderid, subtotal, products } = req.body;
        const db = getAdminDB();
        await db.collection('bill').updateOne(
            { OrderId: new ObjectId(Orderid) },
            { $set: { ProductsOrdered: products, Overalltotal: subtotal } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Bill update error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/bill-add-product
router.post('/bill-add-product', async (req, res) => {
    try {
        const { Invoiceid, ...ObjData } = req.body;
        const db = getAdminDB();
        await db.collection('bill').updateOne(
            { _id: new ObjectId(Invoiceid) },
            { $push: { ProductsOrdered: ObjData } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Bill add product error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/orders/bill-delete-record
router.post('/bill-delete-record', async (req, res) => {
    try {
        const { id, indes } = req.body;
        // TODO: Implement actual bill record deletion
        res.json({ msg: id });
    } catch (err) {
        console.error('Bill delete record error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
