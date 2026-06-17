/**
 * Customer Routes (admin panel — all require auth)
 * POST /api/customers/add
 * POST /api/customers/list
 * POST /api/customers/view
 * POST /api/customers/search
 * POST /api/customers/dp-change
 * POST /api/customers/data-change
 * POST /api/customers/address-change
 * POST /api/customers/pass-reset
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getCustomerDB } = require('../db');

// POST /api/customers/add
router.post('/add', async (req, res) => {
    try {
        const { image, name, email, phone, username, address, pass } = req.body;
        const db = getCustomerDB();
        const existingUser = await db.collection('customer').findOne({ Username: username });
        if (existingUser) {
            return res.json({ msg: 'Username already exist' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        await db.collection('customer').insertOne({
            Fullname: name, Email: email, Phone: phone,
            Username: username, Address: address,
            Password: hashedPassword, DPImage: image
        });
        res.json({ msg: 'Data Saved Successfully...' });
    } catch (err) {
        console.error('Customer add error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/list
router.post('/list', async (req, res) => {
    try {
        const db = getCustomerDB();
        const data = await db.collection('customer').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Customer list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/view
router.post('/view', async (req, res) => {
    try {
        const { Key } = req.body;
        const db = getCustomerDB();
        const data = await db.collection('customer').findOne({ Username: Key });
        res.json(data);
    } catch (err) {
        console.error('Customer view error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/search
router.post('/search', async (req, res) => {
    try {
        const { Key } = req.body;
        const db = getCustomerDB();
        const data = await db.collection('customer').findOne({ Username: Key });
        res.json(data);
    } catch (err) {
        console.error('Customer search error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/dp-change
router.post('/dp-change', async (req, res) => {
    try {
        const { image, username } = req.body;
        const db = getCustomerDB();
        await db.collection('customer').updateOne({ Username: username }, { $set: { DPImage: image } });
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Customer DP change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/data-change
router.post('/data-change', async (req, res) => {
    try {
        const { username, email, phone, address, Fullname } = req.body;
        const db = getCustomerDB();
        await db.collection('customer').updateOne(
            { Username: username },
            { $set: { Username: username, Phone: phone, Email: email, Address: address, Fullname: Fullname } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Customer data change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/address-change
router.post('/address-change', async (req, res) => {
    try {
        const { Key, phone, address } = req.body;
        const db = getCustomerDB();
        await db.collection('customer').updateOne({ Username: Key }, { $set: { Phone: phone, Address: address } });
        res.json({ msg: 'success' });
    } catch (err) {
        console.error('Customer address change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/customers/pass-reset
router.post('/pass-reset', async (req, res) => {
    try {
        const { Key, newrp, old } = req.body;
        const db = getCustomerDB();
        const user = await db.collection('customer').findOne({ Username: Key });
        if (!user) {
            return res.json({ msg: 'User not found...' });
        }
        const isMatch = await bcrypt.compare(old, user.Password);
        if (isMatch) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newrp, salt);
            await db.collection('customer').updateOne({ Username: Key }, { $set: { Password: hashedPassword } });
            res.json({ msg: 'Updated Successfully' });
        } else {
            res.json({ msg: 'Unmatch Old Password...' });
        }
    } catch (err) {
        console.error('Customer pass reset error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
