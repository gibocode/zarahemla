const router = require("express").Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

module.exports = router;
