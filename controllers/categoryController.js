const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
    // #swagger.tags = ['Categories']
    try {
        const category = new Category();
        const result = await category.getAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve categories." });
    }
};

module.exports = { getAllCategories };
