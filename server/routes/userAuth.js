/**
 * User Authentication Routes (public)
 * POST /api/user/login
 * POST /api/user/register
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { getCustomerDB } = require('../db');
const { generateToken } = require('../middleware/auth');

// POST /api/user/login
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
        const db = getCustomerDB();
        const user = await db.collection('customer').findOne({ Username: username });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.Password);
            if (isMatch) {
                const safeUser = { ...user };
                delete safeUser.Password;
                const token = generateToken({ id: user._id, username: user.Username, role: 'user' }, '24h');
                return res.json({ ...safeUser, token });
            }
        }

        res.json(null);
    } catch (err) {
        console.error('User login error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/user/register
router.post('/register', [
    body('fname').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('pass').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fname, email, phone, username, address, pass } = req.body;
        const db = getCustomerDB();
        const existing = await db.collection('customer').findOne({ Username: username });
        if (existing) {
            return res.status(400).json({ msg: 'Username already exist' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        await db.collection('customer').insertOne({
            Fullname: fname, Email: email, Phone: phone,
            Username: username, Address: address, Password: hashedPassword
        });
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('User register error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
