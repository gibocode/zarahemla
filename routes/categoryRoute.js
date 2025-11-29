const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

// Get all Categories
router.get("/", categoryController.getAllCategories);

module.exports = router;
