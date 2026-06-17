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
        if (!adminid || !image) {
            return res.status(400).json({ msg: 'Admin and image are required' });
        }

        const db = getAdminDB();
        const result = await db.collection('User').updateOne(
            { Username: adminid },
            { $set: { Image: image } }
        );

        if (!result.matchedCount) {
            return res.status(404).json({ msg: 'Admin profile not found' });
        }

        const updated = await db.collection('User').findOne({ Username: adminid });
        res.json({ msg: 'Updated Successfully', data: updated });
    } catch (err) {
        console.error('Admin DP change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/profile/data-change
router.post('/data-change', async (req, res) => {
    try {
        const { adminid, username, phone, name, email, address } = req.body;
        if (!adminid || !username || !email) {
            return res.status(400).json({ msg: 'Username and email are required' });
        }

        const db = getAdminDB();
        const existing = await db.collection('User').findOne({ Username: adminid });
        if (!existing) {
            return res.status(404).json({ msg: 'Admin profile not found' });
        }

        const displayName = String(name || existing.Name || existing.Fullname || username).trim();
        await db.collection('User').updateOne(
            { Username: adminid },
            {
                $set: {
                    Username: username,
                    Phoneno: phone || '',
                    Email: email,
                    Address: address || '',
                    Name: displayName,
                    Fullname: displayName
                }
            }
        );
        const updated = await db.collection('User').findOne({ Username: username });
        res.json({ msg: 'Updated Successfully', data: updated });
    } catch (err) {
        console.error('Admin data change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/profile/social-change
router.post('/social-change', async (req, res) => {
    try {
        const { adminid, insta, git } = req.body;
        if (!adminid) {
            return res.status(400).json({ msg: 'Admin is required' });
        }

        const db = getAdminDB();
        await db.collection('User').updateOne(
            { Username: adminid },
            { $set: { Instalink: insta || '', Githublink: git || '' } }
        );
        const updated = await db.collection('User').findOne({ Username: adminid });
        res.json({ msg: 'Updated Successfully', data: updated });
    } catch (err) {
        console.error('Admin social change error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/profile/pass-reset
router.post('/pass-reset', async (req, res) => {
    try {
        const { Key, newrp, old } = req.body;
        if (!Key || !old || !newrp) {
            return res.status(400).json({ msg: 'All password fields are required' });
        }

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
