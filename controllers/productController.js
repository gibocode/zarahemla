const Product = require("../models/Product");

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

module.exports = { getAllProducts };
