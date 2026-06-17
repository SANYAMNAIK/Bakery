/**
 * JWT Authentication Middleware
 */
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'bakery_secret_fallback';

/**
 * Middleware that verifies JWT token from Authorization header.
 * Attaches decoded user info to req.user.
 */
function requireAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized — no token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ msg: 'Forbidden — invalid or expired token' });
    }
}

/**
 * Generate a JWT token for a user.
 */
function generateToken(payload, expiresIn = '24h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

module.exports = { requireAuth, generateToken, SECRET_KEY };
