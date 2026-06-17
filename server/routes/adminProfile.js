/**
 * Admin Profile Routes (all require auth)
 * POST /api/admin/profile/dp-change
 * POST /api/admin/profile/data-change
 * POST /api/admin/profile/social-change
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getAdminDB } = require('../db');

// POST /api/admin/profile/dp-change
router.post('/dp-change', async (req, res) => {
    try {
        const { adminid, image } = req.body;
        const db = getAdminDB();
        await db.collection('User').updateOne({ Username: adminid }, { $set: { Image: image } });
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Admin DP change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/profile/data-change
router.post('/data-change', async (req, res) => {
    try {
        const { adminid, username, phone, name, email, address } = req.body;
        const db = getAdminDB();
        await db.collection('User').updateOne(
            { Username: adminid },
            { $set: { Username: username, Phoneno: phone, Email: email, Address: address, Name: name } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Admin data change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/profile/social-change
router.post('/social-change', async (req, res) => {
    try {
        const { adminid, insta, git } = req.body;
        const db = getAdminDB();
        await db.collection('User').updateOne(
            { Username: adminid },
            { $set: { Instalink: insta, Githublink: git } }
        );
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Admin social change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/profile/pass-reset
router.post('/pass-reset', async (req, res) => {
    try {
        const { Key, newrp, old } = req.body;
        const db = getAdminDB();
        const user = await db.collection('User').findOne({ Username: Key });
        if (!user) {
            return res.json({ msg: 'User not found...' });
        }

        const isMatch = await bcrypt.compare(old, user.Password);
        if (!isMatch) {
            return res.json({ msg: 'Unmatch Old Password...' });
        }

        const hashedPassword = await bcrypt.hash(newrp, 10);
        await db.collection('User').updateOne({ Username: Key }, { $set: { Password: hashedPassword } });
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Admin pass reset error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
