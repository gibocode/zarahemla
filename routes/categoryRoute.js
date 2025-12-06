const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const categoryValidator = require("../middleware/categoryValidator");
const { isAuthenticated } = require("../middleware/authenticate");


// Get all Categories
router.get(
    // #swagger.summary = 'Retrieve all categories'
    "/",
    categoryController.getAllCategories
);

// Get category by id
router.get(
    // #swagger.summary = 'Retrieve a category by Object ID"
    "/:id",
    categoryController.getCategoryById
);

// Create category
router.post(
    // #swagger.summary = 'Create a new category'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/",
    isAuthenticated,
    categoryValidator.categoryCreateDataValidationRules(),
    categoryValidator.checkCategoryData,
    categoryController.createCategory
);

// Update category
router.put(
    // #swagger.summary = 'Update an existing category by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    categoryValidator.categoryUpdateDataValidationRules(),
    categoryValidator.checkCategoryData,
    categoryController.updateCategory
);

// Delete category
router.delete(
    // #swagger.summary = 'Delete a category by Object ID'
    // #swagger.security = [{ "GitHubOAuth": [] }]
    "/:id",
    isAuthenticated,
    categoryController.deleteCategory
);

module.exports = router;
