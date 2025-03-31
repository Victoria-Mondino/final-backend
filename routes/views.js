import express from 'express';
import Product from "../daos/models/productModel.js";
import CartModel from "../daos/models/cartModel.js";

const router = express.Router();

// Home
router.get('/home', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, query } = req.query;

        const filter = query ? { category: query } : {};

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
            lean: true
        };

        const products = await Product.paginate(filter, options);

        res.render("home", {
            title: "Home | SolarFlow",
            products: products.docs,
            pagination: {
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage
            }
        });
    } catch (error) {
        res.status(500).send("Error loading products.");
    }
});

// Product Detail
router.get("/products/:pid", async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        res.render("productDetail", {
            title: product.title,
            product
        });
    } catch (error) {
        res.status(500).send("Error loading product.");
    }
});

// Management
router.get('/management', async (req, res) => {
    res.render('management', { title: 'Management | SolarFlow' });
});

// Cart
router.get("/cart/:cid", async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.cid).populate("products.product");

        if (!cart) {
            return res.status(404).send("Cart not found.");
        }

        res.render("cart", {
            title: "Cart | SolarFlow",
            cart: cart.products
        });
    } catch (error) {
        res.status(500).send("Error loading cart.");
    }
});

export default router;