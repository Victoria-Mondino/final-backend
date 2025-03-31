import express from "express";
import Product from "../daos/models/productModel.js";

const router = express.Router();

// Get prodcuts
router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
        };

        const filter = query
            ? { $or: [{ category: query }, { status: query === "available" }] }
            : {};

        const result = await Product.paginate(filter, options);

        res.json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// Add product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({ status: "success", message: "Product added", product: newProduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// Remove product
router.delete("/:pid", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.pid);
        res.json({ status: "success", message: "Product deleted" });
    } catch (error) {
        res.status(400).json({ status: "error", message: "Invalid product ID" });
    }
});

export default router;
