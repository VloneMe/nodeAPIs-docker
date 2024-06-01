const express = require("express");
const connectDB = require("./src/config/db");
const Product = require("./src/models/productModel");


// Database Connection Established here
connectDB();

const server = express();

server.use(express.json());

server.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch(err){
        res.status(500).send(err.message);
    }
});

server.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)  throw new Error("Product not found!");
        res.json(product);
    } catch(err){
        res.status(500).send(err.message);
    }
});

server.post("/api/products", async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const product = new Product({name, price, quantity});
        await product.save();
        res.json({success: true});
    } catch(err){
        res.status(500).send(err.message);
    }
});

server.put("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!product)  throw new Error("Product not found!");
        res.json({success: true});
    } catch(err){
        res.status(500).send(err.message);
    }
});

server.delete("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)  throw new Error("Product not found!");
        res.json({success: true});
    } catch(err){
        res.status(500).send(err.message);
    }
});


const port = 4000;
server.listen(port, () => {
    console.log(`[server]: Running at http://localhost:${port}`);
});