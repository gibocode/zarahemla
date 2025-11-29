const Product = require("../models/Product");
const ObjectId = require("mongodb").ObjectId;

// Get all products
const getAllProducts = async (req, res) => {
    // #swagger.tags = ['Products']
    try {
        const product = new Product();
        const result = await product.getAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve products." });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    // #swagger.tags = ['Products']
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid product ID." });
        }
        const objectId = new ObjectId(id);
        const product = new Product();
        const result = await product.getByObjectId(objectId);
        if (!result) {
            return res.status(404).json({ message: "Product not found." });
        }
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve product." });
    }
};

// Create product
const createProduct = async (req, res) => {
    // #swagger.tags = ['Products']
    try {
        const data = req.body;
        const productData = {
            productId: data.productId,
            productName: data.productName,
            productDescription: data.productDescription,
            productColor: data.productColor,
            productBrand: data.productBrand,
            productPrice: parseFloat(data.productPrice),
            productImage: data.productImage
        };
        const product = new Product();
        const result = await product.create(productData);
        if (result.insertedId) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || "Could not create product.");
        }
    } catch (error) {
        return res.status(500).json({ message: "Could not create product." });
    }
};

// Update product
const updateProduct = async (req, res) => {
    // #swagger.tags = ['Products']
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid product ID." });
        }
        const objectId = new ObjectId(id);
        const data = req.body;
        const productData = {
            productId: data.productId,
            productName: data.productName,
            productDescription: data.productDescription,
            productColor: data.productColor,
            productBrand: data.productBrand,
            productPrice: parseFloat(data.productPrice),
            productImage: data.productImage
        };
        const product = new Product();
        const result = await product.update(objectId, productData);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json(result.error || "Product not found.")
        }
    } catch (error) {
        return res.status(500).json({ message: "Could not update product." });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    // #swagger.tags = ['Products']
    try {
        const id = req.params.id;
        if (ObjectId.isValid(id) === false) {
            return res.status(400).json({ message: "Invalid product ID." });
        }
        const objectId = new ObjectId(id);
        const product = new Product();
        const result = await product.delete(objectId);
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json(result.error || 'Product not found.');
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Could not delete product." });
    }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
