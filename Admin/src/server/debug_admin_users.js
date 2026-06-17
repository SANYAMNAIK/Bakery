const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/admin1";

async function run() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db("admin1");
        const users = await db.collection("User").find({}).toArray();
        console.log("Users in admin1.User:");
        console.log(JSON.stringify(users, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
