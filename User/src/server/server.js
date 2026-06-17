const http = require('http');
const { useState } = require('react');
const { parse } = require('url');
const { MongoClient, ObjectId } = require('mongodb');
const { json } = require('react-router-dom');
const { DateComponent } = require('@fullcalendar/react');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "bakery_user_secret_key_456";


const url = "mongodb://localhost:27017";
const PORT = 5000;


const server = http.createServer(async (req, res) => {
    const { path } = parse(req.url);

    //set cors
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && path === '/custadd') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { fname, email, phone, username, address, pass } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            // Changed 'user' to 'customer' based on screenshot
            const data1 = await db.collection('customer').findOne({ Username: username });
            if (data1) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Username already exist" }));
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pass, salt);
                // Changed 'user' to 'customer'
                await db.collection('customer').insertOne({ Fullname: fname, Email: email, Phone: phone, Username: username, Address: address, Password: hashedPassword });
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Updated Successfully" }));
            }
            Mongoconnector.close();

        });
    }

    if (req.method === 'POST' && path === "/login") {

        let body = '';
        req.on("data", (chunk) => {
            body += chunk.toString();

        });
        req.on("end", async () => {
            const { username, password } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            // Changed 'user' to 'customer'
            const user = await db.collection("customer").findOne({ Username: username });

            let success = false;

            if (user) {
                const isHashMatch = await bcrypt.compare(password, user.Password);
                const isPlainMatch = user.Password === password;
                if (isHashMatch || isPlainMatch) success = true;
            }

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });

            if (success) {
                const safeUser = { ...user };
                delete safeUser.Password;
                const token = jwt.sign({ id: user._id, username: user.Username }, SECRET_KEY, { expiresIn: '24h' });
                res.end(JSON.stringify({ ...safeUser, token }));
            } else {
                res.end(JSON.stringify(null));
            }

        });

    }


    if (req.method === "POST" && path === '/profileviewer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { Key } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            // Changed 'user' to 'customer'
            const data = await db.collection('customer').findOne({ Username: Key });


            Mongoconnector.close();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }


    if (req.method === 'POST' && path === '/profiledit') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { image, ...data } = JSON.parse(body);
            const { address, email, fullname, phone, username } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");


            // Changed 'user' to 'customer'
            await db.collection('customer').updateOne({ Username: username }, { $set: { Address: address, Email: email, Fullname: fullname, Phone: phone, DPImage: image } });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Data Saved Successfully..." }));




            Mongoconnector.close();

        })
    }

    if (req.method === 'POST' && path === '/passreset') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { username, ...data } = JSON.parse(body);
            const { newpassword } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");


            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newpassword, salt);
            // Changed 'user' to 'customer'
            await db.collection('customer').updateOne({ Username: username }, { $set: { Password: hashedPassword } });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Password Changd Successfully..." }));




            Mongoconnector.close();

        })
    }

    if (path === '/productrendrer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("product").find({}).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }
    if (path === '/categoryrendrer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("productcategory").find({}).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }
    if (req.method === "POST" && path === '/cfilter') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { cid } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("product").find({ Categoryid: cid }).toArray();


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }


    if (req.method === 'POST' && path === '/cart') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { _id, username } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");


            const data2 = await db.collection('product').findOne({ _id: new ObjectId(_id) });
            const db1 = Mongoconnector.db("customer");
            await db1.collection('cart').insertOne({ ProductId: _id, Username: username });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));

            Mongoconnector.close();

        });
    }
    if (path === '/cartverify') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }
            const { username } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            const data = await db.collection("cart").find({ Username: username }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }

    if (req.method === "POST" && path === '/removefromcart') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { productid, username } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            await db.collection("cart").deleteOne({ ProductId: productid, Username: username });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: 'Deleted Successfully...' }));
        })
    }


    if (req.method === 'POST' && path === '/addorder') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}-${currentDate.getHours()}-${currentDate.getMinutes()}`;
            const formattedDate1 = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
            const { username, subtotal, ProductsOrdered } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db3 = Mongoconnector.db("customer");
            // Changed 'user' to 'customer'
            const data2 = await db3.collection('customer').findOne({ Username: username });
            const db = Mongoconnector.db("admin");
            const orderid = await db.collection('orders').insertOne({ Username: username, Email: data2.Email, Contact: data2.Phone, Address: data2.Address, Name: data2.Fullname, Date: formattedDate, DeliveryStatus: "Order-Placed", Overalltotal: subtotal, ProductsOrdered });
            const objOrderid = orderid.insertedId;

            await db.collection('bill').insertOne({ OrderId: objOrderid, Address: data2.Address, Name: data2.Fullname, Date: formattedDate1, Overalltotal: subtotal, ProductsOrdered });

            for (const item of ProductsOrdered) {
                if (item.ProductId) {
                    await db.collection('product').updateOne(
                        { _id: new ObjectId(item.ProductId) },
                        { $inc: { Quantity: -parseInt(item.Quantity) } }
                    );
                }
            }

            const db1 = Mongoconnector.db("customer");
            await db1.collection('cart').deleteMany({ Username: username });
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));

            Mongoconnector.close();

        });
    }

    if (req.method === 'POST' && path === '/myorders') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { username } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("orders").find({ Username: username }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }

    if (req.method === 'POST' && path === '/getorder') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Unauthorized" }));
            }
            try {
                jwt.verify(token, SECRET_KEY);
            } catch (err) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ msg: "Forbidden" }));
            }

            const { orderId } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("orders").findOne({ _id: new ObjectId(orderId) });

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }
});
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});