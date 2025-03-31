import express from "express";
import Cart from "../daos/models/cartModel.js";
import Product from "../daos/models/productModel.js";

const router = express.Router();

// Create empty cart
router.post("/", async (req, res) => {
    try {
        const newCart = await Cart.create({ products: [] });
        res.status(201).json({ status: "success", message: "Cart created", cart: newCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Get cart
router.get("/:cid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate("products.product");
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Cart not found" });
        }
        res.json({ status: "success", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Put cart
router.put("/:cid", async (req, res) => {
    try {
        const { products } = req.body;
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

        for (const item of products) {
            const productExists = await Product.findById(item.product);
            if (!productExists) {
                return res.status(404).json({ status: "error", message: `Product ${item.product} not found` });
            }
        }

        cart.products = products;
        await cart.save();
        res.json({ status: "success", message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Put quantity prodcut
router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
        if (productIndex === -1) {
            return res.status(404).json({ status: "error", message: "Product not found in cart" });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.json({ status: "success", message: "Product quantity updated", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Remove product
router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

        cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
        await cart.save();
        res.json({ status: "success", message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Remove cart
router.delete("/:cid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

        cart.products = [];
        await cart.save();
        res.json({ status: "success", message: "Cart emptied", cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;
