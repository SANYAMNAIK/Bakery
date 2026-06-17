/**
 * MongoDB Connection Pool
 * Single shared MongoClient instance reused across all requests.
 */
const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';

let client;

async function connectDB() {
    if (!client) {
        client = new MongoClient(MONGO_URL);
        await client.connect();
        console.log('✅ Connected to MongoDB');
    }
    return client;
}

function getDB(dbName) {
    if (!client) {
        throw new Error('Database not connected. Call connectDB() first.');
    }
    return client.db(dbName);
}

function getAdminDB() {
    return getDB('Bakery_Admin');
}

function getCustomerDB() {
    return getDB('Bakery_User');
}

async function closeDB() {
    if (client) {
        await client.close();
        client = null;
    }
}

module.exports = { connectDB, getDB, getAdminDB, getCustomerDB, closeDB };
