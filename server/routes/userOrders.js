/**
 * User Order Routes (require auth)
 * POST /api/user/orders/place
 * POST /api/user/orders/list
 * POST /api/user/orders/detail
 */
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getAdminDB, getCustomerDB } = require('../db');

// POST /api/user/orders/place
router.post('/place', async (req, res) => {
    try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}-${currentDate.getHours()}-${currentDate.getMinutes()}`;
        const formattedDate1 = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const { username, subtotal, ProductsOrdered } = req.body;

        const customerDB = getCustomerDB();
        const adminDB = getAdminDB();

        const userData = await customerDB.collection('customer').findOne({ Username: username });
        const orderResult = await adminDB.collection('orders').insertOne({
            Username: username, Email: userData.Email, Contact: userData.Phone,
            Address: userData.Address, Name: userData.Fullname, Date: formattedDate,
            DeliveryStatus: 'Order-Placed', Overalltotal: subtotal, ProductsOrdered
        });
        const objOrderid = orderResult.insertedId;

        await adminDB.collection('bill').insertOne({
            OrderId: objOrderid, Address: userData.Address, Name: userData.Fullname,
            Date: formattedDate1, Overalltotal: subtotal, ProductsOrdered
        });

        // Decrement stock
        for (const item of ProductsOrdered) {
            if (item.ProductId) {
                await adminDB.collection('product').updateOne(
                    { _id: new ObjectId(item.ProductId) },
                    { $inc: { Quantity: -parseInt(item.Quantity) } }
                );
            }
        }

        // Clear cart
        await customerDB.collection('cart').deleteMany({ Username: username });
        res.json({ msg: 'Updated Successfully' });
    } catch (err) {
        console.error('Place order error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/user/orders/list
router.post('/list', async (req, res) => {
    try {
        const { username } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').find({ Username: username }).toArray();
        res.json(data);
    } catch (err) {
        console.error('User orders list error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// POST /api/user/orders/detail
router.post('/detail', async (req, res) => {
    try {
        const { orderId } = req.body;
        const db = getAdminDB();
        const data = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });
        res.json(data);
    } catch (err) {
        console.error('User order detail error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
