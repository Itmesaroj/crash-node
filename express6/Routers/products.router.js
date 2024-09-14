const express = require("express");
const router = express.Router();
const ProductModel = require("../Model/productModel"); 

router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to retrieve products" });
  }
});

// Add a new product
router.post("/add", async (req, res) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);
    
    const product = new ProductModel(reqBody);
    await product.save();
    
    res.status(201).json({ message: "Product successfully added to the database" });
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to add product" });
  }
});

// Update product by ID
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;  
    const reqBody = req.body;
  
    const product = await ProductModel.findByIdAndUpdate(id, reqBody, { new: true });
  
    if (!product) {
      return res.status(404).json({ msg: "Product not found, the update did not happen" });
    }
  
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to update product" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.status(200).send("Product deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message || err, msg: "Failed to delete product" });
  }
});

module.exports = router;
