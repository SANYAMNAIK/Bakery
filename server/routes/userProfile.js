/**
 * User Profile Routes (require auth)
 * POST /api/user/profile/view
 * POST /api/user/profile/edit
 * POST /api/user/profile/pass-reset
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getCustomerDB } = require('../db');

// POST /api/user/profile/view
router.post('/view', async (req, res) => {
    try {
        const { Key } = req.body;
        const db = getCustomerDB();
        const data = await db.collection('customer').findOne({ Username: Key });
        res.json(data);
    } catch (err) {
        console.error('User profile view error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/user/profile/edit
router.post('/edit', async (req, res) => {
    try {
        const { image, address, email, fullname, phone, username } = req.body;
        const db = getCustomerDB();
        await db.collection('customer').updateOne(
            { Username: username },
            { $set: { Address: address, Email: email, Fullname: fullname, Phone: phone, DPImage: image } }
        );
        res.json({ msg: 'Data Saved Successfully...' });
    } catch (err) {
        console.error('User profile edit error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/user/profile/pass-reset
router.post('/pass-reset', async (req, res) => {
    try {
        const { username, newpassword } = req.body;
        const db = getCustomerDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        await db.collection('customer').updateOne(
            { Username: username },
            { $set: { Password: hashedPassword } }
        );
        res.json({ msg: 'Password Changed Successfully...' });
    } catch (err) {
        console.error('User pass reset error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
