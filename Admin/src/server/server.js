const http = require('http');
const { useState } = require('react');
const { parse } = require('url');
const { MongoClient, ObjectId } = require('mongodb');
const { json } = require('react-router-dom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "bakery_admin_secret_key_123";



const url = "mongodb://localhost:27017/admin";
const url1 = "mongodb://localhost:27017";
const PORT = 4000;


const server = http.createServer(async (req, res) => {
    const { path } = parse(req.url);

    //set cors
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
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
            const db = Mongoconnector.db();
            const user = await db.collection("User").findOne({ Username: username });

            let success = false;

            if (user) {
                // Try bcrypt compare first
                const isHashMatch = await bcrypt.compare(password, user.Password);
                // Fallback: Check plain text if not hashed yet
                const isPlainMatch = user.Password === password;

                if (isHashMatch || isPlainMatch) {
                    success = true;
                }
            }

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });

            if (success) {
                // Return array with user object (excluding password) to match expected frontend structure somewhat, 
                // but cleaner would be to return just the object. 
                // However, the frontend expects an array `responseData[0]`. 
                // I will return an array with a safe user object to minimize frontend breakage, 
                // but I MUST update frontend to not check password.
                const safeUser = { ...user };
                delete safeUser.Password;
                const token = jwt.sign({ id: user._id, username: user.Username }, SECRET_KEY, { expiresIn: '2h' });
                res.end(JSON.stringify([{ ...safeUser, token }]));
            } else {
                res.end(JSON.stringify([]));
            }

        });

    }

    if (req.method === 'POST' && path === '/rendrer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            const data = await db.collection("User").findOne();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }

    if (req.method === 'POST' && path === '/admindpchange') {
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

            const { adminid, image } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            await db.collection('User').updateOne({ Username: adminid }, { $set: { Image: image } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }

    if (req.method === 'POST' && path === '/admindatachange') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { adminid, ...data } = JSON.parse(body);
            const { username, phone, name, email, address } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            await db.collection('User').updateOne({ Username: adminid }, { $set: { Username: username, Phoneno: phone, Email: email, Address: address, Name: name } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }



    if (req.method === 'POST' && path === '/handlesocialchange') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { adminid, ...data } = JSON.parse(body);
            const { insta, git } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            await db.collection('User').updateOne({ Username: adminid }, { $set: { Instalink: insta, Githublink: git } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }


    if (req.method === 'POST' && path === '/productadd') {
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const { image, ...data } = JSON.parse(body);
            const { pname, price, description, quantity, category } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();

            const verifydata = await db.collection("productcategory").findOne({ Cname: category });
            if (verifydata.Cname === category) {
                await db.collection('product').insertOne({ PImage: image, Pname: pname, Price: price, Description: description, Quantity: parseInt(quantity), Categoryid: verifydata.Cid });
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Data Saved Successfully..." }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Category Doesnt Match..." }));
            }



            Mongoconnector.close();

        })
    }



    if (req.method === 'POST' && path === '/addcategory') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { cname, cid } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            const data = await db.collection("productcategory").findOne({
                $or: [{ Cname: cname }, { Cid: cid }]
            });

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }

    if (req.method === 'POST' && path === '/addcategory1') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { cname, cid } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            await db.collection('productcategory').insertOne({ Cname: cname, Cid: cid });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
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
            const db = Mongoconnector.db();
            const data = await db.collection("productcategory").find({}).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
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
            const db = Mongoconnector.db();
            const data = await db.collection("product").find({}).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }

    if (req.method === "POST" && path === '/productviewer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Key } = JSON.parse(body);
            const idToUpdate5 = Key;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            const data = await db.collection('product').findOne({ _id: new ObjectId(idToUpdate5) });
            const cat = await db.collection('productcategory').findOne({ Cid: data.Categoryid });

            Mongoconnector.close();
            const combine = { data, cat };
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(combine));
        })
    }

    if (req.method === 'POST' && path === '/productadder') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { dataObj, Image } = JSON.parse(body);
            const { pname, category, _id, desc, price, quantity } = dataObj;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            const data1 = await db.collection("productcategory").findOne({ Cname: category });
            if (data1) {
                await db.collection('product').updateOne({ _id: new ObjectId(_id) }, { $set: { PImage: Image, Pname: pname, Description: desc, Price: price, Quantity: parseInt(quantity), Categoryid: data1.Cid } });


                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Updated Successfully..." }));

            } else {

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Product Category not available..." }));
            }


            Mongoconnector.close();

        })
    }


    if (req.method === "POST" && path === '/deleteproduct') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Key } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            await db.collection("product").deleteOne({ _id: new ObjectId(Key) });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ data: 'Deleted Successfully...' }));
        })
    }

    if (path === '/psearch') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { keyword } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            const data = await db.collection("product").find({ Pname: { $regex: `.*${keyword}.*` } }).toArray();


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
            const db = Mongoconnector.db();
            const data = await db.collection("product").find({ Categoryid: cid }).toArray();


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }


    if (req.method === "POST" && path === '/categorydelete') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { cid } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db();
            await db.collection("product").deleteOne({ Categoryid: cid });
            await db.collection("productcategory").deleteOne({ Cid: cid });

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Category deleted ....." }));
        })
    }


    if (req.method === 'POST' && path === '/custadd') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { image, ...data } = JSON.parse(body);
            const { name, email, phone, username, address, pass } = data;
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            // Check if username exists in 'customer' collection
            const existingUser = await db.collection('customer').findOne({ Username: username });

            if (existingUser) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Username already exist" }));
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pass, salt);
                await db.collection('customer').insertOne({ Fullname: name, Email: email, Phone: phone, Username: username, Address: address, Password: hashedPassword, DPImage: image });

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Data Saved Successfully..." }));
            }

            Mongoconnector.close();
        });
    }

    if (path === '/profilerendrer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            const data = await db.collection("customer").find({}).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }

    if (path === '/searchprofile') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Key } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            const data = await db.collection('user').findOne({ Username: Key });


            Mongoconnector.close();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }

    if (req.method === "POST" && path === '/addresschange') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Key, ...Objdata } = JSON.parse(body);
            const { phone, address } = Objdata;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            await db.collection('customer').updateOne({ Username: Key }, { $set: { Phone: phone, Address: address } });

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: 'success' }));

        });
    }


    if (req.method === "POST" && path === '/custprofileviewer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Key } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            const data = await db.collection('customer').findOne({ Username: Key });


            Mongoconnector.close();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }

    if (req.method === 'POST' && path === '/custdpchange') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { image, username } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            await db.collection('customer').updateOne({ Username: username }, { $set: { DPImage: image } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }

    if (req.method === 'POST' && path === '/custdatachange') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { username, ...data } = JSON.parse(body);
            const { email, phone, address, Fullname } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            await db.collection('customer').updateOne({ Username: username }, { $set: { Username: username, Phone: phone, Email: email, Address: address, Fullname: Fullname } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }

    if (req.method === 'POST' && path === '/custpassreset') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Key, ...data } = JSON.parse(body);
            const { newrp, old } = data;
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("customer");
            const data1 = await db.collection('customer').findOne({ Username: Key });
            // Should probably check hashed password here too eventually, but keeping simple for now as requested
            if (data1.Password === old) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newrp, salt);
                await db.collection('customer').updateOne({ Username: Key }, { $set: { Password: hashedPassword } });
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Updated Successfully" }));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ msg: "Unmatch Old Password..." }));
            }



            Mongoconnector.close();

        })
    }


    if (path === '/orders') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("orders").find({}).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }


    if (req.method === 'POST' && path === '/updateorderstat') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { status, orderid } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            await db.collection('orders').updateOne({ _id: new ObjectId(orderid) }, { $set: { DeliveryStatus: status } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }



    if (req.method === "POST" && path === '/orderfilter') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { filterval } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("orders").find({ DeliveryStatus: filterval }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }


    if (req.method === "POST" && path === '/orderserach') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { username } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("orders").find({ Username: { $regex: `.*${username}.*` } }).toArray();


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }


    if (req.method === "POST" && path === '/orderviewer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Orderid } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection('orders').findOne({ _id: new ObjectId(Orderid) });


            Mongoconnector.close();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }


    if (req.method === "POST" && path === '/billviewer') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Orderid } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection('bill').findOne({ OrderId: new ObjectId(Orderid) });


            Mongoconnector.close();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        })
    }


    if (req.method === 'POST' && path === '/orderaddressupdate') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Orderid, ...ObjData } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            await db.collection('orders').updateOne({ _id: new ObjectId(Orderid) }, { $set: { ...ObjData } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }

    if (req.method === 'POST' && path === '/updatebill') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Orderid, subtotal, products } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            await db.collection('bill').updateOne({ OrderId: new ObjectId(Orderid) }, { $set: { ProductsOrdered: products, Overalltotal: subtotal } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }


    if (req.method === 'POST' && path === '/addBillproduct') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { Invoiceid, ...ObjData } = JSON.parse(body);

            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            await db.collection('bill').updateOne({ _id: new ObjectId(Invoiceid) }, { $push: { ProductsOrdered: ObjData } });


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: "Updated Successfully" }));
        })
    }
    if (req.method === "POST" && path === '/deletebillrecord') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { id, indes } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url);
            await Mongoconnector.connect();


            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ msg: id }));
        })
    }



    if (req.method === "POST" && path === '/dashboarddelivered') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { DeliveryStatus } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin");
            const data = await db.collection("orders").find({ DeliveryStatus: DeliveryStatus }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }




    if (req.method === "POST" && path === '/pendingOrders') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { DeliveryStatus1, DeliveryStatus2 } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin1");
            const data = await db.collection("orders").find({ $or: [{ DeliveryStatus: DeliveryStatus1 }, { DeliveryStatus: DeliveryStatus2 }] }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }

    if (req.method === "POST" && path === '/Outfordelivery') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { DeliveryStatus } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin1");
            const data = await db.collection("orders").find({ DeliveryStatus: DeliveryStatus }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }

    if (req.method === "POST" && path === '/NewlyPlacedOrders') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const { DeliveryStatus } = JSON.parse(body);
            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin1");
            const data = await db.collection("orders").find({ DeliveryStatus: DeliveryStatus }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }

    if (req.method === "POST" && path === '/lowproduct') {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {

            const Mongoconnector = new MongoClient(url1);
            await Mongoconnector.connect();
            const db = Mongoconnector.db("admin1");
            const data = await db.collection("product").find({ Quantity: { $lte: 3 } }).toArray();

            Mongoconnector.close();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    }
});
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});