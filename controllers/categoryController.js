const Category = require("../models/Category");
const { ObjectId } = require("mongodb");

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


const getCategoryById = async (req, res) => {
    // #swagger.tags = ['Categories']
    try {
        const categoryId = req.params.id;
        if (!ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const category = new Category();
        const result = await category.getById(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not retrieve category." });
    }
};

module.exports = { getAllCategories, getCategoryById };
