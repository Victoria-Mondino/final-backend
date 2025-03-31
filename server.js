import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import Product from "./daos/models/productModel.js";
import productsRouter from './routes/products.js';
import cartsRouter from "./routes/cart.js";
import viewsRouter from './routes/views.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/solarflow";
const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 8080;

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/', viewsRouter);

mongoose.connect(MONGO_URI)
    .then(() => console.log("🟢 Connected to MongoDB"))
    .catch(err => console.error("🔴 MongoDB Connection Error:", err));

mongoose.set('bufferTimeoutMS', 30000);

// WebSocket read/write MongoDB with flat objects
io.on("connection", async (socket) => {
    console.log("🟢 Client connected");

    const products = await Product.find().lean();
    socket.emit("updateProducts", products);

    socket.on("newProduct", async (product) => {
        const newProduct = new Product(product);
        await newProduct.save();
        const products = await Product.find().lean();
        io.emit("updateProducts", products);
    });

    socket.on("deleteProduct", async (productId) => {
        await Product.findByIdAndDelete(productId);
        const products = await Product.find().lean();
        io.emit("updateProducts", products);
    });
});

server.listen(PORT, () => {
    console.log(`🔥 Server listening on http://localhost:${PORT}`);
});
