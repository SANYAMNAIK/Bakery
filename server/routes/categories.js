/**
 * Category Routes (admin - all require auth)
 * POST /api/categories/list
 * POST /api/categories/check
 * POST /api/categories/add
 * POST /api/categories/delete
 */
const express = require('express');
const router = express.Router();
const { getAdminDB } = require('../db');

function escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// POST /api/categories/list
router.post('/list', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('productcategory')
            .find({ Cname: { $nin: ['', null] }, Cid: { $nin: ['', null] } })
            .sort({ Cname: 1 })
            .toArray();

        const seenIds = new Set();
        const seenNames = new Set();
        const uniqueData = data.filter((item) => {
            const id = String(item.Cid).trim().toLowerCase();
            const name = String(item.Cname).trim().toLowerCase();
            if (seenIds.has(id) || seenNames.has(name)) return false;
            seenIds.add(id);
            seenNames.add(name);
            return true;
        });

        res.json(uniqueData);
    } catch (err) {
        console.error('Category list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/categories/check - check if category exists
router.post('/check', async (req, res) => {
    try {
        const cname = String(req.body.cname || '').trim();
        const cid = String(req.body.cid || '').trim();
        const db = getAdminDB();
        const data = await db.collection('productcategory').findOne({
            $or: [
                { Cname: { $regex: `^${escapeRegex(cname)}$`, $options: 'i' } },
                { Cid: cid }
            ]
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
        const cname = String(req.body.cname || '').trim();
        const cid = String(req.body.cid || '').trim();

        if (!cname || !cid) {
            return res.status(400).json({ msg: 'Category name and category id are required' });
        }

        const db = getAdminDB();
        const existing = await db.collection('productcategory').findOne({
            $or: [
                { Cname: { $regex: `^${escapeRegex(cname)}$`, $options: 'i' } },
                { Cid: cid }
            ]
        });

        if (existing) {
            return res.status(409).json({
                msg: existing.Cid === cid ? 'Category ID already exists' : 'Category name already exists'
            });
        }

        await db.collection('productcategory').insertOne({ Cname: cname, Cid: cid });
        res.json({ msg: 'Category added successfully' });
    } catch (err) {
        console.error('Category add error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/categories/delete
router.post('/delete', async (req, res) => {
    try {
        const cid = String(req.body.cid || '').trim();
        if (!cid) {
            return res.status(400).json({ msg: 'Category id is required' });
        }

        const db = getAdminDB();
        await db.collection('product').deleteMany({ Categoryid: cid });
        await db.collection('productcategory').deleteMany({ Cid: cid });
        res.json({ msg: 'Category deleted successfully' });
    } catch (err) {
        console.error('Category delete error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
