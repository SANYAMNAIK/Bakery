require('dotenv').config();
const { MongoClient } = require('mongodb');

async function createIndexes() {
    const url = process.env.MONGO_URL;
    if (!url) {
        console.error('Missing MONGO_URL in .env');
        process.exit(1);
    }

    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const adminDb = client.db('Bakery_Admin');
        const userDb = client.db('Bakery_User');

        // Admin User (Username) -> Unique Index
        await adminDb.collection('User').createIndex(
            { Username: 1 }, 
            { unique: true, name: "idx_admin_username" }
        );
        console.log('✅ Created unique index on admin.User.Username');

        // Customer (Username) -> Unique Index
        await userDb.collection('customer').createIndex(
            { Username: 1 }, 
            { unique: true, name: "idx_customer_username" }
        );
        console.log('✅ Created unique index on customer.customer.Username');

        // Product (Categoryid) -> Index
        await adminDb.collection('product').createIndex(
            { Categoryid: 1 }, 
            { name: "idx_product_categoryid" }
        );
        console.log('✅ Created index on admin.product.Categoryid');

        // Orders (DeliveryStatus, OrderId) -> Indexes
        await adminDb.collection('orders').createIndex(
            { DeliveryStatus: 1 }, 
            { name: "idx_orders_deliverystatus" }
        );
        console.log('✅ Created index on admin.orders.DeliveryStatus');

    } catch (err) {
        console.error('Error creating indexes:', err);
    } finally {
        await client.close();
    }
}

createIndexes();
