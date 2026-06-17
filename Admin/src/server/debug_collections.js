const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/admin1";

async function run() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db("admin1");
        const collections = await db.listCollections().toArray();
        console.log("Collections in admin1:");
        collections.forEach(c => console.log(`- ${c.name}`));

        // Also check 'admin' db just in case
        const adminDb = client.db("admin");
        const adminCollections = await adminDb.listCollections().toArray();
        console.log("\nCollections in 'admin' (System DB):");
        adminCollections.forEach(c => console.log(`- ${c.name}`));

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
