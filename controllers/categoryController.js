const Category = require("../models/Category");
const { ObjectId } = require("mongodb");

const getAllCategories = async (req, res) => {
    try {
        const category = new Category();
        const result = await category.getAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: "Could not retrieve categories." });
    }
};


const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const category = new Category();
        const result = await category.getById(categoryId);

        if (!result) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not retrieve category." });
    }
};

const createCategory = async (req, res) => {
    try {

        const { categoryName, categoryDescription, categoryId } = req.body;
        const category = new Category();
        const result = await category.createCategory(
            {
                categoryId,
                categoryName,
                categoryDescription
            }
        );
        if (result.insertedId) {
            return res.status(204).send();
        } else {
            return res.status(500).json({ message: "Could not create category." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not create category." });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const { id: categoryId } = req.params;

        if (!categoryId || !ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: 'Invalid category ID format.' });
        }

        const category = new Category();
        const result = await category.deleteCategory(categoryId);

        if (!result || result.deletedCount === 0) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        return res.json({ message: 'Category deleted successfully.' });

    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ message: "Could not delete category." });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryId, categoryName, categoryDescription } = req.body;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid category ID format.' });
        }

        const category = new Category();
        const result = await category.updateCategory(id, { categoryId, categoryName, categoryDescription });

        if (!result || result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        return res.json({ message: 'Category updated successfully.' });

    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({ message: "Could not update category." });
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, deleteCategory, updateCategory };
