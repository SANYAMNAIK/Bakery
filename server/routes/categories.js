/**
 * Category Routes (admin — all require auth)
 * POST /api/categories/list
 * POST /api/categories/check
 * POST /api/categories/add
 * POST /api/categories/delete
 */
const express = require('express');
const router = express.Router();
const { getAdminDB } = require('../db');

// POST /api/categories/list
router.post('/list', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('productcategory').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Category list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/categories/check — check if category exists
router.post('/check', async (req, res) => {
    try {
        const { cname, cid } = req.body;
        const db = getAdminDB();
        const data = await db.collection('productcategory').findOne({
            $or: [{ Cname: cname }, { Cid: cid }]
        });
        res.json(data);
    } catch (err) {
        console.error('Category check error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/categories/add
router.post('/add', async (req, res) => {
    try {
        const { cname, cid } = req.body;
        const db = getAdminDB();
        await db.collection('productcategory').insertOne({ Cname: cname, Cid: cid });
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Category add error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/categories/delete
router.post('/delete', async (req, res) => {
    try {
        const { cid } = req.body;
        const db = getAdminDB();
        await db.collection('product').deleteMany({ Categoryid: cid });
        await db.collection('productcategory').deleteOne({ Cid: cid });
        res.json({ msg: 'Category deleted .....' });
    } catch (err) {
        console.error('Category delete error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
