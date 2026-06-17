/**
 * Shop Routes (user-facing — cart/products/categories)
 * POST /api/shop/products
 * POST /api/shop/categories
 * POST /api/shop/filter
 * POST /api/shop/cart/add       (auth)
 * POST /api/shop/cart/list      (auth)
 * POST /api/shop/cart/remove    (auth)
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getAdminDB, getCustomerDB } = require('../db');
const { requireAuth } = require('../middleware/auth');

// POST /api/shop/products — public, list all products
router.post('/products', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('product').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Shop products error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/shop/categories — public, list all categories
router.post('/categories', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('productcategory').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Shop categories error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/shop/filter — public, filter products by category
router.post('/filter', async (req, res) => {
    try {
        const { cid } = req.body;
        const db = getAdminDB();
        const data = await db.collection('product').find({ Categoryid: cid }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Shop filter error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/shop/cart/add — requires auth
router.post('/cart/add', requireAuth, async (req, res) => {
    try {
        const { _id, username } = req.body;
        const cartUsername = username || req.user.username;
        if (!_id || !cartUsername) {
            return res.status(400).json({ msg: 'Product and user are required' });
        }
        const db = getCustomerDB();
        await db.collection('cart').updateOne(
            { ProductId: _id, Username: cartUsername },
            { $setOnInsert: { ProductId: _id, Username: cartUsername } },
            { upsert: true }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Cart add error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/shop/cart/list — requires auth
router.post('/cart/list', requireAuth, async (req, res) => {
    try {
        const { username } = req.body;
        const cartUsername = username || req.user.username;
        const db = getCustomerDB();
        const data = await db.collection('cart').find({ Username: cartUsername }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Cart list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/shop/cart/remove — requires auth
router.post('/cart/remove', requireAuth, async (req, res) => {
    try {
        const { productid, username } = req.body;
        const cartUsername = username || req.user.username;
        const db = getCustomerDB();
        await db.collection('cart').deleteOne({ ProductId: productid, Username: cartUsername });
        res.json({ msg: 'Deleted Successfully...' });
    } catch (err) {
        console.error('Cart remove error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
