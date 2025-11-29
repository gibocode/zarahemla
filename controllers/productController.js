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

module.exports = { getAllProducts, getProductById };
