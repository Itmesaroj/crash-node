const express = require("express");
const ProductModel = require("../Model/productModel");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ message: "success", data: products });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
});

// POST add new product
router.post("/add", async (req, res) => {
    try {
        const productData = req.body
        const product = new ProductModel(productData);
        await product.save();
        res.status(201).json({ message: "Product added successfully", data: product });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
});

// PATCH update a product by ID
router.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = await ProductModel.findByIdAndUpdate(id, data, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product successfully updated", data: product });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found in database" });
        }

        res.status(200).json({ message: "Product successfully deleted", data: product });
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
});

module.exports = router;
