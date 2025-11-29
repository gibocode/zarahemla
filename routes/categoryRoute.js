const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

// Get all Categories
router.get("/", categoryController.getAllCategories);
// Get category by id
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
