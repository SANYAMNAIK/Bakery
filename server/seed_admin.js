require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";

async function run() {
    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        const db = client.db("Bakery_Admin");

        // Check if exists
        const exists = await db.collection("User").findOne({ Username: "admin" });
        if (exists) {
            console.log("Admin user already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);
        const adminUser = {
            Username: "admin",
            Password: hashedPassword,
            Email: "admin@example.com",
            Fullname: "System Admin",
            Role: "Admin"
        };

        await db.collection("User").insertOne(adminUser);
        console.log("✅ Admin user created: admin / admin123");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
