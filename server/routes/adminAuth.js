/**
 * Admin Authentication Routes
 * POST /api/admin/login
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { getAdminDB } = require('../db');
const { generateToken } = require('../middleware/auth');

// POST /api/admin/login
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const db = getAdminDB();
        const user = await db.collection('User').findOne({ Username: username });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.Password);
            if (isMatch) {
                const safeUser = { ...user };
                delete safeUser.Password;
                const token = generateToken({ id: user._id, username: user.Username, role: 'admin' }, '2h');
                return res.json([{ ...safeUser, token }]);
            }
        }

        res.json([]);
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/admin/renderer — get admin user data
router.post('/renderer', async (req, res) => {
    try {
        const { username } = req.body || {};
        const db = getAdminDB();
        const data = username
            ? await db.collection('User').findOne({ Username: username })
            : await db.collection('User').findOne();

        if (!data) {
            return res.status(404).json({ msg: 'Admin profile not found' });
        }

        res.json(data);
    } catch (err) {
        console.error('Admin renderer error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
