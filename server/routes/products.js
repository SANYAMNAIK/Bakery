/**
 * Product Routes (admin management — all require auth)
 * POST /api/products/add
 * POST /api/products/update
 * POST /api/products/delete
 * POST /api/products/view
 * POST /api/products/list
 * POST /api/products/search
 * POST /api/products/filter
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getAdminDB } = require('../db');

// Helper: escape regex special characters
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// POST /api/products/list
router.post('/list', async (req, res) => {
    try {
        const db = getAdminDB();
        const data = await db.collection('product').find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Product list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

const { body, validationResult } = require('express-validator');

// POST /api/products/add
router.post('/add', [
    body('pname').notEmpty().withMessage('Product name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { image, pname, price, description, quantity, category } = req.body;
        const db = getAdminDB();
        const verifydata = await db.collection('productcategory').findOne({ Cname: category });
        if (verifydata && verifydata.Cname === category) {
            await db.collection('product').insertOne({
                PImage: image, Pname: pname, Price: price,
                Description: description, Quantity: parseInt(quantity),
                Categoryid: verifydata.Cid
            });
            res.json({ msg: 'Data Saved Successfully...' });
        } else {
            res.status(400).json({ msg: 'Category Doesnt Match...' });
        }
    } catch (err) {
        console.error('Product add error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/products/update
router.post('/update', async (req, res) => {
    try {
        const { dataObj, Image } = req.body;
        const { pname, category, _id, desc, price, quantity } = dataObj;
        const db = getAdminDB();
        const catData = await db.collection('productcategory').findOne({ Cname: category });
        if (catData) {
            await db.collection('product').updateOne(
                { _id: new ObjectId(_id) },
                { $set: { PImage: Image, Pname: pname, Description: desc, Price: price, Quantity: parseInt(quantity), Categoryid: catData.Cid } }
            );
            res.json({ msg: 'Updated Successfully...' });
        } else {
            res.json({ msg: 'Product Category not available...' });
        }
    } catch (err) {
        console.error('Product update error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/products/delete
router.post('/delete', async (req, res) => {
    try {
        const { Key } = req.body;
        const db = getAdminDB();
        await db.collection('product').deleteOne({ _id: new ObjectId(Key) });
        res.json({ data: 'Deleted Successfully...' });
    } catch (err) {
        console.error('Product delete error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/products/view
router.post('/view', async (req, res) => {
    try {
        const { Key } = req.body;
        const db = getAdminDB();
        const data = await db.collection('product').findOne({ _id: new ObjectId(Key) });
        const cat = await db.collection('productcategory').findOne({ Cid: data.Categoryid });
        res.json({ data, cat });
    } catch (err) {
        console.error('Product view error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/products/search
router.post('/search', async (req, res) => {
    try {
        const { keyword } = req.body;
        const db = getAdminDB();
        const data = await db.collection('product').find({
            Pname: { $regex: `.*${escapeRegex(keyword)}.*`, $options: 'i' }
        }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Product search error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/products/filter
router.post('/filter', async (req, res) => {
    try {
        const { cid } = req.body;
        const db = getAdminDB();
        const data = await db.collection('product').find({ Categoryid: cid }).toArray();
        res.json(data);
    } catch (err) {
        console.error('Product filter error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
