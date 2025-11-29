const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const categoryValidator = require("../middleware/categoryValidator");

// Get all Categories
router.get("/", categoryController.getAllCategories);
// Get category by id
router.get("/:id", categoryController.getCategoryById);


// Create category
router.post(
    "/",
    categoryValidator.categoryCreateDataValidationRules(),
    categoryValidator.checkCategoryData,
    categoryController.createCategory
);

// Delete category
router.delete(
    "/:id",
    categoryController.deleteCategory
);

// Update category
router.put(
    "/:id",
    categoryValidator.categoryUpdateDataValidationRules(),
    categoryValidator.checkCategoryData,
    categoryController.updateCategory
);
module.exports = router;
